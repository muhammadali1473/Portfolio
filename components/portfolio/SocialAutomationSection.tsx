"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/components/portfolio/motion";
import { AutomationDiagram } from "@/components/portfolio/AutomationDiagram";

/**
 * Homepage showcase for the Social Media Automation (MCP) pitch. The animated
 * diagram is shared with the /automation detail page; each platform icon links
 * to its "how it helps" section there, and a CTA opens the full page.
 */
export function SocialAutomationSection() {
  return (
    <section id="automation" className="px-4 py-6 sm:px-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-12 sm:py-16"
      >
        {/* heading */}
        <div className="relative flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            <span className="text-neutral-400">/</span>AUTOMATION
          </h2>
          <span className="text-sm text-amber-600">One cloud · six channels</span>
        </div>
        <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          A single Claude-driven MCP hub that runs LinkedIn, Instagram, Facebook,
          TikTok, X and Reddit — comments, DMs, posts and lead capture, flowing
          out from one place.
        </p>

        {/* animated stage — icons link through to the detail page */}
        <div className="relative mt-8">
          <AutomationDiagram iconHrefBase="/automation#" />
        </div>

        {/* CTA + tech chips */}
        <div className="relative mt-8 flex flex-col items-center gap-5">
          <Link
            href="/automation"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            See how the automation works
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-2">
            {["Claude", "MCP Protocol", "Python", "Unipile"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-black/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
