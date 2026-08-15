"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlowCard } from "@/components/shared/GlowCard";
import { Reveal } from "@/components/shared/Reveal";

export function SectionLinks() {
  return (
    <section id="explore" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Explore"
          title="Everything you need to know,"
          highlight="all on one page."
          subtitle="Jump straight to any section below."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_LINKS.map((link, i) => {
            const Icon = link.icon;
            // GitHub's real brand colour is near-black and would vanish on a
            // dark surface, so that one tile follows the theme instead.
            const dark = link.tint === "181717";
            return (
              <Reveal key={link.href} delay={0.05 * i} className="h-full">
                <Link href={link.anchor} className="block h-full focus:outline-none">
                  <GlowCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex h-full flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={
                            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10" +
                            (dark ? " bg-white/5 text-foreground" : "")
                          }
                          style={{
                            backgroundColor: dark ? undefined : `#${link.tint}1f`,
                            color: dark ? undefined : `#${link.tint}`,
                          }}
                        >
                          <Icon size={20} />
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="mt-1 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-semibold tracking-tight">
                          {link.label}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {link.blurb}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
