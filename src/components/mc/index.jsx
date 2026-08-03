"use client";
import { motion } from "framer-motion";

/**
 * Shared Minecraft UI primitives. Everything below composes the bevel/panel
 * classes from globals.css so sections stay visually consistent without each
 * one re-deriving the same border stack.
 */

export const ORE = {
    diamond: "var(--ore-diamond)",
    emerald: "var(--ore-emerald)",
    lapis: "var(--ore-lapis)",
    gold: "var(--ore-gold)",
    redstone: "var(--ore-redstone)",
    copper: "var(--ore-copper)",
    amethyst: "var(--ore-amethyst)",
};

export const oreColor = (name) => ORE[name] ?? ORE.diamond;

/* -------------------------------------------------------------- headings */

export const SectionHeading = ({ children, ore = "diamond", sub, depth }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
    >
        {depth && (
            <span
                className="font-pixel mb-3 inline-block text-[10px] uppercase tracking-[0.3em]"
                style={{ color: oreColor(ore), opacity: 0.75 }}
            >
                {depth}
            </span>
        )}
        <h2 className="mc-title text-2xl text-white sm:text-3xl md:text-4xl">{children}</h2>
        {sub && (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-300 sm:text-base">{sub}</p>
        )}
        <div
            className="mx-auto mt-5 h-[3px] w-24"
            style={{ backgroundColor: oreColor(ore), opacity: 0.6 }}
        />
    </motion.div>
);

/* ---------------------------------------------------------------- panels */

export const BlockPanel = ({ children, className = "", ore, glow = false, ...rest }) => (
    <div
        className={`mc-panel ${glow ? "mc-ore-glow" : ""} ${className}`}
        style={glow && ore ? { "--ore": oreColor(ore) } : undefined}
        {...rest}
    >
        {children}
    </div>
);

/* ----------------------------------------------------------------- chips */

export const MetricChip = ({ value, label, ore = "diamond" }) => (
    <div className="mc-bevel-inset flex flex-col items-center bg-black/40 px-3 py-2">
        <span className="font-pixel text-sm leading-none" style={{ color: oreColor(ore) }}>
            {value}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">{label}</span>
    </div>
);

export const TechTag = ({ children, ore = "diamond" }) => (
    <span
        className="mc-bevel-inset px-2 py-1 text-[11px] text-gray-200"
        style={{ backgroundColor: `color-mix(in srgb, ${oreColor(ore)} 12%, transparent)` }}
    >
        {children}
    </span>
);

/* ------------------------------------------------------------ block tile */

/**
 * Fallback tile for anything with no icon available.
 * Renders the two-letter `short` as a chiselled block rather than a blank box.
 */
export const BlockTile = ({ short, ore = "diamond", size = 56 }) => (
    <div
        className="mc-bevel flex items-center justify-center"
        style={{
            width: size,
            height: size,
            backgroundColor: `color-mix(in srgb, ${oreColor(ore)} 18%, #14141a)`,
        }}
    >
        <span
            className="font-pixel text-sm"
            style={{ color: oreColor(ore) }}
        >
            {short}
        </span>
    </div>
);

/* ------------------------------------------------------------ ore marker */

export const OreNode = ({ ore = "diamond", size = 22, pulse = true }) => (
    <div
        className={`mc-bevel ${pulse ? "mc-ore-pulse" : ""}`}
        style={{
            width: size,
            height: size,
            backgroundColor: oreColor(ore),
            boxShadow: `0 0 20px 2px color-mix(in srgb, ${oreColor(ore)} 55%, transparent)`,
        }}
    />
);
