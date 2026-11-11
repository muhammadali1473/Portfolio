import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import {
  CloudBackdrop,
  PageCard,
  AvailablePill,
  ContactCTA,
  MiniFooter,
} from "@/components/portfolio/parts";
import { WorkGrid } from "@/components/portfolio/WorkGrid";

export const metadata: Metadata = {
  title: "All Work",
  description:
    "Every project by Muhammad Ali — AI agents, MCP servers, full-stack web applications, client sites, and iOS apps.",
  alternates: { canonical: "/projects" },
};

/**
 * Full work listing in the redesigned style: cloudy backdrop + floating page
 * card, a filterable grid of every project. The global header/footer are
 * suppressed on `/projects` (see Navigation/Footer), so this owns its chrome.
 */
export default function ProjectsPage() {
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

          {/* Heading + grid */}
          <section className="relative px-5 pb-8 pt-10 sm:px-10">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-2 -z-0 -translate-x-1/2 select-none font-[family-name:var(--font-display)] text-[14vw] font-extrabold uppercase tracking-tight text-neutral-200/60"
            >
              Portfolio
            </span>
            <h1 className="relative text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              <span className="text-neutral-400">/</span>ALL WORK
            </h1>
            <p className="relative mx-auto mt-3 max-w-lg text-center text-[15px] text-neutral-500">
              AI agents, MCP servers, web apps, client sites and iOS apps —
              everything shipped so far.
            </p>
            <div className="relative mt-10">
              <WorkGrid projects={PROJECTS} />
            </div>
          </section>

          <ContactCTA />
          <MiniFooter />
        </PageCard>
      </div>
    </div>
  );
}
