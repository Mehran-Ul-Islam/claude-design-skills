# tokens

The single source of truth for color, type, spacing, radius, shadow and material. Every other skill in this repo reads from it.

## Overview & design philosophy

- **Apple HIG:** system font first (it ships optical sizing), size-specific tracking (tight when large, slightly open when small), leading that shrinks as type grows, rem-based spacing so layouts follow the user's text size, and light/dark palettes that adapt rather than invert.
- **Gstack-style review:** a strict token set is what makes a design review enforceable. If a value is not a token, the audit in `design-review` flags it.
- Radius carries hierarchy: 8 for controls, 12 for cards, 20 for surfaces, 28 for sheets. Shadows and blur grow with surface size.

## Animation & motion breakdown

Tokens contain no motion. Spring presets live in [`spring-motion`](../spring-motion). The only motion-related tokens are the material values (`blur`, `saturate`, `alpha`) that `glass-surface` animates between when a surface materializes.

## Component anatomy & integration

```bash
npm i framer-motion          # required by every skill in this repo
```

```js
// tailwind.config.js
import tokenPreset from "./tokens/tailwind.preset.js";
export default { presets: [tokenPreset], content: ["./index.html", "./src/**/*.{js,jsx}"] };
```

```js
// main.jsx
import "./tokens/tokens.css";
```

Files: `tokens.js` (source), `build-css.mjs` (generator), `tokens.css` (generated, do not hand-edit), `tailwind.preset.js`.

**21st.dev:** browse it for component patterns, then re-skin whatever you adopt with these tokens before it enters your codebase. Components pasted in with their own hex colors and CSS transitions will fail `npm run audit` by design.
