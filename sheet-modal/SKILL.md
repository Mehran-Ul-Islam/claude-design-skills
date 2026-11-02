---
name: sheet-modal
description: Draggable, interruptible bottom sheet for React with snap points, momentum-aware dismissal, velocity handoff to springs, rubber-banding, and a blurred scrim. Use when building bottom sheets, drawers or modal panels. Requires Framer Motion; bundles its spring, glass and token dependencies.
---

# Sheet modal

## Behavior to preserve when editing

1. Controlled component: the parent owns `open` and flips it inside `onClose`.
2. Drag starts from the handle/header; the body scrolls independently.
3. On release: project momentum (`project(v, 0.99)`), snap to the nearest stop or dismiss, and pass the release velocity to the spring. Bounce only above ~300 px/s.
4. Grabbing mid-flight stops the animation and follows the pointer. Never lock input during a transition.
5. Enter and exit along the same path (bottom edge). Escape closes. Reduced motion becomes a 200ms fade.

## Usage

```jsx
import "./tokens/tokens.css";
import { Sheet } from "./sheet-modal";

<Sheet open={open} onClose={() => setOpen(false)} snapPoints={[0.5, 1]} title="Filters">...</Sheet>
```

Props: `open`, `onClose`, `snapPoints` (visible fractions, ascending), `initialSnap`, `title`, `modal`.
Known limits: only the handle/header starts a drag (no body-scroll-to-drag hand-off), and focus is moved to the dialog on open but not trapped.

## Delivering (Claude on the web, desktop, mobile, or Claude Code)

- Work from the bundled `assets/` folder. (In the source repo the same files sit in the repo's skill folders.)
- Copy the files the user needs into their project (React + Vite + Tailwind, plain JavaScript). Keep the folder layout so the relative imports still resolve.
- Tell them to run `npm i framer-motion`.
- In chat, write deliverables to `/mnt/user-data/outputs` and present them. Do not promise a live preview: the chat's artifact preview may not include framer-motion, and the drag and spring feel has not been tested in a browser.
