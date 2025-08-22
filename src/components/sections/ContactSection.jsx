"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const ContactSection = () => {
    const socials = [
        { icon: <Github size={20} />, href: "https://github.com/CoPrime69", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/prakhar-srivastava-b539172ab/", label: "LinkedIn" },
        { icon: <Mail size={20} />, href: "mailto:prakhars2558@gmail.com", label: "Mail" },
    ];

    return (
        <section className="relative py-8 sm:py-12 md:py-16 pointer-events-auto flex items-center min-h-[60vh] sm:min-h-[80vh]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xs sm:text-sm text-gray-500 border-t border-gray-800 pt-4 mx-4 mb-8"
                >
                    {/* <p>© 2024 Prakhar. Built with Next.js & Framer Motion</p> */}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                        Let's Connect
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                        I'm always interested in hearing about new opportunities,
                        exciting projects, and meeting fellow developers.
                    </p>

                    <div className="flex justify-center mb-6 sm:mb-8 px-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = "mailto:prakhars2558@gmail.com"}
                            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00f5ff] to-[#ff006e] text-white rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none justify-center"
                        >
                            <Mail size={18} />
                            Send Email
                        </motion.button>
                    </div>



                    <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
                        {socials.map((social, index) => (
                            <motion.a
                                key={social.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 sm:p-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-[#00f5ff] hover:border-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-xs sm:text-sm text-gray-500 border-t border-gray-800 pt-4 mx-4"
                    >
                        {/* <p>© 2024 Prakhar. Built with Next.js & Framer Motion</p> */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;