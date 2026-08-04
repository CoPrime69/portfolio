"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { strataAt } from "../../data/strata";
import { oreColor } from "../mc";

/**
 * Minecraft's F3 depth readout, repurposed as a scroll indicator.
 *
 * Y runs from the surface (64) down to bedrock (-64), matching the real world
 * height limits, so the number is doing double duty: it tells you how far
 * through the page you are AND reinforces the descent.
 *
 * Desktop only - on mobile it would compete with the avatar for the same
 * corner and the page is short enough there not to need it.
 *
 * WHAT THIS FILE USED TO GET WRONG: it hardcoded its own five-entry LAYERS
 * table (Surface/Dirt/Stone/Deepslate/Bedrock at 0/.2/.34/.54/.78) which had
 * drifted roughly one stratum ahead of data/strata.js. Measured: at p=0.43 it
 * read "Stone" while the backdrop was pure Dirt. It derives from strata.js
 * now, which is the single source of truth the descent already had.
 *
 * IT IS ALWAYS ON, ON PURPOSE. An earlier pass hid it until you had scrolled
 * past the hero, because it was painting over the first 27px of the H1 at
 * 1440x900. That fixed the collision by removing the readout, which is the
 * wrong trade - the bar is part of the identity and it should be there from
 * the first frame. The hero reserves a left safe-area for it instead; see the
 * lg:pl-* on HeroSection's section element.
 */

const SURFACE_Y = 64;
const BEDROCK_Y = -64;

const DepthMeter = () => {
    const { scrollYProgress } = useScroll();
    const [depth, setDepth] = useState(SURFACE_Y);
    const [layer, setLayer] = useState(() => strataAt(0));

    // Guard every setState behind a change check. Without this every scroll
    // event queued a render even when the rounded depth and the layer were
    // identical, which showed up as scroll jank.
    const lastDepth = useRef(SURFACE_Y);
    const lastLayer = useRef(strataAt(0));

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const nextDepth = Math.round(SURFACE_Y + (BEDROCK_Y - SURFACE_Y) * p);
        if (nextDepth !== lastDepth.current) {
            lastDepth.current = nextDepth;
            setDepth(nextDepth);
        }

        const nextLayer = strataAt(p);
        if (nextLayer !== lastLayer.current) {
            lastLayer.current = nextLayer;
            setLayer(nextLayer);
        }
    });

    const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const ore = oreColor(layer.ore);

    return (
        // Duration/easing matched to the avatar, hotbar and clock so all four
        // pieces of chrome arrive as one movement.
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-none fixed left-10 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
            <div className="mc-panel flex flex-col items-center gap-4 px-4 py-5">
                {/* fontSize is set inline rather than with a text-* utility so
                    it beats .mc-eyebrow's own font-size without depending on
                    which utility Tailwind happens to emit last. */}
                <span className="mc-eyebrow" style={{ color: ore, fontSize: "13px" }}>
                    {layer.name}
                </span>

                {/* Depth track */}
                <div className="mc-bevel-inset relative h-52 w-4 overflow-hidden bg-black/50">
                    <motion.div
                        className="absolute inset-x-0 top-0"
                        style={{ height: fillHeight, backgroundColor: ore, opacity: 0.75 }}
                    />
                </div>

                <span className="font-pixel pixel-md text-white/90">Y:{depth}</span>
            </div>
        </motion.div>
    );
};

export default DepthMeter;
