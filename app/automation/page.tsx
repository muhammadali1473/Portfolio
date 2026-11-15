import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import {
  CloudBackdrop,
  PageCard,
  AvailablePill,
  DarkButton,
  MiniFooter,
} from "@/components/portfolio/parts";
import { AutomationDiagram } from "@/components/portfolio/AutomationDiagram";
import { PLATFORMS, PLATFORM_HELP } from "@/components/portfolio/social-automation-data";

export const metadata: Metadata = {
  title: "AI Social Automation",
  description:
    "How the Claude-driven MCP automation hub grows your audience across LinkedIn, Instagram, Facebook, TikTok, X and Reddit — finding buyers, engaging them, and capturing leads on autopilot.",
  alternates: { canonical: "/automation" },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "One hub, every channel",
    body: "Claude sits at the centre as a single MCP client. Instead of six logins and six tools, there is one brain driving all of them.",
  },
  {
    step: "02",
    title: "Each network becomes a tool",
    body: "Search, comment, DM, post and lead-capture on every platform are exposed to Claude as MCP tools — so it can act on LinkedIn or X the same way it calls any function.",
  },
  {
    step: "03",
    title: "Claude drives the flow",
    body: "It watches for buying signals, replies in your voice, follows the right people, and logs every warm lead — with daily caps and human-safe pacing so it never looks like a bot.",
  },
];

/** Brand icon tile matching the diagram's 3D platform icons, at card size. */
function PlatformIcon({ slug }: { slug: string }) {
  const plat = PLATFORMS.find((p) => p.slug === slug);
  if (!plat) return null;
  return (
    <span
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-[0_8px_18px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
      style={{ background: plat.bg }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/45 via-white/5 to-transparent" />
      <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="#fff" aria-hidden>
        <path d={plat.icon.path} />
      </svg>
    </span>
  );
}

/**
 * /automation — the full detail page for the AI Social Automation pitch.
 * Opened from the homepage Automation section (whole section CTA, and each
 * platform icon links to its anchored section here). Redesigned portfolio
 * style with its own chrome.
 */
export default function AutomationPage() {
  return (
    <div className="font-[family-name:var(--font-display)]">
      <CloudBackdrop />
      <div className="mx-auto max-w-[1200px] px-3 py-4 sm:px-5 sm:py-6">
        <PageCard>
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-10 sm:pt-7">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-transform hover:-translate-x-0.5"
            >
              <ArrowLeft size={16} /> Back
            </Link>
            <AvailablePill className="hidden sm:inline-flex" />
          </div>

          {/* Hero */}
          <section className="relative px-5 pb-6 pt-10 sm:px-10">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-2 -z-0 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[13vw] font-extrabold uppercase tracking-tight text-neutral-200/60"
            >
              Automation
            </span>
            <h1 className="relative text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              <span className="text-neutral-400">/</span>AI SOCIAL AUTOMATION
            </h1>
            <p className="relative mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-500">
              One Claude-driven MCP hub runs LinkedIn, Instagram, Facebook, TikTok,
              X and Reddit from a single place — finding the right people, engaging
              them in your voice, and turning attention into followers and leads.
              Tap any platform below to see exactly how it helps you grow.
            </p>

            <div className="relative mt-8">
              <AutomationDiagram iconHrefBase="#" />
            </div>
          </section>

          {/* How it works */}
          <section className="relative px-5 py-10 sm:px-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              <span className="text-neutral-400">/</span>HOW IT WORKS
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {HOW_IT_WORKS.map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5"
                >
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-amber-600">
                    {s.step}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-medium text-neutral-900">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Per-platform breakdown */}
          <section className="relative px-5 py-10 sm:px-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              <span className="text-neutral-400">/</span>EVERY CHANNEL, EXPLAINED
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {PLATFORM_HELP.map((p) => (
                <div
                  key={p.slug}
                  id={p.slug}
                  className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5 sm:p-7"
                >
                  <div className="flex items-center gap-4">
                    <PlatformIcon slug={p.slug} />
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-neutral-900">
                        {p.name}
                      </h3>
                      <p className="text-sm text-neutral-500">{p.tagline}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {p.does.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                          style={{ backgroundColor: `#${p.hex}1a`, color: `#${p.hex}` }}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl bg-neutral-50 p-4 ring-1 ring-black/5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                      How it grows you
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {p.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="relative flex flex-col items-center px-5 py-16 text-center sm:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight text-neutral-900 sm:text-4xl">
              Want this running for your brand?
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-500">
              I&apos;ll set up the hub, wire in your channels, and tune the voice and
              pacing to your audience — then it runs every day.
            </p>
            <DarkButton href="/contact" className="mt-7 px-7 py-3.5">
              Start a conversation
            </DarkButton>
            <Link
              href="/projects/social-automation"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              See the project write-up
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>

          <MiniFooter />
        </PageCard>
      </div>
    </div>
  );
}
