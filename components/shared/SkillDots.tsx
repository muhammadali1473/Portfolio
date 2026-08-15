import { cn } from "@/lib/utils";

export function SkillDots({ level, className }: { level: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            i < level ? "bg-primary" : "bg-foreground/15",
          )}
        />
      ))}
    </div>
  );
}
