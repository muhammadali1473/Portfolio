"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CURRENCIES, PRICING, type CurrencyCode } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";

export function Pricing() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const rate = CURRENCIES.find((c) => c.code === currency)?.rate ?? 1;

  return (
    <section id="pricing" className="relative py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Pick the package"
          highlight="that fits your vision."
          subtitle="No hidden fees. Every package is fixed-scope with milestone billing."
        />

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrency(c.code)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  currency === c.code
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {currency === c.code && (
                  <motion.span
                    layoutId="currencyPill"
                    className="absolute inset-0 rounded-full bg-gradient-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((pkg, i) => {
            const displayPrice = formatCurrency(pkg.priceUSD * rate, currency);
            return (
              <Reveal key={pkg.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all",
                    pkg.popular
                      ? "border-transparent gradient-border gradient-border-strong bg-surface/70 shadow-glow-lg lg:scale-[1.03]"
                      : "border-white/10 bg-surface/40 hover:border-white/20",
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-glow">
                      <Sparkles size={10} /> Popular
                    </div>
                  )}

                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                    {pkg.badge}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{pkg.name}</h3>

                  <div className="mt-5">
                    {pkg.priceLabel && (
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                        {pkg.priceLabel}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        {displayPrice}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Delivery: {pkg.deliveryWeeks}
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <motion.span
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3 }}
                          className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-gradient-primary"
                        >
                          <Check size={10} className="text-white" />
                        </motion.span>
                        <span className="text-foreground/90">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={cn(
                      "mt-6 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all",
                      pkg.popular
                        ? "bg-gradient-primary text-white shadow-glow hover:brightness-110"
                        : "border border-white/15 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10",
                    )}
                  >
                    {pkg.cta}
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface/40 p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold">Already have a website?</p>
              <p className="text-sm text-muted-foreground">
                Retain me monthly for ongoing automation and optimization — starting at
                <span className="px-1 font-semibold text-foreground">$500/month</span>.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Discuss retainer →
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Not sure what fits?{" "}
            <Link
              href="/contact"
              className="font-semibold gradient-text underline-offset-4 hover:underline"
            >
              Book a free 30-min consultation →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
