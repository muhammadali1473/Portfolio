import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] items-center overflow-hidden pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-30 mask-fade-bottom"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-[0.18] blur-3xl"
      />
      <div className="container flex flex-col items-center justify-center gap-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Error · 404
        </p>
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
          <GradientText>Lost in the void.</GradientText>
        </h1>
        <p className="max-w-lg text-balance text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist — or it moved and
          forgot to forward its address.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            aria-label="Go back to home"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <Home size={15} aria-hidden /> Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition-all hover:border-white/30 hover:bg-white/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <ArrowLeft size={15} aria-hidden /> Contact Muhammad
          </Link>
        </div>
      </div>
    </section>
  );
}
