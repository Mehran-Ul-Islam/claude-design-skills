import { palette, type, space, radius, shadow } from "./tokens.js";

const kebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

const colors = Object.fromEntries(
  Object.keys(palette.light).map((k) => [kebab(k), `var(--${kebab(k)})`])
);

/** Tailwind preset: `presets: [tokenPreset]` in tailwind.config.js */
export default {
  theme: {
    extend: {
      colors,
      fontFamily: { sans: [type.family] },
      fontSize: Object.fromEntries(
        Object.entries(type.scale).map(([k, t]) => [
          k,
          [t.size, { lineHeight: String(t.leading), letterSpacing: t.tracking, fontWeight: String(t.weight) }],
        ])
      ),
      spacing: Object.fromEntries(Object.entries(space).map(([k, v]) => [k, `${v / 16}rem`])),
      borderRadius: Object.fromEntries(Object.entries(radius).map(([k, v]) => [k, `${v}px`])),
      boxShadow: shadow,
    },
  },
};
