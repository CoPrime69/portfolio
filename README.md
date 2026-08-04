# Portfolio — Minecraft Strata Descent

Personal site for **Prakhar Srivastava** — AI/ML & backend engineer, B.Tech AI & DS at
IIT Jodhpur. Live at **[coprime69.me](https://coprime69.me)**.

The page is not a document, it is a place. You start at the night sky and dig: the
background colour travels with your scroll through six strata — sky, grass, dirt, stone,
deepslate, bedrock — and every control is something you'd find in a Minecraft GUI. A
hotbar for navigation, an F3 depth readout down the side, inventory slots, advancement
toasts, a chest for the overflow projects.

All block artwork is original — CSS gradients and a hand-authored 16×16 SVG noise tile.
No Mojang asset files are used.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, JavaScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, configured with `@theme inline` inside `src/app/globals.css` — **there is no `tailwind.config.js`** |
| Motion | `framer-motion` for React-driven animation, `gsap` (+ InertiaPlugin) for the dot-grid physics and the target cursor |
| 3D | `skinview3d` renders the Minecraft skin avatar (WebGL) |
| Icons | `lucide-react` for UI glyphs, `react-icons/si` for brand marks |
| Fonts | `Funnel_Display` via `next/font/google` for prose, `@south-paw/typeface-minecraft` for the pixel display face |

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where things live

| Path | What it is |
|---|---|
| `src/app/globals.css` | **The design system.** Colour tokens, the pixel type scale, section rhythm, the `.mc-*` primitives, the noise texture, and the motion rules. The comments record real design decisions and past fixes — read them before changing anything. |
| `src/data/` | **All content.** Copy, projects, experience, education, leadership, tech stack, resumes. You should never open a component to change what the site says — see `src/data/README.md`. |
| `src/data/strata.js` | The descent palette: the single source of truth for the backdrop colour, the dot colours and the depth readout. |
| `src/components/mc/` | Shared Minecraft UI primitives (panels, chips, ore nodes, seams, the reveal). |
| `src/components/sections/` | One file per section. |
| `src/app/page.js` | Page composition, the intro sequence gate, active-section tracking, chrome mounting. |

## House rules

These are what keep it from looking like every other template:

- **Zero `border-radius`.** Anywhere. The system is deliberately, entirely square.
- **Stepped motion, not eased.** Minecraft has no sub-pixel movement — use
  `--mc-ease-state` / `--mc-ease-reveal`, or the `stepReveal()` helper.
- **One block is 64px** (`--mc-block`). Blocky things snap to that grid.
- **Colour means depth.** Each stratum owns one ore accent; a section's ore is its
  identity, not decoration. Don't add a colour outside the strata / ore / GUI palette.
- **Every ore is contrast-checked against every stratum** — the floor is 5.17:1. If you
  change an ore value, re-measure it before shipping.
- **Motion needs a reduced-motion path in the world it lives in.** The `@media` block in
  `globals.css` only reaches CSS; framer-motion, GSAP and timer-driven sequences are
  handled in JS. See the REDUCED MOTION note in `globals.css`.

## Licence

Code is available for reference. The content, résumé material and likeness are not.
