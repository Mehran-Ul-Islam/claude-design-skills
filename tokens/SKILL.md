---
name: tokens
description: Design tokens (color, size-specific type scale, 4pt spacing, radius hierarchy, shadows, glass material) for React + Vite + Tailwind projects. Use when starting a UI, setting up a design system, or reviewing consistency. Generates tokens.css and a Tailwind preset from a single source file. Other design skills depend on these tokens.
---

# Tokens

## Rules

1. Never write a raw hex color, an off-grid spacing value, or a one-off font size. Use a token.
2. Edit `assets/tokens/tokens.js`, then run `node assets/tokens/build-css.mjs` to regenerate `tokens.css`. Never hand-edit `tokens.css`.
3. Radius encodes hierarchy: controls 8, cards 12, surfaces 20, sheets 28. Do not use one radius everywhere.
4. Tracking is size-specific: tighten large type, open small type slightly. Spacing and type use rem.
5. Light and dark palettes adapt; they are not inversions of each other.

## Setup

- `tailwind.config.js`: `import tokenPreset from "./tokens/tailwind.preset.js"` and set `presets: [tokenPreset]`.
- `main.jsx`: `import "./tokens/tokens.css"`.
- Restyle any pasted component (for example from 21st.dev) with these tokens before it enters the codebase.

## Delivering (Claude on the web, desktop, mobile, or Claude Code)

- Work from the bundled `assets/` folder. (In the source repo the same files sit in the repo's skill folders.)
- Copy the files the user needs into their project (React + Vite + Tailwind, plain JavaScript). Keep the folder layout so the relative imports still resolve.
- Tell them to run `npm i framer-motion`.
- In chat, write deliverables to `/mnt/user-data/outputs` and present them. Do not promise a live preview: the chat's artifact preview may not include framer-motion, and the drag and spring feel has not been tested in a browser.
