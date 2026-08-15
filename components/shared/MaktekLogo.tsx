import { cn } from "@/lib/utils";

/**
 * MAKTEK mark — two upright pillars flanking a filled centre chevron, forming
 * an M. Redrawn as vector so it stays sharp at any size and picks up the
 * current theme instead of carrying the source file's black background.
 *
 * The pillars use `currentColor` (near-black on the warm page) and the chevron
 * carries the gold accent.
 */
export function MaktekMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      className={className}
    >
      {/* One continuous M letterform. Drawn as a single closed outline so the
          outer stems and the centre V actually meet at the top — as separate
          shapes they read as three marks, not a letter. */}
      <path
        d="M5 40V8h8l11 18L35 8h8v32h-8V22L24 39 13 22v18H5Z"
        fill="currentColor"
      />
      {/* The centre V, painted over the same geometry in the gold accent. Its
          edges are identical to the M's inner valley, so it registers exactly. */}
      <path d="M13 8l11 18L35 8v14L24 39 13 22V8Z" fill="#A8763C" />
    </svg>
  );
}

/** Full lockup: mark plus the MAKTEK wordmark. */
export function MaktekLogo({
  size = 28,
  showWordmark = true,
  className,
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <MaktekMark size={size} />
      {showWordmark && (
        <span className="font-mono text-base font-bold uppercase tracking-[0.18em]">
          MAKTEK
        </span>
      )}
    </span>
  );
}
