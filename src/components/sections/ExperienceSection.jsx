"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import experience from "../../data/experience";
import { sections } from "../../data/site";
import { SectionHeading, BlockPanel, MetricChip, TechTag, OreNode, oreColor } from "../mc";

/**
 * The surface stratum. Roles descend in reverse-chronological order, so
 * scrolling down is also travelling back through the career.
 *
 * Copy is two-layer: the `hook` always reads, the resume-accurate `bullets`
 * expand on demand.
 */

const ExperienceCard = ({ exp, index, open, onToggle }) => {
    const accent = oreColor(exp.ore);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="relative pl-8 sm:pl-12"
        >
            {/* Vein running down the left edge, tinted to this role's ore */}
            <div
                className="absolute bottom-0 left-[10px] top-8 w-[3px]"
                style={{ backgroundColor: accent, opacity: 0.22 }}
            />
            <div className="absolute left-0 top-5">
                <OreNode ore={exp.ore} pulse={exp.current} />
            </div>

            <BlockPanel className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="mc-title text-lg text-white sm:text-xl">{exp.title}</h3>
                            {exp.current && (
                                <span
                                    className="mc-bevel-inset font-pixel px-2 py-[2px] text-[9px] uppercase"
                                    style={{ color: accent, backgroundColor: "rgba(0,0,0,0.4)" }}
                                >
                                    Active
                                </span>
                            )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                            <span className="font-pixel" style={{ color: accent }}>
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
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 text-gray-400 transition-colors hover:text-white"
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
                            <MetricChip key={m.label} {...m} ore={exp.ore} />
                        ))}
                    </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                        <TechTag key={t} ore={exp.ore}>
                            {t}
                        </TechTag>
                    ))}
                </div>

                {/* Layer 2: the resume-accurate detail */}
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    className="mc-btn mt-5 flex items-center gap-2 px-3 py-2 text-xs text-white hover:cursor-pointer"
                >
                    <span>{open ? "Hide details" : "What I actually built"}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
        </motion.div>
    );
};

const ExperienceSection = () => {
    // Accordion: only one role's detail is open at a time.
    const [openId, setOpenId] = useState(null);

    return (
        <section className="relative py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
