# design-skills

Apple-HIG-grounded, Framer Motion-driven UI skills for React + Vite + Tailwind, with a design-review audit.

```
tokens/          color, type, spacing, radius, shadow, material (source of truth)
spring-motion/   springs, gesture math, Pressable
glass-surface/   translucent material, three thicknesses
sheet-modal/     draggable, interruptible bottom sheet
design-review/   audit script + designer's-eye checklist
```

Each folder has a `SKILL.md` (instructions for Claude) and a `README.md` (overview, motion breakdown, integration).

## Setup

```bash
npm i framer-motion react
npm run tokens   # regenerate tokens/tokens.css
npm run audit    # design-review audit
```

Wire into a Vite + Tailwind project: add `tokens/tailwind.preset.js` as a preset, import `tokens/tokens.css`, and use components from `sheet-modal`, `glass-surface` and `spring-motion`. JSX uses the automatic runtime (the Vite React default). Plain JavaScript, no TypeScript required.

## Use as Claude skills (claude.ai, Desktop, mobile, Claude Code)

Each skill is also packaged as a self-contained, uploadable zip (SKILL.md plus an `assets/` folder holding its files and the files it imports):

```bash
npm run package      # builds dist/skills/<name>/ and <name>.zip (zip CLI required for the zips)
```

In claude.ai, upload the zips in your skills settings (Capabilities); in Claude Code, copy the folders into `.claude/skills/`. The skills guide Claude to write the component files into your project; the chat's artifact preview may not include framer-motion, so expect source files rather than a live preview.

## Ship

```bash
./push.sh                         # defaults to github.com/Mehran-Ul-Islam/claude-design-skills
./push.sh https://github.com/you/other-repo.git
```
