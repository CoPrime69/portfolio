import experience from "./experience";
import projects from "./projects";
import { primaryEducation } from "./education";

/**
 * The HUD strip. Counts derive from the data above so they can't drift out of
 * sync when a project or role is added.
 */

const industryRoles = experience.filter((e) => e.company !== "IIT Jodhpur");

const stats = [
    {
        id: "internships",
        value: String(industryRoles.length),
        label: "Internships",
        detail: industryRoles.map((r) => r.company).join(" · "),
        ore: "emerald",
    },
    {
        id: "projects",
        value: `${projects.length}` + "+",
        label: "Projects Built",
        detail: "AI/ML, cloud infrastructure and full-stack products",
        ore: "diamond",
    },
    {
        id: "cgpa",
        value: primaryEducation.score,
        label: "CGPA",
        detail: `${primaryEducation.degree}, ${primaryEducation.shortName}`,
        ore: "gold",
    },
    {
        id: "institute",
        value: "IIT-J",
        label: "B.Tech AI & DS",
        detail: primaryEducation.period,
        ore: "lapis",
    },
];

export default stats;
