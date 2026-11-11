"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { Reveal, EASE } from "@/components/portfolio/motion";

/**
 * "/SELECTED WORK" grid with category filter tabs. Each card shows the project's
 * real screenshot where one exists, and otherwise the bespoke branded mockup
 * from ProjectThumb (MCP network view, chat window, RAG document, CRM board…).
 */

const FILTERS = ["All", "Client", "Open Source", "iOS App"] as const;
type Filter = (typeof FILTERS)[number];

export function SelectedWork() {
  const [active, setActive] = useState<Filter>("All");

  const projects = useMemo(
    () =>
      active === "All"
        ? FEATURED_PROJECTS
        : FEATURED_PROJECTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="work" className="relative px-5 py-16 sm:px-10 sm:py-24">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -z-0 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[14vw] font-extrabold uppercase tracking-tight text-neutral-200/60"
      >
        Portfolio
      </span>

      <Reveal>
        <h2 className="relative text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          <span className="text-neutral-400">/</span>SELECTED WORK
        </h2>
      </Reveal>

      {/* Tabs + view all */}
      <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f ? "text-white" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="work-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5"
        >
          View All Work
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {/* Grid */}
      <motion.div layout className="relative mt-8 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.06 }}
            >
              <Link href={`/projects/${p.id}`} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]"
                >
                  <div className="origin-center transition-transform duration-500 ease-out group-hover:scale-[1.04] [&>div]:rounded-2xl [&>div]:border-0">
                    <ProjectThumb slug={p.thumb} title={p.title} image={p.image} />
                  </div>
                  <span className="absolute right-4 top-4 z-10 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </motion.div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-medium text-neutral-900 transition-colors group-hover:text-neutral-700">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag>{p.category}</Tag>
                  {p.tech[0] && <Tag>{p.tech[0]}</Tag>}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 ring-1 ring-black/5">
      {children}
    </span>
  );
}
