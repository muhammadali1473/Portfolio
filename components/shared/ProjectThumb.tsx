import Image from "next/image";
import {
  Bot,
  SendHorizontal,
  CircleDollarSign,
  Linkedin,
  MessageSquare,
  Network,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Each project gets a bespoke branded mockup that looks like a miniature
 * product screenshot. No external images required for the visuals themselves;
 * small app-icon accents pulled from App Store CDN for the two iOS apps.
 */

type MockProps = { title: string };

export function ProjectThumb({
  slug,
  title,
  image,
  className,
}: {
  slug: string;
  title: string;
  /** Real screenshot of a shipped site. Takes precedence over the hand-built
   *  mock — for live client work the actual page is more convincing than a
   *  stylised approximation of it. */
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={`${title} — homepage`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          // `object-top` because the shots are 16:9 captures of the fold —
          // anchoring to the top keeps the logo and headline in frame.
          className="object-cover object-top"
        />
      ) : (
        mockFor(slug, title)
      )}
    </div>
  );
}

function mockFor(slug: string, title: string) {
  switch (slug) {
    case "linkedin-mcp":
      return <LinkedInMcpMock title={title} />;
    case "x-mcp-builder":
      return <XMcpMock title={title} />;
    case "ai-chatbot":
      return <ChatbotMock title={title} />;
    case "swipi":
      return <SwipiMock title={title} />;
    case "spendwise":
      return <SpendWiseMock title={title} />;
    case "dubai-real-estate":
      return <RealEstateConceptMock title={title} />;
    case "therapy-portal":
      return <TherapyConceptMock title={title} />;
    case "spiritual-coaching":
      return <CoachingConceptMock title={title} />;
    default:
      return <GenericMock title={title} />;
  }
}

/* ──────────────────────────────────────────────────────────────
 * LinkedIn MCP — deep-blue interface mockup with search, rows, and MCP badge
 * ────────────────────────────────────────────────────────────── */
function LinkedInMcpMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #0a1f3d 0%, #0b4a91 55%, #0369a1 100%)",
      }}
    >
      {/* Network connection dots */}
      <svg
        viewBox="0 0 400 225"
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[
          [30, 40],
          [80, 150],
          [160, 40],
          [220, 170],
          [320, 60],
          [360, 180],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="#a5f3fc" opacity="0.8" />
          </g>
        ))}
        {/* lines between */}
        <path
          d="M30,40 L80,150 L160,40 L220,170 L320,60 L360,180"
          stroke="#38bdf8"
          strokeWidth="0.8"
          fill="none"
          opacity="0.45"
        />
      </svg>

      <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        {/* top bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2 py-1 backdrop-blur">
            <Linkedin size={10} className="text-white" />
            <span className="font-semibold text-[9px] text-white">LinkedIn</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 backdrop-blur">
            <span className="font-mono text-[8px] font-bold tracking-wider text-white">
              MCP
            </span>
          </div>
        </div>

        {/* search bar */}
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-1.5 py-1 backdrop-blur">
          <Search size={9} className="text-white/70" />
          <div className="h-[3px] w-20 rounded bg-white/30" />
        </div>

        {/* three mini rows */}
        <div className="mt-2 space-y-1">
          {[
            { icon: Network, label: "Profile Data" },
            { icon: Network, label: "Connections" },
            { icon: MessageSquare, label: "Messenger" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-1 backdrop-blur"
            >
              <div className="grid h-4 w-4 place-items-center rounded bg-sky-400/80">
                <r.icon size={8} className="text-white" />
              </div>
              <span className="text-[8px] font-semibold text-white/90">{r.label}</span>
              <span className="ml-auto h-1 w-4 rounded bg-white/30" />
            </div>
          ))}
        </div>

        <span className="sr-only">{title}</span>
      </div>

      {/* corner glow */}
      <div
        aria-hidden
        className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-sky-400/30 blur-3xl"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * X MCP Builder — pure black with giant X glyph
 * ────────────────────────────────────────────────────────────── */
function XMcpMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, #1e293b 0%, #020617 70%, #000000 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-40"
      />
      <div className="absolute top-3 right-3 rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 backdrop-blur">
        <span className="font-mono text-[8px] font-bold tracking-wider text-white">
          MCP
        </span>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono text-[8px] uppercase tracking-wider text-white/80">
          production
        </span>
      </div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-16 w-16 text-white" aria-hidden>
          <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Swipi — purple gradient with phone mockup showing two photo cards
 * ────────────────────────────────────────────────────────────── */
function SwipiMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #6d28d9 45%, #d946ef 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 85%, rgba(244,114,182,0.4), transparent 50%)",
        }}
      />
      <div className="relative z-10 flex h-full items-center gap-3 p-4 sm:p-5">
        {/* Phone frame */}
        <div className="relative flex h-[88%] w-[38%] max-w-[110px] flex-col overflow-hidden rounded-xl border border-white/25 bg-black/50 backdrop-blur">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="font-semibold text-[9px] tracking-wide text-white">
              SWIPI
            </span>
            <span className="font-mono text-[7px] text-white/60">9:41</span>
          </div>
          <div className="flex-1 px-1.5 pb-1.5">
            {/* photo cards stack */}
            <div
              className="relative h-full rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
              }}
            >
              <div className="absolute inset-2 rounded-md bg-white/20 backdrop-blur-[2px]" />
              <div className="absolute left-2 right-2 top-2 flex justify-between">
                <span className="rounded bg-emerald-500/90 px-1 py-0.5 font-semibold text-[7px] text-white">
                  KEEP
                </span>
                <span className="rounded bg-rose-500/90 px-1 py-0.5 font-semibold text-[7px] text-white">
                  DELETE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe visual / stats */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="inline-flex items-center gap-1 self-start rounded-full border border-white/20 bg-white/10 px-2 py-0.5 backdrop-blur">
            <span className="text-[8px] font-semibold text-white">⇔ Swipe</span>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur">
            <p className="text-[8px] font-mono uppercase tracking-wider text-white/70">
              Cleared
            </p>
            <p className="text-base font-bold tracking-tight text-white">2.4 GB</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur">
            <p className="text-[8px] font-mono uppercase tracking-wider text-white/70">
              Photos sorted
            </p>
            <p className="text-sm font-bold tracking-tight text-white">847</p>
          </div>
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * SpendWise — green/teal gradient with budget dashboard phone
 * ────────────────────────────────────────────────────────────── */
function SpendWiseMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #022c22 0%, #065f46 50%, #0ea5e9 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(168,118,60,0.5), transparent 45%), radial-gradient(circle at 15% 90%, rgba(184,166,143,0.5), transparent 50%)",
        }}
      />
      <div className="absolute top-3 right-3 grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
        <CircleDollarSign size={13} className="text-white" />
      </div>

      <div className="relative z-10 flex h-full items-center gap-3 p-4 sm:p-5">
        {/* Phone frame */}
        <div className="relative flex h-[88%] w-[38%] max-w-[110px] flex-col overflow-hidden rounded-xl border border-white/25 bg-black/60 backdrop-blur">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="font-semibold text-[9px] text-white">SpendWise</span>
            <span className="font-mono text-[7px] text-white/60">9:41</span>
          </div>
          <div className="flex-1 space-y-1 px-1.5 pb-1.5">
            <div className="rounded-md bg-white/10 p-1.5">
              <p className="text-[7px] font-mono uppercase tracking-wider text-white/60">
                Balance
              </p>
              <p className="text-sm font-bold text-white">$2,450</p>
            </div>
            <div className="flex gap-1">
              <div className="flex-1 rounded-md bg-emerald-500/30 p-1 text-center">
                <Wallet size={8} className="mx-auto text-white" />
                <p className="mt-0.5 text-[6px] font-semibold text-white">Budget</p>
              </div>
              <div className="flex-1 rounded-md bg-sky-500/30 p-1 text-center">
                <TrendingUp size={8} className="mx-auto text-white" />
                <p className="mt-0.5 text-[6px] font-semibold text-white">Track</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side cards */}
        <div className="flex flex-1 flex-col gap-1.5">
          <MiniCard label="Budget Plan" value="$1,200" />
          <MiniCard label="Expense Tracker" value="$850" />
          <MiniCard label="Smart Insights" value="On" accent />
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}

function MiniCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur">
      <div>
        <p className="text-[7px] font-mono uppercase tracking-wider text-white/70">
          {label}
        </p>
        <p className="text-[10px] font-semibold text-white">{value}</p>
      </div>
      {accent && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Client project mockups (browser chrome style)
 * ────────────────────────────────────────────────────────────── */
function RealEstateConceptMock({ title }: MockProps) {
  return (
    <BrowserMock
      bg="linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)"
      badge="Real Estate · Concept"
      glyph="⌂"
    >
      <div className="space-y-1">
        <div className="h-2 w-20 rounded bg-white/80" />
        <div className="h-1.5 w-32 rounded bg-white/50" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-8 rounded bg-white/15 backdrop-blur border border-white/20"
          />
        ))}
      </div>
      <span className="sr-only">{title}</span>
    </BrowserMock>
  );
}

