/**
 * Source of truth for work experience.
 *
 * Copy is two-layer by design:
 *   `hook`     - one plain-English sentence a non-specialist can parse.
 *   `bullets`  - the resume-accurate detail, revealed on expand.
 *   `metrics`  - the numbers worth surfacing as chips without expanding.
 *
 * Anginat merges both prior sources: the .tex bullets (institutes, users, API
 * gain) plus the TTS / voice-cloning and dashboard detail that only ever
 * existed on the site. The IIT Jodhpur role likewise exists only on the site.
 */

import { text, url, list, metrics } from "./_normalize";

const experience = [
    {
        id: "sgrg",
        title: "AI/ML Intern",
        company: "SGRG Groups",
        period: "Jul 2026 - Present",
        start: "2026-07",
        current: true,
        location: "Remote",
        ore: "emerald",
        hook: "Building the ML backbone of a wellbeing product - fusing seven noisy signal sources into scores that stay meaningful even when half the data is missing.",
        bullets: [
            "Architected a stateless aggregation layer normalizing 7 heterogeneous signal sources into 8 composite wellbeing indices via weighted fusion that renormalizes over available inputs, so missing data degrades gracefully.",
            "Engineered a provider-abstracted serving layer exposing 4 machine learning models behind versioned interfaces, with semantic caching that short-circuits repeat inference at sub-16ms p95 on CPU.",
        ],
        metrics: [
            { value: "7", label: "signal sources" },
            { value: "8", label: "wellbeing indices" },
            { value: "4", label: "models served" },
            { value: "<16ms", label: "p95 on CPU" },
        ],
        technologies: ["Python", "FastAPI", "Machine Learning", "Semantic Caching", "Model Serving"],
        link: null,
    },
    {
        id: "tech-mahindra",
        title: "Technical Intern",
        company: "Tech Mahindra",
        period: "May 2026 - Jul 2026",
        start: "2026-05",
        current: false,
        location: "Pune, India",
        ore: "diamond",
        hook: "Fine-tuned a 7B model to assign medical billing codes on its own, then built the harness that proved it against 15 alternatives - all running on-premise for patient privacy.",
        bullets: [
            "Built an automated LLM-as-judge evaluation pipeline benchmarking 15 open-weight LLMs (465 inference calls) on Healthcare Guidelines & Protocol Compliance, using a 4-bit quantized biomedical judge model for consistent, reproducible scoring.",
            "Fine-tuned Qwen2.5-7B via QLoRA (4-bit NF4) as a domain-specific LLM for automated ICD-10-CM clinical coding, achieving 0.610 exact-match F1 and 0.885 hierarchical F1 on an 850-row held-out set for a HIPAA-compliant, locally-deployable pipeline.",
        ],
        metrics: [
            { value: "15", label: "LLMs benchmarked" },
            { value: "465", label: "inference calls" },
            { value: "0.610", label: "exact-match F1" },
            { value: "0.885", label: "hierarchical F1" },
        ],
        technologies: ["PyTorch", "QLoRA", "Qwen2.5-7B", "Transformers", "LLM-as-Judge", "Quantization"],
        link: null,
    },
    {
        id: "anginat",
        title: "Full Stack Developer Intern",
        company: "Anginat",
        period: "Mar 2025 - Jul 2025",
        start: "2025-03",
        current: false,
        location: "Remote",
        ore: "copper",
        hook: "Shipped an ERP that runs three institutes and launched a voice-AI platform across two clouds - then made its APIs 40% faster by moving the database underneath it.",
        bullets: [
            "Developed an ERP system for 3+ educational institutes, automating workflows serving 1000+ students and faculty using React.js and REST APIs.",
            "Launched Anginat.com, a voice service platform with a Next.js dual-backend on AWS & Google Cloud; migrated Supabase to MongoDB and improved API response times by 40%.",
            "Integrated advanced AI features including text-to-speech and voice cloning capabilities.",
            "Built a student learning dashboard with a React.js frontend for a seamless end-user experience.",
        ],
        metrics: [
            { value: "1000+", label: "students & faculty" },
            { value: "3+", label: "institutes" },
            { value: "40%", label: "faster APIs" },
            { value: "2", label: "clouds" },
        ],
        technologies: [
            "Next.js", "React.js", "Node.js", "Python", "MongoDB",
            "Supabase", "AWS", "Google Cloud", "Express.js",
        ],
        link: "https://anginat.com",
    },
    {
        id: "iitj-backend",
        title: "Backend Developer",
        company: "IIT Jodhpur",
        period: "Aug 2024 - Dec 2024",
        start: "2024-08",
        current: false,
        location: "Jodhpur, India",
        ore: "lapis",
        hook: "Built a face-recognition attendance system accurate enough to replace the register, and fast enough to run the roll call in real time.",
        bullets: [
            "Created and launched a facial recognition attendance system using Ionic and Node.js, integrating Hugging Face APIs for AI-driven recognition, enabling multiple organizations to implement the solution with 99% accuracy.",
            "Optimized backend performance, reducing real-time processing latency by 30% and ensuring seamless integration with cloud databases for efficient operation.",
        ],
        metrics: [
            { value: "99%", label: "accuracy" },
            { value: "-30%", label: "latency" },
        ],
        technologies: ["Ionic", "Node.js", "Hugging Face", "Cloud Databases"],
        link: null,
    },
];

/** Normalised at the boundary; see data/_normalize.js. */
const normalized = experience
    .map((e) => ({
        ...e,
        id: text(e.id),
        title: text(e.title),
        company: text(e.company),
        period: text(e.period),
        location: text(e.location),
        hook: text(e.hook),
        bullets: list(e.bullets),
        metrics: metrics(e.metrics),
        technologies: list(e.technologies),
        link: url(e.link),
        ore: text(e.ore) ?? "diamond",
    }))
    .filter((e) => e.id && e.title && e.company);

export default normalized;
