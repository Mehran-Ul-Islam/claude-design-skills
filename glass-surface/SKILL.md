---
name: glass-surface
description: Translucent "glass" material component for React (toolbars, popovers, cards, sheets) with thin/regular/thick variants and a spring-based materialize animation. Use for floating UI layers that need depth. Honors reduced-transparency and high-contrast preferences. Requires Framer Motion.
---

# Glass surface

## Rules

1. Glass is for floating functional layers, not decoration.
2. Bigger surface means thicker material: more blur, more opacity, deeper shadow.
3. Never stack a light translucent surface on another.
4. Materialize on enter: blur, scale and opacity animate together on a spring. Never a plain fade.
5. Honor `prefers-reduced-transparency` and `prefers-contrast: more` (already in `glass.css`).
6. Colors and radii come from tokens. Load `tokens/tokens.css` first.

## Usage

```jsx
import "./tokens/tokens.css";
import GlassSurface from "./glass-surface/GlassSurface.jsx";

<GlassSurface thickness="thin" as="nav" className="px-4 py-2">...</GlassSurface>
```

Props: `thickness` (thin | regular | thick), `as`, `animateIn`, plus normal motion props.
Files: `assets/glass-surface/` plus its dependencies `assets/spring-motion/springs.js` and `assets/tokens/`.

## Delivering (Claude on the web, desktop, mobile, or Claude Code)

- Work from the bundled `assets/` folder. (In the source repo the same files sit in the repo's skill folders.)
- Copy the files the user needs into their project (React + Vite + Tailwind, plain JavaScript). Keep the folder layout so the relative imports still resolve.
- Tell them to run `npm i framer-motion`.
- In chat, write deliverables to `/mnt/user-data/outputs` and present them. Do not promise a live preview: the chat's artifact preview may not include framer-motion, and the drag and spring feel has not been tested in a browser.
