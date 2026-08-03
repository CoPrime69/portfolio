"use client";
import { useState, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import DotGrid from "../DotGrid/DotGrid";
import { strataColorAt } from "../../data/strata";

/**
 * The dot grid, re-tinted as you descend.
 *
 * The pattern, spacing and interaction never change. Only the colours move,
 * and they track the backdrop deliberately: each stratum's dot colour is
 * several steps lighter than the backdrop behind it, so the grid stays
 * readable instead of sinking into the background as the page darkens.
 *
 * PERF: DotGrid re-memoises its RGB on prop change but does not rebuild the
 * grid, so recolouring is cheap. Even so we only setState when a colour
 * actually changes, otherwise every scroll frame would queue a render.
 */

const StrataDotGrid = () => {
    const { scrollYProgress } = useScroll();
    const [colors, setColors] = useState(() => ({
        base: strataColorAt(0, "dot"),
        active: strataColorAt(0, "active"),
    }));
    const last = useRef(colors);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const next = {
            base: strataColorAt(p, "dot"),
            active: strataColorAt(p, "active"),
        };
        if (next.base !== last.current.base || next.active !== last.current.active) {
            last.current = next;
            setColors(next);
        }
    });

    return (
        <DotGrid
            dotSize={3.5}
            gap={15}
            baseColor={colors.base}
            activeColor={colors.active}
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
        />
    );
};

export default StrataDotGrid;
