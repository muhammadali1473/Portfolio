"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Github,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  AlertCircle,
  Linkedin,
  Twitter,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { site, socials, telLink, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Website",
  "AI Chatbot",
  "MCP Server",
  "Mobile App",
  "Automation",
  "Other",
] as const;

const BUDGETS = ["< $1K", "$1K–5K", "$5K–10K", "$10K–20K", "$20K+"] as const;

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
  budget: "$5K–10K",
  projectTypes: [],
  message: "",
};

export function Contact() {
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("success");
      setForm(emptyForm);
    } catch (err) {
      setState("error");
      setError((err as Error).message);
    }
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Let's Talk"
          title="Let's build something"
          highlight="amazing together."
          subtitle="Ready to transform your business? I'd love to hear about your project."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={submit}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute -inset-x-20 -top-20 h-40 bg-gradient-primary opacity-10 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <Field label="Project type" className="relative mt-4">
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => {
                  const active = form.projectTypes.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleType(t)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                        active
                          ? "border-transparent bg-gradient-primary text-white shadow-glow"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Tell me about your project *" className="relative mt-4">
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
                className="relative mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300"
              >
                <CheckCircle2 size={16} className="mt-0.5" />
                <span>
                  Got it — I&apos;ll reply within a few hours. Thanks for reaching out!
                </span>
              </motion.div>
            )}
            {error && state !== "success" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mt-4 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                <AlertCircle size={16} className="mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="relative mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {state === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {state === "loading" ? "Sending…" : "Send Message"}
            </button>
          </motion.form>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <ContactCard
              icon={<Mail size={18} />}
              label="Gmail"
              value={socials.email}
              href={`mailto:${socials.email}`}
            />
            <ContactCard
              icon={<MessageCircle size={18} />}
              label="WhatsApp / Call"
              value={site.phone}
              href={whatsappLink() || telLink()}
              external
              highlight
            />
            <ContactCard
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="@muhammad-ali"
              href={socials.linkedin}
              external
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ContactCard
                icon={<Twitter size={16} />}
                label="X"
                value={site.xHandle}
                href={socials.x}
                external
                compact
              />
              <ContactCard
                icon={<Github size={16} />}
                label="GitHub"
                value={`@${site.githubUsername}`}
                href={socials.github}
                external
                compact
              />
              <ContactCard
                icon={<Briefcase size={16} />}
                label="Upwork"
                value="Profile"
                href={socials.upwork}
                external
                compact
              />
            </div>
            {socials.calendly && (
              <ContactCard
                icon={<Calendar size={18} />}
                label="Book a Free 30-min Call"
                value="Calendly"
                href={socials.calendly}
                external
              />
            )}

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-surface/40 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={14} /> Response time
                </div>
                <p className="mt-1 text-sm font-semibold">Usually within 2–4 hours</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-surface/40 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Status
                </div>
                <p className="mt-1 text-sm font-semibold">Available for new projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.18)]";

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
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  highlight,
  compact,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
  compact?: boolean;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border backdrop-blur transition-all",
        compact ? "p-3" : "p-4",
        highlight
          ? "gradient-border gradient-border-strong bg-surface/70 shadow-glow"
          : "border-white/10 bg-surface/40 hover:border-white/20",
      )}
    >
      <div
        className={cn(
          "grid place-items-center rounded-xl bg-gradient-primary text-white shadow-glow",
          compact ? "h-8 w-8" : "h-10 w-10",
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <p className={cn("truncate font-semibold", compact ? "text-xs" : "text-sm")}>
          {value}
        </p>
      </div>
      <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
    </a>
  );
}
