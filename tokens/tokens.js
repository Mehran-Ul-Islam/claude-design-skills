// Single source of truth. tokens.css and tailwind.preset.js are derived from this file.
// Run `npm run tokens` after editing.

export const palette = {
  light: {
    canvas: "#F2F2F5",
    surface: "#FFFFFF",
    ink: "#1D1D1F",
    inkMuted: "#6E6E73",
    hairline: "rgba(0, 0, 0, 0.08)",
    accent: "#3355FF",
    accentPressed: "#2440D6",
    danger: "#D92D20",
    success: "#1F9D55",
  },
  dark: {
    canvas: "#1C1C1E",
    surface: "#2C2C2E",
    ink: "#F5F5F7",
    inkMuted: "#98989F",
    hairline: "rgba(255, 255, 255, 0.10)",
    accent: "#6B83FF",
    accentPressed: "#8A9CFF",
    danger: "#FF6B5E",
    success: "#4CC47E",
  },
};

// Tracking is size-specific: tighter as type grows, slightly open when small.
export const type = {
  family: 'system-ui, -apple-system, "SF Pro Text", "Segoe UI", sans-serif',
  scale: {
    caption: { size: "0.75rem", leading: 1.33, tracking: "0.01em", weight: 500 },
    footnote: { size: "0.8125rem", leading: 1.38, tracking: "0.005em", weight: 400 },
    body: { size: "1rem", leading: 1.5, tracking: "0em", weight: 400 },
    headline: { size: "1.0625rem", leading: 1.35, tracking: "-0.005em", weight: 600 },
    title3: { size: "1.25rem", leading: 1.3, tracking: "-0.01em", weight: 600 },
    title2: { size: "1.5rem", leading: 1.25, tracking: "-0.015em", weight: 650 },
    title1: { size: "2rem", leading: 1.15, tracking: "-0.02em", weight: 700 },
    display: { size: "clamp(2.5rem, 6vw, 4rem)", leading: 1.05, tracking: "-0.025em", weight: 700 },
  },
};

// 4pt grid. Anything else is a bug the audit will flag.
export const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 };

// Radius encodes hierarchy: small controls < cards < sheets. Never one radius for everything.
export const radius = { sm: 8, md: 12, lg: 20, xl: 28, pill: 999 };

export const shadow = {
  thin: "0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06)",
  regular: "0 2px 4px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.12)",
  thick: "0 4px 8px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.20)",
};

// Bigger surfaces read thicker: more blur, more opacity, deeper shadow.
export const material = {
  thin: { blur: 12, saturate: 160, alpha: 0.55 },
  regular: { blur: 20, saturate: 180, alpha: 0.62 },
  thick: { blur: 32, saturate: 200, alpha: 0.72 },
};

export const glassBase = { light: "255, 255, 255", dark: "44, 44, 46" };
