"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Calendar, MapPin, Star } from "lucide-react";

const ExperienceSection = () => {
    const [expandedExp, setExpandedExp] = useState(null);

    const experiences = [
        {
            title: "Full Stack Developer Intern",
            company: "Anginat",
            period: "Mar 2025 – July 2025",
            duration: "5 months",
            location: "Remote",
            description: "Designed and developed a full-scale ERP platform for educational institutes from the ground up. Built the company website (anginat.com) and engineered a comprehensive ERP dashboard to streamline academic workflows.",
            highlights: [
                "Developed anginat.com from ground up using Next.js, Node.js, and Python",
                "Built student learning dashboard with React.js frontend for seamless user experience",
                "Integrated advanced AI features including TTS and voice cloning capabilities",
                "Architected and migrated database infrastructure to MongoDB for enhanced performance",
                "Deployed full-stack solutions on AWS and Google Cloud platforms"
            ],
            // technologies: ["React.js", "Next.js", "Node.js", "Python", "MongoDB", "AWS", "Google Cloud"],?
            technologies: ["Next.js", "AWS", "MongoDB", "Node.js", "Google Cloud", "React.js", "Express.js", "Python", "Supabase"],
            achievements: "Major projects delivered",
            link: "https://anginat.com"
        },
        {
            title: "Backend Developer",
            company: "IIT Jodhpur",
            period: "Aug 2024 – Dec 2024",
            duration: "5 months",
            location: "Jodhpur, India",
            description: "Developed a comprehensive face recognition attendance system using Ionic, Node.js, and Hugging Face APIs for seamless real-time processing.",
            highlights: [
                "Built real-time face recognition system with high accuracy",
                "Integrated with cloud databases for reliable uptime and data management",
                "Optimized backend architecture for fast response times",
                "Implemented robust daily attendance processing system"
            ],
            technologies: ["Ionic", "Node.js", "Hugging Face", "Cloud Databases"],
            achievements: "High-performance system",
            // link: "#project-link"
        }
    ];

    const skillGroups = [
        {
            category: "Programming Languages",
            skills: ["C/C++", "Python", "JavaScript", "TypeScript"]
        },
        {
            category: "Web Development",
            skills: ["HTML5", "CSS", "Tailwind CSS", "React.js", "Express.js", "MongoDB", "Next.js"]
        },
        {
            category: "Data & Cloud",
            skills: ["SQL", "PostgreSQL", "AWS", "Google Cloud", "Supabase", "Pandas", "NumPy", "scikit-learn", "TensorFlow"]
        },
        {
            category: "Tools & OS",
            skills: ["Git", "GitHub", "Google Colab", "Windows", "Linux"]
        }
    ];

    const totalYearsExperience = 1;
    const totalProjects = experiences.length;

    return (
        <section className="relative py-8 sm:py-12 md:py-16 pointer-events-auto">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-10 md:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                        Experience & Skills
                    </h2>
                    <div className="flex justify-center gap-8 text-sm text-gray-200 drop-shadow-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#00f5ff]" />
                            <span>{totalYearsExperience}+ Years Experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#00f5ff]" />
                            <span>{totalProjects} Major Experiences</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Enhanced Experience Timeline */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#00f5ff] mb-4">Work Experience</h3>

                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-5 sm:pl-6 border-l-2 border-[#00f5ff]/30"
                                >
                                    <motion.div
                                        className="absolute -left-[8px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#00f5ff] rounded-full shadow-lg shadow-[#00f5ff]/50 cursor-pointer"
                                        whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(0, 245, 255, 0.7)" }}
                                        title={`${exp.duration} • ${exp.achievements}`}
                                    />

                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex-1">
                                                <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">{exp.title}</h4>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-[#00f5ff] mb-2 sm:mb-3">
                                                    <span className="font-medium">{exp.company}</span>
                                                    <span>•</span>
                                                    <span>{exp.period}</span>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {exp.link && (
                                                <motion.a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#00f5ff] hover:text-white transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </motion.a>

                                            )}
                                        </div>

                                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3 drop-shadow-sm">
                                            {exp.description}
                                        </p>

                                        {/* Achievement Badge */}
                                        <div className="mb-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30">
                                                🏆 {exp.achievements}
                                            </span>
                                        </div>

                                        {/* Technologies Used */}
                                        <div className="mb-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {exp.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-0.5 bg-gray-700/70 text-gray-100 rounded text-xs border border-gray-600/50 drop-shadow-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {exp.technologies.length > 4 && (
                                                    <span className="px-2 py-0.5 bg-gray-700/70 text-gray-200 rounded text-xs border border-gray-600/50 drop-shadow-sm">
                                                        +{exp.technologies.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Expandable Highlights */}
                                        <button
                                            onClick={() => setExpandedExp(expandedExp === index ? null : index)}
                                            className="flex items-center gap-1 text-[#00f5ff] text-sm hover:text-white transition-colors hover:cursor-pointer"
                                        >
                                            <span>Key Highlights</span>
                                            {expandedExp === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>

                                        <AnimatePresence>
                                            {expandedExp === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="mt-3 space-y-2">
                                                        {exp.highlights.map((highlight, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className="text-sm text-gray-200 flex items-start gap-2 drop-shadow-sm"
                                                            >
                                                                <span className="text-[#00f5ff] mt-1">•</span>
                                                                <span>{highlight}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Skills Grid from Original */}
                    <div className="space-y-6 mt-8 lg:mt-0">
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#00f5ff] mb-4">Technical Skills</h3>

                        <div className="space-y-4">
                            {skillGroups.map((group, index) => (
                                <motion.div
                                    key={group.category}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-5"
                                >
                                    <h4 className="text-base sm:text-lg font-medium text-white mb-3">{group.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] rounded-lg text-xs sm:text-sm font-medium hover:bg-[#00f5ff]/20 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;