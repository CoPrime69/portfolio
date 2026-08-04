"use client";
// Re-exporting a binding does not bring it into this module's scope, and
// SectionHeading below uses it directly.
import { Reveal } from "./reveal";

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
    iron: "var(--ore-iron)",
};

export const oreColor = (name) => ORE[name] ?? ORE.diamond;

/**
 * The order ores are handed out in when a list needs distinct colours.
 *
 * Deliberately alternating cool and warm rather than alphabetical, so
 * neighbours in a list never sit next to a near-neighbour in hue:
 *   cyan -> yellow -> blue -> orange -> green -> red -> grey
 */
export const ORE_CYCLE = [
    "diamond",
    "gold",
    "lapis",
    "copper",
    "emerald",
    "redstone",
    "iron",
];

/**
 * Give every item in a list its own colour.
 *
 * NO TWO ITEMS IN A SECTION SHOULD SHARE AN ORE. Hand-setting `ore` per record
 * does not hold that line - `federated-learning` and `candidate-eval` were both
 * lapis, and the chest had four separate collisions - and it silently breaks
 * again every time a project is added. So uniqueness is computed here rather
 * than remembered in the data.
 *
 * An item's own `ore` is honoured when it is still free; otherwise it gets the
 * next unclaimed ore from ORE_CYCLE. That means the values in src/data stay
 * meaningful as a preference, and adding a project can never produce a
 * duplicate - it just takes the next free colour.
 *
 * There are only seven ores, so a list longer than seven must repeat. When it
 * wraps, the ore immediately preceding is held back, so a repeat can never land
 * next to its twin.
 *
 * @param items  the records being rendered
 * @param get    how to read an item's preferred ore (default: `item.ore`)
 * @returns      an array of ore names, index-aligned with `items`
 */
export const distinctOres = (items, get = (item) => item?.ore) => {
    const out = [];
    let claimed = new Set();
    let cursor = 0;

    const nextFree = (blocked) => {
        for (let n = 0; n < ORE_CYCLE.length; n++) {
            const candidate = ORE_CYCLE[(cursor + n) % ORE_CYCLE.length];
            if (!claimed.has(candidate) && candidate !== blocked) {
                cursor = (cursor + n + 1) % ORE_CYCLE.length;
                return candidate;
            }
        }
        return null;
    };

    for (const item of items) {
        const previous = out[out.length - 1];
        const preferred = get(item);

        let pick =
            preferred && preferred in ORE && !claimed.has(preferred)
                ? preferred
                : nextFree(previous);

        // Every ore is spoken for: start a fresh round, holding back the one
        // we just used so the wrap is not visible as a repeated pair.
        if (!pick) {
            claimed = new Set(previous ? [previous] : []);
            pick = nextFree(previous) ?? ORE_CYCLE[0];
        }

        claimed.add(pick);
        out.push(pick);
    }

    return out;
};

/**
 * A block tinted with an ore, mixed into the shared surface base.
 * Was written out longhand with a hardcoded #14141a in five separate files.
 */
export const oreBlock = (name, amount = 22) =>
    `color-mix(in srgb, ${oreColor(name)} ${amount}%, var(--mc-surface-base))`;

/* ---------------------------------------------------------------- motion */

/**
 * The house reveal lives in ./reveal.jsx - it is geometry-driven rather than
 * IntersectionObserver-driven, for reasons worth reading before changing it.
 * Re-exported here so sections keep importing everything from "../mc".
 */
export { Reveal, useReveal, stepped, REVEAL_TRIGGER } from "./reveal";

/* -------------------------------------------------------------- headings */

/**
 * A section's ore owns the whole heading block: the depth eyebrow, the rule
 * beneath the title, and (via `ore`) every accent the section hands down to
 * its cards. Previously the eyebrow and rule took the section ore while the
 * cards each picked their own, so the accent read as variety rather than as
 * "this is how deep you are".
 */
export const SectionHeading = ({ children, ore = "diamond", sub, depth }) => (
    <Reveal className="mb-12 text-center">
        {depth && (
            <span
                className="mc-eyebrow mb-3 inline-block"
                style={{ color: oreColor(ore) }}
            >
                {depth}
            </span>
        )}
        <h2 className="mc-title font-pixel pixel-lg text-white sm:pixel-xl">{children}</h2>
        {sub && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                {sub}
            </p>
        )}
        {/* One block wide, so the rule is literally a block. */}
        <div
            className="mx-auto mt-6 h-[3px] w-[var(--mc-block)]"
            style={{ backgroundColor: oreColor(ore) }}
        />
    </Reveal>
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
    // min-w-0 is load-bearing: without it the chip refuses to shrink below its
    // label's natural width and pushes the row wider than the screen.
    <div className="mc-bevel-inset flex min-w-0 flex-col items-center bg-black/40 px-2 py-2 sm:px-3">
        <span
            className="font-pixel pixel-sm leading-none"
            style={{ color: oreColor(ore) }}
        >
            {value}
        </span>
        {/* truncate keeps a long label on ONE line and ellipsises the overflow,
            so a chip can never grow a second row and lengthen the card. */}
        <span
            className="mc-metric-label mt-1.5 w-full truncate text-center text-gray-400"
            title={label}
        >
            {label}
        </span>
    </div>
);

