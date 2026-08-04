"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BlurText from "../BlurText/BlurText";
import RotatingText from "../RotatingText/RotatingText";
import MinecraftAvatar from "../MinecraftAvatar/MinecraftAvatar";
import { hero } from "../../data/site";

const smoothEasing = [0.25, 0.1, 0.25, 1];

/**
 * Staged hero intro.
 *
 *   1. headline, word by word
 *   2. "I work with <pill>"
 *   3. the one-line pitch
 *   4. buttons sweep in from the edge WHILE the settled text slides sideways
 *      and the avatar enters from the right - one synchronised movement
 *
 * KEY LAYOUT DECISION: every stage is mounted from the first paint and only
 * its opacity/offset is animated. Previously each stage was conditionally
 * mounted, which grew the height of a vertically-centred flex container, so
 * the whole block re-centred and visibly jumped on every single stage. Keeping
 * the elements in the DOM fixes the layout once and lets the reveal be purely
 * visual. Hidden stages get `pointer-events: none` so they can't be clicked or
 * tabbed into early, and `aria-hidden` so they aren't announced.
 *
 * Stage offsets are absolute (not nested timeouts) so the sequence is readable
 * and can't drift.
 *
 * ── TIMING IS DELIBERATE. DO NOT COMPRESS IT. ───────────────────────────────
 *
 * These offsets, and the fact that the chain starts only once the headline has
 * finished writing itself, ARE the hierarchy: headline, then what I work with,
 * then the pitch, then the actions and the avatar together. A pass at cutting
 * the sequence to 1.5s and starting it on mount was tried and reverted - it
 * read as everything arriving at once, which is not the same thing faster, it
 * is a different and worse thing.
 *
 * What that pass was solving is still solved, without touching the feel:
 *
 * - IT USED TO HANG ON A BACKGROUNDED TAB. The chain is started by BlurText's
 *   onAnimationComplete, and Chrome does not run rAF in a hidden tab, so that
 *   callback never fired and the only escape was a 12-SECOND watchdog -
 *   reproduced at 13.0s total. `startChain` is now ALSO armed on a timer, so
 *   whichever comes first wins: the animation in a visible tab (the normal
 *   path, which keeps the hierarchy exactly as designed) or the fallback in a
 *   hidden one.
 *
 * - IT IGNORED prefers-reduced-motion. The reduce block in globals.css is
 *   CSS-only and cannot reach a setTimeout chain. Reduced motion now lands
 *   every stage on the first tick - no wait, no travel.
 *
 * - IT COULD NOT BE SKIPPED. Any click, key, wheel or touch now finishes it
 *   immediately. A cinematic opener should be a gift, not a toll.
 */
const STAGE = {
    skills: 0,
    pitch: 700,
    actions: 1500,
    done: 2450,
};

/**
 * If BlurText has not reported by this point, start the chain anyway.
 * The headline runs 13 words x 100ms + a 700ms settle, so ~2000ms is the real
 * figure; this leaves headroom without ever being the path a visible tab takes.
 */
const CHAIN_FALLBACK = 2600;

/**
 * How long the pill's reveal takes to land, matching `reveal()`'s duration.
 * Backstop only - the rotation normally starts on the reveal's own completion.
 */
const PILL_REVEAL = 700;

