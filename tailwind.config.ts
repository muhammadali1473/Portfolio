import type { Config } from "tailwindcss";
// Static import, not require(). Node 24 loads this .ts config as an ES module,
// where `require` is not defined — a bare require() here crashes the CSS build.
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Palette is sampled directly from the hero portrait rather than invented:
 *   backdrop  #B7A58D → #C1AB9D   (page is a lightened tint of this)
 *   shirt     #171717 → #171C20   (ink, and the primary button fill)
 *   warm light on skin            (gold accent)
 *
 * Two golds on purpose. `accent`/`primary` (#875C2C) clears 4.5:1 on the page
 * so it is safe for text; `gold` (#A8763C) is brighter and decorative only —
 * rules, dots, underlines, the scroll bar. Never set body copy in `gold`.
 */
const config: Config = {
  // Single warm-light theme. The dark class hook is gone along with the toggle.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // The band colour — the portrait's true backdrop. Used as a block fill
        // behind the photo so the image edge meets it seamlessly.
        band: "#B8A68F",
        // Gold ink. 4.88:1 on the page background — safe for text and icons.
        primary: {
          DEFAULT: "#875C2C",
          foreground: "#FDFBF7",
        },
        // Clay, pulled from the skin tones. Secondary highlights.
        secondary: {
          DEFAULT: "#8A5F4A",
          foreground: "#FDFBF7",
        },
        // Bronze-olive, from the backdrop's shadow side.
        accent: {
          DEFAULT: "#6F6350",
          foreground: "#FDFBF7",
        },
        // Decorative gold — rules, dots, underlines. Not for text.
        gold: "#A8763C",
        destructive: {
          DEFAULT: "#A33A32",
          foreground: "#FDFBF7",
        },
        card: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--surface-elevated))",
          foreground: "hsl(var(--foreground))",
        },
      },
      backgroundImage: {
        // Redefined rather than removed: ~22 files reference these. Keeping the
        // names and flattening the values retunes every one of them at once.
        "gradient-primary": "linear-gradient(135deg, #A8763C 0%, #875C2C 100%)",
        "gradient-primary-soft":
          "linear-gradient(135deg, rgba(168,118,60,0.12) 0%, rgba(135,92,44,0.12) 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "grid-faint":
          "linear-gradient(to right, rgba(26,26,24,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,24,0.045) 1px, transparent 1px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Retained for the "available" status dot, retuned from a neon pulse
        // to a soft warm halo.
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(135,92,44,0.28)" },
          "50%": { boxShadow: "0 0 0 10px rgba(135,92,44,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        // Was a purple neon bloom. Now a real shadow: warm, tight, physical.
        glow: "0 1px 2px rgba(26,26,24,0.05), 0 8px 24px -14px rgba(26,26,24,0.18)",
        "glow-lg":
          "0 2px 4px rgba(26,26,24,0.06), 0 18px 44px -20px rgba(26,26,24,0.26)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
