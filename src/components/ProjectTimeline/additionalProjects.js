import portfolioImage from "../../images/additionalProjects/portfolio.jpg"
import socialNetworkManagerGraph from "../../images/additionalProjects/social_network_graph.png"
import minesweeperImagre from "../../images/additionalProjects/minesweeper.jpg"
import betterImage from "../../images/additionalProjects/better.jpg"
import candidateImage from "../../images/additionalProjects/candidate.jpg"
import PublicSentimentImage from "../../images/additionalProjects/PublicSentimentAnalysis.jpg"
import LeafImage from "../../images/additionalProjects/leafanalysis.jpeg"
const additionalProjects = [
    {
        title: "Public Sentiment Analysis Platform",
        description: "Built a comprehensive web application to analyze public opinion on governance policies using Twitter data and machine learning. Features real-time sentiment analysis, interactive dashboards, policy management, and temporal analysis with word clouds.",
        image: PublicSentimentImage,
        technologies: ["Next.js", "TypeScript", "MongoDB", "Prisma", "Hugging Face Transformers", "Twitter API", "NextAuth.js"],
        github: "https://github.com/CoPrime69/Public-Sentiment-Analysis",
        // demo: "https://public-sentiment-analysis.vercel.app/",
        // stats: { stars: 25, forks: 8, watchers: 12 },
        category: "work",
        status: "completed",
        lastUpdated: "2024-08-15",
        duration: "2 months",
        featured: true
    },
    {
        title: "Candidate Evaluation Platform",
        description: "Developed an AI-powered resume evaluation tool using RAG architecture with Pinecone vector database and Google Gemini API. Features smart candidate ranking, semantic job matching, resume parsing, and recruiter dashboards for streamlined hiring.",
        image: candidateImage,
        technologies: ["Next.js", "TypeScript", "Pinecone", "Google Gemini API", "RAG Architecture", "Vector Embeddings", "Semantic Search"],
        github: "https://github.com/CoPrime69/candidate-application-form",
        demo: null,
        // stats: { stars: 18, forks: 5, watchers: 9 },
        category: "work",
        status: "completed",
        lastUpdated: "2024-07-15",
        duration: "2 months",
        featured: true
    },
    {
        title: "Minesweeper Platform",
        description: "Created a full-stack Minesweeper game with user authentication, real-time leaderboards, and comprehensive admin dashboard. Features three difficulty levels, personal statistics tracking, and responsive design for all devices.",
        image: minesweeperImagre,
        technologies: ["React", "TypeScript", "Express", "MongoDB", "JWT Authentication"],
        github: "https://github.com/CoPrime69/Minesweeper",
        demo: "https://minesweeper-tawny-rho.vercel.app/",
        // stats: { stars: 12, forks: 4, watchers: 6 },
        category: "personal",
        status: "completed",
        lastUpdated: "2024-06-20",
        duration: "1.5 months",
        featured: true
    },
    {
        title: "Leaf Classification ML Project",
        description: "Comprehensive plant species identification project using machine learning on leaf characteristics. Achieved 98.99% accuracy with SVM and ANN models across 99 species. Includes complete ML pipeline, model comparison, team collaboration, and professional showcase website with interactive results.",
        image: LeafImage,
        technologies: ["Python", "scikit-learn", "SVM", "Random Forest", "Neural Networks", "PCA", "LDA"],
        github: "https://github.com/Nayan-Kute21/PRML_project.git",
        demo: null,
        // stats: { stars: 22, forks: 7, watchers: 10 },
        category: "academic",
        status: "completed",
        lastUpdated: "2024-05-30",
        duration: "2 months",
        featured: false
    },
    {
        title: "Social Network Manager",
        description: "Developed a C++ application for social network analysis using graph algorithms. Features influencer identification, community detection, and connection recommendations with adjacency matrix implementation and CSV data processing.",
        image: socialNetworkManagerGraph,
        technologies: ["C++", "Graph Algorithms", "Adjacency Matrix", "Community Detection"],
        github: "https://github.com/CoPrime69/DSA_ProjectCM_42_54_55_56",
        demo: null,
        // stats: { stars: 15, forks: 5, watchers: 8 },
        category: "experiment",
        status: "completed",
        lastUpdated: "2024-05-10",
        duration: "3 months",
        featured: false
    },
    {
        title: "Better Mortgage Calculator",
        description: "Replicated Better.com's core mortgage calculation functionality with interactive payment breakdowns, property cost analysis, and responsive design. Features monthly payment calculations and comprehensive cost visualization.",
        image: betterImage,
        technologies: ["Next.js", "TypeScript", "Financial Calculations", "Interactive Charts"],
        github: "https://github.com/CoPrime69/better-clone",
        demo: "https://better-clone-iota.vercel.app",
        // stats: { stars: 8, forks: 3, watchers: 4 },
        category: "personal",
        status: "completed",
        lastUpdated: "2024-04-20",
        duration: "1 month",
        featured: false
    },
    {
        title: "Portfolio website",
        description: "Designed and developed this personal portfolio site to showcase my projects, experience, and skills. Features smooth animations, responsive design, and a clean modern interface.",
        image: portfolioImage,
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
        github: "https://github.com/CoPrime69/portfolio",
        demo: "https://www.coprime69.me",
        category: "personal"
    }
];

export default additionalProjects;