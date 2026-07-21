"use client";

import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siFramer,
  siThreedotjs,
  siNodedotjs,
  siPython,
  siFastapi,
  siExpress,
  siClaude,
  siLangchain,
  siHuggingface,
  siModelcontextprotocol,
  siPostgresql,
  siMongodb,
  siRedis,
  siSupabase,
  siVercel,
  siDocker,
  siGithub,
  siGithubactions,
  siFlutter,
  siApple,
} from "simple-icons";
import { cn } from "@/lib/utils";

type SimpleIcon = { path: string; hex: string; title: string };

/**
 * Official brand marks and brand colours, sourced from simple-icons rather than
 * redrawn by hand — hand-traced logos are how you end up with a mark that reads
 * wrong at small sizes.
 *
 * `fallback` covers brands simple-icons does not ship (AWS was removed over
 * trademark policy; Groq isn't in the set). Those keep a monogram tile, but
 * still use the company's real brand colour.
 */
type BrandDef =
  | { icon: SimpleIcon; hex?: string }
  | { fallback: string; hex: string };

const BRANDS: Record<string, BrandDef> = {
  react: { icon: siReact },
  nextjs: { icon: siNextdotjs },
  typescript: { icon: siTypescript },
  tailwind: { icon: siTailwindcss },
  framer: { icon: siFramer },
  three: { icon: siThreedotjs },
  node: { icon: siNodedotjs },
  python: { icon: siPython },
  fastapi: { icon: siFastapi },
  express: { icon: siExpress },
  groq: { fallback: "Gq", hex: "F55036" },
  anthropic: { icon: siClaude },
  langchain: { icon: siLangchain },
  huggingface: { icon: siHuggingface },
  mcp: { icon: siModelcontextprotocol },
  postgres: { icon: siPostgresql },
  mongodb: { icon: siMongodb },
  redis: { icon: siRedis },
  supabase: { icon: siSupabase },
  aws: { fallback: "AWS", hex: "FF9900" },
  vercel: { icon: siVercel },
  docker: { icon: siDocker },
  github: { icon: siGithub },
  githubactions: { icon: siGithubactions },
  flutter: { icon: siFlutter },
  apple: { icon: siApple },
};

/**
 * Perceived brightness (ITU-R BT.601). Several brands are near-black — Next.js,
 * Vercel, Three.js, Express, GitHub, Apple, MCP — and would disappear against a
 * dark surface. Those fall back to `currentColor` so they follow the theme.
 */
function isTooDark(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 < 60;
}

export function BrandIcon({ brand, className }: { brand?: string; className?: string }) {
  const def = brand ? BRANDS[brand] : undefined;

  const hex = def ? ("icon" in def ? def.hex ?? def.icon.hex : def.hex) : "9CA3AF";
  const dark = isTooDark(hex);
  const color = dark ? "currentColor" : `#${hex}`;

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10",
        className,
      )}
      style={{ backgroundColor: dark ? undefined : `#${hex}1a` }}
      title={def && "icon" in def ? def.icon.title : brand}
    >
      {/* Neutral wash behind near-black marks so they still sit on a tile */}
      {dark && <div aria-hidden className="absolute inset-0 bg-white/5" />}

      {def && "icon" in def ? (
        <svg
          role="img"
          aria-hidden
          focusable="false"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          fill={color}
          className="relative z-10"
        >
          <path d={def.icon.path} />
        </svg>
      ) : (
        <span
          className="relative z-10 font-mono text-[10px] font-bold tracking-tight"
          style={{ color }}
        >
          {def && "fallback" in def ? def.fallback : "·"}
        </span>
      )}
    </div>
  );
}
