"use client";
import { useState, useMemo } from "react";
import { LayoutGrid } from "lucide-react";
import technologies, {
    primaryTechnologies,
    TECH_CATEGORIES,
    CATEGORY_ORE,
} from "../../data/techstack";
import Modal from "../ModalPopUp/Modal";
import { sections } from "../../data/site";
import { SectionHeading, Reveal, oreColor } from "../mc";

/**
 * Primary stack in the section, full stack behind a button.
 *
 * Every tile puts its label immediately beneath the glyph inside the same
 * bordered cell, so a name always reads as belonging to its icon.
 *
 * Icons come from `react-icons/si` and are monochrome, so they take a tint and
 * read as one set instead of a jumble of brand colours.
 *
 * Tiles take their category's ore in both the section and the modal, so a
 * technology is the same colour wherever you meet it.
 */

const TechTile = ({ tech, ore, compact = false }) => {
    const accent = oreColor(ore);
    const { Icon } = tech;

    return (
        <div
            className="mc-slot group flex flex-col items-center justify-start gap-2 px-2 py-3"
            title={`${tech.label} (${tech.category})`}
        >
            <span
                className={`flex items-center justify-center ${compact ? "h-8 w-8" : "h-9 w-9"}`}
                style={{ color: accent }}
            >
                {Icon ? (
                    <Icon className={compact ? "h-6 w-6" : "h-7 w-7"} aria-hidden="true" />
                ) : (
                    <span className="font-pixel pixel-sm">{tech.short}</span>
                )}
            </span>

            <span className="w-full text-center text-[11px] font-medium leading-tight text-gray-300">
                {tech.label}
            </span>
        </div>
    );
};

const FullStackModal = ({ isOpen, onClose }) => {
    const [category, setCategory] = useState("All");

    const filtered = useMemo(
        () =>
            category === "All"
                ? technologies
                : technologies.filter((t) => t.category === category),
        [category]
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setCategory("All");
                onClose();
            }}
            title="Full Stack"
            maxWidth="max-w-4xl"
            maxHeight="max-h-[85vh]"
        >
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {TECH_CATEGORIES.map((c) => {
                        const active = category === c;
                        const accent = oreColor(CATEGORY_ORE[c] ?? "diamond");
                        return (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                aria-pressed={active}
                                className="mc-btn pixel-sm px-3 py-2 text-white hover:cursor-pointer"
                                style={
                                    active
                                        ? {
                                            backgroundColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                                            borderColor: accent,
                                        }
                                        : undefined
                                }
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>

                {/* min-height pins the panel so changing filter cannot resize it and
                    slide the filter row out from under the cursor. */}
                <div className="grid min-h-[420px] grid-cols-3 content-start gap-2.5 sm:grid-cols-5 lg:grid-cols-6">
                    {filtered.map((tech) => (
                        <TechTile
                            key={tech.label}
                            tech={tech}
                            ore={CATEGORY_ORE[tech.category] ?? "diamond"}
                            compact
                        />
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400">
                    {filtered.length} of {technologies.length} technologies
                </p>
            </div>
        </Modal>
    );
};

const TechStackSection = () => {
    const [open, setOpen] = useState(false);
    const ore = sections.techstack.ore;

    return (
        <>
            <section className="mc-section">
                <div className="mc-container">
                    <SectionHeading
                        ore={ore}
                        depth={sections.techstack.depth}
                        sub={sections.techstack.sub}
                    >
                        Tech Stack
                    </SectionHeading>

                    <Reveal className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                        {primaryTechnologies.map((tech) => (
                            <TechTile
                                key={tech.label}
                                tech={tech}
                                ore={CATEGORY_ORE[tech.category] ?? "diamond"}
                            />
                        ))}
                    </Reveal>

                    {/* The one-off pb-16 that used to live here is gone: hotbar
                        clearance is now .mc-section-dock, applied where the page
                        actually ends rather than section by section. */}
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setOpen(true)}
                            className="mc-btn cursor-target pixel-sm flex items-center gap-3 px-6 py-4 text-white hover:cursor-pointer"
                        >
                            <LayoutGrid className="h-4 w-4" />
                            <span>
                                View full stack ({technologies.length - primaryTechnologies.length} more)
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <FullStackModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default TechStackSection;
