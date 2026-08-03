import portfolioImage from "../images/additionalProjects/portfolio.jpg";
import socialNetworkManagerGraph from "../images/additionalProjects/social_network_graph.png";
import minesweeperImage from "../images/additionalProjects/minesweeper.jpg";
import betterImage from "../images/additionalProjects/better.jpg";
import candidateImage from "../images/additionalProjects/candidate.jpg";
import publicSentimentImage from "../images/additionalProjects/PublicSentimentAnalysis.jpg";
import leafImage from "../images/additionalProjects/leafanalysis.jpeg";
import { text, url, list, metrics, image } from "./_normalize";

/**
 * Every project, one list.
 *
 * `featured: true` surfaces the project as a glowing ore vein embedded in the
 * stone stratum; everything else lives in the chest ("View More") modal.
 * `ore` picks the vein colour and must match an --ore-* token in globals.css.
 *
 * Copy is two-layer, same contract as experience.js: `hook` is the
 * plain-English opener, `bullets` carry the resume-accurate detail.
 *
 * `image: null` is handled by the UI - it falls back to a generated ore-block
 * tile rather than a broken <img>.
 */

const projects = [
    /* ---------------------------------------------------------------- featured */
    {
        id: "polystore",
        title: "PolyStore Customer 360 Analytics Engine",
        year: "2026",
        period: "Dec 2025 - Mar 2026",
        featured: true,
        ore: "diamond",
        category: "Cloud & Infrastructure",
        hook: "A single query engine that joins across seven different AWS storage systems, so a customer's whole history reads as one record instead of seven.",
        bullets: [
            "Orchestrated a polyglot data platform integrating 7+ AWS systems across 4+ storage models behind a unified Go-based query engine for cross-store joins.",
            "Implemented a real-time ingestion pipeline (Kinesis → EKS → storage) with Redis caching and 2-level failover for improved scalability and reliability.",
        ],
        metrics: [
            { value: "7+", label: "AWS systems" },
            { value: "4+", label: "storage models" },
            { value: "2-level", label: "failover" },
        ],
        technologies: ["Go", "Next.js", "AWS", "EKS", "Kinesis", "Redis"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "spark",
        title: "SPARK - Self-Hosted Cloud",
        year: "2026",
        period: "Feb 2026 - Apr 2026",
        featured: true,
        ore: "copper",
        category: "Cloud & Infrastructure",
        hook: "Turned spare hardware into a private cloud - file storage, media streaming and automated backups, reachable from anywhere without opening a single port.",
        bullets: [
            "Built a self-hosted cloud alternative enabling file storage, media streaming and automated backups on repurposed hardware through 5+ Dockerized services managed within a unified platform.",
            "Implemented a 4-tier service architecture combining Cloudflare Tunnel, Nginx reverse proxy and LVM+Btrfs-backed storage, simplifying remote access while maintaining workload separation and data persistence.",
        ],
        metrics: [
            { value: "5+", label: "Dockerized services" },
            { value: "4-tier", label: "architecture" },
        ],
        technologies: ["Linux", "Docker", "Nginx", "Cloudflare", "LVM", "Btrfs"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "fastvit",
        title: "FastViT Upgrade",
        year: "2026",
        period: "Feb 2026 - Apr 2026",
        featured: true,
        ore: "emerald",
        category: "AI/ML & Research",
        hook: "Made a vision model more accurate and half the size at once - by having a much larger model teach it, then cutting away the layers it no longer needed.",
        bullets: [
            "Augmented FastViT-T8 with CLIP-based knowledge distillation, boosting CIFAR-10 test accuracy from 83.50% to 85.03% without increasing model size, FLOPs or inference latency.",
            "Introduced hierarchical attention, removed a downsampling stage and reduced channel widths, achieving 85.30% accuracy with 52% fewer parameters (3.27M → 1.56M) and 2× faster convergence.",
        ],
        metrics: [
            { value: "85.30%", label: "accuracy" },
            { value: "-52%", label: "parameters" },
            { value: "2×", label: "faster convergence" },
        ],
        technologies: ["PyTorch", "CLIP", "Computer Vision", "Knowledge Distillation"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "federated-learning",
        title: "Federated Learning for Multi-Label Classification",
        year: "2026",
        period: "Mar 2026 - Apr 2026",
        featured: true,
        ore: "lapis",
        category: "AI/ML & Research",
        hook: "Trained one shared model across many clients that never pool their data - and measured exactly how much accuracy you lose when their data doesn't look alike.",
        bullets: [
            "Implemented a FedAvg-based federated learning framework on the EURLEX dataset (15K+ samples, 3.9K+ labels), comparing centralized, IID and Non-IID training using Precision@k and nDCG metrics.",
            "Evaluated convergence across 5-20 clients and varying local epochs, achieving 0.2266 P@1 under IID settings while quantifying performance degradation caused by label-skewed Non-IID partitions.",
        ],
        metrics: [
            { value: "15K+", label: "samples" },
            { value: "3.9K+", label: "labels" },
            { value: "5-20", label: "clients" },
            { value: "0.2266", label: "P@1 (IID)" },
        ],
        technologies: ["FedAvg", "Distributed Learning", "PyTorch", "nDCG"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "candidate-eval",
        title: "Candidate Evaluation Platform",
        year: "2025",
        period: "Feb 2025 - Apr 2025",
        featured: true,
        ore: "lapis",
        category: "Full-Stack Products",
        hook: "Reads a stack of resumes the way a recruiter would - by meaning rather than keywords - and ranks them against the role.",
        bullets: [
            "Built a RAG-based resume evaluation system using Pinecone vector search and the Google Gemini API, achieving 65% accuracy across candidate profiles.",
            "Integrated role-based access controls and real-time recruiter dashboards with advanced filtering, reducing evaluation time by 30%.",
        ],
        metrics: [
            { value: "65%", label: "accuracy" },
            { value: "-30%", label: "evaluation time" },
        ],
        technologies: [
            "Next.js", "TypeScript", "Pinecone", "Google Gemini API",
            "RAG", "Vector Embeddings", "Semantic Search",
        ],
        image: candidateImage,
        github: "https://github.com/CoPrime69/candidate-application-form",
        demo: null,
    },

    /* -------------------------------------------------------------- the chest */
    {
        id: "hybrid-autoscaling",
        title: "Hybrid Auto-Scaling from Local VM to GCP",
        year: "2026",
        period: "Mar 2026 - Apr 2026",
        featured: false,
        ore: "gold",
        category: "Cloud & Infrastructure",
        hook: "Watches a machine under load and, when it starts struggling, spins up cloud capacity on its own - then tears it back down once the pressure passes.",
        bullets: [
            "Developed a hybrid cloud bursting solution that monitored a local 2-vCPU VirtualBox VM and automatically provisioned GCP infrastructure via Terraform when CPU utilization exceeded 75%.",
            "Operationalized end-to-end deployment using Infrastructure-as-Code, startup scripts and telemetry-driven scaling policies, achieving cloud resource provisioning within 60-90 seconds and automated deprovisioning below 30% CPU usage.",
        ],
        metrics: [
            { value: "75%", label: "scale-up trigger" },
            { value: "60-90s", label: "provisioning" },
        ],
        technologies: ["Python", "Terraform", "GCP", "VirtualBox", "IaC"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "bias-aware-age",
        title: "Bias-Aware Age Classification",
        year: "2025",
        period: "2025",
        featured: false,
        ore: "emerald",
        category: "AI/ML & Research",
        hook: "Classified age from faces while actively correcting for the demographic bias the training data carried, and placed 14th out of 214.",
        bullets: [
            "Applied CLIP-based transfer learning with a teacher-student distillation setup for age-group classification, reaching 82% test accuracy.",
            "Ranked 14 out of 214 students on the held-out evaluation.",
        ],
        metrics: [
            { value: "82%", label: "test accuracy" },
            { value: "14/214", label: "cohort rank" },
        ],
        technologies: ["PyTorch", "CLIP", "Transfer Learning", "Knowledge Distillation"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "chess-ai",
        title: "Mini 4x8 Chess AI",
        year: "2025",
        period: "2025",
        featured: false,
        ore: "diamond",
        category: "AI/ML & Research",
        hook: "An adversarial-search engine for a compressed 4x8 chess variant that finished 7th of 198 in a round-robin tournament against the whole cohort.",
        bullets: [
            "Built a game-playing agent using adversarial search with alpha-beta pruning and a hand-tuned evaluation function.",
            "Ranked 7 out of 198 students in a round-robin tournament.",
        ],
        metrics: [{ value: "7/198", label: "cohort rank" }],
        technologies: ["Python", "Adversarial Search", "Alpha-Beta Pruning", "Game AI"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "ppo-from-scratch",
        title: "PPO From Scratch",
        year: "2025",
        period: "2025",
        featured: false,
        ore: "redstone",
        category: "AI/ML & Research",
        hook: "Implemented Proximal Policy Optimization end to end, with no RL library, to see exactly what the clipping objective buys you.",
        bullets: [
            "Implemented an actor-critic PPO agent from scratch, including custom rollout collection and generalized advantage estimation.",
            "Compared clipped against unclipped objectives to quantify the stability the clipping term contributes.",
        ],
        metrics: [],
        technologies: ["Python", "PyTorch", "Reinforcement Learning", "Actor-Critic"],
        image: null,
        github: null,
        demo: null,
    },
    {
        id: "public-sentiment",
        title: "Public Sentiment Analysis Platform",
        year: "2024",
        period: "2 months",
        featured: false,
        ore: "lapis",
        category: "AI/ML & Research",
        hook: "Tracks how public opinion on a government policy shifts over time by reading what people actually post about it.",
        bullets: [
            "Built a web application analyzing public opinion on governance policies using Twitter data and machine learning.",
            "Features real-time sentiment analysis, interactive dashboards, policy management and temporal analysis with word clouds.",
        ],
        metrics: [],
        technologies: [
            "Next.js", "TypeScript", "MongoDB", "Prisma",
            "Hugging Face Transformers", "Twitter API", "NextAuth.js",
        ],
        image: publicSentimentImage,
        github: "https://github.com/CoPrime69/Public-Sentiment-Analysis",
        demo: null,
    },
    {
        id: "minesweeper",
        title: "Minesweeper Platform",
        year: "2025",
        period: "Feb 2025 - Mar 2025",
        featured: false,
        ore: "redstone",
        category: "Full-Stack Products",
        hook: "A full multiplayer-ranked take on Minesweeper - accounts, live leaderboards and an admin dashboard behind it.",
        bullets: [
            "Created a full-stack Minesweeper platform with secure JWT authentication, supporting 150+ active users and real-time leaderboard updates.",
            "Built RESTful APIs with Express.js and MongoDB; developed an automated analytics dashboard with Recharts, reducing admin workload by 35%.",
        ],
        metrics: [
            { value: "150+", label: "active users" },
            { value: "-35%", label: "admin workload" },
        ],
        technologies: ["React.js", "Express.js", "MongoDB", "JWT", "Recharts", "Render", "Vercel"],
        image: minesweeperImage,
        github: "https://github.com/CoPrime69/Minesweeper",
        demo: "https://minesweeper-tawny-rho.vercel.app/",
    },
    {
        id: "leaf-classification",
        title: "Leaf Classification ML Project",
        year: "2024",
        period: "2 months",
        featured: false,
        ore: "emerald",
        category: "AI/ML & Research",
        hook: "Identifies which of 99 plant species a leaf came from, at 98.99% accuracy, from its shape and texture alone.",
        bullets: [
            "Plant species identification using machine learning on leaf characteristics, achieving 98.99% accuracy with SVM and ANN models across 99 species.",
            "Includes a complete ML pipeline, model comparison and a showcase site with interactive results.",
        ],
        metrics: [
            { value: "98.99%", label: "accuracy" },
            { value: "99", label: "species" },
        ],
        technologies: ["Python", "scikit-learn", "SVM", "Random Forest", "Neural Networks", "PCA", "LDA"],
        image: leafImage,
        github: "https://github.com/Nayan-Kute21/PRML_project.git",
        demo: null,
    },
    {
        id: "social-network",
        title: "Social Network Manager",
        year: "2024",
        period: "3 months",
        featured: false,
        ore: "copper",
        category: "Full-Stack Products",
        hook: "Finds the most influential people in a social graph and the clusters they sit inside, fast enough to run on large networks.",
        bullets: [
            "Developed a C++ application for social network analysis using graph algorithms.",
            "Features influencer identification, community detection and connection recommendations with an adjacency-matrix implementation and CSV data processing.",
            "Used parallel computing to keep the analysis scalable on larger graphs.",
        ],
        metrics: [],
        technologies: ["C++", "Graph Algorithms", "Parallel Computing", "Community Detection"],
        image: socialNetworkManagerGraph,
        github: "https://github.com/CoPrime69/DSA_ProjectCM_42_54_55_56",
        demo: null,
    },
    {
        id: "better-clone",
        title: "Better Mortgage Calculator",
        year: "2024",
        period: "1 month",
        featured: false,
        ore: "gold",
        category: "Full-Stack Products",
        hook: "A faithful rebuild of Better.com's mortgage calculator, down to the payment-breakdown interactions.",
        bullets: [
            "Replicated Better.com's core mortgage calculation functionality with interactive payment breakdowns, property cost analysis and responsive design.",
            "Features monthly payment calculations and comprehensive cost visualization.",
        ],
        metrics: [],
        technologies: ["Next.js", "TypeScript", "Financial Calculations", "Interactive Charts"],
        image: betterImage,
        github: "https://github.com/CoPrime69/better-clone",
        demo: "https://better-clone-iota.vercel.app",
    },
    {
        id: "portfolio",
        title: "This Portfolio",
        year: "2025",
        period: "Ongoing",
        featured: false,
        ore: "diamond",
        category: "Full-Stack Products",
        hook: "The site you're reading - a Minecraft world you descend through, from night sky down to bedrock.",
        bullets: [
            "Designed and built a personal portfolio with a scroll-driven strata descent, an interactive 3D Minecraft avatar and an original block-texture design system.",
            "All block art is generated from CSS and hand-authored SVG rather than shipped image assets.",
        ],
        metrics: [],
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "skinview3d", "GSAP"],
        image: portfolioImage,
        github: "https://github.com/CoPrime69/portfolio",
        demo: "https://www.coprime69.me",
    },
];

/**
 * Normalised at the boundary so components never see a placeholder.
 * A project with `github: "enable"` simply renders no GitHub button.
 */
const normalize = (p) => ({
    ...p,
    id: text(p.id),
    title: text(p.title),
    period: text(p.period),
    category: text(p.category),
    hook: text(p.hook),
    bullets: list(p.bullets),
    metrics: metrics(p.metrics),
    technologies: list(p.technologies),
    image: image(p.image),
    github: url(p.github),
    demo: url(p.demo),
    ore: text(p.ore) ?? "diamond",
});

// A project needs at least an id and a title to be renderable at all.
const normalized = projects.map(normalize).filter((p) => p.id && p.title);

export const featuredProjects = normalized.filter((p) => p.featured);
export const chestProjects = normalized.filter((p) => !p.featured);

export default normalized;
