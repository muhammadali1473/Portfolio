"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode, useRef } from "react";

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
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-transform will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary:
    "text-white shadow-glow bg-gradient-primary hover:shadow-glow-lg hover:brightness-110",
  outline:
    "text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25",
  ghost: "text-white hover:bg-white/5",
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
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: tx, y: ty }}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
      {icon}
    </motion.span>
  );

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classes}
      {...rest}
    >
      {inner}
    </button>
  );
}
