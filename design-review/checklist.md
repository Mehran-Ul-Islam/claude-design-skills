# Designer's-eye checklist

**Hierarchy:** one clear primary action per view. Size, weight and contrast agree on what matters most. Labels are specific ("Save changes", not "Submit").

**Spacing rhythm:** every gap is on the 4pt grid. Related things sit closer than unrelated things. Radii step up with surface size.

**Tokens:** no raw hex. No one-off font sizes. Tracking tightens as type grows. Text uses rem.

**Interaction:** press feedback on pointer-down. Drags track 1:1. Anything animated can be grabbed and reversed. Springs only, bounce only after momentum. No decorative loops.

**Material:** glass only on floating layers. Thickness matches surface size. No stacked glass.

**Accessibility:** visible keyboard focus. `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast` handled. Contrast holds over glass.

**Generated-UI tells:** identical rounded cards everywhere, gradient washes as decoration, all-caps tracked labels above every heading, numbered markers on non-sequences, fade-and-slide-up on every section.
