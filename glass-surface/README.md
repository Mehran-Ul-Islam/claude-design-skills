# glass-surface

A translucent material with three thicknesses.

## Overview & design philosophy

- **Apple HIG materials:** translucency creates a floating functional layer without stealing focus. Thickness encodes hierarchy, a bright top edge reads as light catching the surface, and text on glass gets slightly more weight and tracking for vibrancy.
- **Gstack-style review:** one surface component with three variants, so the audit has nothing ad-hoc to find. No stacked glass, no per-card gradient washes.
- **Accessibility:** `prefers-reduced-transparency` and `prefers-contrast: more` swap the glass for a solid surface (CSS `!important` beats the inline filter Framer sets).

## Animation & motion breakdown

On mount the surface materializes: `opacity 0 → 1`, `scale 0.96 → 1`, and `backdrop-filter` from `blur(0px) saturate(100%)` to the thickness' values, all on `springs.default` (damping 1.0, no overshoot, since nothing was flicked). With reduced motion it is a 200ms opacity fade only.

## Component anatomy & integration

```bash
npm i framer-motion
```

```jsx
import "./tokens/tokens.css";
import GlassSurface from "./glass-surface/GlassSurface.jsx";

<GlassSurface thickness="thin" as="nav" className="px-4 py-2">…</GlassSurface>
```

Props: `thickness` (`thin | regular | thick`), `as` (any HTML tag), `animateIn`, plus normal motion props. Depends on `tokens` and `spring-motion`.

**21st.dev:** use its glass/blur card and navbar patterns as visual references; rebuild them on this component so they inherit the tokens and the accessibility fallbacks.
