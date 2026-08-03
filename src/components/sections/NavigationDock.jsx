"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Briefcase, Pickaxe, Hammer, GraduationCap, Users, FileText, Mail,
} from "lucide-react";
import ResumePicker from "./ResumePicker";

/**
 * Minecraft hotbar navigation.
 *
 * Replaces the macOS-style magnifying dock: slots are fixed-size, the active
 * section gets the white selection outline the real hotbar uses, and labels
 * surface above on hover/focus rather than scaling the icons.
 *
 * NOTE: this component positions itself. The parent must NOT wrap it in
 * another `fixed` container - doing so previously nested two fixed elements.
 */

const Hotbar = ({ items, activeId }) => {
    const [hovered, setHovered] = useState(null);

    // Base sizing keeps 8 slots inside 375px (8*40 + 7*2 + 8 = 342). At 44px
    // slots this overflowed below ~388px and clipped Home and Contact.
    return (
        <div className="mc-bevel flex items-end gap-0.5 bg-black/55 p-1 backdrop-blur-sm sm:gap-1">
            {items.map((item) => {
                const active = item.id === activeId;
                const showLabel = hovered === item.id;

                return (
                    <div key={item.id} className="relative">
                        <AnimatePresence>
                            {showLabel && (
                                <motion.span
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.15 }}
                                    className="font-pixel pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-black/85 px-2 py-1 text-[10px] text-white"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={item.onClick}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(item.id)}
                            onBlur={() => setHovered(null)}
                            aria-label={item.label}
                            aria-current={active ? "true" : undefined}
                            className="mc-slot flex h-10 w-10 items-center justify-center text-gray-200 transition-colors hover:cursor-pointer hover:text-white sm:h-12 sm:w-12"
                            style={
                                active
                                    ? {
                                        boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.95)",
                                        color: "#fff",
                                    }
                                    : undefined
                            }
                        >
                            {item.icon}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

const NavigationDock = ({ scrollToSection, refs, currentSection }) => {
    const [resumeOpen, setResumeOpen] = useState(false);
    const size = 18;

    const items = [
        {
            id: "home",
            label: "Home",
            icon: <Home size={size} />,
            onClick: () => scrollToSection(refs.home, "home"),
        },
        {
            id: "education",
            label: "Education",
            icon: <GraduationCap size={size} />,
            onClick: () => scrollToSection(refs.education, "education"),
        },
        {
            id: "experience",
            label: "Experience",
            icon: <Briefcase size={size} />,
            onClick: () => scrollToSection(refs.experience, "experience"),
        },
        {
            id: "projects",
            label: "Projects",
            icon: <Pickaxe size={size} />,
            onClick: () => scrollToSection(refs.projects, "projects"),
        },
        {
            id: "techstack",
            label: "Tech Stack",
            icon: <Hammer size={size} />,
            onClick: () => scrollToSection(refs.techstack, "techstack"),
        },
        {
            id: "leadership",
            label: "Leadership",
            icon: <Users size={size} />,
            onClick: () => scrollToSection(refs.leadership, "leadership"),
        },
        {
            id: "resume",
            label: "Resume",
            icon: <FileText size={size} />,
            onClick: () => setResumeOpen(true),
        },
        {
            id: "contact",
            label: "Contact",
            icon: <Mail size={size} />,
            onClick: () => scrollToSection(refs.contact, "contact"),
        },
    ];

    return (
        <>
            {/* Owns its own entrance animation so the parent doesn't need a
                second `fixed` wrapper around it. */}
            {/* Duration/easing matched to the avatar, depth meter and clock so
                all four pieces of chrome arrive as one movement. */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6"
            >
                <Hotbar items={items} activeId={currentSection} />
            </motion.div>

            <ResumePicker isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </>
    );
};

export default NavigationDock;
