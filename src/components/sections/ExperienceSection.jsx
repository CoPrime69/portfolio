"use client";
import { motion } from "framer-motion";

const ExperienceSection = () => {
    const experiences = [
        {
            title: "Full Stack Developer Intern",
            company: "Anginat",
            period: "Mar 2025 – July 2025",
            description:
                "Worked on an ERP platform for educational institutes, building features with React.js and REST APIs to streamline daily operations. Deployed the company website using Next.js, Node.js, and Python for AI integrations like TTS and voice cloning, hosted on AWS and Google Cloud. Also migrated the database to MongoDB and improved backend performance for faster responses."
        },
        {
            title: "Backend Developer",
            company: "IIT Jodhpur",
            period: "Aug 2024 – Dec 2024",
            description:
                "Developed a face recognition attendance system using Ionic, Node.js, and Hugging Face APIs. Focused on improving backend performance and integrating with cloud databases to ensure smooth real-time processing and reliable operation."
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
            skills: [
                "SQL", "PostgreSQL", "AWS", "Google Cloud", "Supabase", "Pandas", "NumPy", "scikit-learn", "TensorFlow"
            ]
        },
        {
            category: "Tools & OS",
            skills: ["Git", "GitHub", "Google Colab", "Windows", "Linux"]
        }
    ];

    return (
        <section className="relative py-8 sm:py-12 md:py-16 pointer-events-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-white"
                >
                    Experience & Skills
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Experience Timeline */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#00f5ff] mb-4">Work Experience</h3>

                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-5 sm:pl-6 border-l-2 border-[#00f5ff]/30 last:pb-0"
                                >
                                    <div className="absolute -left-[8px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 bg-[#00f5ff] rounded-full shadow-lg shadow-[#00f5ff]/50"></div>
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">{exp.title}</h4>
                                        <p className="text-[#00f5ff] text-sm font-medium mb-2 sm:mb-3">
                                            {exp.company} • {exp.period}
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{exp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Grid */}
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