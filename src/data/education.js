/**
 * Education, newest first. Schooling comes from main.tex / main2.tex.
 *
 * ORE is per-entry and deliberately varied. A pass at flattening every row to
 * the section's lapis was tried and reverted: the multi-coloured rows are the
 * look this site wants, and the variety is part of why the sections feel like
 * a collection of finds rather than a table.
 */

import { text } from "./_normalize";

const educationRaw = [
    {
        id: "iitj",
        degree: "B.Tech, Artificial Intelligence & Data Science",
        institute: "Indian Institute of Technology, Jodhpur",
        shortName: "IIT Jodhpur",
        board: null,
        score: "8.18",
        scoreLabel: "CGPA",
        scoreScale: "10.0",
        period: "2023 - 2027",
        location: "Jodhpur, Rajasthan, India",
        ore: "diamond",
        current: true,
    },
    {
        id: "senior-secondary",
        institute: "St. Xavier's School",
        degree: "Senior Secondary (Class XII)",
        shortName: "St. Xavier's",
        board: "ISC",
        score: "90.5",
        scoreLabel: "Percentage",
        scoreScale: "100",
        period: "2023",
        location: "Lucknow, Uttar Pradesh, India",
        ore: "emerald",
        current: false,
    },
    {
        id: "secondary",
        institute: "St. Anthony's School",
        degree: "Secondary (Class X)",
        shortName: "St. Anthony's",
        board: "CBSE",
        score: "94",
        scoreLabel: "Percentage",
        scoreScale: "100",
        period: "2021",
        location: "Barabanki, Uttar Pradesh, India",
        ore: "gold",
        current: false,
    },
];

/** Convenience accessor for the degree currently being pursued. */


/**
 * Union of the coursework listed across every resume variant.
 * All of these are completed; `grade: null` simply means the resume did not
 * print a grade for that course, not that it is in progress.
 */
const coursesRaw = [
    { name: "Deep Learning", grade: "A-", track: "AI/ML" },
    { name: "Advanced Machine Learning", grade: "A-", track: "AI/ML" },
    { name: "Optimization in Machine Learning", grade: "A-", track: "AI/ML" },
    { name: "Dependable AI", grade: "A", track: "AI/ML" },
    { name: "Artificial Intelligence", grade: "A-", track: "AI/ML" },
    { name: "Pattern Recognition & Machine Learning", grade: null, track: "AI/ML" },

    { name: "Data Engineering", grade: null, track: "Data" },
    { name: "Data Visualization", grade: "A-", track: "Data" },

    { name: "Probability & Statistics", grade: "A", track: "Maths" },
    { name: "Maths for Big Data", grade: "A", track: "Maths" },
    { name: "Linear Algebra & Differential Equations", grade: "A", track: "Maths" },
    { name: "Mathematics II", grade: "A", track: "Maths" },
    { name: "Math for Computing", grade: null, track: "Maths" },

    { name: "Data Structures & Algorithms", grade: null, track: "Systems" },
    { name: "Design & Analysis of Algorithms", grade: null, track: "Systems" },
    { name: "Introduction to Computer Science", grade: "A", track: "Systems" },
    { name: "Principles of Computer Systems I", grade: null, track: "Systems" },
    { name: "Principles of Computer Systems II", grade: null, track: "Systems" },
    { name: "Virtualization & Cloud Computing", grade: null, track: "Systems" },
];

export const courses = coursesRaw
    .map((c) => ({ ...c, name: text(c.name), grade: text(c.grade), track: text(c.track) }))
    .filter((c) => c.name);

export const education = educationRaw
    .map((e) => ({
        ...e,
        institute: text(e.institute),
        degree: text(e.degree),
        board: text(e.board),
        score: text(e.score),
        period: text(e.period),
        location: text(e.location),
        ore: text(e.ore) ?? "diamond",
    }))
    .filter((e) => e.institute && e.degree);

export const primaryEducation = education[0];

export default education;
