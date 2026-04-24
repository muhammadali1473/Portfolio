"use client";

import { cn } from "@/lib/utils";

// Compact wordmark / glyph map. Each returns an SVG tile with a gradient fill
// so the tech stack looks consistent without pulling third-party logos.
// Each icon is a rounded square with monogram + subtle gradient accent.

type BrandDef = { label: string; accent: string };

const BRANDS: Record<string, BrandDef> = {
  react: { label: "Rx", accent: "from-cyan-400 to-sky-500" },
  nextjs: { label: "N", accent: "from-zinc-200 to-zinc-500" },
  typescript: { label: "TS", accent: "from-blue-400 to-blue-600" },
  tailwind: { label: "Tw", accent: "from-cyan-400 to-teal-500" },
  framer: { label: "Fm", accent: "from-fuchsia-400 to-rose-500" },
  three: { label: "3D", accent: "from-violet-400 to-purple-600" },
  node: { label: "Nd", accent: "from-emerald-400 to-green-600" },
  python: { label: "Py", accent: "from-yellow-300 to-blue-500" },
  fastapi: { label: "Fa", accent: "from-teal-400 to-emerald-500" },
  express: { label: "Ex", accent: "from-zinc-300 to-zinc-500" },
  groq: { label: "Gq", accent: "from-orange-400 to-rose-500" },
  anthropic: { label: "A", accent: "from-orange-300 to-amber-500" },
  langchain: { label: "Lc", accent: "from-lime-400 to-emerald-500" },
  huggingface: { label: "HF", accent: "from-yellow-300 to-amber-500" },
  mcp: { label: "MCP", accent: "from-violet-400 to-blue-500" },
  postgres: { label: "Pg", accent: "from-sky-400 to-blue-600" },
  mongodb: { label: "Mo", accent: "from-green-400 to-emerald-600" },
  redis: { label: "Rd", accent: "from-red-400 to-rose-600" },
  supabase: { label: "Sp", accent: "from-emerald-400 to-green-500" },
  aws: { label: "AWS", accent: "from-orange-400 to-amber-500" },
  vercel: { label: "▲", accent: "from-zinc-100 to-zinc-400" },
  docker: { label: "Dk", accent: "from-sky-400 to-blue-500" },
  github: { label: "Gh", accent: "from-zinc-200 to-zinc-500" },
  flutter: { label: "Fl", accent: "from-sky-400 to-blue-600" },
  apple: { label: "", accent: "from-zinc-200 to-zinc-500" },
};

export function BrandIcon({ brand, className }: { brand?: string; className?: string }) {
  const def: BrandDef =
    (brand ? BRANDS[brand] : undefined) ?? { label: "·", accent: "from-zinc-300 to-zinc-500" };
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 font-mono text-[11px] font-semibold tracking-tight text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-60 bg-gradient-to-br",
          def.accent,
        )}
      />
      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <span className="relative z-10 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">{def.label}</span>
    </div>
  );
}
