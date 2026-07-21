"use client";

import { motion } from "framer-motion";
import { Plug, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

type McpCard = {
  id: string;
  name: string;
  tagline: string;
  status: "production" | "beta";
  tools: number;
  calls: string;
  language: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
};

const MCPS: McpCard[] = [
  {
    id: "linkedin-mcp",
    name: "LinkedIn MCP Server",
    tagline:
      "AI-driven lead research, outreach drafting, and connection analysis.",
    status: "production",
    tools: 8,
    calls: "1,200+ / week",
    language: "Python",
    stack: ["FastAPI", "MCP SDK", "Groq", "Playwright"],
    highlights: [
      "OAuth + session-cookie dual auth",
      "Typed tool schemas with zod-like Pydantic validation",
      "Rate-limit aware scheduler",
    ],
    repoUrl: "https://github.com/muhammadali1473",
  },
  {
    id: "x-mcp-builder",
    name: "X MCP Builder",
    tagline:
      "Post threads, search tweets, run trend analytics — all from an MCP endpoint.",
    status: "production",
    tools: 6,
    calls: "Scheduled daily",
    language: "TypeScript",
    stack: ["Node.js", "MCP SDK", "X API v2", "OAuth 2.0"],
    highlights: [
      "Thread-aware scheduling with draft queue",
      "Trend monitoring with keyword watchlists",
      "Backoff + retry on 429s",
    ],
    repoUrl: "https://github.com/muhammadali1473",
  },
];

export function McpExpertise() {
  return (
    <section id="mcp" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-[0.07] blur-3xl" />
      </div>
      <div className="container">
        <SectionHeading
          eyebrow="MCP Expertise"
          title="Production-grade"
          highlight="MCP servers."
          subtitle="Giving AI agents secure, typed tools for the real world. Here's what that looks like."
        />

        {/* MCP server cards — full-width 2-col grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {MCPS.map((mcp, i) => (
            <Reveal key={mcp.id} delay={i * 0.08}>
              <McpServerCard mcp={mcp} index={i} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface/40 p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  Need a custom MCP for your stack?
                </p>
                <p className="text-sm text-muted-foreground">
                  I&apos;ve built them for LinkedIn, X, and custom CRMs. Yours could be
                  next.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
            >
              Start a conversation →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function McpServerCard({ mcp, index }: { mcp: McpCard; index: number }) {
  const isProd = mcp.status === "production";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur hover:border-white/20 hover:shadow-glow"
    >
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
            <Plug size={17} />
          </div>
          <div>
            <p className="text-sm font-semibold">{mcp.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{mcp.tagline}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
            isProd
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-amber-400/30 bg-amber-400/10 text-amber-300",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isProd
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
            )}
          />
          {isProd ? "Production" : "Beta"}
        </span>
      </div>

      {/* Mini stats */}
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        <MiniStat label="Tools" value={mcp.tools.toString()} />
        <MiniStat label="Usage" value={mcp.calls} />
        <MiniStat label="Language" value={mcp.language} />
      </div>

      {/* Highlights */}
      <ul className="relative mt-5 space-y-1.5">
        {mcp.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-foreground/90">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-primary" />
            {h}
          </li>
        ))}
      </ul>

      {/* Stack pills */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {mcp.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-5 h-px origin-left bg-gradient-primary opacity-60"
      />
    </motion.div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
