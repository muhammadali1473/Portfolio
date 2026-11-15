"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  Send,
  AlertCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";
import { socials, telLink, whatsappLink } from "@/lib/site";
import { EASE } from "@/components/portfolio/motion";
import { cn } from "@/lib/utils";

/**
 * "/CONTACT" — the contact experience in the redesigned light portfolio theme.
 * Replaces the old dark-gradient Contact section. Posts to the same
 * `/api/contact` endpoint and offers the same direct channels, restyled to sit
 * inside the floating white page card.
 */

const PROJECT_TYPES = [
  "Website",
  "AI Chatbot",
  "MCP Server",
  "Mobile App",
  "Automation",
  "SEO & AEO",
  "Other",
] as const;

const BUDGETS = ["< $500", "$500–1K", "$1K–2.5K", "$2.5K–5K", "$5K+"] as const;

// Only the two "start a conversation" channels. The social profiles
// (GitHub, LinkedIn, X, Upwork) already live in the homepage hero, so they
// are intentionally not duplicated here.
const DIRECT_CHANNELS = [
  { label: "WhatsApp", href: whatsappLink() || telLink(), Icon: WhatsAppIcon, hex: "25D366" },
  { label: "Email", href: `mailto:${socials.email}`, Icon: Mail, hex: "0EA5E9" },
];

type Form = {
  name: string;
  email: string;
  company: string;
  budget: string;
  projectTypes: string[];
  message: string;
};

const emptyForm: Form = {
  name: "",
  email: "",
  company: "",
  budget: "$1K–2.5K",
  projectTypes: [],
  message: "",
};

export function ContactPortfolio() {
  const [form, setForm] = useState<Form>(emptyForm);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function toggleType(t: string) {
    setForm((f) =>
      f.projectTypes.includes(t)
        ? { ...f, projectTypes: f.projectTypes.filter((x) => x !== t) }
        : { ...f, projectTypes: [...f.projectTypes, t] },
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setError("Enter a valid email.");
    if (form.message.trim().length < 10) return setError("Tell me a bit more about your project.");

    setState("loading");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("success");
      setForm(emptyForm);
    } catch (err) {
      setState("error");
      setError(
        (err as Error).name === "AbortError"
          ? `That took too long to send. Please email ${socials.email} directly.`
          : (err as Error).message,
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section id="contact" className="relative px-5 pb-16 pt-10 sm:px-10 sm:pb-24">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2 -z-0 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[14vw] font-extrabold uppercase tracking-tight text-neutral-200/60"
      >
        Contact
      </span>

      <h1 className="relative text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
        <span className="text-neutral-400">/</span>CONTACT
      </h1>
      <p className="relative mx-auto mt-3 max-w-lg text-center text-[15px] text-neutral-500">
        Tell me what you&apos;re building and I&apos;ll reply within a day — or
        reach me directly on any channel below.
      </p>

      <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          onSubmit={submit}
          className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name *">
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email *">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
                placeholder="jane@company.com"
              />
            </Field>
            <Field label="Company">
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className={inputClass}
                placeholder="Acme Inc."
              />
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

          <Field label="Project type" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((t) => {
                const active = form.projectTypes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    aria-pressed={active}
                    className={cn(
                      "min-h-[40px] rounded-full border px-4 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30",
                      active
                        ? "border-transparent bg-neutral-900 text-white"
                        : "border-black/10 bg-neutral-50 text-neutral-600 hover:border-black/25 hover:text-neutral-900",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Tell me about your project *" className="mt-4">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={cn(inputClass, "resize-none")}
              placeholder="What are you trying to build? What problem does it solve? Any deadlines?"
            />
          </Field>

          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-600/25 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>Got it — I&apos;ll reply within a few hours. Thanks for reaching out!</span>
            </motion.div>
          )}
          {error && state !== "success" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-900 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {state === "loading" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {state === "loading" ? "Sending…" : "Send Message"}
          </button>
        </motion.form>

        {/* Direct channels */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Reach me directly
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {DIRECT_CHANNELS.map(({ label, href, Icon, hex }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  title={label}
                  className="grid h-12 w-12 place-items-center rounded-full text-white shadow-sm transition-all hover:-translate-y-1 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
                  style={{ backgroundColor: `#${hex}` }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-neutral-500">
              WhatsApp is fastest — tap the green button and it opens a chat with
              me straight away.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Clock size={14} /> Response time
              </div>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                Usually within 2–4 hours
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Status
              </div>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                Available for new projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full min-h-[44px] rounded-xl border border-black/10 bg-neutral-50 px-3.5 py-3 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900/40 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </span>
      {children}
    </label>
  );
}
