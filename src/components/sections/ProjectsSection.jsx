"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, Package } from "lucide-react";
import { featuredProjects } from "../../data/projects";
import { sections } from "../../data/site";
import {
    SectionHeading,
    BlockPanel,
    MetricChip,
    TechTag,
    OreNode,
    OreSeam,
    Reveal,
    distinctOres,
    oreColor,
} from "../mc";
import ChestModal from "../ProjectTimeline/ChestModal";

/**
 * The stone stratum - where the ore is.
 *
 * Flagship projects are veins embedded in the rock, alternating left and right
 * down the seam. Everything else is stored in the chest at the bottom.
 *
 * TWO CHANGES WORTH KNOWING ABOUT:
 *
 * - The seam used to be a 25%-opacity hairline, which measured as invisible
 *   against every stratum. The nodes therefore read as squares floating in
 *   space rather than as ore embedded in a vein - losing the one image the
 *   whole section is built on. It is drawn by <OreSeam> now, at a weight you
 *   can actually see.
 *
 * - Every panel used to carry `glow`, so the glow said nothing. Ore glows
 *   because it is exposed ore; the lead project gets it, the rest are found by
 *   digging. Each vein keeps its own ore colour.
 */

const ProjectLinks = ({ project }) => (
    <div className="flex shrink-0 gap-2">
        {project.github && (
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn cursor-target flex h-8 w-8 items-center justify-center text-gray-200"
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
                className="mc-btn cursor-target flex h-8 w-8 items-center justify-center text-gray-200"
                aria-label={`${project.title} live demo`}
            >
                <ExternalLink className="h-4 w-4" />
            </a>
        )}
    </div>
);

const OreVein = ({ project, index, open, onToggle, ore }) => {
    const accent = oreColor(ore);
    const flip = index % 2 === 1;

    return (
        <Reveal offset={28} className="relative">
            {/* Seam node, centred on desktop and pinned left on mobile */}
            <div className="absolute left-[3px] top-6 z-10 sm:left-1/2 sm:-translate-x-1/2">
                <OreNode ore={ore} pulse={index === 0} />
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:gap-12">
                {/* Alternate sides by explicit column placement - flipping the
                    grid with `direction: rtl` would invert the card's own text. */}
                <div className={`pl-10 sm:pl-0 ${flip ? "sm:col-start-2" : "sm:col-start-1"}`}>
                    <BlockPanel
                        glow={index === 0}
                        ore={ore}
                        className="cursor-target mc-lift p-5 sm:p-6"
                    >
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <span className="mc-eyebrow" style={{ color: accent }}>
                                    {project.category}
                                </span>
                                <h3 className="mc-title font-pixel pixel-md mt-1 text-white">
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
                                    <MetricChip key={m.label} {...m} ore={ore} />
                                ))}
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                                <TechTag key={t} ore={ore}>
                                    {t}
                                </TechTag>
                            ))}
                        </div>

                        <button
                            onClick={onToggle}
                            aria-expanded={open}
                            className="mc-btn cursor-target pixel-sm mt-5 flex items-center gap-2 px-3 py-2 text-white hover:cursor-pointer"
                        >
                            <span>{open ? "Hide details" : "How it works"}</span>
                            <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.26 }}
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
        </Reveal>
    );
};

const ProjectsSection = () => {
    const [chestOpen, setChestOpen] = useState(false);
    // Accordion: only one project's detail is open at a time.
    const [openId, setOpenId] = useState(null);
    // No two veins in the seam may share a colour - see distinctOres().
    const ores = distinctOres(featuredProjects);

    // NOTE: body scroll locking is owned solely by Modal. This component used
    // to lock it too, which permanently broke scrolling: React runs child
    // effects before parent effects, so this captured prev="hidden" from the
    // Modal that had just mounted, then restored "hidden" on close after the
    // Modal had already unlocked.

    return (
        <section className="mc-section">
            {/* TargetCursor is mounted once at the page level (page.js) and is
                activated whenever this section holds the middle of the viewport,
                whichever direction you arrived from. */}
            <div className="mc-container mc-container-wide">
                <SectionHeading
                    ore={sections.projects.ore}
                    depth={sections.projects.depth}
                    sub={sections.projects.sub}
                >
                    Projects
                </SectionHeading>

                <div className="relative">
                    {/* The seam itself */}
                    {/* The seam runs through every ore in the section, the way
                        the original gradient did - it was just invisible at 25%. */}
                    <OreSeam
                        ore={ores}
                        className="bottom-0 left-3 top-0 sm:left-1/2 sm:-translate-x-1/2"
                    />

                    <div className="space-y-12 sm:space-y-16">
                        {featuredProjects.map((p, i) => (
                            <OreVein
                                key={p.id}
                                project={p}
                                index={i}
                                ore={ores[i]}
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
                        className="mc-btn cursor-target pixel-md flex items-center gap-3 px-6 py-4 text-white hover:cursor-pointer"
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
