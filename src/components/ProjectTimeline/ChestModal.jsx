"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import Modal from "../ModalPopUp/Modal";
import { chestProjects } from "../../data/projects";
import { MetricChip, TechTag, oreColor } from "../mc";

/**
 * Additional projects as a single full-width list.
 *
 * Earlier attempts used a card grid and then masonry columns. Both had the
 * same failure: expanding one project's detail disturbed its neighbours,
 * because grid rows stretch to the tallest cell and columns reflow. A plain
 * vertical list has neither problem, everything stays readable at once, and an
 * expanded row only pushes down what is already beneath it.
 */

const Row = ({ project, open, onToggle }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const accent = oreColor(project.ore);

    return (
        <div
            className="mc-bevel bg-black/30 transition-colors duration-200 hover:bg-black/50"
            style={open ? { borderColor: accent } : undefined}
        >
            <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
                    {project.image ? (
                        <>
                            {!imageLoaded && (
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundColor: `color-mix(in srgb, ${accent} 16%, #14141a)`,
                                    }}
                                />
                            )}
                            <Image
                                src={project.image}
                                alt=""
                                fill
                                sizes="96px"
                                className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-90" : "opacity-0"
                                    }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </>
                    ) : (
                        <div
                            className="mc-surface absolute inset-0 flex items-center justify-center"
                            style={{
                                backgroundColor: `color-mix(in srgb, ${accent} 20%, #14141a)`,
                            }}
                        >
                            <span
                                className="font-pixel relative z-10 text-lg"
                                style={{
                                    color: accent,
                                    textShadow: "2px 2px 0 rgba(0,0,0,0.9)",
                                }}
                            >
                                {project.title.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                            <span
                                className="font-pixel text-[9px] uppercase tracking-widest"
                                style={{ color: accent }}
                            >
                                {project.category}
                            </span>
                            <h3 className="mc-title mt-1 text-sm text-white sm:text-base">
                                {project.title}
                            </h3>
                            <p className="mt-0.5 text-[11px] text-gray-400">{project.period}</p>
                        </div>

                        <div className="flex shrink-0 gap-1.5">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mc-btn p-1.5 text-gray-100"
                                    aria-label={`${project.title} on GitHub`}
                                >
                                    <Github className="h-3.5 w-3.5" />
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mc-btn p-1.5 text-gray-100"
                                    aria-label={`${project.title} live demo`}
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-gray-300">{project.hook}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                            <TechTag key={t} ore={project.ore}>
                                {t}
                            </TechTag>
                        ))}
                    </div>

                    {project.bullets?.length > 0 && (
                        <>
                            <button
                                onClick={onToggle}
                                aria-expanded={open}
                                className="mt-3 flex items-center gap-1.5 text-[11px] font-medium hover:cursor-pointer"
                                style={{ color: accent }}
                            >
                                <span>{open ? "Show less" : "Read more"}</span>
                                <motion.span
                                    animate={{ rotate: open ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="h-3 w-3" />
                                </motion.span>
                            </button>

                            {/* Lives INSIDE the content column, not after the
                                flex row. Previously it spanned the full card
                                width, so the bullets and metric chips started
                                hard against the left edge while every line
                                above them was inset by the thumbnail. */}
                            <AnimatePresence initial={false}>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 border-t border-white/10 pt-3">
                                            <ul className="space-y-2">
                                                {project.bullets.map((b, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex gap-2 text-[11px] leading-relaxed text-gray-400"
                                                    >
                                                        <span
                                                            className="mt-[5px] h-1.5 w-1.5 shrink-0"
                                                            style={{ backgroundColor: accent }}
                                                        />
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {project.metrics?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {project.metrics.map((m) => (
                                                        <MetricChip
                                                            key={m.label}
                                                            {...m}
                                                            ore={project.ore}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChestModal = ({ isOpen, onClose }) => {
    const [openId, setOpenId] = useState(null);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="All Projects"
            maxWidth="max-w-3xl"
            maxHeight="max-h-[85vh]"
            className="!rounded-none mc-panel"
            headerClassName="border-gray-700"
            contentClassName="bg-transparent"
        >
            <div className="space-y-3">
                {chestProjects.map((project) => (
                    <Row
                        key={project.id}
                        project={project}
                        open={openId === project.id}
                        onToggle={() =>
                            setOpenId((cur) => (cur === project.id ? null : project.id))
                        }
                    />
                ))}
            </div>
        </Modal>
    );
};

export default ChestModal;
