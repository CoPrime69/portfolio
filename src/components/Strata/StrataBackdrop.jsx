"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { STRATA_STOPS, STRATA_BG } from "../../data/strata";

/**
 * The page background colour, and only the background colour.
 *
 * This sits BEHIND the dot grid. The floating dots keep their original
 * constant colours - they are not touched. What travels with scroll depth is
 * the solid backdrop they float against, which is what actually reads as
 * descending through the world.
 *
 * No purple anywhere: the palette runs dark blue-black → green → brown →
 * grey → near-black.
 *
 * PERF: framer-motion interpolates the colour on a motion value and writes it
 * straight to style, so scrolling costs zero React re-renders.
 */

const StrataBackdrop = () => {
    const { scrollYProgress } = useScroll();

    // Stops come from data/strata.js so the backdrop and the dot colours can
    // never drift out of step.
    const backgroundColor = useTransform(scrollYProgress, STRATA_STOPS, STRATA_BG);
    const torchOpacity = useTransform(scrollYProgress, [0.05, 0.45, 1], [0, 0.5, 0.18]);
    const vignetteOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 0.65]);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0"
            style={{ backgroundColor, zIndex: 0 }}
        >
            {/* Warmth from the surface above */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 60% at 50% -10%, rgba(252,238,75,0.05) 0%, transparent 60%)",
                    opacity: torchOpacity,
                }}
            />

            {/* Further from daylight, darker at the edges */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 90% at 50% 40%, transparent 45%, rgba(0,0,0,0.45) 100%)",
                    opacity: vignetteOpacity,
                }}
            />
        </motion.div>
    );
};

export default StrataBackdrop;
