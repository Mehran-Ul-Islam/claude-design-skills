---
name: tokens
description: Use when starting or auditing a UI. Provides the strict color, type, spacing, radius, shadow and material tokens every other skill depends on.
---

# Tokens

1. Never write a raw hex color, an off-grid spacing value, or a one-off font size. Use a token.
2. Edit `tokens.js`, then run `npm run tokens` to regenerate `tokens.css`.
3. Radius encodes hierarchy (sm controls, md cards, xl sheets). Do not use one radius everywhere.
4. Tracking is size-specific: tighten large type, open small type slightly.
5. Run `npm run audit` before shipping.
