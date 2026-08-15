"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Name kept for the ~15 files that import it, but the magnet is gone: the
 * cursor-tracking spring read as a gimmick against a calm editorial page, and
 * it forced a layout measurement on every pointer move.
 *
 * `primary` is an ink fill — the same near-black as the shirt in the portrait.
 * Gold is deliberately NOT the button colour: a gold fill only reaches ~3.6:1
 * against white text, whereas ink clears 15:1. Gold stays an accent.
 */
type Variant = "primary" | "outline" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

type MagneticButtonProps = AsButton | AsLink;

const baseStyles =
  "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-foreground text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/[0.06] hover:text-primary",
  ghost: "text-muted-foreground hover:bg-primary/[0.06] hover:text-foreground",
};

const sizeStyles = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    variant = "primary",
    icon,
    size = "md",
    className,
  } = props;

  // The icon drifts a few pixels on hover — the one bit of motion kept, because
  // it signals direction rather than decorating.
  const inner = (
    <>
      {children}
      {icon && (
        <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  const buttonProps = props as AsButton;
  const { href: _h, variant: _v, icon: _i, size: _s, className: _c, ...rest } =
    buttonProps;
  void _h;
  void _v;
  void _i;
  void _s;
  void _c;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
