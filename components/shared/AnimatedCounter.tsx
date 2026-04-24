"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type Props = {
  /** Final numeric target (used to drive the tween). */
  targetValue: number;
  /**
   * Final rendered string once animation completes (e.g. "12+", "100%").
   * Must contain the digits from targetValue somewhere — we swap them mid-tween.
   */
  display: string;
  /** Accessible label (announced to screen readers). */
  label?: string;
  /** Animation duration in seconds. Defaults to 2s per spec. */
  duration?: number;
  className?: string;
};

/**
 * Animates a number from 0 → targetValue when the element scrolls into view,
 * using Framer Motion's `animate()` + useMotionValue with an easeOut curve.
 * Triggers exactly once.
 *
 * The final rendered output preserves the design's suffix (e.g. "+", "%", "K")
 * by subbing the live number into the `display` template at render time.
 */
export function AnimatedCounter({
  targetValue,
  display,
  label,
  duration = 2,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setCurrent(targetValue);
      return;
    }

    const controls = animate(motionValue, targetValue, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, targetValue, duration, motionValue, prefersReducedMotion]);

  // Swap the numeric portion of `display` with the current animated value
  // while preserving any "+" / "%" / "K" suffix or prefix.
  const targetString = String(targetValue);
  const rendered =
    current >= targetValue
      ? display
      : display.replace(targetString, current.toLocaleString());

  return (
    <span
      ref={ref}
      className={className}
      aria-label={label ? `${display} ${label}` : display}
      role="text"
    >
      <span aria-hidden="true">{rendered}</span>
    </span>
  );
}
