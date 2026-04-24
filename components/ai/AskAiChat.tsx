"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { ASSISTANT_QUICK_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey — I'm Muhammad's AI assistant. Ask me about his services, pricing, or availability. I'll keep it short and real.",
};

export function AskAiChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setError(null);

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Append empty assistant message we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING || next.indexOf(m) > 0),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            "Something went wrong — please try again or contact Muhammad directly at get.muhammad5@gmail.com",
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.replace(/^data:\s*/, "").trim();
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.token) {
              assistantText += parsed.token;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
            if (parsed.error) throw new Error(parsed.error);
          } catch {
            // ignore malformed chunk
          }
        }
      }
    } catch (err) {
      setError((err as Error).message);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[480px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary text-white shadow-glow">
            <Sparkles size={14} />
          </span>
          <div>
            <p className="text-sm font-semibold">Ask AI about Muhammad</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Powered by Groq
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> live
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
        aria-label="Chat conversation with Muhammad's AI assistant"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-gradient-primary text-white"
                  : "border border-white/10 bg-white/5 text-foreground/90",
              )}
            >
              {m.content || (loading && i === messages.length - 1 ? <TypingDots /> : null)}
            </motion.div>
          </div>
        ))}
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 bg-white/[0.02] px-3 py-3">
        <AnimatePresence initial={false}>
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-2 flex flex-wrap gap-1.5"
            >
              {ASSISTANT_QUICK_PROMPTS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => send(chip.prompt)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground"
                >
                  {chip.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-background/60 px-3 py-2 focus-within:border-white/25"
        >
          <label htmlFor="ask-ai-input" className="sr-only">
            Ask a question about Muhammad
          </label>
          <input
            id="ask-ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            autoComplete="off"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={loading || !input.trim()}
            className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-primary text-white transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <Send size={14} aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60 [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60 [animation-delay:240ms]" />
    </div>
  );
}