function TherapyConceptMock({ title }: MockProps) {
  return (
    <BrowserMock
      bg="linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #22d3ee 100%)"
      badge="Therapy · Concept"
      glyph="☼"
    >
      <div className="space-y-1">
        <div className="h-2 w-24 rounded bg-white/80" />
        <div className="h-1.5 w-36 rounded bg-white/50" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <div className="h-10 rounded bg-white/15 border border-white/20" />
        <div className="h-10 rounded bg-white/15 border border-white/20" />
      </div>
      <span className="sr-only">{title}</span>
    </BrowserMock>
  );
}

function CoachingConceptMock({ title }: MockProps) {
  return (
    <BrowserMock
      bg="linear-gradient(135deg, #1e1b4b 0%, #6d28d9 45%, #e879f9 100%)"
      badge="Coaching · Concept"
      glyph="✦"
    >
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-white/30 border border-white/40" />
        <div className="space-y-1">
          <div className="h-2 w-16 rounded bg-white/80" />
          <div className="h-1.5 w-24 rounded bg-white/50" />
        </div>
      </div>
      <div className="mt-2 h-1 w-full rounded bg-white/20">
        <div className="h-full w-2/3 rounded bg-white/80" />
      </div>
      <span className="sr-only">{title}</span>
    </BrowserMock>
  );
}

function BrowserMock({
  bg,
  badge,
  glyph,
  children,
}: {
  bg: string;
  badge: string;
  glyph: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[9px] text-white/80">{badge}</span>
          </div>
          <span className="grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-white/10 font-mono text-xs text-white backdrop-blur">
            {glyph}
          </span>
        </div>
        <div className="mt-3 flex-1 rounded-md border border-white/15 bg-white/5 p-2 backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Generic fallback
 * ────────────────────────────────────────────────────────────── */
function GenericMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, #2A2622 0%, #875C2C 55%, #B8A68F 100%)",
      }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 flex h-full items-end p-5">
        <p className="max-w-[85%] text-balance text-lg font-semibold leading-tight text-white">
          {title}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Optional: small app-icon badge useful inline if a thumb needs it
 * ────────────────────────────────────────────────────────────── */
export function AppIconBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-white/20 bg-black/30">
      <Image src={src} alt={alt} fill sizes="32px" className="object-cover" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * AI Chatbot — chat window floating on a violet→amber gradient,
 * with a history sidebar, message bubbles and a typing indicator
 * ────────────────────────────────────────────────────────────── */
function ChatbotMock({ title }: MockProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #9a3412 100%)",
      }}
    >
      {/* soft glows behind the window */}
      <div aria-hidden className="absolute -left-8 -top-10 h-36 w-36 rounded-full bg-violet-400/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-12 -right-6 h-40 w-40 rounded-full bg-amber-400/35 blur-3xl" />
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 flex h-full items-center justify-center p-4 sm:p-5">
        <div className="flex h-full w-full max-w-[92%] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
          {/* history sidebar */}
          <div className="hidden w-[28%] flex-col gap-1 border-r border-white/10 bg-black/20 p-1.5 sm:flex">
            <span className="mb-0.5 font-mono text-[6px] uppercase tracking-wider text-white/50">History</span>
            {["Pricing question", "Book a demo", "Refund policy"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "truncate rounded px-1 py-0.5 text-[7px]",
                  i === 0 ? "bg-white/20 text-white" : "text-white/60",
                )}
              >
                {t}
              </span>
            ))}
          </div>

          {/* conversation */}
          <div className="flex flex-1 flex-col p-2">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-amber-400">
                <Bot size={9} className="text-white" />
              </span>
              <span className="text-[8px] font-semibold text-white">AI Assistant</span>
              <span className="ml-auto rounded border border-white/20 bg-white/10 px-1 font-mono text-[6px] uppercase tracking-wider text-white/80">
                Llama 3 · Groq
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-1 py-1.5">
              <span className="max-w-[70%] self-end rounded-lg rounded-br-sm bg-amber-400/90 px-1.5 py-1 text-[7px] text-amber-950">
                How much is the Pro plan?
              </span>
              <span className="max-w-[78%] self-start rounded-lg rounded-bl-sm bg-white/90 px-1.5 py-1 text-[7px] text-slate-800">
                Pro is $1,200 and includes a custom AI assistant. Want me to book a call?
              </span>
              <span className="flex w-8 items-center justify-center gap-0.5 self-start rounded-lg bg-white/20 py-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1 w-1 rounded-full bg-white/80" />
                ))}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-1.5 py-1">
              <span className="h-[3px] w-16 rounded bg-white/30" />
              <SendHorizontal size={9} className="ml-auto text-amber-300" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}
