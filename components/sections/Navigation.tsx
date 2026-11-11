"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HEADER_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { MaktekLogo } from "@/components/shared/MaktekLogo";
import { cn } from "@/lib/utils";

// Module scope so the reference is stable and the observer effect runs once.
const SECTION_IDS = HEADER_LINKS.map((l) => l.id);

/**
 * Scroll-spy. Highlights whichever section is crossing the middle band of the
 * viewport.
 *
 * Deliberately not driven by pathname: the site is a one-pager, so on `/` there
 * is only ever one route. It still behaves correctly on the standalone routes
 * because those render the same sections with the same ids.
 */
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      // A notional reading line a third of the way down the viewport. The last
      // section to have crossed it is the one being read.
      const line = window.innerHeight * 0.35;
      let current = "";

      // `ids` is in document order, so the last match wins.
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - 1 <= line) current = id;
      }

      // At the very bottom the final section may never cross the line, so the
      // last one present on the page claims it.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        for (let i = ids.length - 1; i >= 0; i--) {
          if (document.getElementById(ids[i])) {
            current = ids[i];
            break;
          }
        }
      }

      setActiveId(current || ids[0] || "");
    };

    // Re-queried on every pass rather than captured once, so sections that
    // mount after this effect (the layout renders before the page) are picked
    // up rather than missed forever.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}

export function Navigation() {
  const activeId = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const pathname = usePathname();
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

  // Navigating to a new route must dismiss the drawer, or it stays open on top
  // of the page the user just asked for.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // The redesigned homepage and the redesigned project pages ship their own
  // in-card navigation, so the global fixed header is suppressed there. Every
  // other standalone route still gets it. (Placed after all hooks so hook
  // order stays stable across renders.)
  if (pathname === "/" || pathname.startsWith("/projects")) return null;

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
            {/* aria-label carries the brand name for screen readers, since the
                mark itself is decorative SVG. */}
            <Link
              href="/"
              aria-label="MAKTEK — home"
              className="flex items-center rounded-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MaktekLogo size={26} />
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {HEADER_LINKS.map((link) => {
                const active = activeId === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative rounded-full px-2.5 py-1.5 text-[13px] transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-gradient-primary transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <MagneticButton href="/#contact" variant="primary" size="sm">
                Book a Call
              </MagneticButton>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen((v) => !v)}
                // 44px square — the iOS/WCAG minimum for a thumb. At the old
                // h-9 (36px) this was the smallest target on the phone header.
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground"
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
              className="absolute inset-0 bg-background/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              // Glass rather than a solid slab: the page reads through the
              // panel, with the blur keeping the labels legible over whatever
              // section happens to sit behind it.
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col gap-6 border-l border-white/20 bg-surface/40 p-6 pt-24 backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-1">
                {HEADER_LINKS.map((link, i) => {
                  const active = activeId === link.id;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          setMobileOpen(false);
                          // Already on the one-pager: scroll straight there.
                          // Routing to "/#x" from "/" makes Next refetch the
                          // route and only move once the payload lands, so the
                          // tap reads as dead for a second or more.
                          if (pathname === "/") {
                            const el = document.getElementById(link.id);
                            if (el) {
                              e.preventDefault();
                              el.scrollIntoView({ behavior: "smooth", block: "start" });
                              history.replaceState(null, "", link.href);
                            }
                          }
                        }}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-white/5 hover:text-foreground",
                          active
                            ? "bg-white/5 text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <MagneticButton
                href="/#contact"
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
