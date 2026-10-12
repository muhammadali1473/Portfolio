"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plug, Sparkles } from "lucide-react";
import { siClaude, siFacebook, siInstagram, siReddit, siTiktok } from "simple-icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { LinkedInIcon, XIcon } from "@/components/shared/SocialIcons";
import { cn } from "@/lib/utils";

type Platform = "linkedin" | "x" | "instagram" | "tiktok" | "facebook" | "reddit";

/** Real brand marks, so each card reads as "the Instagram one" at a glance
 *  instead of six identical plug icons. LinkedIn and X come from SocialIcons
 *  because simple-icons no longer ships LinkedIn. */
const PLATFORMS: Record<Platform, { label: string; hex: string; path?: string }> = {
  linkedin: { label: "LinkedIn", hex: "0A66C2" },
  x: { label: "X", hex: "000000" },
  instagram: { label: "Instagram", hex: "E4405F", path: siInstagram.path },
  tiktok: { label: "TikTok", hex: "000000", path: siTiktok.path },
  facebook: { label: "Facebook", hex: "0866FF", path: siFacebook.path },
  reddit: { label: "Reddit", hex: "FF4500", path: siReddit.path },
};

function PlatformLogo({ platform, className }: { platform: Platform; className?: string }) {
  if (platform === "linkedin") return <LinkedInIcon className={className} />;
  if (platform === "x") return <XIcon className={className} />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={PLATFORMS[platform].path} />
    </svg>
  );
}

type McpCard = {
  id: string;
  platform: Platform;
  name: string;
  tagline: string;
  /** "available" = a server I build per client, not one already running —
   *  so it carries no usage numbers rather than invented ones. */
  status: "production" | "beta" | "available";
  tools?: number;
  calls?: string;
  language?: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
};

const MCPS: McpCard[] = [
  {
    id: "linkedin-mcp",
    platform: "linkedin",
    name: "LinkedIn MCP Server",
    tagline:
      "AI-driven lead research, outreach drafting, and connection analysis.",
    status: "production",
    tools: 8,
    calls: "1,200+ / week",
    language: "Python",
    stack: ["FastAPI", "MCP SDK", "Groq", "Playwright"],
    highlights: [
      "OAuth + session-cookie dual auth",
      "Typed tool schemas with zod-like Pydantic validation",
      "Rate-limit aware scheduler",
    ],
    repoUrl: "https://github.com/muhammadali1473",
  },
  {
    id: "x-mcp-builder",
    platform: "x",
    name: "X MCP Builder",
    tagline:
      "Post threads, search tweets, run trend analytics — all from an MCP endpoint.",
    status: "production",
    tools: 6,
    calls: "Scheduled daily",
    language: "TypeScript",
    stack: ["Node.js", "MCP SDK", "X API v2", "OAuth 2.0"],
    highlights: [
      "Thread-aware scheduling with draft queue",
      "Trend monitoring with keyword watchlists",
      "Backoff + retry on 429s",
    ],
    repoUrl: "https://github.com/muhammadali1473",
  },
  {
    id: "instagram-mcp",
    platform: "instagram",
    name: "Instagram Automation MCP",
    tagline:
      "Claude runs Instagram outreach: finds buyers in reel comments, replies, and opens DMs.",
    status: "production",
    tools: 18,
    calls: "Runs daily",
    stack: ["Claude", "MCP SDK", "Unipile", "Instagram"],
    highlights: [
      "Inbox, reel commenters and new followers scanned for warm leads",
      "Claude writes every comment and DM; agents and spam filtered out",
      "Daily caps on DMs, likes and follows to keep the account safe",
    ],
  },
  {
    id: "tiktok-mcp",
    platform: "tiktok",
    name: "TikTok Automation MCP",
    tagline:
      "Let Claude monitor comments, reply to viewers and track what content performs.",
    status: "production",
    stack: ["Claude", "MCP SDK", "TikTok API"],
    highlights: [
      "Comment monitoring and AI-written replies",
      "Lead capture from video comments",
      "Post and engagement analytics",
    ],
  },
  {
    id: "facebook-mcp",
    platform: "facebook",
    name: "Facebook Automation MCP",
    tagline:
      "Pages, Messenger and comments handled by Claude, with leads saved for follow-up.",
    status: "production",
    stack: ["Claude", "MCP SDK", "Meta Graph API"],
    highlights: [
      "Messenger auto-replies in your brand voice",
      "Page post scheduling and comment moderation",
      "Leads from comments and messages saved to your CRM",
    ],
  },
  {
    id: "reddit-mcp",
    platform: "reddit",
    name: "Reddit Automation MCP",
    tagline:
      "Claude finds threads where people ask for what you sell and drafts helpful replies.",
    status: "production",
    stack: ["Claude", "MCP SDK", "Reddit API"],
    highlights: [
      "Subreddit and keyword monitoring for buying intent",
      "Helpful, non-spammy reply drafts for review",
      "Mentions and sentiment tracking",
    ],
  },
];

