import {
    SiPython, SiCplusplus, SiGo, SiTypescript, SiJavascript, SiGnubash,
    SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiRedux,
    SiFramer, SiThreedotjs, SiGreensock,
    SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiGraphql, SiJsonwebtokens, SiSwagger,
    SiPostgresql, SiMongodb, SiRedis, SiPrisma, SiSupabase,
    SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiTerraform,
    SiNginx, SiCloudflare, SiLinux, SiVercel, SiFirebase,
    SiPytorch, SiTensorflow, SiHuggingface, SiGooglegemini, SiClaude,
    SiLangchain, SiScikitlearn, SiPandas, SiNumpy, SiStreamlit, SiGooglecolab, SiJupyter,
    SiGit, SiGithub, SiGitlab, SiPostman, SiFigma, SiVite, SiWebpack, SiSlack, SiTableau,
} from "react-icons/si";
// No SiPinecone exists in react-icons; a generic database glyph beats
// rendering the literal string "Pc" in the tile.
import { Database } from "lucide-react";

/**
 * Tech stack, reconciled against every resume variant.
 *
 * Icons come from `react-icons/si`, which is tree-shakeable: only the icons
 * imported above land in the bundle. This replaced `tech-stack-icons`, which
 * inlined all 399 of its SVGs into a single ~4 MB chunk and had no icon for
 * FastAPI, Terraform, Nginx, TensorFlow, Jupyter, Pandas, scikit-learn or
 * Tableau. These are monochrome glyphs, so they take the category tint and
 * read as one consistent set rather than a jumble of brand colours.
 *
 * Pinecone is the only technology with no icon in the set; it falls back to a
 * block tile via `short`.
 */

import { text } from "./_normalize";

export const TECH_CATEGORIES = [
    "All",
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "Cloud & DevOps",
    "AI/ML",
    "Tools",
];

/** Category -> ore token, so a technology's colour is derived, never hardcoded. */
export const CATEGORY_ORE = {
    Languages: "diamond",
    Frontend: "redstone",
    Backend: "emerald",
    Databases: "lapis",
    "Cloud & DevOps": "copper",
    "AI/ML": "gold",
    Tools: "iron",
};

