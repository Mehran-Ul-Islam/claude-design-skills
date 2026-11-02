---
name: glass-surface
description: Use for translucent chrome (toolbars, sheets, popovers). A material layer whose thickness (thin/regular/thick) encodes hierarchy and that materializes with blur + scale springs.
---

# Glass surface

1. Use glass for floating functional layers, not decoration.
2. Bigger surface = thicker material (more blur, more opacity, deeper shadow).
3. Never stack a light translucent surface on another.
4. Animate blur, scale and opacity together on enter; never a plain fade.
5. Honor `prefers-reduced-transparency` and `prefers-contrast: more` (already in `glass.css`).
6. Colors come from tokens only. Load `tokens/tokens.css` first.