export function McpExpertise() {
  return (
    <section id="mcp" className="relative py-28">
      {/* overflow-hidden matters: the orb below is a fixed 620px wide, so on a
          390px phone it hangs 115px past the viewport and gives the whole page
          a sideways scroll. Clipping it here keeps the decoration decorative. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-[0.07] blur-3xl" />
      </div>
      <div className="container">
        <SectionHeading
          eyebrow="MCP Expertise"
          title="Production-grade"
          highlight="MCP servers."
          subtitle="Giving AI agents secure, typed tools for the real world. Here's what that looks like."
        />

        {/* MCP server cards — full-width 2-col grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {MCPS.map((mcp, i) => (
            <Reveal key={mcp.id} delay={i * 0.08}>
              <McpServerCard mcp={mcp} index={i} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface/40 p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  Need a custom MCP for your stack?
                </p>
                <p className="text-sm text-muted-foreground">
                  I&apos;ve built them for LinkedIn, X, Instagram, TikTok, Facebook and Reddit. Your CRM could be
                  next.
                </p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
            >
              Start a conversation →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function McpServerCard({ mcp, index }: { mcp: McpCard; index: number }) {
  const isProd = mcp.status === "production";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur hover:border-white/20 hover:shadow-glow"
    >
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Oversized platform mark bled off the bottom-right corner — the card's
          background image, faint enough that the copy on top stays readable. */}
      <PlatformLogo
        platform={mcp.platform}
        className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.1]"
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-white shadow-glow"
            style={{ backgroundColor: `#${PLATFORMS[mcp.platform].hex}` }}
          >
            <PlatformLogo platform={mcp.platform} className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">{mcp.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{mcp.tagline}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
            isProd
              ? "border-emerald-700/25 bg-emerald-700/[0.07] text-emerald-800"
              : "border-amber-700/25 bg-amber-700/[0.07] text-amber-800",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isProd
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
            )}
          />
          {isProd ? "Production" : mcp.status === "beta" ? "Beta" : "Built to order"}
        </span>
      </div>

      {/* How it works, in one line: Claude talks to the MCP server, the server
          drives the platform. Explains "MCP" without a paragraph of jargon. */}
      <div className="relative mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <FlowNode>
          <svg viewBox="0 0 24 24" fill={`#${siClaude.hex}`} aria-hidden className="h-3.5 w-3.5">
            <path d={siClaude.path} />
          </svg>
          Claude
        </FlowNode>
        <ArrowRight size={12} className="flex-shrink-0 text-primary" />
        <FlowNode>
          <Plug size={12} className="text-primary" />
          MCP
        </FlowNode>
        <ArrowRight size={12} className="flex-shrink-0 text-primary" />
        <FlowNode>
          <span style={{ color: `#${PLATFORMS[mcp.platform].hex}` }}>
            <PlatformLogo platform={mcp.platform} className="h-3.5 w-3.5" />
          </span>
          {PLATFORMS[mcp.platform].label}
        </FlowNode>
      </div>

      {/* Mini stats — only the ones this server actually has numbers for */}
      {(mcp.tools || mcp.calls || mcp.language) && (
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          {mcp.tools && <MiniStat label="Tools" value={mcp.tools.toString()} />}
          {mcp.calls && <MiniStat label="Usage" value={mcp.calls} />}
          {mcp.language && <MiniStat label="Language" value={mcp.language} />}
        </div>
      )}

      {/* Highlights */}
      <ul className="relative mt-5 space-y-1.5">
        {mcp.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-foreground/90">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-primary" />
            {h}
          </li>
        ))}
      </ul>

      {/* Stack pills */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {mcp.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-5 h-px origin-left bg-gradient-primary opacity-60"
      />
    </motion.div>
  );
}

function FlowNode({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
      {children}
    </span>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
