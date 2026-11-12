"use client";

import { motion } from "framer-motion";
import { CLOUD, PLATFORMS, SA_CLAUDE, curlPath } from "@/components/portfolio/social-automation-data";

/**
 * Compact, animated version of the Social Media Automation pitch sized to fill
 * a ProjectThumb tile (absolute inset-0 of a 16:9 box). Same glossy 3D cloud +
 * curly gold arrows with flowing particles as the homepage section, scaled
 * down for a card. Shares geometry via social-automation-data.
 */
export function SocialAutomationThumb({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(140deg,#0a0f26 0%,#1d1340 46%,#3a1c52 100%)" }}
    >
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.1]" />

      {/* curly arrows + flowing particles */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <marker id="sat-arrow" markerWidth="5" markerHeight="5" refX="3.4" refY="2.5" orient="auto">
            <path d="M0 0 L4.5 2.5 L0 5 Z" fill="#ffd87a" />
          </marker>
        </defs>
        {PLATFORMS.map((p, i) => {
          const d = curlPath(CLOUD.x, CLOUD.y, p.x, p.y);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#ecc370" strokeWidth="0.55" strokeLinecap="round" opacity="0.35" />
              <motion.path
                d={d}
                fill="none"
                stroke="#ffd87a"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="2.5 4"
                markerEnd="url(#sat-arrow)"
                initial={{ strokeDashoffset: 13 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: i * 0.12 }}
              />
            </g>
          );
        })}
      </svg>

      {/* 3D platform icons — floating */}
      {PLATFORMS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${(p.y / 60) * 100}%` }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        >
          <div
            className="relative flex h-8 w-8 items-center justify-center rounded-xl shadow-[0_6px_14px_rgba(0,0,0,0.5)] ring-1 ring-white/25 sm:h-10 sm:w-10"
            style={{ background: p.bg }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/45 via-white/5 to-transparent" />
            <div className="pointer-events-none absolute inset-x-1 bottom-1 h-1/3 rounded-b-xl bg-black/20 blur-[2px]" />
            <svg viewBox="0 0 24 24" className="relative h-1/2 w-1/2 drop-shadow" fill="#fff" aria-hidden>
              <path d={p.icon.path} />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* central glossy 3D cloud — breathing */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${CLOUD.x}%`, top: `${(CLOUD.y / 60) * 100}%` }}
        animate={{ y: [0, -4, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/25 blur-2xl sm:h-20 sm:w-20"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg viewBox="0 0 24 24" className="w-16 drop-shadow-[0_10px_16px_rgba(0,0,0,0.55)] sm:w-20" aria-hidden>
            <defs>
              <linearGradient id="sat-cloud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#c7d2fe" />
              </linearGradient>
            </defs>
            <path d="M19 18H6a4 4 0 0 1-.7-7.94A6 6 0 0 1 17.6 8.5 4.5 4.5 0 0 1 19 18Z" fill="url(#sat-cloud)" />
            <ellipse cx="9" cy="11" rx="3.4" ry="1.5" fill="#ffffff" opacity="0.65" />
          </svg>
          <span className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow sm:h-6 sm:w-6">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill={`#${SA_CLAUDE.hex}`} aria-hidden>
              <path d={SA_CLAUDE.path} />
            </svg>
          </span>
        </div>
      </motion.div>

      <span className="sr-only">{title}</span>
    </div>
  );
}
