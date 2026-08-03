"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, Package } from "lucide-react";
import { featuredProjects, chestProjects } from "../../data/projects";
import { sections } from "../../data/site";
import { SectionHeading, BlockPanel, MetricChip, TechTag, OreNode, oreColor } from "../mc";
import ChestModal from "../ProjectTimeline/ChestModal";

/**
 * The stone stratum - where the ore is.
 *
 * Flagship projects are veins embedded in the rock, alternating left and right
 * down the seam. Everything else is stored in the chest at the bottom.
 */

const ProjectLinks = ({ project }) => (
    <div className="flex shrink-0 gap-2">
        {project.github && (
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn cursor-target p-2 text-gray-200"
                aria-label={`${project.title} source on GitHub`}
            >
                <Github className="h-4 w-4" />
            </a>
        )}
        {project.demo && (
            <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn cursor-target p-2 text-gray-200"
                aria-label={`${project.title} live demo`}
            >
                <ExternalLink className="h-4 w-4" />
            </a>
        )}
    </div>
);

const OreVein = ({ project, index, open, onToggle }) => {
    const accent = oreColor(project.ore);
    const flip = index % 2 === 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Seam node, centred on desktop and pinned left on mobile */}
            <div className="absolute left-[3px] top-6 z-10 sm:left-1/2 sm:-translate-x-1/2">
                <OreNode ore={project.ore} />
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:gap-12">
                {/* Alternate sides by explicit column placement - flipping the
                    grid with `direction: rtl` would invert the card's own text. */}
                <div className={`pl-10 sm:pl-0 ${flip ? "sm:col-start-2" : "sm:col-start-1"}`}>
                    <BlockPanel
                        glow
                        ore={project.ore}
                        className="cursor-target p-5 transition-transform duration-200 hover:-translate-y-1 sm:p-6"
                    >
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <span
                                    className="font-pixel text-[10px] uppercase tracking-widest"
                                    style={{ color: accent }}
                                >
                                    {project.category}
                                </span>
                                <h3 className="mc-title mt-1 text-base text-white sm:text-lg">
                                    {project.title}
                                </h3>
                                <span className="text-xs text-gray-400">{project.period}</span>
                            </div>
                            <ProjectLinks project={project} />
                        </div>

                        <p className="text-sm leading-relaxed text-gray-200">{project.hook}</p>

                        {project.metrics.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.metrics.map((m) => (
                                    <MetricChip key={m.label} {...m} ore={project.ore} />
                                ))}
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                                <TechTag key={t} ore={project.ore}>
                                    {t}
                                </TechTag>
                            ))}
                        </div>

                        <button
                            onClick={onToggle}
                            aria-expanded={open}
                            className="mc-btn cursor-target mt-5 flex items-center gap-2 px-3 py-2 text-xs text-white hover:cursor-pointer"
                        >
                            <span>{open ? "Hide details" : "How it works"}</span>
                            <motion.span
                                animate={{ rotate: open ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="h-3.5 w-3.5" />
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.28 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="mt-4 space-y-3 border-t border-white/10 pt-4">
                                        {project.bullets.map((b, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 text-sm leading-relaxed text-gray-300"
                                            >
                                                <span
                                                    className="mt-[6px] h-2 w-2 shrink-0"
                                                    style={{ backgroundColor: accent }}
                                                />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </BlockPanel>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const [chestOpen, setChestOpen] = useState(false);
    // Accordion: only one project's detail is open at a time.
    const [openId, setOpenId] = useState(null);

    // NOTE: body scroll locking is owned solely by Modal. This component used
    // to lock it too, which permanently broke scrolling: React runs child
    // effects before parent effects, so this captured prev="hidden" from the
    // Modal that had just mounted, then restored "hidden" on close after the
    // Modal had already unlocked.

    return (
        <section className="relative py-20 sm:py-28" data-section="projects">
            {/* TargetCursor is mounted once at the page level (page.js) and is
                activated only while this section is the current one. */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    ore={sections.projects.ore}
                    depth={sections.projects.depth}
                    sub={sections.projects.sub}
                >
                    Projects
                </SectionHeading>

                <div className="relative">
                    {/* The seam itself */}
                    <div className="absolute bottom-0 left-3 top-0 w-[3px] bg-gradient-to-b from-[var(--ore-diamond)] via-[var(--ore-copper)] to-[var(--ore-emerald)] opacity-25 sm:left-1/2 sm:-translate-x-1/2" />

                    <div className="space-y-12 sm:space-y-16">
                        {featuredProjects.map((p, i) => (
                            <OreVein
                                key={p.id}
                                project={p}
                                index={i}
                                open={openId === p.id}
                                onToggle={() =>
                                    setOpenId((cur) => (cur === p.id ? null : p.id))
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <button
                        onClick={() => setChestOpen(true)}
                        className="mc-btn cursor-target flex items-center gap-3 px-6 py-4 text-sm text-white hover:cursor-pointer sm:text-base"
                    >
                        <Package className="h-5 w-5" />
                        <span>View More Projects</span>
                    </button>
                </div>
            </div>

            <ChestModal isOpen={chestOpen} onClose={() => setChestOpen(false)} />
        </section>
    );
};

export default ProjectsSection;
