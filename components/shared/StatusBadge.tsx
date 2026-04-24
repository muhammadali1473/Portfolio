import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/constants";

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
      border: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]",
    },
    "in-progress": {
      label: "In Progress",
      border: "border-amber-400/30 bg-amber-400/10 text-amber-300",
      dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
    },
    proposal: {
      label: "Proposal Stage",
      border: "border-sky-400/30 bg-sky-400/10 text-sky-300",
      dot: "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]",
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
