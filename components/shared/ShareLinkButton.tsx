"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Copies a project's own page URL so it can be pasted into WhatsApp, LinkedIn
 * or an email. Uses the phone's native share sheet where there is one, and the
 * clipboard everywhere else.
 *
 * The origin comes from the browser rather than `site.url`, so the copied link
 * always points at whichever domain the visitor is actually on.
 */
export function ShareLinkButton({
  path,
  title,
  className,
}: {
  path: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const url = `${window.location.origin}${path}`;
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Share sheet dismissed — fall through to copying instead.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy link to ${title}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:text-foreground",
        className,
      )}
    >
      {copied ? <Check size={12} /> : <Link2 size={12} />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
