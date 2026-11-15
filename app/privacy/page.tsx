import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Muhammad Ali collects, uses, and protects data submitted through this portfolio site.",
};

export default function PrivacyPage() {
  return (
    <section className="relative py-28">
      <div className="container max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden /> Back home
        </Link>
        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-invert mt-10 max-w-none text-sm leading-relaxed text-foreground/90">
          <h2 className="text-xl font-semibold">What I collect</h2>
          <p className="mt-2 text-muted-foreground">
            This site is a personal portfolio. The only data collected is what you
            voluntarily submit through the contact form (name, email, company,
            project type, message) or through the AI chat demos (your
            messages).
          </p>

          <h2 className="mt-8 text-xl font-semibold">How I use it</h2>
          <p className="mt-2 text-muted-foreground">
            Contact-form submissions are delivered to my inbox via Resend so I
            can reply. AI chat messages are sent to Groq to generate a response
            and are not persisted. Neither service is used for advertising or
            shared with third parties.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Cookies &amp; analytics</h2>
          <p className="mt-2 text-muted-foreground">
            This site sets a single cookie-free preference in localStorage for
            theme choice. It does not use tracking cookies, fingerprinting, or
            third-party analytics.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Your rights</h2>
          <p className="mt-2 text-muted-foreground">
            You can request deletion of any contact-form data I hold by emailing{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline"
            >
              {site.email}
            </a>
            . Data is retained only for the lifetime of our conversation.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            Questions? Reach me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
