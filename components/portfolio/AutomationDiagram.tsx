"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/portfolio/motion";
import { CLOUD, PLATFORMS, SA_CLAUDE, curlPath } from "@/components/portfolio/social-automation-data";

/**
 * The animated automation stage: a glossy Claude mark at the centre with curly
 * gold arrows flowing out to each platform's 3D icon. Shared by the homepage
 * Automation section and the /automation detail page so the two never drift.
 *
 * When `iconHrefBase` is provided, each platform icon becomes a link to
 * `${iconHrefBase}${slug}` (e.g. "/automation#" on the homepage, or "#" on the
 * detail page). Without it, the icons are static. A plain string is used rather
 * than a function so this works when rendered from a server component too.
 */
export function AutomationDiagram({
  iconHrefBase,
}: {
  iconHrefBase?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
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
              <path d="M0 0 L4.5 2.5 L0 5 Z" fill="#d99a1f" />
            </marker>
          </defs>
          {PLATFORMS.map((p, i) => {
            const d = curlPath(CLOUD.x, CLOUD.y, p.x, p.y);
            return (
              <g key={i}>
                {/* faint always-on connection */}
                <path d={d} fill="none" stroke="#d99a1f" strokeWidth="0.55" strokeLinecap="round" opacity="0.3" />
                {/* bright gold dashes marching cloud → platform (the "flow") */}
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#d99a1f"
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
        {PLATFORMS.map((p, i) => {
          const inner = (
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
          );
          return (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${(p.y / 60) * 100}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
            >
              {iconHrefBase ? (
                <a
                  href={`${iconHrefBase}${p.slug}`}
                  aria-label={`${p.name} automation — how it helps`}
                  title={`${p.name} — how the automation helps`}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}

        {/* central Claude hub — breathing */}
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
            className="relative flex items-center justify-center"
          >
            {/* pulsing halo */}
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/25 blur-2xl sm:h-36 sm:w-36"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Claude mark — the hub */}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:h-20 sm:w-20">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-transparent to-transparent"
              />
              <svg viewBox="0 0 24 24" className="relative h-8 w-8 sm:h-10 sm:w-10" fill={`#${SA_CLAUDE.hex}`} aria-hidden>
                <path d={SA_CLAUDE.path} />
              </svg>
            </span>
          </motion.div>
          <span className="mt-2 block whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.2em] text-amber-600">
            MCP · Automation Hub
          </span>
        </motion.div>
      </div>
    </div>
  );
}