const HeroSection = ({
    onScrollToProjects,
    onScrollToContact,
    onHeroComplete,
    // Fired at stage 4, the same tick the avatar starts entering, so the page
    // chrome (hotbar, depth meter, clock) arrives in sync with it rather than
    // trailing a second behind at onHeroComplete.
    onChromeReveal,
    avatarPreloaded = false,
}) => {
    const heroCompleteFired = useRef(false);
    const chainStarted = useRef(false);
    const timers = useRef([]);

    const [showSkillsText, setShowSkillsText] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [rotatePill, setRotatePill] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [slideLeft, setSlideLeft] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);

    const prefersReducedMotion = useReducedMotion();

    // Read inside timer callbacks. Kept as a ref rather than a dependency so a
    // resize part-way through the intro cannot tear the chain down and restart
    // it - which is how a stage silently went missing during development.
    const isMobileRef = useRef(false);
    isMobileRef.current = isMobile;

    /**
     * The parent passes `onHeroComplete` and `onChromeReveal` as inline arrows,
     * so they are a NEW FUNCTION ON EVERY RENDER. Holding them in a ref is what
     * lets everything below be genuinely stable.
     *
     * This is not a style preference, it is the whole bug: when these callbacks
     * were dependencies, `settle`/`startChain`/`fireComplete` changed identity
     * every render, the timing effect re-ran every render, and its cleanup
     * cleared the pending stage timers. Stage 1 fired, wiped stages 2-4, and
     * the scroll gate then sat waiting on the watchdog. The intro appeared to
     * hang for six seconds.
     */
    const cb = useRef({ onHeroComplete, onChromeReveal });
    cb.current = { onHeroComplete, onChromeReveal };

    const fireComplete = useCallback(() => {
        if (heroCompleteFired.current) return;
        heroCompleteFired.current = true;
        cb.current.onHeroComplete?.();
    }, []);

    // Sizes to whatever word is currently showing. RotatingText deliberately
    // avoids framer-motion `layout` here: a layout animation inside a parent
    // that is itself transforming made the text drift against the box.
    const pillClass =
        "mc-bevel font-pixel pixel-md h-9 sm:h-11 inline-flex items-center justify-center px-4 bg-[color-mix(in_srgb,var(--ore-diamond)_22%,var(--mc-surface-base))] text-white";

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /** Land every stage at once. Used by reduced-motion and by skipping. */
    const settle = useCallback(
        (withAvatar) => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
            setShowSkillsText(true);
            setRotatePill(true);
            setShowContent(true);
            setShowActions(true);
            cb.current.onChromeReveal?.();
            if (withAvatar) {
                setSlideLeft(true);
                setShowAvatar(true);
            }
            chainStarted.current = true;
            fireComplete();
        },
        [fireComplete]
    );

    /**
     * The staged chain. Fired by whichever comes first: BlurText finishing
     * (the normal, designed path) or CHAIN_FALLBACK (the hidden-tab path).
     */
    const startChain = useCallback(() => {
        // BlurText calls this once per word-span in some paths; run once.
        if (chainStarted.current) return;
        chainStarted.current = true;

        const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

        at(STAGE.skills, () => setShowSkillsText(true));
        // The word cycle is started by the pill's own reveal finishing (see
        // onAnimationComplete on the stage-2 block below), so it begins the
        // instant "Python" is fully on screen rather than waiting for the rest
        // of the intro. This is only a backstop: framer will report a no-op
        // animation as already complete, so onAnimationComplete cannot be the
        // sole trigger or the rotation can silently never start. Whichever
        // fires first wins, and setRotatePill is idempotent.
        at(STAGE.skills + PILL_REVEAL, () => setRotatePill(true));
        at(STAGE.pitch, () => setShowContent(true));
        at(STAGE.actions, () => {
            setShowActions(true);
            // All four of these start in the same tick with the same duration
            // and easing: buttons, slide, avatar, and the page chrome.
            cb.current.onChromeReveal?.();
            if (!isMobileRef.current) {
                setSlideLeft(true);
                setShowAvatar(true);
            }
        });
        at(STAGE.done, fireComplete);
    }, [fireComplete]);

    useEffect(() => {
        // `useReducedMotion` reports null on the very first render; wait for a
        // real answer rather than starting a chain we may be about to skip.
        if (prefersReducedMotion === null) return;

        if (prefersReducedMotion) {
            settle(!isMobileRef.current);
            return;
        }

        // Belt and braces: BlurText normally wins this race in a visible tab,
        // which is what preserves the hierarchy. This only fires when it can't.
        const fallback = setTimeout(startChain, CHAIN_FALLBACK);
        // Last-resort backstop so the scroll gate can never strand anyone.
        const watchdog = setTimeout(fireComplete, CHAIN_FALLBACK + STAGE.done + 1500);

        // DELIBERATELY does not touch timers.current. Those are the stage
        // timers, they belong to the chain, and they are torn down on unmount
        // (below) - not here. Clearing them here is what broke the intro.
        return () => {
            clearTimeout(fallback);
            clearTimeout(watchdog);
        };
    }, [prefersReducedMotion, startChain, settle, fireComplete]);

    // Stage timers are cancelled once, on unmount.
    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    // Skip on any deliberate input. The page cannot be scrolled yet, so a
    // wheel gesture is a clear "let me in" and should be honoured rather than
    // swallowed.
    useEffect(() => {
        if (heroCompleteFired.current) return;
        const skip = () => settle(!isMobileRef.current);
        const opts = { passive: true };
        window.addEventListener("pointerdown", skip, opts);
        window.addEventListener("keydown", skip, opts);
        window.addEventListener("wheel", skip, opts);
        window.addEventListener("touchstart", skip, opts);
        return () => {
            window.removeEventListener("pointerdown", skip);
            window.removeEventListener("keydown", skip);
            window.removeEventListener("wheel", skip);
            window.removeEventListener("touchstart", skip);
        };
    }, [settle]);

    /** Shared reveal: visual only, never affects layout. */
    const reveal = (shown, offset = { y: 24 }) => ({
        initial: { opacity: 0, ...offset },
        animate: shown ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset },
        transition: { duration: 0.7, ease: smoothEasing },
        style: { pointerEvents: shown ? "auto" : "none" },
        "aria-hidden": shown ? undefined : true,
    });

    return (
        // The left padding at lg: is a safe-area for the DepthMeter, which is
        // fixed at left-4 and about 83px wide and appears at exactly this
        // breakpoint. Without it the headline - left-aligned, and pulled a
        // further 20% left by the stage-4 slide - ran underneath the readout;
        // measured 27px of the H1 occluded at 1440x900. Reserving the space is
        // the right fix: the depth bar is part of the identity and should not
        // have to hide for the hero.
        <section className="relative mx-auto flex h-screen max-w-[1440px] items-center justify-center overflow-hidden px-4 sm:px-6 lg:pl-32 lg:pr-8">
            <div className="flex w-full max-w-7xl items-center justify-center md:gap-x-6">
                <motion.div
                    className="flex w-full items-center justify-center"
                    animate={!isMobile && slideLeft ? { x: "-20%" } : { x: 0 }}
                    transition={{ duration: 0.9, ease: smoothEasing }}
                >
                    <div className="max-w-3xl text-center">
                        {/* NOTE: a role eyebrow ("AI/ML & Backend Engineer") was
                            added here and removed again. It was the one element
                            not part of the staged reveal, so it sat on screen
                            from the first frame while everything else was still
                            arriving - which flattened the hierarchy the sequence
                            exists to create. The role is in <title>, the OG tags
                            and the pitch below; it does not need a third home. */}
                        <BlurText
                            text={hero.headline}
                            as="h1"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={startChain}
                            className="mx-auto mb-4 max-w-4xl text-2xl font-bold leading-tight tracking-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                        />

                        {/* Stage 2. The word cycle starts the moment this block
                            has finished arriving - i.e. the moment "Python" is
                            fully rendered - rather than waiting for the rest of
                            the intro to settle. Tying it to the animation
                            instead of a timer means it stays correct if the
                            stage timings ever change.

                            The component is mounted from first paint (so the
                            first change is a real scroll, not a cut), but its
                            interval must not start while the pill is still
                            fading in, or the first word gets ~100ms on screen
                            before the next one replaces it. Once started, it
                            never stops. */}
                        <motion.div
                            {...reveal(showSkillsText)}
                            onAnimationComplete={() => {
                                if (showSkillsText) setRotatePill(true);
                            }}
                            className="mb-4 flex flex-col items-center justify-center gap-2 text-lg font-medium text-gray-300 sm:mb-6 sm:flex-row sm:text-xl md:text-2xl lg:text-3xl"
                        >
                            <span>{hero.worksWithPrefix}</span>
                            {/* Always mounted and always auto-rotating, including
                                through the intro. It used to be a static "React"
                                div swapped out for this component, so the first
                                change had no rotation at all - it just cut. */}
                            <div className={pillClass}>
                                <RotatingText
                                    auto={rotatePill}
                                    texts={hero.rotatingWords}
                                    mainClassName="flex items-center justify-center"
                                    // popLayout, not the default "wait": with "wait" the
                                    // outgoing word fully leaves before the next arrives,
                                    // which reads as a swap rather than a scroll.
                                    animatePresenceMode="popLayout"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden"
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    // Original cadence. Only the START is delayed
                                    // (see `rotatePill`), so the first word is
                                    // readable before the cycle begins; the cycle
                                    // itself runs at the same speed it always did.
                                    rotationInterval={1500}
                                />
                            </div>
                        </motion.div>

                        {/* Stage 3 */}
                        <motion.p
                            {...reveal(showContent, { y: 28 })}
                            className="mx-auto max-w-2xl px-2 text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl"
                        >
                            {hero.pitch}
                        </motion.p>

                        {/* Stage 4: rises into place as the block slides left.
                            NOTE: this must NOT animate `x`. It previously came
                            in from x:-70 while the parent was sliding to
                            x:-20%, so two competing horizontal transforms left
                            the buttons visibly out of line with the text above
                            them for the whole slide. Vertical-only motion keeps
                            them locked to the column and travelling with it. */}
                        <motion.div
                            {...reveal(showActions, { y: 24 })}
                            transition={{ duration: 0.9, ease: smoothEasing }}
                            className="mt-4 flex flex-col items-center justify-center gap-3 px-4 sm:mt-6 sm:flex-row sm:gap-4"
                        >
                            <button
                                onClick={onScrollToProjects}
                                tabIndex={showActions ? 0 : -1}
                                className="mc-btn pixel-sm w-full px-6 py-3 text-white hover:cursor-pointer sm:w-auto sm:px-8"
                            >
                                {hero.primaryCta}
                            </button>
                            <button
                                onClick={onScrollToContact}
                                tabIndex={showActions ? 0 : -1}
                                className="mc-btn pixel-sm w-full px-6 py-3 text-white hover:cursor-pointer sm:w-auto sm:px-8"
                            >
                                {hero.secondaryCta}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Avatar enters from the right as the text slides left.
                    Mounted as soon as the skin has preloaded, NOT at stage 4:
                    constructing the SkinViewer spins up a WebGL context and
                    uploads geometry, and doing that in the same frame as the
                    slide made the whole reveal stutter. Mounting early lets it
                    warm up invisibly, so stage 4 only has to animate opacity
                    and transform on an already-live canvas. */}
                {!isMobile && avatarPreloaded && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={
                            showAvatar
                                ? { opacity: 1, x: 0, scale: 1 }
                                : { opacity: 0, x: 100, scale: 0.95 }
                        }
                        transition={{ duration: 0.9, ease: smoothEasing }}
                        style={{ pointerEvents: showAvatar ? "auto" : "none" }}
                        aria-hidden={showAvatar ? undefined : true}
                        className="absolute top-1/2 hidden -translate-y-1/2 md:block right-[8%] lg:right-[12%] xl:right-[15%]"
                    >
                        <MinecraftAvatar preloaded={true} />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