/**
 * How many metrics a phone shows: an EVEN number, at most four.
 *
 * Even matters because the mobile layout is two columns - an odd count leaves a
 * half-empty last row, which reads as something failing to load rather than as
 * a deliberate stop. Four is the ceiling because two rows of chips is already
 * as much vertical space as a card can give up before they bury the content.
 *
 *   1 -> 1 (nothing to pair it with)   4 -> 4
 *   2 -> 2                             5 -> 4
 *   3 -> 2                             6 -> 4
 */
const mobileMetricCount = (total) =>
    total < 2 ? total : Math.min(4, total - (total % 2));

/**
 * A row of metrics for one item.
 *
 * TWO PER LINE ON A PHONE. The chips used to be a plain `flex-wrap`, which on a
 * narrow screen put each one on its own row - four metrics meant four rows, and
 * every experience and project card grew a tall column of chips that buried the
 * content under it.
 *
 * Below sm this is a two-column grid, so two metrics fill one line and four
 * fill two. The grid is what guarantees it: equal columns, each chip free to
 * shrink (min-w-0) and ellipsise rather than push the row wider than the phone.
 *
 * From sm up there is room, so it goes back to the wrapping flex row with every
 * metric visible. The extras are hidden with `sm:contents` rather than a class
 * on the chip itself, because `hidden` and the chip's own `flex` are both
 * display utilities and which one wins would depend on Tailwind's output order.
 */
export const MetricRow = ({ metrics = [], ore = "diamond", className = "" }) => {
    if (metrics.length === 0) return null;

    const onPhone = mobileMetricCount(metrics.length);
    const shown = metrics.slice(0, onPhone);
    const rest = metrics.slice(onPhone);

    return (
        <div className={`grid grid-cols-2 gap-2 sm:flex sm:flex-wrap ${className}`}>
            {shown.map((m) => (
                <MetricChip key={m.label} {...m} ore={ore} />
            ))}

            {rest.length > 0 && (
                <div className="hidden sm:contents">
                    {rest.map((m) => (
                        <MetricChip key={m.label} {...m} ore={ore} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const TechTag = ({ children, ore = "diamond" }) => (
    <span
        className="mc-bevel-inset px-2 py-1 text-[11px] text-gray-200"
        style={{ backgroundColor: `color-mix(in srgb, ${oreColor(ore)} 12%, transparent)` }}
    >
        {children}
    </span>
);

/**
 * The small uppercase state badge ("Current", "Active").
 * Funnel Display rather than the pixel face: at 11px the Minecraft glyphs stop
 * resolving, and this is the size that made the point loudest.
 */
export const StateBadge = ({ children, ore = "diamond" }) => (
    <span
        className="mc-bevel-inset mc-eyebrow px-2 py-[3px]"
        style={{ color: oreColor(ore), backgroundColor: "rgba(0,0,0,0.4)" }}
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
        style={{ width: size, height: size, backgroundColor: oreBlock(ore, 18) }}
    >
        <span className="font-pixel pixel-sm" style={{ color: oreColor(ore) }}>
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

/**
 * The seam an ore node sits in.
 *
 * This was a 25%-opacity hairline, which measured as invisible against every
 * stratum - so the nodes read as floating squares rather than as ore embedded
 * in a vein. It is the load-bearing element of the whole Projects metaphor, so
 * it is now actually visible.
 *
 * `ore` takes either a single token or an array. An array runs the gradient
 * through each ore in turn, so a seam that passes several veins is tinted by
 * all of them - which is what the original diamond -> copper -> emerald
 * gradient was doing, just too faintly to see.
 */
export const OreSeam = ({ ore = "diamond", className = "" }) => {
    const stops = Array.isArray(ore) ? ore : [ore];
    const ramp = stops
        .map((o, i) => {
            // Leave the first and last 10% to fade out, so the seam does not
            // end in a hard stub.
            const pct = 10 + (80 * i) / Math.max(stops.length - 1, 1);
            return `${oreColor(o)} ${pct.toFixed(1)}%`;
        })
        .join(", ");

    return (
        <div
            className={`absolute w-[3px] ${className}`}
            style={{
                background: `linear-gradient(to bottom, transparent, ${ramp}, transparent)`,
                opacity: 0.55,
            }}
        />
    );
};
