"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasFinePointer || prefersReducedMotion) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2"
    >
      {/* A radial gradient, not a blurred circle. `blur-3xl` is a CSS filter,
          and the browser re-ran a 64px gaussian blur over a 256px element on
          every mouse move. The gradient paints the same soft glow for free.
          mix-blend-screen was dropped for the same reason — blend modes force
          the whole stacking context to recomposite each frame. */}
      <div
        className="h-56 w-56 rounded-full opacity-[0.13]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(59,130,246,0.55) 45%, rgba(6,182,212,0) 70%)",
        }}
      />
    </motion.div>
  );
}
