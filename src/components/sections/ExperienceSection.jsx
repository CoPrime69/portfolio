"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import experience from "../../data/experience";
import { sections } from "../../data/site";
import {
    SectionHeading,
    BlockPanel,
    MetricChip,
    TechTag,
    OreNode,
    OreSeam,
    StateBadge,
    Reveal,
    distinctOres,
    oreColor,
} from "../mc";

/**
 * The surface stratum. Roles descend in reverse-chronological order, so
 * scrolling down is also travelling back through the career.
 *
 * Copy is two-layer: the `hook` always reads, the resume-accurate `bullets`
 * expand on demand.
 *
 * Each role carries its own ore, so the vein beside it, its metric chips and
 * its tech tags all read as one find. The section heading keeps the stratum's
 * emerald.
 */

const ExperienceCard = ({ exp, index, open, onToggle, ore }) => {
    const accent = oreColor(ore);

    return (
        <Reveal index={index} className="relative pl-8 sm:pl-12">
            {/* Vein running down the left edge, tinted to the stratum's ore */}
            <OreSeam ore={ore} className="bottom-0 left-[10px] top-8" />
            <div className="absolute left-0 top-5">
                <OreNode ore={ore} pulse={exp.current} />
            </div>

            <BlockPanel className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="mc-title font-pixel pixel-md text-white">{exp.title}</h3>
                            {exp.current && <StateBadge ore={ore}>Active</StateBadge>}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                            <span className="font-pixel pixel-sm" style={{ color: accent }}>
                                {exp.company}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-300">{exp.period}</span>
                            <span className="text-gray-400">·</span>
                            <span className="flex items-center gap-1 text-gray-400">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                            </span>
                        </div>
                    </div>

                    {exp.link && (
                        // Was a bare 16x16 icon, below WCAG 2.2 SC 2.5.8's 24x24
                        // minimum target. It is a proper inventory slot now.
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mc-slot flex h-8 w-8 shrink-0 items-center justify-center text-gray-300 transition-colors hover:text-white"
                            aria-label={`Visit ${exp.company}`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                {/* Layer 1: the plain-English hook */}
                <p className="text-sm leading-relaxed text-gray-200 sm:text-base">{exp.hook}</p>

                {/* Metrics worth seeing without expanding */}
                {exp.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {exp.metrics.map((m) => (
                            <MetricChip key={m.label} {...m} ore={ore} />
                        ))}
                    </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                        <TechTag key={t} ore={ore}>
                            {t}
                        </TechTag>
                    ))}
                </div>

                {/* Layer 2: the resume-accurate detail */}
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    className="mc-btn pixel-sm mt-5 flex items-center gap-2 px-3 py-2 text-white hover:cursor-pointer"
                >
                    <span>{open ? "Hide details" : "What I actually built"}</span>
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
                                {exp.bullets.map((b, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-300">
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
        </Reveal>
    );
};

const ExperienceSection = () => {
    // Accordion: only one role's detail is open at a time.
    const [openId, setOpenId] = useState(null);
    // One colour per role, guaranteed distinct - see distinctOres().
    const ores = distinctOres(experience);

    return (
        <section className="mc-section">
            <div className="mc-container">
                <SectionHeading
                    ore={sections.experience.ore}
                    depth={sections.experience.depth}
                    sub={sections.experience.sub}
                >
                    Experience
                </SectionHeading>

                <div className="space-y-8">
                    {experience.map((exp, i) => (
                        <ExperienceCard
                            key={exp.id}
                            exp={exp}
                            index={i}
                            ore={ores[i]}
                            open={openId === exp.id}
                            onToggle={() =>
                                setOpenId((cur) => (cur === exp.id ? null : exp.id))
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
