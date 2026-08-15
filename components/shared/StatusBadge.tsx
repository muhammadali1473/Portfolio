import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/constants";

/**
 * Status keeps its semantic hues — green ships, amber is in flight, blue is a
 * proposal — but retuned for a light page. The old 300-weight text was tuned
 * for a near-black background and fell under 2:1 here; these 700 weights clear
 * 4.5:1 on the warm surface, and the dots lost their neon halos.
 */
export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const map = {
    shipped: {
      label: "Shipped",
      border: "border-emerald-700/25 bg-emerald-700/[0.07] text-emerald-800",
      dot: "bg-emerald-700",
    },
    "in-progress": {
      label: "In Progress",
      border: "border-amber-700/25 bg-amber-700/[0.07] text-amber-800",
      dot: "bg-amber-700",
    },
    proposal: {
      label: "Proposal Stage",
      border: "border-sky-800/25 bg-sky-800/[0.07] text-sky-900",
      dot: "bg-sky-800",
    },
  } as const;
  const cfg = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        cfg.border,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}
