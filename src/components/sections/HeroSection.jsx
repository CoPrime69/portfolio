"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
 */
const STAGE = {
    skills: 0,
    pitch: 700,
    actions: 1500,
    done: 2450,
    /** How long a stage's own reveal takes to settle (matches `reveal()`). */
    revealSettle: 700,
};

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

    // Sizes to whatever word is currently showing. RotatingText deliberately
    // avoids framer-motion `layout` here: a layout animation inside a parent
    // that is itself transforming made the text drift against the box.
    const pillClass =
        "mc-bevel font-pixel h-9 sm:h-11 inline-flex items-center justify-center px-4 bg-[color-mix(in_srgb,var(--ore-diamond)_22%,#14141a)] text-white text-base sm:text-lg";

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const fireComplete = () => {
        if (!heroCompleteFired.current) {
            heroCompleteFired.current = true;
            onHeroComplete?.();
        }
    };

    const handleMainAnimationComplete = () => {
        // BlurText calls this once per word-span in some paths; run once.
        if (chainStarted.current) return;
        chainStarted.current = true;

        const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

        at(STAGE.skills, () => setShowSkillsText(true));
        // Rotation starts only once the pill has finished revealing. The
        // component is mounted from first paint (so the first change is a real
        // scroll, not a cut), but its interval used to start at t=0 while the
        // pill was still hidden, so "React" got about 100ms on screen before
        // PyTorch replaced it. Once started, it never stops.
        at(STAGE.skills + STAGE.revealSettle, () => setRotatePill(true));
        at(STAGE.pitch, () => setShowContent(true));
        at(STAGE.actions, () => {
            setShowActions(true);
            // All four of these start in the same tick with the same duration
            // and easing: buttons, slide, avatar, and the page chrome.
            onChromeReveal?.();
            if (!isMobile) {
                setSlideLeft(true);
                setShowAvatar(true);
            }
        });
        at(STAGE.done, fireComplete);
    };

    // Failsafe: everything below the hero is gated behind onHeroComplete, so if
    // any link in the chain never fires the page would render blank.
    useEffect(() => {
        const watchdog = setTimeout(fireComplete, 12000);
        const pending = timers.current;
        return () => {
            clearTimeout(watchdog);
            pending.forEach(clearTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Shared reveal: visual only, never affects layout. */
    const reveal = (shown, offset = { y: 24 }) => ({
        initial: { opacity: 0, ...offset },
        animate: shown ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset },
        transition: { duration: 0.7, ease: smoothEasing },
        style: { pointerEvents: shown ? "auto" : "none" },
        "aria-hidden": shown ? undefined : true,
    });

    return (
        <section className="relative h-screen mx-auto max-w-[1440px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="flex items-center justify-center w-full max-w-7xl md:gap-x-6">
                <motion.div
                    className="flex items-center justify-center w-full"
                    animate={!isMobile && slideLeft ? { x: "-20%" } : { x: 0 }}
                    transition={{ duration: 0.9, ease: smoothEasing }}
                >
                    <div className="text-center max-w-3xl">
                        <BlurText
                            text={hero.headline}
                            as="h1"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleMainAnimationComplete}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto mb-4 sm:mb-6"
                        />

                        {/* Stage 2 */}
                        <motion.div
                            {...reveal(showSkillsText)}
                            className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-4 sm:mb-6"
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
                                    // (see `rotatePill`), so "React" is readable
                                    // before the cycle begins; the cycle itself
                                    // runs at the same speed it always did.
                                    rotationInterval={1500}
                                />
                            </div>
                        </motion.div>

                        {/* Stage 3 */}
                        <motion.p
                            {...reveal(showContent, { y: 28 })}
                            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2"
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
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mt-4 sm:mt-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                onClick={onScrollToProjects}
                                tabIndex={showActions ? 0 : -1}
                                className="mc-btn hover:cursor-pointer px-6 sm:px-8 py-3 text-white w-full sm:w-auto text-sm sm:text-base"
                            >
                                {hero.primaryCta}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                onClick={onScrollToContact}
                                tabIndex={showActions ? 0 : -1}
                                className="mc-btn hover:cursor-pointer px-6 sm:px-8 py-3 text-white w-full sm:w-auto text-sm sm:text-base"
                            >
                                {hero.secondaryCta}
                            </motion.button>
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
