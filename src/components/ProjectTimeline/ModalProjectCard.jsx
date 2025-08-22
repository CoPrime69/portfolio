"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import {
    Github,
    ExternalLink,
    Code,
    Calendar,
    Clock,
    Heart,
    ChevronDown,
    ChevronUp,
    Award,
    TrendingUp,
    Globe,
    Users,
    Zap,
    MoreHorizontal
} from "lucide-react";

const projectCategories = {
    'personal': { color: '#a855f7', icon: Heart },
    'work': { color: '#3b82f6', icon: Users },
    'opensource': { color: '#10b981', icon: Globe },
    'experiment': { color: '#f59e0b', icon: Zap },
    'featured': { color: '#ef4444', icon: Award }
};

const ModalProjectCard = ({ project }) => {
    // Provide default values for missing properties
    const projectData = {
        title: "Sample Project",
        description: "Project description",
        technologies: [],
        github: null,
        demo: null,
        image: null,
        category: "personal",
        status: "completed",
        lastUpdated: new Date().toISOString().split('T')[0],
        duration: null,
        featured: false,
        ...project
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showAllTechs, setShowAllTechs] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
    const cardRef = useRef(null);
    const descriptionRef = useRef(null);

    const maxVisibleTechs = typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3;

    // Check if description needs "Read More" button
    useEffect(() => {
        if (descriptionRef.current) {
            const element = descriptionRef.current;
            const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
            const maxHeight = lineHeight * 3; // 3 lines
            setShouldShowReadMore(element.scrollHeight > maxHeight);
        }
    }, [projectData.description]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            'completed': '#10b981',
            'in-progress': '#f59e0b',
            'planning': '#6b7280',
            'maintenance': '#3b82f6'
        };
        return colors[status] || '#6b7280';
    };

    const categoryInfo = projectCategories[projectData.category] || projectCategories.personal;
    const CategoryIcon = categoryInfo.icon;

    return (
        <div
            ref={cardRef}
            className={`
                relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out group
                bg-gradient-to-br from-gray-800/40 via-gray-800/60 to-gray-900/80 
                border-gray-700/50 hover:border-gray-600/50 hover:shadow-xl hover:shadow-blue-500/10
                backdrop-blur-sm transform
                ${isHovered ? 'scale-[1.02] -translate-y-1' : 'scale-100 translate-y-0'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="article"
            aria-label={`Project: ${projectData.title}`}
            tabIndex={0}
        >
            {/* Featured Badge */}
            {projectData.featured && (
                <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Award size={10} />
                    FEATURED
                </div>
            )}

            {/* Project Image/Visual */}
            <div className="relative h-36 sm:h-48 overflow-hidden">
                {/* Background Gradient */}
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        background: `linear-gradient(135deg, ${categoryInfo.color}20, #00f5ff20, #a855f720)`
                    }}
                />

                {projectData.image ? (
                    <div className="relative w-full h-full">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-700/50 flex items-center justify-center">
                                <Code className="text-gray-500 text-4xl" />
                            </div>
                        )}
                        <Image
                            src={projectData.image}
                            alt={`Screenshot of ${projectData.title}`}
                            fill   // makes it stretch to parent container
                            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                            onLoadingComplete={() => setImageLoaded(true)}
                            priority={projectData.featured} // optionally load featured projects faster
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full relative">
                        <div className="text-6xl sm:text-8xl text-gray-400/30 transform group-hover:scale-110 transition-transform duration-500">
                            <CategoryIcon />
                        </div>
                    </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                    {projectData.github && (
                        <Link
                            href={projectData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-black/70 backdrop-blur-md rounded-xl hover:bg-black/90 text-white hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
                            aria-label={`View ${projectData.title} on GitHub`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={16} />
                        </Link>
                    )}
                    {projectData.demo && (
                        <a
                            href={projectData.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-black/70 backdrop-blur-md rounded-xl hover:bg-black/90 text-white hover:text-blue-400 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
                            aria-label={`View ${projectData.title} live demo`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={16} />
                        </a>

                    )}
                    <button
                        className={`p-2.5 backdrop-blur-md rounded-xl transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 hover:cursor-pointer ${isFavorited
                            ? 'bg-red-500/80 text-white hover:bg-red-600/90'
                            : 'bg-black/70 text-white hover:bg-black/90 hover:text-red-400'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFavorited(!isFavorited);
                        }}
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-3 left-3">
                    <div
                        className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-medium border border-white/10"
                        style={{ color: getStatusColor(projectData.status) }}
                    >
                        <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: getStatusColor(projectData.status) }}
                        />
                        {projectData.status?.replace('-', ' ').toUpperCase() || 'ACTIVE'}
                    </div>
                </div>
            </div>

            {/* Project Information */}
            <div className="p-4 sm:p-6 space-y-4">
                {/* Header Section */}
                <div className="space-y-3">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-bold leading-tight flex-1 text-white group-hover:text-[#00f5ff] transition-colors duration-300">
                            {projectData.title}
                        </h3>
                    </div>
                </div>

                {/* Description with Expand/Collapse */}
                <div className="space-y-2">
                    <div
                        ref={descriptionRef}
                        className={`text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-all duration-300 overflow-hidden ${isDescriptionExpanded ? 'max-h-none' : 'line-clamp-3'
                            }`}
                    >
                        {projectData.description}
                    </div>

                    {shouldShowReadMore && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDescriptionExpanded(!isDescriptionExpanded);
                            }}
                            className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:cursor-pointer group/readmore"
                            aria-label={isDescriptionExpanded ? 'Show less description' : 'Show full description'}
                        >
                            {/* <MoreHorizontal size={12} className="group-hover/readmore:scale-110 transition-transform duration-200" /> */}
                            {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                            {isDescriptionExpanded ? (
                                <ChevronUp size={12} className="group-hover/readmore:scale-110 transition-transform duration-200" />
                            ) : (
                                <ChevronDown size={12} className="group-hover/readmore:scale-110 transition-transform duration-200" />
                            )}
                        </button>
                    )}
                </div>

                {/* Project Metadata */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    {/* {projectData.lastUpdated && (
                        <div className="flex items-center gap-1.5 bg-gray-800/50 rounded-lg px-2.5 py-1.5 border border-gray-700/50">
                            <Calendar size={12} />
                            <span>Updated {formatDate(projectData.lastUpdated)}</span>
                        </div>
                    )} */}
                    {projectData.duration && (
                        <div className="flex items-center gap-1.5 bg-gray-800/50 rounded-lg px-2.5 py-1.5 border border-gray-700/50">
                            <Clock size={12} />
                            <span>{projectData.duration}</span>
                        </div>
                    )}
                    {/* <div className="flex items-center gap-1.5 bg-gray-800/50 rounded-lg px-2.5 py-1.5 border border-gray-700/50">
                        <TrendingUp size={12} />
                        <span>High Impact</span>
                    </div> */}
                </div>

                {/* Technologies */}
                {projectData.technologies && projectData.technologies.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {(showAllTechs ? projectData.technologies : projectData.technologies.slice(0, maxVisibleTechs))
                                .map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 hover:scale-105 cursor-pointer bg-blue-500/15 border-blue-500/40 text-blue-400 hover:bg-blue-500/25 hover:border-blue-400/60"
                                        title={`${tech} technology`}
                                    >
                                        {tech}
                                    </span>
                                ))}

                            {projectData.technologies.length > maxVisibleTechs && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAllTechs(!showAllTechs);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-600/50 text-gray-400 hover:text-white hover:cursor-pointer hover:border-gray-500 transition-all duration-300"
                                    aria-label={showAllTechs ? 'Show fewer technologies' : 'Show all technologies'}
                                >
                                    {showAllTechs ? (
                                        <>
                                            Show Less <ChevronUp size={12} />
                                        </>
                                    ) : (
                                        <>
                                            +{projectData.technologies.length - maxVisibleTechs} <ChevronDown size={12} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Subtle Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
            </div>
        </div>
    );
};

export default ModalProjectCard;