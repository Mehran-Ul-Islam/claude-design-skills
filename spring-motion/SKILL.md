---
name: spring-motion
description: Use for any animation or gesture. Apple-style springs (damping ratio + response) mapped to Framer Motion, with momentum projection, rubber-banding and reduced-motion fallbacks.
---

# Spring motion

1. Install `framer-motion`. Every state change uses `type: "spring"`; no CSS transitions or keyframes.
2. Think in damping ratio and response, not duration. Default to `springs.default` (damping 1.0, response 0.4).
3. Add bounce (`springs.momentum`) only when the gesture carried momentum. Use `springForRelease(velocity)`.
4. Respond on pointer-down (`Pressable`), track 1:1 during drags, and hand release velocity to the spring.
5. Animate from the live value. Stop the running animation (`ctl.stop()`) before starting a new one.
6. Use `useSpringTransition()` or `useReducedMotion()` so reduced motion becomes a short cross-fade.
