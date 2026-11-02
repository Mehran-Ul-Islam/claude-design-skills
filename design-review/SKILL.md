---
name: design-review
description: Use after building or before shipping UI. A designer's-eye QA pass plus a static audit script that flags raw colors, CSS transitions, off-grid spacing, removed focus rings and generated-UI tells.
---

# Design review

1. Run `npm run audit`. Fix every error; justify or fix every warning.
2. Then review by eye, in this order: hierarchy, spacing rhythm, token adherence, interaction feel, accessibility. See `checklist.md`.
3. Play motion in slow motion. Grab things mid-animation. Try keyboard only. Try reduced motion and reduced transparency.
4. Report findings with file, line and the fix. Do not rewrite what already passes.
5. Silence a deliberate exception with an `audit-ignore` comment on that line, and say why.
