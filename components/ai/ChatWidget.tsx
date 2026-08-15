"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { AskAiChat } from "@/components/ai/AskAiChat";

/**
 * Site-wide floating assistant. Rendered from the root layout so it is present
 * on every page — and since the AI demo section was removed, this is now the
 * only place the assistant lives.
 *
 * The chat itself is only mounted once opened — keeping it unmounted means no
 * chat JS work happens on pages nobody opens it on.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="AI assistant"
            className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] origin-bottom-right shadow-glow-lg sm:right-6"
          >
            <AskAiChat />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-white shadow-glow transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="grid place-items-center"
          >
            {open ? <X size={22} /> : <MessageSquare size={22} />}
          </motion.span>
        </AnimatePresence>

        {/* Attention pulse, only while closed */}
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40"
            style={{ animationDuration: "2.6s" }}
          />
        )}
      </button>
    </>
  );
}
