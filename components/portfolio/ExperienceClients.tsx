"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CLIENT_DELIVERABLES, EXPERIENCE_CAPABILITIES } from "@/lib/constants";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { EASE } from "@/components/portfolio/motion";

/**
 * Dark "/EXPERIENCE" block listing real shipped client work. Hovering a row
 * fades in that project's screenshot (or bespoke mockup) at a fixed spot and
 * dims the other rows — only colour/opacity change, nothing tracks the cursor.
 */
const ROWS = [...CLIENT_DELIVERABLES].sort(
  (a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)),
);

export function ExperienceClients() {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeRow = ROWS.find((r) => r.id === hovered);

  return (
    <section id="experience" className="px-4 py-6 sm:px-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-[28px] bg-neutral-900 px-6 py-12 sm:px-12 sm:py-16"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 top-6 select-none font-[family-name:var(--font-display)] text-[13vw] font-extrabold uppercase tracking-tight text-white/[0.04]"
        >
          Experience
        </span>

        <div className="relative flex items-baseline justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            <span className="text-neutral-600">/</span>EXPERIENCE
          </h2>
          <span className="text-sm text-neutral-400">4+ years shipping</span>
        </div>

        {/* Capability strip — the breadth of delivery behind the shipped work:
            what I build, how I grow it, and the stack underneath. */}
        <div className="relative mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            What I deliver
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXPERIENCE_CAPABILITIES.map((cap, i) => (
              <motion.span
                key={cap}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                {cap}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Fixed preview: fades in on hover, does not follow the cursor. */}
        <div className="pointer-events-none absolute right-10 top-1/2 z-20 hidden w-72 -translate-y-1/2 lg:block">
          <AnimatePresence mode="wait">
            {activeRow && (
              <motion.div
                key={activeRow.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
              >
                <ProjectThumb
                  slug={activeRow.thumb}
                  title={activeRow.title}
                  image={activeRow.image}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mt-8 border-t border-white/10">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              className="border-b border-white/10"
            >
              <Link
                href={`/projects/${r.id}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 transition-opacity duration-300"
                style={{ opacity: hovered && hovered !== r.id ? 0.4 : 1 }}
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-white transition-colors sm:text-xl">
                    {r.client?.split("(")[0].trim() || r.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-neutral-400">{r.title}</p>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="hidden text-sm text-neutral-400 sm:inline">
                    {r.outcome.replace(/^Live at /, "")}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-neutral-500 transition-colors group-hover:text-white"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