const technologiesRaw = [
    // Languages
    { Icon: SiPython, label: "Python", category: "Languages" },
    { Icon: SiCplusplus, label: "C/C++", category: "Languages" },
    { Icon: SiGo, label: "Go", category: "Languages" },
    { Icon: SiTypescript, label: "TypeScript", category: "Languages" },
    { Icon: SiJavascript, label: "JavaScript", category: "Languages" },
    { Icon: SiGnubash, label: "Bash", category: "Languages" },

    // Frontend
    { Icon: SiReact, label: "React.js", category: "Frontend" },
    { Icon: SiNextdotjs, label: "Next.js", category: "Frontend" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", category: "Frontend" },
    { Icon: SiHtml5, label: "HTML5", category: "Frontend" },
    { Icon: SiCss3, label: "CSS3", category: "Frontend" },
    { Icon: SiRedux, label: "Redux", category: "Frontend" },
    { Icon: SiFramer, label: "Framer Motion", category: "Frontend" },
    { Icon: SiThreedotjs, label: "Three.js", category: "Frontend" },
    { Icon: SiGreensock, label: "GSAP", category: "Frontend" },

    // Backend
    { Icon: SiNodedotjs, label: "Node.js", category: "Backend" },
    { Icon: SiExpress, label: "Express.js", category: "Backend" },
    { Icon: SiFastapi, label: "FastAPI", category: "Backend" },
    { Icon: SiFlask, label: "Flask", category: "Backend" },
    { Icon: SiGraphql, label: "GraphQL", category: "Backend" },
    { Icon: SiJsonwebtokens, label: "JWT", category: "Backend" },
    { Icon: SiSwagger, label: "REST APIs", category: "Backend" },

    // Databases
    { Icon: SiPostgresql, label: "PostgreSQL", category: "Databases" },
    { Icon: SiMongodb, label: "MongoDB", category: "Databases" },
    { Icon: SiRedis, label: "Redis", category: "Databases" },
    { Icon: Database, short: "Pc", label: "Pinecone", category: "Databases" },
    { Icon: SiPrisma, label: "Prisma", category: "Databases" },
    { Icon: SiSupabase, label: "Supabase", category: "Databases" },

    // Cloud & DevOps
    { Icon: SiAmazonwebservices, label: "AWS", category: "Cloud & DevOps" },
    { Icon: SiGooglecloud, label: "Google Cloud", category: "Cloud & DevOps" },
    { Icon: SiDocker, label: "Docker", category: "Cloud & DevOps" },
    { Icon: SiKubernetes, label: "Kubernetes", category: "Cloud & DevOps" },
    { Icon: SiTerraform, label: "Terraform", category: "Cloud & DevOps" },
    { Icon: SiNginx, label: "Nginx", category: "Cloud & DevOps" },
    { Icon: SiCloudflare, label: "Cloudflare", category: "Cloud & DevOps" },
    { Icon: SiLinux, label: "Linux", category: "Cloud & DevOps" },
    { Icon: SiVercel, label: "Vercel", category: "Cloud & DevOps" },
    { Icon: SiFirebase, label: "Firebase", category: "Cloud & DevOps" },

    // AI/ML
    { Icon: SiPytorch, label: "PyTorch", category: "AI/ML" },
    { Icon: SiTensorflow, label: "TensorFlow", category: "AI/ML" },
    { Icon: SiHuggingface, label: "Hugging Face", category: "AI/ML" },
    { Icon: SiGooglegemini, label: "Google Gemini", category: "AI/ML" },
    { Icon: SiClaude, label: "Claude", category: "AI/ML" },
    { Icon: SiLangchain, label: "LangChain", category: "AI/ML" },
    { Icon: SiScikitlearn, label: "scikit-learn", category: "AI/ML" },
    { Icon: SiPandas, label: "Pandas", category: "AI/ML" },
    { Icon: SiNumpy, label: "NumPy", category: "AI/ML" },
    { Icon: SiStreamlit, label: "Streamlit", category: "AI/ML" },
    { Icon: SiGooglecolab, label: "Google Colab", category: "AI/ML" },
    { Icon: SiJupyter, label: "Jupyter", category: "AI/ML" },

    // Tools
    { Icon: SiGit, label: "Git", category: "Tools" },
    { Icon: SiGithub, label: "GitHub", category: "Tools" },
    { Icon: SiGitlab, label: "GitLab", category: "Tools" },
    { Icon: SiPostman, label: "Postman", category: "Tools" },
    { Icon: SiFigma, label: "Figma", category: "Tools" },
    { Icon: SiVite, label: "Vite", category: "Tools" },
    { Icon: SiWebpack, label: "Webpack", category: "Tools" },
    { Icon: SiSlack, label: "Slack", category: "Tools" },
    { Icon: SiTableau, label: "Tableau", category: "Tools" },
];

/**
 * The primary stack, chosen from evidence rather than taste.
 *
 * Selection rule: appears in 3 or more of the four current resumes
 * (resume_ai_ds / ai_ml / cloud_platform / swe_backend), OR carries heavy
 * usage weight across the projects and jobs in this repo.
 *
 *   4/4 resumes .. Python, C/C++, Go, FastAPI, PostgreSQL, MongoDB, Redis,
 *                  AWS, Docker, Linux, Git
 *   3/4 resumes .. Next.js, Pinecone
 *   2/4 but heavy in real work .. PyTorch (top-weighted across projects),
 *                  TensorFlow, TypeScript, JavaScript, Node.js
 *   1/4 but a real story .. Google Cloud (the AWS + GCP dual-cloud work
 *                  at Anginat), React.js (the ERP frontend and Minesweeper)
 *
 * Deliberately NOT primary: Kubernetes (2/4 resumes, but you said you don't
 * work with it), Tailwind CSS, Hugging Face, Nginx, Cloudflare, Terraform.
 * All still present in the full stack behind the button.
 */
const technologies = technologiesRaw
    .map((t) => ({
        ...t,
        label: text(t.label),
        category: text(t.category),
        // Without an icon we need a short code to render a block tile;
        // fall back to the first two letters of the label.
        short: text(t.short) ?? (text(t.label) ?? "??").slice(0, 2),
    }))
    .filter((t) => t.label && t.category);

const PRIMARY = new Set([
    // Languages
    "Python", "C/C++", "Go", "TypeScript", "JavaScript",
    // Frontend / product
    "Next.js", "React.js",
    // Backend
    "Node.js", "FastAPI",
    // Data
    "PostgreSQL", "MongoDB", "Redis", "Pinecone",
    // Cloud & infra
    "AWS", "Google Cloud", "Docker", "Linux",
    // AI/ML
    "PyTorch", "TensorFlow",
    // Tooling
    "Git",
]);

export const primaryTechnologies = technologies.filter((t) => PRIMARY.has(t.label));

export default technologies;
