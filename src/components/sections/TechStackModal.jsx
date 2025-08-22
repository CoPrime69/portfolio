"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import StackIcon from "tech-stack-icons";
import Modal from "../ModalPopUp/Modal";
import technologies from "./techstack";

const TechStackModal = ({ isOpen, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Define categories
    const categories = [
        "All",
        "Frontend",
        "Backend",
        "Database & Cloud",
        "AI/ML",
        "Mobile",
        "Development Tools"
    ];

    // Filter technologies based on category and search term
    const filteredTechnologies = useMemo(() => {
        return technologies.filter(tech => {
            const matchesCategory = selectedCategory === "All" || tech.category === selectedCategory;
            const matchesSearch = tech.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tech.category.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setSelectedCategory("All");
                setSearchTerm("");
                onClose();
            }}
            hidescr
            headerClassName="justify-center items-center mx-auto"
            title="Complete Tech Stack"
            maxWidth="max-w-5xl"
            className="bg-gray-900/95"
            contentClassName="bg-gray-900 p-0"
        >
            <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search technologies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`hover:cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Technologies Grid */}
                <div>
                    {filteredTechnologies.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                            {filteredTechnologies.map((tech, index) => (
                                <motion.div
                                    key={tech.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                    className="flex flex-col items-center p-4 rounded-xl border border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 cursor-pointer group"
                                    whileHover={{ y: -4 }}
                                    title={`${tech.label} - ${tech.category}`}
                                >
                                    <div className="w-16 h-16 flex items-center justify-center mb-3">
                                        <StackIcon name={tech.name} variant="dark" className="w-14 h-14" />
                                    </div>
                                    <span className="text-white text-xs font-medium text-center leading-tight">
                                        {tech.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-2">No technologies found</div>
                            <div className="text-gray-500 text-sm">Try adjusting your search or category filter</div>
                        </div>
                    )}
                </div>

                {/* Results Counter */}
                {/* <div className="text-center text-gray-400 text-sm">
                    Showing {filteredTechnologies.length} of {technologies.length} technologies
                </div> */}
            </div>
        </Modal>
    );
};

export default TechStackModal;