import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { springs, springForRelease, fade, project, nearest } from "../spring-motion/springs.js";
import "../glass-surface/glass.css";

function useViewportHeight() {
  const [vh, setVh] = useState(() => (typeof window === "undefined" ? 800 : window.innerHeight));
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vh;
}

/**
 * Controlled, draggable bottom sheet.
 *  - 1:1 pointer tracking from the handle/header (Framer drag + rubber-band at the edges)
 *  - release: project momentum, snap to the nearest stop (or dismiss), hand off velocity
 *  - interruptible: grabbing mid-flight stops the animation and follows the pointer
 *  - bounce only when the release carried momentum
 *
 * snapPoints: visible fractions of max height, ascending. e.g. [0.5, 1]
 */
export default function Sheet({
  open,
  onClose,
  snapPoints = [0.5, 1],
  initialSnap = 0,
  title,
  modal = true,
  children,
}) {
  const reduced = useReducedMotion();
  const vh = useViewportHeight();
  const maxH = Math.round(vh * 0.94);
  const snapKey = snapPoints.join(",");

  // y offsets (0 = fully open). Ascending fractions -> descending y.
  const stops = useMemo(
    () => snapPoints.map((f) => Math.round(maxH * (1 - f))),
    [snapKey, maxH] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const topY = Math.min(...stops);
  const closedY = maxH + 32;

  const y = useMotionValue(closedY);
  const controls = useDragControls();
  const sheetRef = useRef(null);
  const snapIndex = useRef(initialSnap);
  const [mounted, setMounted] = useState(open);

  const scrimOpacity = useTransform(y, [topY, closedY], [1, 0]);
  const scrimBlur = useTransform(y, [topY, closedY], ["blur(8px)", "blur(0px)"]);

  // Open / close. Cleanup stops the running animation so the next one starts
  // from the live on-screen value (never from the logical target).
  useEffect(() => {
    if (open) {
      setMounted(true);
      if (y.get() > closedY) y.set(closedY);
      if (reduced) {
        y.set(stops[snapIndex.current]);
        return;
      }
      const ctl = animate(y, stops[snapIndex.current], {
        ...springs.default,
        velocity: y.getVelocity(),
      });
      sheetRef.current?.focus();
      return () => ctl.stop();
    }
    if (reduced) {
      y.set(closedY); // unmount happens when the opacity fade completes
      return;
    }
    const ctl = animate(y, closedY, {
      ...springs.default,
      velocity: y.getVelocity(),
      onComplete: () => setMounted(false),
    });
    return () => ctl.stop();
  }, [open, stops, closedY, reduced, y]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function onDragEnd(_, info) {
    const v = info.velocity.y;
    const projected = y.get() + project(v, 0.99);
    const target = nearest(projected, [...stops, closedY]);
    if (target === closedY) {
      onClose?.(); // parent flips `open`; the effect animates from the live value + velocity
      return;
    }
    snapIndex.current = stops.indexOf(target);
    animate(y, target, { ...springForRelease(v), velocity: v });
  }

  if (!mounted) return null;

  return (
    <>
      {modal && (
        <motion.div
          aria-hidden="true"
          onClick={onClose}
          style={{
            opacity: reduced ? 1 : scrimOpacity,
            backdropFilter: reduced ? "none" : scrimBlur,
            WebkitBackdropFilter: reduced ? "none" : scrimBlur,
          }}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}
      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal={modal}
        aria-label={title}
        tabIndex={-1}
        data-thickness="thick"
        className="glass fixed inset-x-0 bottom-0 z-50 flex flex-col"
        style={{
          y,
          height: maxH,
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          borderBottomWidth: 0,
        }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: topY, bottom: closedY }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        initial={reduced ? { opacity: 0 } : false}
        animate={{ opacity: reduced ? (open ? 1 : 0) : 1 }}
        transition={fade}
        onAnimationComplete={() => {
          if (reduced && !open) setMounted(false);
        }}
      >
        <div
          onPointerDown={(e) => controls.start(e)}
          className="flex shrink-0 cursor-grab touch-none flex-col items-center gap-2 px-4 pb-2 pt-3 active:cursor-grabbing"
        >
          <div
            aria-hidden="true"
            className="h-1 w-10"
            style={{ background: "var(--ink-muted)", opacity: 0.4, borderRadius: "var(--radius-pill)" }}
          />
          {title && (
            <h2
              style={{
                font: "var(--text-headline-weight) var(--text-headline-size) / var(--text-headline-leading) var(--font)",
                letterSpacing: "var(--text-headline-tracking)",
              }}
            >
              {title}
            </h2>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8">{children}</div>
      </motion.div>
    </>
  );
}
