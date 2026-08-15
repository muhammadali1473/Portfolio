import Link from "next/link";
import { FileText, Mail, MapPin, Send } from "lucide-react";
import {
  WhatsAppIcon,
  LinkedInIcon,
  XIcon,
  GitHubIcon,
  UpworkIcon,
} from "@/components/shared/SocialIcons";
import { MaktekLogo } from "@/components/shared/MaktekLogo";
import { HEADER_LINKS } from "@/lib/constants";
import { site, socials, telLink, whatsappLink } from "@/lib/site";

/**
 * Official brand colours. Each button is a solid fill of the brand's real hex
 * with a white mark on top — the conventional social-button treatment.
 *
 * GitHub (#181717) and X (#000000) stay genuinely black; a thin border keeps
 * their edge readable against the dark theme, and the white mark carries the
 * contrast.
 */
const SOCIALS = [
  { label: "WhatsApp", href: whatsappLink() || telLink(), Icon: WhatsAppIcon, hex: "25D366" },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon, hex: "0A66C2" },
  { label: "GitHub", href: socials.github, Icon: GitHubIcon, hex: "181717" },
  { label: "X", href: socials.x, Icon: XIcon, hex: "000000" },
  { label: "Upwork", href: socials.upwork, Icon: UpworkIcon, hex: "14A800" },
  { label: "Email", href: `mailto:${socials.email}`, Icon: Mail, hex: "0EA5E9" },
];

// Split the menu into two balanced columns.
const half = Math.ceil(HEADER_LINKS.length / 2);
const linksLeft = HEADER_LINKS.slice(0, half);
const linksRight = HEADER_LINKS.slice(half);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <MaktekLogo size={30} className="text-foreground" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </div>

          {/* Quick links, split across two columns */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <div className="mt-5 grid grid-cols-2 gap-x-6">
              <FooterLinkList links={linksLeft} />
              <FooterLinkList links={linksRight} />
            </div>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            {/* Actions, not addresses. The mailto/wa.me targets live in the
                href; the number and email are never rendered as text. */}
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={whatsappLink() || telLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <WhatsAppIcon size={15} className="mt-0.5 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${socials.email}`}
                  className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" aria-hidden />
                  <span>Send an email</span>
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Send size={15} className="mt-0.5 shrink-0" aria-hidden />
                  <span>Send a message</span>
                </Link>
              </li>
              {socials.resume && (
                <li>
                  <a
                    href={socials.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FileText size={15} className="mt-0.5 shrink-0" aria-hidden />
                    <span>View my CV</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden />
                <span>Pakistan — working with clients worldwide</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <FooterHeading>Social Media</FooterHeading>
            {/* Sized to keep all six on a single row inside this column */}
            <div className="mt-5 flex flex-nowrap items-center gap-2">
              {SOCIALS.map(({ label, href, Icon, hex }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  style={{ backgroundColor: `#${hex}` }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 py-6">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <span aria-hidden>·</span>
              <Link href="/#contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </div>
            <p>
              © {year} MAKTEK. All rights reserved.
            </p>
            <p>
              Built with Next.js, Tailwind, and{" "}
              <span className="text-rose-700" aria-hidden>
                ❤
              </span>
              <span className="sr-only">love</span> from Pakistan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
      {children}
    </h3>
  );
}

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-col gap-3 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
