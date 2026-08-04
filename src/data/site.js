/**
 * Site-wide copy and identity.
 *
 * Everything a visitor reads that isn't a project, role, course or skill lives
 * here. Nothing in this file should require touching a component to change.
 */

export const profile = {
    name: "Prakhar Srivastava",
    minecraftUsername: "Co_Prime",
    role: "AI/ML & Backend Engineer",
    location: "Jodhpur, India",
    email: "prakhars2558@gmail.com",
    phone: "+91-9044070178",
    github: "https://github.com/CoPrime69",
    linkedin: "https://www.linkedin.com/in/prakhar-srivastava-b539172ab/",
    website: "https://www.coprime69.me",
};

export const meta = {
    title: "Prakhar Srivastava - AI/ML & Backend Engineer",
    description:
        "B.Tech AI & Data Science at IIT Jodhpur. AI/ML and backend engineer - LLM fine-tuning, distributed data platforms and cloud infrastructure.",
    url: "https://coprime69.me",
};

export const hero = {
    headline: "Hey there, I am Prakhar pursuing B.Tech in AI & DS from IIT Jodhpur!",
    /** Prefix before the rotating pill. */
    worksWithPrefix: "I work with",
    /**
     * Words that cycle in the pill. First entry is what shows on load, and it
     * stays up for ~2.2s before the cycle starts, so it should be the single
     * strongest signal.
     *
     * Ordered by real evidence, not vibes:
     *   Python   most-used technology across every resume and project
     *   PyTorch  highest usage weight of any AI/ML tool in this repo
     *   LLMs     the Tech Mahindra work is the biggest differentiator
     *   Go       in all four resumes; the PolyStore query engine
     *   AWS      in all four resumes; PolyStore and Anginat
     *   Next.js  highest usage weight tied with Python
     *   FastAPI  in all four resumes; the current SGRG role
     *
     * Kept to seven so the full cycle is ~10s and every word gets seen.
     */
    rotatingWords: ["Python", "PyTorch", "LLMs", "Go", "AWS", "Next.js", "FastAPI"],
    pitch:
        "AI/ML and backend engineer, fine-tuning language models, building distributed data platforms, and running it all on infrastructure I set up myself.",
    primaryCta: "Start Mining",
    secondaryCta: "Get In Touch",
};

export const contact = {
    heading: "Let's Connect",
    body:
        "I'm always interested in hearing about new opportunities, exciting projects, and meeting fellow developers.",
    emailCta: "Send an email",
    footer: "Built with Next.js · Block textures generated, not borrowed",
    socials: [
        { id: "github", label: "GitHub", href: profile.github, ore: "diamond" },
        { id: "linkedin", label: "LinkedIn", href: profile.linkedin, ore: "lapis" },
        { id: "email", label: "Email", href: `mailto:${profile.email}`, ore: "emerald" },
    ],
};

/**
 * Per-section heading copy. `depth` is the Y readout shown above the title and
 * must decrease monotonically down the page to match the descent.
 *
 * The stratum names here must use the same vocabulary as data/strata.js, since
 * the live DepthMeter is on screen at the same time as these labels. "Surface"
 * was a seventh name that existed nowhere else in the system.
 */
export const sections = {
    education: {
        heading: "Education",
        sub: "Where the fundamentals came from.",
        depth: "Y: 48, Grass",
        ore: "lapis",
    },
    experience: {
        heading: "Experience",
        sub: "Where I've worked, newest first. Every role opens with what it actually did; the resume-level detail is one click away.",
        depth: "Y: 22, Dirt",
        ore: "emerald",
    },
    projects: {
        heading: "Projects",
        sub: "The five I'd want to talk about in an interview. The rest are in the chest below.",
        depth: "Y: -12, Stone",
        ore: "diamond",
    },
    techstack: {
        heading: "Tech Stack",
        sub: "What I reach for day to day.",
        depth: "Y: -34, Deepslate",
        ore: "copper",
    },
    leadership: {
        heading: "Leadership",
        sub: "Teaching, organising and mentoring outside the code.",
        depth: "Y: -52, Deepslate",
        ore: "gold",
    },
    contact: {
        heading: "Let's Connect",
        sub: null,
        depth: "Y: -64, Bedrock",
        ore: "diamond",
    },
};

export default { profile, meta, hero, contact, sections };
