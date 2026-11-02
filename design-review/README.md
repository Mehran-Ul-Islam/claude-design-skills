# design-review

A QA pass for UI, in two parts: an automated audit and a manual checklist.

## Overview & design philosophy

- **Gstack-style design review:** a ruthless designer's-eye pass that hunts inconsistency, spacing drift, hierarchy gaps, generated-UI patterns and sluggish interaction. This is a review process modeled on that idea, not a copy of any tool.
- **Apple HIG / craft:** nothing is random; every spacing, timing and alignment value should be defensible.

## Animation & motion breakdown

The audit enforces the motion rules mechanically: it errors on `@keyframes`, CSS `transition`, Tailwind `transition/duration/ease`, `type: "tween"`, easing curves and infinite repeats, and warns when a file uses motion without any reduced-motion handling. The manual pass covers what a script cannot: grab an animation mid-flight and confirm it reverses without a jump.

## Component anatomy & integration

```bash
node design-review/audit.mjs src          # exit 1 on errors
node design-review/audit.mjs src --strict # exit 1 on warnings too
```

| Rule | Level |
| --- | --- |
| raw hex outside tokens, `@keyframes`, CSS/Tailwind transitions, tween/ease/loops, removed focus outline | error |
| off-grid arbitrary px, px font sizes, all-caps labels, `animate-*`, missing reduced-motion | warn |

Add `audit-ignore` to a line to exempt it. Wire it into CI or a pre-push hook with `npm run audit`.

**21st.dev:** run the audit on any component you pull in before merging it.
