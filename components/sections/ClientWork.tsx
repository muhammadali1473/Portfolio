"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CircleDashed,
  CircleCheck,
  Filter,
  ExternalLink,
  Globe,
  Sparkles,
  User2,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project, type ProjectStatus } from "@/lib/constants";

type FilterValue = "All" | "Shipped" | "In Progress" | "Proposal Stage";

export function ClientWork() {
  const [filter, setFilter] = useState<FilterValue>("All");

  const rows = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Shipped") return p.status === "shipped";
    if (filter === "In Progress") return p.status === "in-progress";
    return p.status === "proposal";
  });

  const shipped = PROJECTS.filter((p) => p.status === "shipped").length;
  const inProgress = PROJECTS.filter(
    (p) => p.status === "in-progress" || p.status === "proposal",
  ).length;

  return (
    <section id="client-work" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Client Delivery Dashboard"
          title="Work shipped and"
          highlight="proposals in flight."
          subtitle="An honest, transparent view: personal products live in production, plus concepts currently at proposal stage."
        />

        {/* Summary cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard
            icon={<Sparkles size={16} />}
            label="Total projects"
            value={PROJECTS.length.toString()}
          />
          <SummaryCard
            icon={<CircleCheck size={16} />}
            label="Shipped"
            value={shipped.toString()}
            accent="emerald"
          />
          <SummaryCard
            icon={<CircleDashed size={16} />}
            label="In progress"
            value={`${inProgress} (Proposal Stage)`}
            accent="amber"
          />
          <SummaryCard
            icon={<Building2 size={16} />}
            label="Distinct clients"
            value="2 personal + 3 pitching"
          />
        </div>

        {/* Filter bar */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface/40 p-3 backdrop-blur">
            <div className="flex items-center gap-2 pl-1">
              <Filter size={14} className="text-muted-foreground" aria-hidden />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Filter
              </span>
            </div>
            <div
              role="tablist"
              aria-label="Filter projects by status"
              className="flex flex-wrap items-center gap-1"
            >
              {(["All", "Shipped", "Proposal Stage"] as const).map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    filter === f
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="clientFilterPill"
                      className="absolute inset-0 rounded-full bg-gradient-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dashboard — desktop table */}
        <Reveal delay={0.05} className="mt-6 hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/40 backdrop-blur">
            <div className="grid grid-cols-[2fr_1.2fr_1fr_1.4fr_1fr_auto] gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Project</span>
              <span>Client</span>
              <span>Role</span>
              <span>Stack</span>
              <span>Status</span>
              <span className="text-right">Link</span>
            </div>
            <AnimatePresence initial={false}>
              {rows.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className={cn(
                    "grid grid-cols-[2fr_1.2fr_1fr_1.4fr_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]",
                    i < rows.length - 1 && "border-b border-white/5",
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CategoryDot category={p.category} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.outcome}
                      </p>
                    </div>
                  </div>
                  <span className="truncate text-sm text-foreground/90">
                    {p.client || "—"}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    {p.role || "—"}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        +{p.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <StatusPill status={p.status} />
                  <div className="flex justify-end">
                    {p.demoUrl && p.demoUrl !== "#" ? (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} in a new tab`}
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-foreground/80 transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={11} aria-hidden /> Open
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">—</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Dashboard — mobile card list */}
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          <AnimatePresence initial={false}>
            {rows.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="rounded-2xl border border-white/10 bg-surface/40 p-4 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <CategoryDot category={p.category} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{p.title}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {p.client} · {p.role}
                      </p>
                    </div>
                  </div>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{p.outcome}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.demoUrl && p.demoUrl !== "#" && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} in a new tab`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold gradient-text"
                  >
                    <ExternalLink size={11} aria-hidden /> Open link
                  </a>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "emerald" | "amber";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid h-7 w-7 place-items-center rounded-lg text-white",
            accent === "emerald" && "bg-emerald-500/90 shadow-[0_0_18px_rgba(52,211,153,0.45)]",
            accent === "amber" && "bg-amber-500/90 shadow-[0_0_18px_rgba(251,191,36,0.45)]",
            !accent && "bg-gradient-primary shadow-glow",
          )}
        >
          {icon}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-3 text-lg font-bold tracking-tight sm:text-xl">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: ProjectStatus }) {
  const map = {
    shipped: {
      label: "Shipped",
      cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    },
    "in-progress": {
      label: "In Progress",
      cls: "border-amber-400/30 bg-amber-400/10 text-amber-300",
      dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    },
    proposal: {
      label: "Proposal Stage",
      cls: "border-sky-400/30 bg-sky-400/10 text-sky-300",
      dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]",
    },
  } as const;
  const cfg = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        cfg.cls,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function CategoryDot({ category }: { category: Project["category"] }) {
  const map = {
    Client: { label: "Client", color: "from-violet-400 to-fuchsia-400", icon: <User2 size={12} /> },
    Product: { label: "Product", color: "from-sky-400 to-cyan-400", icon: <Sparkles size={12} /> },
    "Open Source": { label: "OSS", color: "from-emerald-400 to-lime-400", icon: <Globe size={12} /> },
    "iOS App": { label: "iOS", color: "from-amber-300 to-rose-400", icon: <Sparkles size={12} /> },
  } as const;
  const cfg = map[category];
  return (
    <span
      title={cfg.label}
      aria-label={cfg.label}
      className={cn(
        "grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white",
        cfg.color,
      )}
    >
      {cfg.icon}
    </span>
  );
}
