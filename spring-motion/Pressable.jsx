import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springs, fade } from "./springs.js";

/**
 * Button with instant pointer-down feedback. whileTap fires on pointer-down,
 * not on release, and the spring re-targets from the live value if interrupted.
 */
const Pressable = forwardRef(function Pressable({ children, className = "", ...rest }, ref) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      ref={ref}
      type="button"
      whileTap={reduced ? { opacity: 0.7 } : { scale: 0.97 }}
      transition={reduced ? fade : springs.press}
      className={`focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

export default Pressable;
