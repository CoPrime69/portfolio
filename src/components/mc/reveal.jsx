"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * THE HOUSE REVEAL.
 *
 * WHY THIS IS NOT `whileInView`.
 *
 * framer-motion's `whileInView` is IntersectionObserver underneath, and an
 * IntersectionObserver SAMPLES - it reports what overlapped the viewport at the
 * moments the browser happened to check. That is fine at reading speed and
 * broken at travel speed: click a hotbar button to jump five sections and the
 * intervening ones can go from below the viewport to above it between two
 * frames, never overlapping it on any frame the observer looked at. No
 * intersection is ever reported, and because the reveal is `once`, those
 * sections stay at opacity 0 permanently - you scroll back up through blank
 * space.
 *
 * The fix is to stop asking "is it on screen right now" and start asking "has
 * it ever got past the trigger line", which is the question the design actually
 * cares about. `rect.top <= line` is MONOTONIC: once an element is above the
 * line it stays above it, so a check on any later frame still returns true. A
 * section that was skipped over entirely is caught by the very next sweep
 * instead of being lost.
 *
 * That single change is what makes content render along the path of a jump
 * rather than only at its destination.
 *
 * One rAF-throttled sweep serves every reveal on the page - one loop and one
 * scroll listener total, not one per element - and it detaches itself once
 * everything has been revealed.
 */

/**
 * How far up the viewport an element must climb before it reveals, as a
 * fraction of viewport height.
 *
 * TUNED IN THREE PASSES, and the arithmetic matters:
 *   0.07  too early - cards revealed while still in the bottom sliver
 *   0.30  too late  - noticeably delayed, you saw them arrive
 *   0.18  the midpoint of those two, and where it sits now
 *
 * DO NOT push this much past 0.35. The trigger line and the element's own
 * visibility are different things - too high and an element sits fully on
 * screen at opacity 0 waiting to be triggered, which reads as broken content
 * rather than as a reveal.
 */
export const REVEAL_TRIGGER = 0.18;

const waiting = new Set();
let frame = null;
let listening = false;

const sweep = () => {
    frame = null;
    if (waiting.size === 0) return;

    const line = window.innerHeight * (1 - REVEAL_TRIGGER);

    // Deleting from a Set while iterating it is well defined - removed entries
    // are simply not revisited - so revealed elements drop out here.
    for (const entry of waiting) {
        const el = entry.ref.current;
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
            waiting.delete(entry);
            entry.show();
        }
    }

    if (waiting.size === 0) stopListening();
};

const schedule = () => {
    if (frame === null) frame = requestAnimationFrame(sweep);
};

const startListening = () => {
    if (listening) return;
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
};

function stopListening() {
    if (!listening) return;
    listening = false;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
}

/**
 * Register an element with the sweep. Returns the ref to attach and whether it
 * has been revealed yet. Reveals once and never reverses.
 */
export const useReveal = () => {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        if (shown) return;

        const entry = { ref, show: () => setShown(true) };
        waiting.add(entry);
        startListening();
        // Catch anything already past the line at mount - below-the-fold
        // sections mount during the hero intro, and some of them are on screen
        // the moment the page becomes scrollable.
        schedule();

        return () => {
            waiting.delete(entry);
            if (waiting.size === 0) stopListening();
        };
    }, [shown]);

    return { ref, shown };
};

/**
 * Stepped easing as a plain easing function.
 *
 * Minecraft has no sub-pixel movement, so the system's stated idiom is
 * `steps()`. CSS gets that for free; framer-motion does not accept a `steps()`
 * easing string, so the element is made to snap through a small number of fixed
 * positions instead.
 *
 * DO NOT reach for framer-motion's `times` to get this. `times` maps a list of
 * KEYFRAMES onto positions in the duration, so passing four times to a
 * two-keyframe transition makes opacity run 0 -> 1 -> 0 -> 1: the element
 * appears, vanishes, and appears again. That is a real bug that shipped here
 * briefly and it looked exactly like a flicker.
 */
export const stepped = (steps = 4) => (t) => Math.ceil(t * steps) / steps;

/** What each animatable property settles to. Anything else settles to 0. */
const REST = { opacity: 1, scale: 1, x: 0, y: 0 };

const restingState = (hidden) => {
    const out = {};
    for (const key of Object.keys(hidden)) out[key] = REST[key] ?? 0;
    return out;
};

/**
 * The reveal wrapper. Drop-in for a `motion.div` - it forwards className,
 * style, title and the rest straight through.
 *
 * `index` staggers a list. `offset` is the default upward travel; pass `from`
 * instead to travel along a different axis (Leadership's toasts come in from
 * the right).
 *
 * `useReducedMotion` is handled globally by <MotionConfig reducedMotion="user">
 * in layout.js, which turns the transform below into a no-op and leaves the
 * opacity fade - so reduced-motion users still see content appear, just without
 * travel.
 */
export const Reveal = ({
    index = 0,
    offset = 24,
    from,
    transition,
    children,
    ...rest
}) => {
    const { ref, shown } = useReveal();
    const hidden = from ?? { opacity: 0, y: offset };

    return (
        <motion.div
            ref={ref}
            initial={hidden}
            animate={shown ? restingState(hidden) : hidden}
            transition={{
                duration: 0.4,
                delay: index * 0.07,
                ease: stepped(4),
                ...transition,
            }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};
