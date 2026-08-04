/**
 * The descent palette. Single source of truth for the backdrop colour, the dot
 * colours AND the depth readout, so they can never drift apart.
 *
 * `at`     scroll progress, 0 (top) to 1 (bottom)
 * `bg`     page backdrop, sits BEHIND the dots
 * `dot`    resting dot colour. Deliberately several steps lighter than `bg`
 *          so the grid stays legible instead of sinking into the backdrop.
 * `active` dot colour under the cursor, the stratum's ore accent
 * `ore`    the --ore-* token this depth is named by. DepthMeter reads this;
 *          it used to hardcode its own five-entry table whose stops were
 *          roughly one stratum ahead of these, so the readout said "Stone"
 *          while the backdrop was still pure Dirt.
 *
 * NOTE: `active` duplicates an ore hex as a literal because this file is
 * imported by canvas code that cannot resolve a CSS custom property. If you
 * change an --ore-* value in globals.css, change its twin here.
 */

const strata = [
    { at: 0.00, name: "Sky", bg: "#070b14", dot: "#22304e", active: "#00f5ff", ore: "iron" },
    { at: 0.18, name: "Grass", bg: "#0a1710", dot: "#1f4530", active: "#17dd62", ore: "emerald" },
    { at: 0.34, name: "Dirt", bg: "#150f09", dot: "#48331d", active: "#e77c56", ore: "copper" },
    { at: 0.52, name: "Stone", bg: "#131519", dot: "#333944", active: "#4aedd9", ore: "diamond" },
    { at: 0.74, name: "Deepslate", bg: "#0d0f12", dot: "#28304a", active: "#6f8fe0", ore: "lapis" },
    { at: 1.00, name: "Bedrock", bg: "#0a0a0c", dot: "#2f2c3a", active: "#9db4ff", ore: "gold" },
];

const hexToRgb = (h) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
];

const rgbToHex = (c) =>
    "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const lerp = (a, b, t) => a + (b - a) * t;

/** Interpolate any key of the palette at a given scroll progress. */
export const strataColorAt = (p, key) => {
    let lo = strata[0];
    let hi = strata[strata.length - 1];

    for (let i = 0; i < strata.length - 1; i++) {
        if (p >= strata[i].at && p <= strata[i + 1].at) {
            lo = strata[i];
            hi = strata[i + 1];
            break;
        }
    }

    const span = hi.at - lo.at;
    const t = span === 0 ? 0 : (p - lo.at) / span;
    const a = hexToRgb(lo[key]);
    const b = hexToRgb(hi[key]);
    return rgbToHex([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]);
};

/**
 * The stratum you are actually standing in at a given scroll progress.
 *
 * NEAREST stop, not the last one passed. The backdrop at any p is interpolating
 * between two stops, so the honest name is whichever one the colour currently
 * looks most like - it flips at the midpoint of each interval.
 *
 * "Last stop passed" was tried and is wrong: Bedrock sits at exactly 1.00, so
 * the readout only ever said "Bedrock" on the final pixel of the page and read
 * "Deepslate" for the whole bottom quarter. Measured at p=1.0: backdrop
 * #0a0a0c (bedrock) while the label still said Deepslate.
 */
export const strataAt = (p) =>
    strata.reduce((acc, s) =>
        Math.abs(p - s.at) < Math.abs(p - acc.at) ? s : acc
    , strata[0]);

/** Stop arrays for framer-motion's useTransform. */
export const STRATA_STOPS = strata.map((s) => s.at);
export const STRATA_BG = strata.map((s) => s.bg);

export default strata;
