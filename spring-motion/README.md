# spring-motion

Shared motion layer: spring presets, gesture math, and a pointer-down `Pressable`.

## Overview & design philosophy

- **Apple HIG / fluid interfaces:** respond instantly, track the pointer 1:1, carry velocity from the gesture into the animation, project momentum to where a flick is heading, resist softly at edges, and keep everything interruptible.
- **Gstack-style review:** motion is checked, not assumed. The audit rejects CSS transitions, `@keyframes`, tweens, easing curves and infinite loops.

## Animation & motion breakdown

Apple describes springs with two numbers. Framer Motion wants stiffness and damping. `spring({ damping, response })` converts:

```
stiffness = (2π / response)²
damping   = 4π · dampingRatio / response     (mass = 1)
```

Damping ratio 1.0 is critically damped (no overshoot); below 1.0 overshoots. `response` is how fast it arrives, not a duration.

| Preset | Damping | Response | Use |
| --- | --- | --- | --- |
| `default` | 1.0 | 0.4 | reposition, expand, appear |
| `press` | 1.0 | 0.2 | pointer-down feedback |
| `rotate` | 0.8 | 0.4 | rotation |
| `sheet` | 0.8 | 0.3 | drawers |
| `momentum` | 0.8 | 0.35 | after a flick or throw only |

Helpers: `project(velocity, rate)` (exponential-decay resting point), `rubberband(overshoot, dimension)`, `nearest(value, points)`, `springForRelease(velocity)`, `useSpringTransition(name)`. Under `prefers-reduced-motion` the transition becomes a 200ms fade with no travel.

## Component anatomy & integration

```bash
npm i framer-motion
```

```jsx
import { Pressable, springs } from "./spring-motion";
import { motion } from "framer-motion";

<Pressable className="rounded-md bg-accent px-4 py-3 text-surface">Save changes</Pressable>
<motion.div layout transition={springs.default} />
```

**21st.dev:** when adapting a button, card or list pattern from there, replace its transitions with these presets.
