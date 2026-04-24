"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { AskAiChat } from "@/components/ai/AskAiChat";
import { ProjectEstimator } from "@/components/ai/ProjectEstimator";

export function AiDemo() {
  return (
    <section id="ai-demo" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="container relative">
        <SectionHeading
          eyebrow="AI Live Demo"
          title="I build with AI."
          highlight="Try it yourself."
          subtitle="Two interactive demos — no signup required. Both powered by Groq's fast inference."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <AskAiChat />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ProjectEstimator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
