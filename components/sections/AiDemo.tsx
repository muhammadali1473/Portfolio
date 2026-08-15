"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

// Heavy demo widget — dynamically imported so it doesn't block the first paint
// of the marketing page. It falls below the fold on desktop and mobile.
//
// The Ask-AI chat used to sit beside this one, but the same component is
// already mounted globally as the floating widget in app/layout.tsx, so the
// section was showing the visitor a second copy of a chat they already had.
const ProjectEstimator = dynamic(
  () => import("@/components/ai/ProjectEstimator").then((m) => m.ProjectEstimator),
  {
    ssr: false,
    loading: () => <DemoSkeleton label="Loading project estimator…" />,
  },
);

export function AiDemo() {
  return (
    <section id="ai-demo" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent"
      />
      <div className="container relative">
        <SectionHeading
          eyebrow="AI Live Demo"
          title="I build with AI."
          highlight="Try it yourself."
          subtitle="Scope and price a project in a few clicks — no signup required, powered by Groq's fast inference."
        />
        <div className="mt-14">
          <Reveal className="mx-auto w-full max-w-4xl">
            <ProjectEstimator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DemoSkeleton({ label }: { label: string }) {
  return (
    <div
      className="flex h-[480px] items-center justify-center rounded-2xl border border-white/10 bg-surface/40 backdrop-blur"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 size={14} className="animate-spin" aria-hidden /> {label}
      </span>
    </div>
  );
}
