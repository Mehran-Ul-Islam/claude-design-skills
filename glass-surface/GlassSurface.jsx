import { motion, useReducedMotion } from "framer-motion";
import { springs, fade } from "../spring-motion/springs.js";
import { material } from "../tokens/tokens.js";
import "./glass.css";

/**
 * Translucent material. It materializes: blur radius, scale and opacity animate
 * together on enter, so it reads as a surface arriving, not a plain fade.
 *
 * Rule: never stack a thin glass surface on another glass surface.
 */
export default function GlassSurface({
  thickness = "regular",
  as = "div",
  animateIn = true,
  className = "",
  style,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  const m = material[thickness] ?? material.regular;
  const filter = `blur(${m.blur}px) saturate(${m.saturate}%)`;
  const off = "blur(0px) saturate(100%)";

  const initial = !animateIn
    ? false
    : reduced
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.96, backdropFilter: off, WebkitBackdropFilter: off };

  return (
    <Comp
      data-thickness={thickness}
      className={`glass ${className}`}
      style={{ borderRadius: "var(--radius-lg)", ...style }}
      initial={initial}
      animate={{ opacity: 1, scale: 1, backdropFilter: filter, WebkitBackdropFilter: filter }}
      transition={reduced ? fade : springs.default}
      {...rest}
    >
      {children}
    </Comp>
  );
}
