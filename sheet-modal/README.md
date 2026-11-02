# sheet-modal

A draggable bottom sheet with snap points.

## Overview & design philosophy

- **Apple HIG:** direct manipulation (1:1 tracking from where you grab), interruptibility above all, momentum-aware dismissal, rubber-band resistance at the top and bottom, symmetric enter/exit path, a dimming scrim with blur for a modal task, and a thick glass material because it is a large surface.
- **Gstack-style review:** one component covers modal and snap behavior; spacing and radii come from tokens; focus, Escape and `aria-modal` are handled.

## Animation & motion breakdown

| Moment | Behavior |
| --- | --- |
| Pointer-down on handle | Framer stops any running animation; the sheet is under the finger instantly. |
| Dragging | `y` follows the pointer 1:1. Past the first or last stop, Framer's elastic drag gives progressive resistance. |
| Release | `projected = y + project(velocity, 0.99)`; the nearest stop (or the closed position) wins, chosen by where the flick is going, not where it let go. |
| Settle | `animate(y, target, { ...springForRelease(v), velocity: v })`. Damping 1.0 for slow releases, 0.8 only when speed exceeds 300 px/s. |
| Open / close | Springs on `springs.default`, started from `y.getVelocity()`. Cleanup stops the old animation so a reversal never jumps. |
| Scrim | Opacity and blur are derived from `y`, so they track the sheet exactly. |
| Reduced motion | No travel. The sheet fades in and out in 200ms. |

## Component anatomy & integration

```bash
npm i framer-motion
```

```jsx
import "./tokens/tokens.css";
import { Sheet } from "./sheet-modal";

const [open, setOpen] = useState(false);

<Sheet open={open} onClose={() => setOpen(false)} snapPoints={[0.5, 1]} title="Filters">
  …content…
</Sheet>
```

Props: `open`, `onClose`, `snapPoints` (visible fractions, ascending), `initialSnap`, `title`, `modal`. Anatomy: scrim, glass panel (`role="dialog"`), drag handle/header, scrollable body.

Known limits: only the handle/header initiates drag (body scroll hand-off to drag is not implemented), and there is no focus trap beyond focusing the dialog on open.

**21st.dev:** compare its drawer/dialog patterns for layout ideas; keep this component's gesture logic.
