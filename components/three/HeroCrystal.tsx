"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, type MouseEvent } from "react";

// Pure-CSS 3D "crystal" — no WebGL, no Three.js. Six semi-transparent panels
// arranged as an octahedral shell, a glowing core, plus mouse-parallax tilt.
export default function HeroCrystal() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const tiltX = useTransform(srx, (v) => `${v}deg`);
  const tiltY = useTransform(sry, (v) => `${v}deg`);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rx.set(ny * -8);
      ry.set(nx * 12);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rx, ry]);

  const onContainerMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    rx.set(ny * -18);
    ry.set(nx * 24);
  };
  const onContainerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      onMouseMove={onContainerMove}
      onMouseLeave={onContainerLeave}
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Orbital rings */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="absolute h-[85%] w-[85%] rounded-full border border-white/10"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.25) 90deg, transparent 180deg, rgba(6,182,212,0.25) 270deg, transparent 360deg)",
            maskImage:
              "radial-gradient(circle, transparent 55%, black 57%, black 60%, transparent 62%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 55%, black 57%, black 60%, transparent 62%)",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute h-[70%] w-[70%] rounded-full border border-white/5"
          style={{
            background:
              "conic-gradient(from 45deg, rgba(59,130,246,0.35), transparent 120deg, rgba(139,92,246,0.35), transparent 240deg, rgba(6,182,212,0.35), transparent 360deg)",
            maskImage:
              "radial-gradient(circle, transparent 52%, black 54%, black 55%, transparent 57%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 52%, black 54%, black 55%, transparent 57%)",
          }}
        />
      </div>

      {/* Crystal — 3D shape made of 3 rotating quads */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX: tiltX,
          rotateY: tiltY,
        }}
        className="relative h-[58%] w-[58%]"
      >
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Core glow */}
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full opacity-80 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #a78bfa 0%, #3b82f6 40%, #06b6d4 80%, transparent 100%)",
            }}
          />

          {/* Three diamond-shaped "faces" rotated in 3D */}
          <Face rotation="rotateY(0deg)" />
          <Face rotation="rotateY(60deg)" />
          <Face rotation="rotateY(120deg)" />
        </motion.div>

        {/* Slow counter-rotation for depth */}
        <motion.div
          animate={{ rotateX: 360 }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="absolute inset-[14%]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-full border border-white/20"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 60%)",
              boxShadow:
                "inset 0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(6,182,212,0.18)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating sparks */}
      <Sparks />

      {/* Bottom shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[78%] h-6 w-1/2 -translate-x-1/2 rounded-full bg-black/60 blur-2xl"
      />
    </div>
  );
}

function Face({ rotation }: { rotation: string }) {
  return (
    <div
      aria-hidden
      className="absolute inset-[8%]"
      style={{
        transform: rotation,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 rounded-[30%]"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.7) 0%, rgba(59,130,246,0.55) 50%, rgba(6,182,212,0.7) 100%)",
          boxShadow:
            "0 0 40px rgba(139,92,246,0.35), inset 0 0 30px rgba(255,255,255,0.18)",
          transform: "rotate(45deg)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(4px)",
        }}
      />
    </div>
  );
}

function Sparks() {
  const sparks = [
    { top: "12%", left: "18%", size: 4, delay: 0 },
    { top: "22%", left: "82%", size: 3, delay: 1.2 },
    { top: "68%", left: "14%", size: 5, delay: 2.4 },
    { top: "74%", left: "78%", size: 3, delay: 0.8 },
    { top: "46%", left: "92%", size: 4, delay: 3.0 },
    { top: "38%", left: "6%", size: 3, delay: 1.8 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6], y: [-6, 6, -6] }}
          transition={{
            duration: 3.6,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 12px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}
