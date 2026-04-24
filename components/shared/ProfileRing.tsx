import Image from "next/image";
import { cn } from "@/lib/utils";

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
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-primary opacity-70 blur-2xl animate-pulse-glow"
      />
      <div className="relative rounded-full bg-gradient-primary p-[3px]">
        <div className="relative h-64 w-64 overflow-hidden rounded-full bg-surface sm:h-72 sm:w-72">
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
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}
