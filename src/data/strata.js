/**
 * The descent palette. Single source of truth for both the backdrop colour
 * and the dot colours, so they can never drift apart.
 *
 * `at`     scroll progress, 0 (top) to 1 (bottom)
 * `bg`     page backdrop, sits BEHIND the dots
 * `dot`    resting dot colour. Deliberately several steps lighter than `bg`
 *          so the grid stays legible instead of sinking into the backdrop.
 * `active` dot colour under the cursor, the stratum's ore accent
 */

const strata = [
    { at: 0.00, name: "Sky", bg: "#070b14", dot: "#22304e", active: "#00f5ff" },
    { at: 0.18, name: "Grass", bg: "#0a1710", dot: "#1f4530", active: "#17dd62" },
    { at: 0.34, name: "Dirt", bg: "#150f09", dot: "#48331d", active: "#e77c56" },
    { at: 0.52, name: "Stone", bg: "#131519", dot: "#333944", active: "#4aedd9" },
    { at: 0.74, name: "Deepslate", bg: "#0d0f12", dot: "#28304a", active: "#6f8fe0" },
    { at: 1.00, name: "Bedrock", bg: "#0a0a0c", dot: "#2f2c3a", active: "#9db4ff" },
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

/** Stop arrays for framer-motion's useTransform. */
export const STRATA_STOPS = strata.map((s) => s.at);
export const STRATA_BG = strata.map((s) => s.bg);

export default strata;
