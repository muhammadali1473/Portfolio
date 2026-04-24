"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Estimate = {
  timeline: string;
  package: "Starter" | "Professional" | "Premium" | "Enterprise";
  stack: string[];
  nextSteps: string[];
};

const PROJECT_TYPES = ["Website", "AI Chatbot", "MCP Server", "Mobile App", "Automation", "Other"];
const TIMELINES = ["ASAP", "1 month", "2-3 months", "Flexible"];
const BUDGETS = ["< $1K", "$1K–5K", "$5K–10K", "$10K–20K", "$20K+"];

export function ProjectEstimator() {
  const [form, setForm] = useState({
    projectType: "AI Chatbot",
    complexity: 3,
    timeline: "1 month",
    budget: "$5K–10K",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.description.trim().length < 10) {
      setError("Give me at least a sentence or two about your project.");
      return;
    }
    setError(null);
    setLoading(true);
    setEstimate(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error ||
            "Something went wrong — please try again or contact Muhammad directly at get.muhammad5@gmail.com",
        );
      }
      setEstimate(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow">
          <Wand2 size={14} />
        </span>
        <div>
          <p className="text-sm font-semibold">Estimate Your Project</p>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Powered by Groq
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Project type">
            <select
              value={form.projectType}
              onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
              className={inputClass}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label={`Complexity: ${complexityLabel(form.complexity)}`}>
            <input
              type="range"
              min={1}
              max={5}
              value={form.complexity}
              onChange={(e) =>
                setForm((f) => ({ ...f, complexity: Number(e.target.value) }))
              }
              className="w-full accent-[#8b5cf6]"
            />
          </Field>
          <Field label="Timeline">
            <select
              value={form.timeline}
              onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
              className={inputClass}
            >
              {TIMELINES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget">
            <select
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              className={inputClass}
            >
              {BUDGETS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Describe your project">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="E.g. A bilingual real estate chatbot that qualifies leads and books viewings via WhatsApp…"
            className={cn(inputClass, "resize-none")}
          />
        </Field>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <Wand2 size={14} aria-hidden />
          )}
          {loading ? "Analyzing…" : "Generate Estimate"}
        </button>
      </form>

      <AnimatePresence>
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <MetricBox label="Timeline" value={estimate.timeline} />
              <MetricBox label="Recommended" value={estimate.package} highlight />
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Suggested Stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {estimate.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Next Steps
              </p>
              <ul className="mt-2 space-y-1.5">
                {estimate.nextSteps.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-foreground/90">
                    <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-white">
                      <Check size={10} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              aria-label="Contact Muhammad about this estimate"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Contact Muhammad →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-white/25";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function MetricBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 p-3",
        highlight ? "bg-gradient-primary-soft" : "bg-white/[0.03]",
      )}
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function complexityLabel(v: number) {
  if (v <= 2) return "Simple";
  if (v >= 4) return "Complex";
  return "Moderate";
}
