"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, ChevronDown } from "lucide-react";
import education, { courses } from "../../data/education";
import { sections } from "../../data/site";
import {
    SectionHeading,
    BlockPanel,
    StateBadge,
    Reveal,
    distinctOres,
    oreColor,
} from "../mc";

/**
 * Every level of education, newest first, plus the coursework behind it.
 *
 * The coursework list is collapsed by default so the section stays scannable;
 * it is long enough to bury the degrees otherwise.
 *
 * Each row carries its own ore, and the coursework tracks carry theirs. The
 * variety is deliberate - see the ORE note in data/education.js.
 */

const TRACK_ORE = {
    "AI/ML": "emerald",
    Data: "diamond",
    Maths: "gold",
    Systems: "copper",
};

const TRACKS = ["AI/ML", "Data", "Maths", "Systems"];

const EducationSection = () => {
    const [showCourses, setShowCourses] = useState(false);
    // One colour per degree, guaranteed distinct - see distinctOres().
    const ores = distinctOres(education);

    return (
        <section className="mc-section">
            <div className="mc-container">
                <SectionHeading
                    ore={sections.education.ore}
                    depth={sections.education.depth}
                    sub={sections.education.sub}
                >
                    Education
                </SectionHeading>

                <div className="space-y-4">
                    {education.map((ed, i) => {
                        const ore = ores[i];
                        const accent = oreColor(ore);
                        return (
                        <Reveal key={ed.id} index={i} offset={20}>
                            <BlockPanel
                                glow={ed.current}
                                ore={ore}
                                className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-3">
                                        <GraduationCap
                                            className="h-4 w-4 shrink-0"
                                            style={{ color: accent }}
                                        />
                                        <h3 className="mc-title font-pixel pixel-md text-white">
                                            {ed.degree}
                                        </h3>
                                        {ed.current && (
                                            <StateBadge ore={ore}>Current</StateBadge>
                                        )}
                                    </div>

                                    <p className="mt-2 text-sm sm:text-base" style={{ color: accent }}>
                                        {ed.institute}
                                    </p>

                                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                                        {/* Only shown once the institute is a real school
                                            name rather than the board standing in for it. */}
                                        {ed.board && !ed.institute.includes(ed.board) && (
                                            <>
                                                <span>{ed.board} Board</span>
                                                <span>·</span>
                                            </>
                                        )}
                                        <span>{ed.period}</span>
                                        {ed.location && (
                                            <>
                                                <span>·</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {ed.location}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mc-bevel-inset flex shrink-0 flex-col items-center bg-black/40 px-5 py-3">
                                    <span
                                        className="font-pixel pixel-lg leading-none"
                                        style={{ color: accent }}
                                    >
                                        {ed.score}
                                        {ed.scoreLabel === "Percentage" && (
                                            <span className="pixel-sm">%</span>
                                        )}
                                    </span>
                                    <span className="mc-eyebrow mt-1.5 text-gray-400">
                                        {ed.scoreLabel === "CGPA"
                                            ? `CGPA / ${ed.scoreScale}`
                                            : ed.scoreLabel}
                                    </span>
                                </div>
                            </BlockPanel>
                        </Reveal>
                        );
                    })}
                </div>

                {/* Coursework */}
                <div className="mt-8">
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowCourses((v) => !v)}
                            aria-expanded={showCourses}
                            className="mc-btn pixel-sm flex items-center gap-2 px-5 py-3 text-white hover:cursor-pointer"
                        >
                            <span>
                                {showCourses ? "Hide coursework" : `Key coursework (${courses.length})`}
                            </span>
                            <ChevronDown
                                className={`h-3.5 w-3.5 transition-transform duration-150 ${showCourses ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    <motion.div
                        initial={false}
                        animate={{
                            height: showCourses ? "auto" : 0,
                            opacity: showCourses ? 1 : 0,
                        }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                        // Collapsed via height, so without this the 19 courses
                        // stay in the accessibility tree and in Ctrl-F.
                        aria-hidden={!showCourses}
                        // React 19 takes a real boolean here; an empty string
                        // is treated as false and warns.
                        inert={!showCourses}
                    >
                        <div className="mt-6 space-y-5">
                            {TRACKS.map((track) => {
                                const items = courses.filter((c) => c.track === track);
                                if (!items.length) return null;
                                const trackAccent = oreColor(TRACK_ORE[track]);

                                return (
                                    <div key={track}>
                                        <h4 className="mc-eyebrow mb-3" style={{ color: trackAccent }}>
                                            {track}
                                        </h4>
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                            {items.map((c) => (
                                                <div
                                                    key={c.name}
                                                    className="mc-bevel-inset flex items-center justify-between gap-3 bg-black/30 px-3 py-2.5"
                                                >
                                                    <span className="min-w-0 text-xs text-gray-200">
                                                        {c.name}
                                                    </span>
                                                    {c.grade && (
                                                        <span
                                                            className="font-pixel pixel-sm shrink-0"
                                                            style={{ color: trackAccent }}
                                                        >
                                                            {c.grade}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
