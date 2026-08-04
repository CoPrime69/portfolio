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
 *
 * SIZING, WITH THE ARITHMETIC DONE PROPERLY THIS TIME.
 *
 * The old comment claimed 40px slots kept eight of them inside 375px:
 * `8*40 + 7*2 + 8 = 342`. That omitted the 3px bevel on each side, so the real
 * width was 348 - and at a 320px viewport the bar measured 348px wide, spilling
 * off BOTH edges with Home and Contact clipped, and pushing the document to
 * 349px so the page scrolled sideways.
 *
 * Full width = slots*8 + gap*7 + padding*2 + border*2:
 *   34px slots, 2px gap, 4px pad, 3px border -> 272 + 14 + 8 + 6 = 300  (<320)
 *   40px slots, 2px gap, 4px pad, 3px border -> 320 + 14 + 8 + 6 = 348  (<360)
 *   48px slots, 4px gap, 4px pad, 3px border -> 384 + 28 + 8 + 6 = 426  (<640)
 *
 * 34px is still comfortably above WCAG 2.2 SC 2.5.8's 24x24 minimum.
 */

const Hotbar = ({ items, activeId }) => {
    const [hovered, setHovered] = useState(null);

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
                                    className="mc-eyebrow pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-black/85 px-2 py-1 text-white"
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
                            className="mc-slot flex h-[34px] w-[34px] items-center justify-center text-gray-200 transition-colors hover:cursor-pointer hover:text-white min-[360px]:h-10 min-[360px]:w-10 sm:h-12 sm:w-12"
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

    const items = [
        {
            id: "home",
            label: "Home",
            icon: <Home className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.home),
        },
        {
            id: "education",
            label: "Education",
            icon: <GraduationCap className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.education),
        },
        {
            id: "experience",
            label: "Experience",
            icon: <Briefcase className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.experience),
        },
        {
            id: "projects",
            label: "Projects",
            icon: <Pickaxe className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.projects),
        },
        {
            id: "techstack",
            label: "Tech Stack",
            icon: <Hammer className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.techstack),
        },
        {
            id: "leadership",
            label: "Leadership",
            icon: <Users className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.leadership),
        },
        {
            id: "resume",
            label: "Resume",
            icon: <FileText className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => setResumeOpen(true),
        },
        {
            id: "contact",
            label: "Contact",
            icon: <Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
            onClick: () => scrollToSection(refs.contact),
        },
    ];

    return (
        <>
            {/* Owns its own entrance animation so the parent doesn't need a
                second `fixed` wrapper around it. */}
            {/* Duration/easing matched to the avatar, depth meter and clock so
                all four pieces of chrome arrive as one movement. */}
            <motion.nav
                aria-label="Sections"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6"
            >
                <Hotbar items={items} activeId={currentSection} />
            </motion.nav>

            <ResumePicker isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </>
    );
};

export default NavigationDock;
