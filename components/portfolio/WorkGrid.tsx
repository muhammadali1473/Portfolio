"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/constants";
import { ProjectThumb } from "@/components/shared/ProjectThumb";
import { EASE } from "@/components/portfolio/motion";

/**
 * Filterable project grid shared by the homepage "Selected Work" teaser and the
 * full "/ALL WORK" page. Cards show a real screenshot or the project's bespoke
 * ProjectThumb mockup, with the same hover/scroll motion across both.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const [active, setActive] = useState("All");
  const shown = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1">
        {filters.map((f) => (
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
                layoutId="workgrid-tab"
                className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE, delay: (i % 3) * 0.05 }}
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
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-medium text-neutral-900 transition-colors group-hover:text-neutral-700">
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
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 ring-1 ring-black/5">
      {children}
    </span>
  );
}
