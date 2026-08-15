import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Circular portrait. The pulsing purple halo and gradient ring are replaced by
 * a band-coloured mount and a single gold hairline — the same mounting logic as
 * HeroPortrait, in a circle.
 */
export function ProfileRing({
  src = "/profile.png",
  alt = "Muhammad Ali",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative rounded-full bg-band p-[3px] shadow-glow">
        <div className="relative h-64 w-64 overflow-hidden rounded-full bg-band sm:h-72 sm:w-72">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 256px, 288px"
            priority
            className="object-cover"
            style={{ objectPosition: "center 18%" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/10"
          />
        </div>
      </div>
    </div>
  );
}
