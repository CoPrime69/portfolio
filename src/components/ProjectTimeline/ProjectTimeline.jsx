"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import ProjectsModal from "./ProjectsModal";
import mainProjectData from "./mainProjects"


const ProjectTimeline = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle ESC key press
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isModalOpen]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
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
                        {mainProjectData.map((project, index) => (
                            <div key={`project-${index}`} className="relative">
                                {/* Timeline dot - Desktop */}
                                <div className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-4 h-4 bg-gradient-to-r from-[#a855f7] to-[#e91e63] rounded-full border-2 border-gray-900 shadow-xl relative">
                                        <div className="w-full h-full bg-gradient-to-r from-[#a855f7] to-[#e91e63] rounded-full blur-sm opacity-70 animate-pulse" />
                                    </div>
                                </div>

                                {/* Timeline dot - Mobile */}
                                <div className="sm:hidden absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-3 h-3 bg-gradient-to-r from-[#a855f7] to-[#e91e63] rounded-full border-2 border-gray-900 shadow-lg relative">
                                        <div className="w-full h-full bg-gradient-to-r from-[#a855f7] to-[#e91e63] rounded-full blur-sm opacity-70 animate-pulse" />
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

                {/* View More Projects Button */}
                <div className="flex justify-center mt-12 sm:mt-16">
                    <button
                        onClick={handleOpenModal}
                        className="hover:cursor-pointer group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#a855f7] to-[#00f5ff] rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:from-[#00f5ff] hover:to-[#00ff88] cursor-target touch-manipulation text-sm sm:text-base"
                    >
                        <span className="relative z-10">View More Projects</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#00f5ff] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ProjectsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

const ProjectCard = ({ project }) => (
    <div className="w-full sm:max-w-[300px] md:max-w-[450px] cursor-target bg-gray-900/80 border-gray-700 backdrop-blur-sm border p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl shadow-xl hover:border-[#00f5ff] hover:bg-gray-800/90 transition-all transform scale-97 hover:scale-100 active:scale-95 touch-manipulation">
        {/* Title + links in top row */}
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white pr-2">
                {project.title}
            </h3>

            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                {project.github && (
                    <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-1 rounded-md hover:bg-gray-800/60 text-gray-300 hover:text-[#00f5ff] transition cursor-target touch-manipulation"
                        aria-label="View GitHub repository"
                    >
                        <Github size={14} className="sm:w-4 sm:h-4" />
                    </Link>
                )}
                {project.demo && (
                    <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-1 rounded-md hover:bg-gray-800/60 text-gray-300 hover:text-[#00ff88] transition cursor-target touch-manipulation"
                        aria-label="View live demo"
                    >
                        <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                    </Link>
                )}
            </div>
        </div>

        <div className="text-xs text-[#00f5ff] mb-2 font-medium">{project.year}</div>

        <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">{project.content}</p>

        {project.technologies && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.map((tech, techIndex) => (
                    <span
                        key={techIndex}
                        className="bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]/30 text-xs px-2 py-1 rounded-md border"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        )}
    </div>
);

export default ProjectTimeline;