"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { GradientText } from "@/components/shared/GradientText";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > 80 && latest > prev) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -88 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
          <div className="pointer-events-auto flex h-14 w-full items-center justify-between rounded-2xl border border-white/10 bg-background/40 px-4 backdrop-blur-xl sm:px-6">
            <Link href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary font-mono text-sm font-bold text-white shadow-glow">
                MA
              </span>
              <GradientText className="hidden sm:inline">Muhammad Ali</GradientText>
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <MagneticButton href="#contact" variant="primary" size="sm">
                Book a Call
              </MagneticButton>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col gap-6 border-l border-white/10 bg-surface/95 p-6 pt-24"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <MagneticButton
                href="#contact"
                onClick={() => setMobileOpen(false)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Book a Call
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
