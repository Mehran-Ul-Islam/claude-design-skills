import { useReducedMotion } from "framer-motion";

/**
 * Apple-style spring (damping ratio + response) -> Framer Motion physics.
 *   stiffness = (2π / response)²
 *   damping   = 4π · dampingRatio / response     (mass = 1)
 * damping ratio 1.0 = critically damped (no overshoot). < 1.0 overshoots.
 * `response` is how fast it reaches the target in seconds. It is NOT a duration.
 */
export function spring({ damping = 1, response = 0.4 } = {}) {
  const omega = (2 * Math.PI) / response;
  return {
    type: "spring",
    stiffness: omega * omega,
    damping: (4 * Math.PI * damping) / response,
    mass: 1,
  };
}

export const springs = {
  default: spring({ damping: 1, response: 0.4 }), // reposition, expand, appear
  press: spring({ damping: 1, response: 0.2 }), // pointer-down feedback
  rotate: spring({ damping: 0.8, response: 0.4 }),
  sheet: spring({ damping: 0.8, response: 0.3 }),
  momentum: spring({ damping: 0.8, response: 0.35 }), // only after a flick or throw
};

// Reduced-motion fallback: short cross-fade, no travel, no overshoot.
export const fade = { type: "tween", duration: 0.2, ease: "easeOut" }; // audit-ignore

/** Pick a spring for a gesture release: bounce only if the gesture carried momentum. */
export function springForRelease(velocity = 0, threshold = 300) {
  return Math.abs(velocity) > threshold ? springs.momentum : springs.default;
}

/** Hook: returns the spring (or the fade when the user prefers reduced motion). */
export function useSpringTransition(name = "default") {
  const reduced = useReducedMotion();
  return reduced ? fade : springs[name];
}

/**
 * Where a flick will come to rest (exponential decay, Apple's projection).
 * velocity in px/s. 0.998 = scroll feel, 0.99 = snappier.
 */
export function project(velocity, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary. */
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (
    (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
  );
}

/** Closest value in `points` to `value`. */
export function nearest(value, points) {
  return points.reduce((best, p) => (Math.abs(p - value) < Math.abs(best - value) ? p : best));
}
