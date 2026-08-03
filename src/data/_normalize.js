/**
 * Shared normalisation for every data file.
 *
 * The rule: a field only renders when it holds REAL data. Placeholders,
 * blanks, and half-finished values are treated exactly like "absent", so you
 * can leave `github: "enable"` sitting in a project while you go find the URL
 * and the button simply will not appear until you paste a real one.
 *
 * This means components never have to defend against bad input, and you can
 * generate these files from a script later without worrying about emitting a
 * stray empty string.
 */

/** Values that mean "I haven't filled this in yet". Case-insensitive. */
const PLACEHOLDERS = new Set([
    "enable", "enabled", "disable", "disabled",
    "todo", "tbd", "tba", "wip", "pending",
    "n/a", "na", "none", "null", "undefined", "nil",
    "-", "--", "xxx",
    // NOTE: single characters like "x" and "?" are deliberately NOT listed.
    // They are plausible real content (a metric label, an axis name), and
    // swallowing them would silently drop valid data.
    "placeholder", "coming soon", "add link", "add url",
    "your link here", "insert link", "example.com",
]);

/** True when a value should be treated as missing. */
export const isBlank = (v) => {
    if (v === null || v === undefined) return true;
    if (typeof v === "number") return Number.isNaN(v);
    if (typeof v === "string") {
        const t = v.trim();
        return t === "" || PLACEHOLDERS.has(t.toLowerCase());
    }
    if (Array.isArray(v)) return v.length === 0;
    return false;
};

/** A trimmed string, or null if blank/placeholder. */
export const text = (v) => (isBlank(v) ? null : String(v).trim());

/**
 * A usable href, or null.
 *
 * Accepts absolute http(s), mailto/tel, and site-root paths. A bare domain
 * like `github.com/me` is upgraded to https rather than rejected, since that
 * is a common way to jot one down. Anything else (including "enable") is null.
 */
export const url = (v) => {
    const t = text(v);
    if (!t) return null;
    if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(t)) return t;
    // Bare domain with a dot and no spaces, e.g. "github.com/CoPrime69"
    if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(t)) return `https://${t}`;
    return null;
};

/** An array of non-blank trimmed strings. Always an array, never null. */
export const list = (v) => (Array.isArray(v) ? v.map(text).filter(Boolean) : []);

/** Metric chips: keeps only entries with BOTH a value and a label. */
export const metrics = (v) =>
    Array.isArray(v)
        ? v
            .filter((m) => m && !isBlank(m.value) && !isBlank(m.label))
            .map((m) => ({ value: String(m.value).trim(), label: String(m.label).trim() }))
        : [];

/** Passes an imported image through, but rejects strings/placeholders. */
export const image = (v) => {
    if (isBlank(v)) return null;
    // next/image static imports are objects with a `src`; anything else that
    // is a non-blank string is treated as a plain URL.
    if (typeof v === "object" && v.src) return v;
    if (typeof v === "string") return v.trim();
    return null;
};

/** Drops keys whose values normalise to blank, so `?.` checks behave. */
export const compact = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => !isBlank(v)));
