import Link from "next/link";
import { Briefcase, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { NAV_LINKS } from "@/lib/constants";
import { site, socials } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary font-mono text-sm font-bold text-white shadow-glow">
                MA
              </span>
              <GradientText className="text-lg font-semibold">
                {site.name}
              </GradientText>
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SocialIcon href={socials.linkedin} label="LinkedIn">
              <Linkedin size={16} />
            </SocialIcon>
            <SocialIcon href={socials.github} label="GitHub">
              <Github size={16} />
            </SocialIcon>
            <SocialIcon href={socials.x} label="X (Twitter)">
              <Twitter size={16} />
            </SocialIcon>
            <SocialIcon href={socials.upwork} label="Upwork">
              <Briefcase size={16} />
            </SocialIcon>
            <SocialIcon href={`mailto:${socials.email}`} label="Email">
              <Mail size={16} />
            </SocialIcon>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            Built with Next.js, Tailwind, and <span className="text-rose-400">❤</span> from
            Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-foreground"
    >
      {children}
    </a>
  );
}
