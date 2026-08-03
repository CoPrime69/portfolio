/**
 * Resume track picker.
 *
 * ── ACTION NEEDED ────────────────────────────────────────────────────────────
 * Each track below should point at its own hosted PDF. Until a track has its
 * own `url`, the picker falls back to GENERAL_RESUME_URL so no slot is ever
 * dead - the UI marks fallback slots so a visitor knows they're getting the
 * general resume rather than the specialised one.
 *
 * To wire a track up: paste its share link into `url`. (Local .tex → PDF
 * compilation isn't possible here - no LaTeX toolchain on this machine.)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { url as asUrl } from "./_normalize";

export const GENERAL_RESUME_URL =
    "https://drive.google.com/file/d/1DFzRiX0pxmD7pn5MZhb7b9T2Ffi6_gRA/view?usp=sharing";

const resumeTracks = [
    {
        id: "ai-ml",
        label: "AI / ML",
        blurb: "Model training, fine-tuning and evaluation",
        source: "resume_ai_ml.tex",
        ore: "emerald",
        url: null,
    },
    {
        id: "ai-ds",
        label: "AI / Data Science",
        blurb: "Data engineering, analysis and visualization",
        source: "resume_ai_ds.tex",
        ore: "lapis",
        url: null,
    },
    {
        id: "cloud",
        label: "Cloud / Platform",
        blurb: "Infrastructure, orchestration and IaC",
        source: "resume_cloud_platform.tex",
        ore: "copper",
        url: null,
    },
    {
        id: "swe",
        label: "SWE / Backend",
        blurb: "Services, APIs and distributed systems",
        source: "resume_swe_backend.tex",
        ore: "diamond",
        url: null,
    },
];

/** Resolve a track to the link that should actually open. */
export const resolveResumeUrl = (track) => asUrl(track.url) ?? GENERAL_RESUME_URL;

/** True when the track has no dedicated PDF and is borrowing the general one. */
export const isFallback = (track) => !asUrl(track.url);

export default resumeTracks;
