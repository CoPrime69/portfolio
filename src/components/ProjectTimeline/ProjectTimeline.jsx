"use client";

import Link from "next/link";
import React from "react";
import { Github, ExternalLink } from "lucide-react";

const projectData = [
    {
        year: "2025",
        title: "Candidate Evaluation Platform",
        content:
            "Built an AI-powered resume evaluation tool using RAG with Pinecone and Google Gemini API. The platform provides smart candidate ranking, recruiter dashboards, and real-time filtering to make the hiring process faster and more reliable.",
        technologies: ["Next.js", "TypeScript", "Pinecone", "Google Gemini API", "Tailwind CSS", "Vercel"],
        github: "https://github.com/CoPrime69/candidate-application-form",
        demo: null
    },
    {
        year: "2025",
        title: "Minesweeper Platform",
        content:
            "Developed a full-stack Minesweeper game with login authentication, real-time leaderboards, and an admin dashboard. The project focused on creating a smooth gaming experience with secure APIs and responsive UI.",
        technologies: ["React.js", "Express.js", "MongoDB", "JWT", "Render", "Vercel"],
        github: null,
        demo: "https://minesweeper-tawny-rho.vercel.app/"
    },
    {
        year: "2024",
        title: "Social Network Manager",
        content:
            "Created a social network analysis tool in C++ that can detect influencers and identify user communities efficiently. Used parallel computing and graph algorithms to make the tool fast and scalable.",
        technologies: ["C++", "Pragma Parallel Computing", "Graph Algorithms"],
        github: "https://github.com/CoPrime69/DSA_ProjectCM_42_54_55_56",
        demo: null
    },
    {
        year: "Current",
        title: "Portfolio Website",
        content:
            "Designed and developed this personal portfolio site to showcase my projects, experience, and skills. Features smooth animations, responsive design, and a clean modern interface.",
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
        isCurrentProject: true,
        github: "https://github.com/CoPrime69",
        demo: "/"
    }
];

const ProjectTimeline = () => {
    const allProjects = projectData;

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-[200px] py-8 sm:py-12 md:py-16 pointer-events-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-white px-4">
                My Projects Journey
            </h2>

            <div className="relative">
                {/* Timeline line desktop */}
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#00f5ff] via-[#a855f7] to-[#00ff88]" />
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-[#00f5ff] via-[#e91e63] to-[#00ff88] blur-sm opacity-60" />

                {/* Timeline line mobile */}
                <div className="sm:hidden absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-[#00f5ff] via-[#a855f7] to-[#00ff88]" />

                {/* Project cards */}
                <div className="space-y-8 sm:space-y-12">
                    {allProjects.map((project, index) => (
                        <div key={`project-${index}`} className="relative">
                            {/* Timeline dot */}
                            <div className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div
                                    className={`w-4 h-4 ${project.isCurrentProject
                                        ? "bg-gradient-to-r from-[#00ff88] to-[#00f5ff]"
                                        : "bg-gradient-to-r from-[#a855f7] to-[#e91e63]"
                                        } rounded-full border-2 border-gray-900 shadow-xl relative`}
                                >
                                    <div
                                        className={`w-full h-full ${project.isCurrentProject
                                            ? "bg-gradient-to-r from-[#00ff88] to-[#00f5ff]"
                                            : "bg-gradient-to-r from-[#a855f7] to-[#e91e63]"
                                            } rounded-full blur-sm opacity-70 animate-pulse`}
                                    />
                                    {project.isCurrentProject && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00f5ff] rounded-full blur-lg opacity-40 animate-ping" />
                                    )}
                                </div>
                            </div>

                            {/* Desktop alternating layout */}
                            <div className="hidden sm:grid sm:grid-cols-2 gap-0">
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="flex w-full justify-end pr-2 sm:pr-5">
                                            <ProjectCard project={project} />
                                        </div>
                                        <div className="w-full" />
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full" />
                                        <div className="flex w-full justify-start pl-2 sm:pl-5">
                                            <ProjectCard project={project} />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile layout */}
                            <div className="sm:hidden pl-12">
                                <ProjectCard project={project} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project }) => (
    <div
        className={`w-full sm:max-w-[300px] md:max-w-[450px] cursor-target ${project.isCurrentProject
            ? "bg-[#00ff88]/10 border-[#00ff88]/30"
            : "bg-gray-900/80 border-gray-700"
            } backdrop-blur-sm border p-4 sm:p-5 md:p-6 rounded-xl shadow-xl hover:border-[#00f5ff] hover:bg-gray-800/90 transition-all transform scale-97 hover:scale-100`}
    >
        {/* Title + links in top row */}
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-white">
                {project.title}
            </h3>

            <div className="flex gap-2">
                {project.github && (
                    <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md hover:bg-gray-800/60 text-gray-300 hover:text-[#00f5ff] transition"
                    >
                        <Github size={16} />
                    </Link>
                )}
                {project.demo && (
                    <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md hover:bg-gray-800/60 text-gray-300 hover:text-[#00ff88] transition"
                    >
                        <ExternalLink size={16} />
                    </Link>
                )}
            </div>
        </div>

        <div className="text-xs text-[#00f5ff] mb-2 font-medium">{project.year}</div>

        <p className="text-sm md:text-base text-gray-300 mb-4">{project.content}</p>

        {project.technologies && (
            <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                    <span
                        key={techIndex}
                        className={`${project.isCurrentProject
                            ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30"
                            : "bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]/30"
                            } text-xs px-2 py-1 rounded-md border`}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        )}

        {project.isCurrentProject && (
            <div className="text-[#00ff88] text-sm font-medium mt-3">
                ✨ You're viewing this project right now!
            </div>
        )}
    </div>
);

export default ProjectTimeline;
