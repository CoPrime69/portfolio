# `src/data` — everything editable on the site

This folder is the single source of truth for all presentable content. **You
should never need to open a component file to change what the site says.**

Each file is a plain JS module exporting plain objects/arrays, so it is trivial
to generate these programmatically later (from the `.tex` resumes, a CMS, an
API, whatever) without touching any React.

| File | What it controls |
|---|---|
| `site.js` | Name, contact details, social links, page metadata, hero copy, rotating pill words, contact copy, and every section's heading / subtitle / depth label |
| `experience.js` | Work experience cards |
| `projects.js` | Every project, featured and otherwise |
| `education.js` | Degrees, schools, scores, and the coursework list |
| `leadership.js` | Leadership / positions of responsibility |
| `techstack.js` | Technologies, their icons, categories, and which are "primary" |
| `resumes.js` | The four resume tracks in the download picker |
| `stats.js` | The summary strip near the bottom (derives from the files above) |
| `strata.js` | The descent palette: backdrop and dot colours per depth |

---

## Common edits

### Add a project

Append to the array in `projects.js`:

```js
{
    id: "my-project",              // unique, kebab-case
    title: "My Project",
    year: "2026",
    period: "Jan 2026 - Mar 2026",
    featured: false,               // true = ore vein in the Projects section
                                   // false = listed in the "View More" modal
    ore: "diamond",                // accent colour, see "Ore colours" below
    category: "AI/ML & Research",  // free text, shown above the title
    hook: "One plain-English sentence anyone can understand.",
    bullets: [                     // resume-accurate detail, shown on expand
        "First achievement, with a number in it.",
    ],
    metrics: [                     // shown as chips, keep to 2-4
        { value: "82%", label: "accuracy" },
    ],
    technologies: ["Python", "PyTorch"],
    image: null,                   // null renders a textured ore block instead
    github: null,                  // null hides the button entirely
    demo: null,
}
```

To give it a screenshot, drop the file in `src/images/additionalProjects/`,
`import` it at the top of `projects.js`, and set `image: myImport`.

### Add a job

Same shape in `experience.js`. `current: true` adds the "Active" badge and makes
the ore node pulse. `link` adds an external-link icon; `null` hides it.

### Add a technology

In `techstack.js`, import the icon from `react-icons/si` at the top and add an
entry. If no icon exists for it, use `Icon: null` and give it a two-letter
`short` — it renders as a block tile instead of a blank square.

To change which technologies show before "View full stack", edit the `PRIMARY`
set near the bottom of the file.

### Change any wording

`site.js`. Headline, pitch, button labels, section headings and subtitles, the
contact blurb, the footer.

### Add a course

`education.js`, `courses` array. `grade: null` just means no grade is shown —
it does **not** mean "in progress".

---

## Placeholders are safe

Every file runs its records through `_normalize.js` before exporting them, so
**a field only renders when it holds real data.** You can leave a note to
yourself in a field and nothing breaks:

```js
github: "enable",   // -> no GitHub button appears
demo: "TODO",       // -> no demo button appears
image: "",          // -> falls back to the ore-block tile
period: "n/a",      // -> the line is simply omitted
```

Recognised as "not filled in yet" (case-insensitive): `enable`, `enabled`,
`disable`, `disabled`, `todo`, `tbd`, `tba`, `wip`, `pending`, `n/a`, `na`,
`none`, `null`, `undefined`, `nil`, `-`, `--`, `xxx`, `placeholder`,
`coming soon`, `add link`, `add url`, `your link here`, `insert link`,
`example.com`, and any empty/whitespace string.

Single characters like `x` and `?` are **not** treated as placeholders, since
they are plausible real values.

Other conveniences:

- A bare domain is upgraded automatically: `github.com/me` becomes
  `https://github.com/me`.
- `metrics` entries missing either `value` or `label` are dropped, so a
  half-written chip never renders.
- A project missing `id` or `title`, or a job missing `company`, is skipped
  entirely rather than rendering an empty card.
- A technology with no icon falls back to a block tile using `short`, or the
  first two letters of its label if you omit `short`.

This is what makes the folder safe to generate from a script later: emitting a
stray empty string cannot produce a broken link or an empty box.

---

## Ore colours

`ore` values must match an `--ore-*` custom property in `src/app/globals.css`.
A typo renders the wrong colour silently, so stick to this list:

`diamond` · `emerald` · `lapis` · `gold` · `redstone` · `copper` · `iron`

`amethyst` used to be listed here and no longer exists. Purple was deliberately
pulled from the palette, but the token — and this line — outlived it, so the
docs were advertising the one colour the design had rejected. `iron` is the
neutral, and it was live all along via `techstack.js`'s Tools category.

Every value above is contrast-checked against every stratum, on the raw
backdrop and on `.mc-panel`; the floor is 5.17:1 (redstone on Stone). If you
add one, measure it before you ship it.

---

## Section order

Section order is **not** in this folder — it is the JSX order in
`src/app/page.js`. If you reorder sections, update the `depth` values in
`site.js` so the Y readout still decreases monotonically down the page.

## Resume PDFs

`resumes.js` has four tracks, each currently `url: null`, which makes the picker
fall back to the general resume and say so on the card. Paste a hosted PDF link
into a track's `url` to wire it up properly. The matching LaTeX sources are the
`.tex` files in the repo root.
