---
name: design-review
description: Designer's-eye QA for UI code. Use after building or before shipping any React/CSS interface, or when asked to audit, review, critique or polish a design. Runs a static audit (raw hex colors, CSS transitions/keyframes, tweens, off-grid spacing, removed focus rings, all-caps labels, missing reduced-motion) and applies a manual hierarchy/spacing/interaction/accessibility checklist.
---

# Design review

## Process

1. Run the audit on the project folder (from an upload, a repo, or files written this session):
   `node assets/design-review/audit.mjs <project-dir>`  (add `--strict` to fail on warnings). Needs Node 18+.
2. Fix every error. Justify or fix every warning. A deliberate exception gets an `audit-ignore` comment on that line, with the reason.
3. Review by eye in this order using `assets/design-review/checklist.md`: hierarchy, spacing rhythm, token adherence, interaction feel, accessibility, generated-UI tells.
4. Where the code allows it, test motion for real: grab animations mid-flight, use keyboard only, try reduced motion and reduced transparency. If you cannot run the UI, say which checks were not done.
5. Report findings as: file:line, the problem, the fix. Do not rewrite what already passes.

## What the audit enforces

Errors: raw hex outside token files, `@keyframes`, CSS or Tailwind transition/duration/ease, `type: "tween"` / easing / infinite repeat, removed focus outline.
Warnings: off-grid arbitrary px, px font sizes, all-caps tracked labels, `animate-*`, motion without reduced-motion handling.

This process is modeled on a designer's-eye review pass; it is not a copy of any specific tool.
