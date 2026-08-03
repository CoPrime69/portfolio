"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";

/**
 * Minecraft's F3 depth readout, repurposed as a scroll indicator.
 *
 * Y runs from the surface (64) down to bedrock (-64), matching the real world
 * height limits, so the number is doing double duty: it tells you how far
 * through the page you are AND reinforces the descent.
 *
 * Desktop only - on mobile it would compete with the avatar for the same
 * corner and the page is short enough there not to need it.
 */

const SURFACE_Y = 64;
const BEDROCK_Y = -64;

const LAYERS = [
    { at: 0.0, name: "Surface", ore: "var(--ore-emerald)" },
    { at: 0.2, name: "Dirt", ore: "var(--ore-copper)" },
    { at: 0.34, name: "Stone", ore: "var(--ore-diamond)" },
    { at: 0.54, name: "Deepslate", ore: "var(--ore-lapis)" },
    { at: 0.78, name: "Bedrock", ore: "var(--ore-diamond)" },
];

const layerFor = (p) => LAYERS.reduce((acc, l) => (p >= l.at ? l : acc), LAYERS[0]);

const DepthMeter = () => {
    const { scrollYProgress } = useScroll();
    const [depth, setDepth] = useState(SURFACE_Y);
    const [layer, setLayer] = useState(LAYERS[0]);

    // Guard both setStates behind a change check. Without this every scroll
    // event queued a render even when the rounded depth and the layer were
    // identical, which showed up as scroll jank.
    const lastDepth = useRef(SURFACE_Y);
    const lastLayer = useRef(LAYERS[0]);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const nextDepth = Math.round(SURFACE_Y + (BEDROCK_Y - SURFACE_Y) * p);
        if (nextDepth !== lastDepth.current) {
            lastDepth.current = nextDepth;
            setDepth(nextDepth);
        }

        const nextLayer = layerFor(p);
        if (nextLayer !== lastLayer.current) {
            lastLayer.current = nextLayer;
            setLayer(nextLayer);
        }
    });

    const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        // Duration/easing matched to the avatar, hotbar and clock so all four
        // pieces of chrome arrive as one movement.
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
            <div className="mc-panel flex flex-col items-center gap-3 px-3 py-4">
                <span
                    className="font-pixel text-[10px] uppercase tracking-widest"
                    style={{ color: layer.ore }}
                >
                    {layer.name}
                </span>

                {/* Depth track */}
                <div className="mc-bevel-inset relative h-40 w-3 overflow-hidden bg-black/50">
                    <motion.div
                        className="absolute inset-x-0 top-0"
                        style={{ height: fillHeight, backgroundColor: layer.ore, opacity: 0.75 }}
                    />
                </div>

                <span className="font-pixel text-xs text-white/90">
                    Y:{depth}
                </span>
            </div>
        </motion.div>
    );
};

export default DepthMeter;
