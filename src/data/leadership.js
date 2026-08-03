/**
 * Rendered as Minecraft "Advancement Made!" toasts, so each entry carries a
 * short achievement-style `title` alongside the factual detail.
 */

import { text, metrics } from "./_normalize";

const leadership = [
    {
        id: "ta-csl1010",
        title: "Teaching Assistant",
        achievement: "Taught the Class",
        org: "CSL1010, IIT Jodhpur",
        period: "Jan - Apr 2026",
        rarity: "goal", // goal | challenge - drives toast styling
        ore: "gold",
        description: "Mentored 250+ first-year students through their introductory computing course.",
        metrics: [{ value: "250+", label: "students mentored" }],
    },
    {
        id: "prometeo-head",
        title: "Head at Prometeo",
        achievement: "Event Horizon",
        org: "Prometeo, IIT Jodhpur's Technical Festival",
        period: "Oct 2025 - Present",
        rarity: "challenge",
        ore: "copper",
        description:
            "Spearheaded 4 large-scale technical events and 2 national-level hackathons for 1000+ participants, leading a 25+ member cross-functional core team across logistics, sponsorship and tech operations.",
        metrics: [
            { value: "4", label: "technical events" },
            { value: "2", label: "national hackathons" },
            { value: "1000+", label: "participants" },
            { value: "25+", label: "core team" },
        ],
    },
    {
        id: "student-guide",
        title: "Student Guide",
        achievement: "Show Them the Way",
        org: "Student Wellbeing Committee, IIT Jodhpur",
        period: "Jun 2024 - May 2025",
        rarity: "goal",
        ore: "emerald",
        description:
            "Mentored 13 freshmen directly and coordinated orientation for 500+ new students.",
        metrics: [
            { value: "13", label: "freshmen mentored" },
            { value: "500+", label: "students oriented" },
        ],
    },
];

const normalized = leadership
    .map((l) => ({
        ...l,
        id: text(l.id),
        title: text(l.title),
        achievement: text(l.achievement),
        org: text(l.org),
        period: text(l.period),
        description: text(l.description),
        metrics: metrics(l.metrics),
        ore: text(l.ore) ?? "gold",
    }))
    .filter((l) => l.id && l.title);

export default normalized;
