import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CloudBackdrop,
  PageCard,
  AvailablePill,
  MiniFooter,
} from "@/components/portfolio/parts";
import { ContactPortfolio } from "@/components/portfolio/ContactPortfolio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Muhammad Ali. Tell me what you're building and I'll reply within one business day.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact in the redesigned style: cloudy backdrop + floating page card, with
 * its own chrome (the global header/footer are suppressed on redesigned routes).
 */
export default function ContactPage() {
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

          <ContactPortfolio />
          <MiniFooter />
        </PageCard>
      </div>
    </div>
  );
}
