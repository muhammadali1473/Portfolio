"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/portfolio/motion";
import { CLOUD, PLATFORMS, SA_CLAUDE, curlPath } from "@/components/portfolio/social-automation-data";

/**
 * A standalone, fully-animated showcase for the Social Media Automation (MCP)
 * pitch — NOT a static thumbnail. A glossy 3D cloud sits at the centre and
 * curly gold arrows reach out to each platform's 3D icon, with gold particles
 * continuously flowing cloud → channel to read as "one hub driving every
 * network". Icons float on staggered loops; the cloud breathes.
 */
export function SocialAutomationSection() {
  return (
    <section id="automation" className="px-4 py-6 sm:px-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 sm:py-16"
        style={{ background: "linear-gradient(140deg,#0a0f26 0%,#1d1340 46%,#3a1c52 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.1]" />

        {/* heading */}
        <div className="relative flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            <span className="text-white/30">/</span>AUTOMATION
          </h2>
          <span className="text-sm text-amber-200/80">One cloud · six channels</span>
        </div>
        <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          A single Claude-driven MCP hub that runs LinkedIn, Instagram, Facebook,
          TikTok, X and Reddit — comments, DMs, posts and lead capture, flowing
          out from one place.
        </p>

        {/* animated stage */}
        <div className="relative mx-auto mt-8 w-full max-w-3xl">
          <div className="relative aspect-[16/11] w-full">
            {/* curly arrows + flowing particles */}
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <marker id="sa2-arrow" markerWidth="5" markerHeight="5" refX="3.4" refY="2.5" orient="auto">
                  <path d="M0 0 L4.5 2.5 L0 5 Z" fill="#ffd87a" />
                </marker>
              </defs>
              {PLATFORMS.map((p, i) => {
                const d = curlPath(CLOUD.x, CLOUD.y, p.x, p.y);
                return (
                  <g key={i}>
                    {/* faint always-on connection */}
                    <path d={d} fill="none" stroke="#ecc370" strokeWidth="0.55" strokeLinecap="round" opacity="0.35" />
                    {/* bright gold dashes marching cloud → platform (the "flow") */}
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#ffd87a"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      strokeDasharray="2.5 4"
                      markerEnd="url(#sa2-arrow)"
                      initial={{ strokeDashoffset: 13 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: i * 0.12 }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* 3D platform icons — floating on staggered loops */}
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${(p.y / 60) * 100}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  whileHover={{ scale: 1.12, rotate: -4 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_10px_22px_rgba(0,0,0,0.5)] ring-1 ring-white/25 sm:h-16 sm:w-16"
                  style={{ background: p.bg }}
                >
                  {/* top gloss + bottom inner shadow = 3D */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/45 via-white/5 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-1 bottom-1 h-1/3 rounded-b-2xl bg-black/20 blur-[2px]" />
                  <svg viewBox="0 0 24 24" className="relative h-1/2 w-1/2 drop-shadow" fill="#fff" aria-hidden>
                    <path d={p.icon.path} />
                  </svg>
                </motion.div>
              </motion.div>
            ))}

            {/* central glossy 3D cloud — breathing */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${CLOUD.x}%`, top: `${(CLOUD.y / 60) * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <motion.div
                animate={{ y: [0, -5, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* pulsing halo */}
                <motion.span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/25 blur-2xl sm:h-36 sm:w-36"
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <svg viewBox="0 0 24 24" className="w-28 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)] sm:w-36" aria-hidden>
                  <defs>
                    <linearGradient id="sa2-cloud" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#c7d2fe" />
                    </linearGradient>
                  </defs>
                  <path d="M19 18H6a4 4 0 0 1-.7-7.94A6 6 0 0 1 17.6 8.5 4.5 4.5 0 0 1 19 18Z" fill="url(#sa2-cloud)" />
                  <ellipse cx="9" cy="11" rx="3.4" ry="1.5" fill="#ffffff" opacity="0.65" />
                </svg>
                {/* Claude badge */}
                <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg sm:h-10 sm:w-10">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill={`#${SA_CLAUDE.hex}`} aria-hidden>
                    <path d={SA_CLAUDE.path} />
                  </svg>
                </span>
              </motion.div>
              <span className="mt-2 block whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200/90">
                MCP · Automation Hub
              </span>
            </motion.div>
          </div>
        </div>

        {/* tech chips */}
        <div className="relative mt-6 flex flex-wrap justify-center gap-2">
          {["Claude", "MCP Protocol", "Python", "Unipile"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
