---
name: spring-motion
description: Apple-style spring animation for React with Framer Motion. Use for any animation, gesture, press feedback, drag, or transition. Converts damping ratio + response into Framer Motion physics, with momentum projection, rubber-banding, velocity handoff and reduced-motion fallbacks. No CSS transitions or keyframes.
---

# Spring motion

## Rules

1. Every state change uses `type: "spring"` via Framer Motion. No CSS transitions, `@keyframes`, tweens, easing curves or decorative infinite loops.
2. Think in damping ratio and response, not duration. Default to `springs.default` (damping 1.0, response 0.4: no overshoot).
3. Add bounce (`springs.momentum`, damping 0.8) only when the gesture carried momentum. `springForRelease(velocity)` picks for you.
4. Respond on pointer-down (use `Pressable`), track drags 1:1, and pass the release velocity into the spring.
5. Animate from the live on-screen value. Stop the running animation (`ctl.stop()`) before starting a new one, so reversals never jump.
6. Project a flick to where it is heading with `project(velocity, 0.99)`, then snap to the nearest target with `nearest()`. Past a boundary use `rubberband()`.
7. Reduced motion becomes a short cross-fade: use `useSpringTransition()` or `useReducedMotion()`.

## Files

`assets/spring-motion/springs.js` (presets and math), `Pressable.jsx` (pointer-down button), `index.js`.
Conversion used: stiffness = (2π / response)², damping = 4π · dampingRatio / response, mass 1.

## Delivering (Claude on the web, desktop, mobile, or Claude Code)

- Work from the bundled `assets/` folder. (In the source repo the same files sit in the repo's skill folders.)
- Copy the files the user needs into their project (React + Vite + Tailwind, plain JavaScript). Keep the folder layout so the relative imports still resolve.
- Tell them to run `npm i framer-motion`.
- In chat, write deliverables to `/mnt/user-data/outputs` and present them. Do not promise a live preview: the chat's artifact preview may not include framer-motion, and the drag and spring feel has not been tested in a browser.
