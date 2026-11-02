---
name: sheet-modal
description: Use for bottom sheets and drawers. A controlled, draggable, interruptible sheet with snap points, momentum projection, velocity handoff and a materializing scrim.
---

# Sheet modal

1. Controlled component: the parent owns `open` and flips it in `onClose`.
2. Drag starts from the handle/header; the body scrolls independently.
3. On release: project momentum, snap to the nearest stop or dismiss, pass the release velocity to the spring.
4. Grabbing mid-flight stops the animation and follows the pointer; never lock input during a transition.
5. Enter and exit along the same path (bottom edge). Escape closes. Reduced motion becomes a fade.
6. Depends on `spring-motion`, `glass-surface/glass.css` and `tokens/tokens.css`.
