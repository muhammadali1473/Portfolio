# CHANGELOG

All user-facing portfolio fixes, grouped by the 12-item punch list from the
owner brief.

---

## 🔴 URGENT — ethical / business risk

### Fix #3 — Removed real client names (prospects anonymized)

Three "Client Delivery Dashboard" entries were exposing the names of real
prospects as though they were signed clients. Replaced with concept-stage,
anonymized framing.

- `Capella Dubai AI Real Estate` → **Dubai Real Estate AI Platform (Concept)** — client `Real Estate Client (UAE)`
- `Dreamspire Therapy Portal` → **Therapy Clinic Portal (Concept)** — client `Healthcare Client (AUS)`
- `Lisa Andrews Spiritual Platform` → **Spiritual Coaching Platform (Concept)** — client `Coaching Client (UK)`

Changes:
- `lib/constants.ts` — renamed project ids, titles, descriptions, stories, clients, roles.
- New project status value `"proposal"` in `ProjectStatus` type with its own "Proposal Stage" styling (sky-blue) across `StatusBadge`, `ClientWork` table + mobile cards.
- `ClientWork` summary cards now read **7 total / 4 shipped / 3 (Proposal Stage) / 2 personal + 3 pitching** per spec.
- `ClientWork` filter tabs: `All · Shipped · Proposal Stage`.
- `components/shared/ProjectThumb.tsx` — browser-mockup badges updated (`Real Estate · Concept`, `Therapy · Concept`, `Coaching · Concept`).

**Kept as-is (real shipped work):** LinkedIn MCP, X MCP Builder, Swipi, SpendWise.

### Fix #4 — Removed the fake `Sarah K. / GrowthLabs` testimonial

The entire fabricated carousel (Sarah K., Marcus R., Fatima A., James P.) was
removed. The section now leads with an honest message and real proof points:

> "Real testimonials coming soon. I'm currently working with my first client
> cohort — their feedback will live here once projects launch. In the meantime,
> check out my shipped work on the App Store and GitHub."

Three CTAs added below:
- **View Swipi on App Store →** (https://apps.apple.com/ae/app/swipi-swipe-photo-cleaner/id6758861898)
- **View SpendWise on App Store →** (https://apps.apple.com/ae/app/budget-planner-app-spendwise/id6758571585)
- **View GitHub repos →** (fallback proof surface)

Files: `components/sections/Testimonials.tsx` (full rewrite), `lib/constants.ts` (emptied `TESTIMONIALS`).

---

## 🟠 CRITICAL

### Fix #1 — Broken animated counters rewritten

Counters in "Trusted by Builders" now use Framer Motion's `animate()` + `useMotionValue` + `useInView` (trigger once) with 2-second `easeOut` duration, animating each stat from **0** to its target. Final display preserves `+` and `%` suffixes.

- **12+ Projects Shipped · 4+ Years Experience · 2 iOS Apps Live · 100% On-Time Delivery**
- Honors `prefers-reduced-motion` — jumps straight to the final value.
- Exposes the final display string via `aria-label` so screen readers get "12+ Projects Shipped" rather than a mid-tween number.

Files: `components/shared/AnimatedCounter.tsx` (rewrite), `lib/constants.ts` (new `ANIMATED_STATS`), `components/sections/Testimonials.tsx` (uses new API).

### Fix #2 — GitHub repos no longer stuck on "Loading…"

- `app/api/github/route.ts` — fetches `users/muhammadali1473/repos?sort=updated&per_page=6`, filters out archived / forks / private. **On API failure, empty result, or 502 it returns a curated static fallback** (linkedin-mcp-server, x-mcp-builder, ai-portfolio-site, swipi-photo-cleaner) with a `fallback: true` flag so the UI can show a small "API rate-limited — showing a curated snapshot" note.
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` — 1-hour server-side cache.
- New "**View All on GitHub**" primary CTA added beneath the repo grid, linking to https://github.com/muhammadali1473.
- Loading skeleton already present; accessibility fixed (`role="status"`, `aria-live`, `aria-label` on links, `aria-hidden` on decorative icons).

Files: `app/api/github/route.ts`, `components/sections/GitHubRepos.tsx`.

### Fix #7 — AI demos hardened

- **System prompt** on `/api/chat` rewritten to match the brief exactly (4+ yrs, 2 iOS apps, MCP servers, countries, pricing range, response time 2-4h, direct contact details, "Never make up information" rule).
- **Rate limiting** added (`lib/rate-limit.ts`): 20 chat msgs / 5 min and 10 estimates / 10 min per IP. Over-limit returns 429 with a polite message.
- **Friendly error** on every failure path: *"Something went wrong — please try again or contact Muhammad directly at get.muhammad5@gmail.com"* — both on the chat stream channel and in the estimator JSON response.
- Chat log gets `role="log"`, `aria-live="polite"`, labeled input + send button (44px).
- Estimator result card now ends with a prominent **Contact Muhammad →** CTA (44px min height).
- Streaming response preserved — typing dots + per-token delivery unchanged.

Files: `lib/groq.ts`, `lib/rate-limit.ts` (new), `app/api/chat/route.ts`, `app/api/estimate/route.ts`, `components/ai/AskAiChat.tsx`, `components/ai/ProjectEstimator.tsx`.

---

## 🟡 HIGH PRIORITY

### Fix #5 — Location reframed

- About-section pill changed from `Based in Pakistan 🇵🇰 · Serving Globally 🌍` → **`Remote developer · Building for founders in US, UK, UAE, Australia, Germany & Canada 🌍`**.
- `lib/site.ts` description and keywords updated to match the new framing; `Pakistan developer` keyword removed; `location` field reset to `"Remote"`.
- Footer keeps the subtle, owner-approved line: *"Built with Next.js, Tailwind, and ❤ from Pakistan."*

Files: `components/sections/About.tsx`, `lib/site.ts`.

### Fix #6 — Favicon + Open Graph image + metadata

- **`app/icon.tsx`** — 32×32 favicon, gradient `#8B5CF6 → #3B82F6 → #06B6D4`, "MA" letters, rounded.
- **`app/apple-icon.tsx`** — NEW, 180×180 Apple touch icon, same gradient, same mark.
- **`app/opengraph-image.tsx`** — rebuilt 1200×630 card: dark `#0A0A0F` bg, radial gradient glows, bottom-right accent blob, `MA` mark, `@get_Muham` handle, large "Muhammad Ali" headline, "Full-Stack Developer & AI Specialist" subtitle, "AI Agents · MCP Servers · Modern Web Apps" in gradient.
- All three are generated via Next's file-convention `ImageResponse` pipeline, so no binary assets need to live in `/public` — Next auto-emits the correct `<link rel="icon">`, `<link rel="apple-touch-icon">`, `og:image`, `twitter:image` tags at build time.
- **`app/layout.tsx` metadata rewritten** — new title, keyword list, OG block, `twitter.creator = '@get_Muham'`, authors, creator, canonical.

### Fix #8 — SEO essentials verified

- `app/robots.ts` — `Allow: /`, disallow `/api/`, sitemap URL.
- `app/sitemap.ts` expanded to include section anchors (`#projects`, `#services`, `#pricing`, `#contact`) with change-frequency + priority.
- `app/layout.tsx` — JSON-LD `Person` schema rewritten with the exact `sameAs` list and `knowsAbout` array from the brief.

---

## 🟢 MEDIUM — Fixes #9–#12

### Mobile responsiveness (Fix #9)

- Reviewed breakpoints at 375 / 390 / 768. Grids already collapse correctly:
  Tech = `2 → 3 → 6` cols, Services = `1 → 2 → 3`, Projects = `1 → 2`, Pricing = `1 → 2 → 4`, Client dashboard swaps to stacked cards under `lg`.
- Contact form inputs bumped to `min-h-[44px]` per iOS HIG; Project-type pills same; submit buttons same.
- Mobile hamburger already has backdrop blur + ESC handler + body-scroll lock.
- WhatsApp link pre-fills *"Hi Muhammad, I'd like to discuss a project."* via `whatsappLink()` helper (`lib/site.ts`).

### Performance (Fix #10)

- **Dynamic imports** for the two heavy AI demo components (`AskAiChat`, `ProjectEstimator`) — they now load only when the section scrolls into view, each behind a skeleton with `role="status"`. Three.js Hero scene and particle canvas were already dynamic.
- **ParticleNetwork disabled on mobile** (`max-width: 768px`) — major battery / LCP win.
- Font loading: `next/font` Inter + JetBrains Mono with `display: "swap"` and `preload: true` on Inter.
- GitHub response cached server-side for 1h with `stale-while-revalidate=86400`.
- `next lint` and `next build` both clean — bundle for `/` is 31.5 kB (197 kB first-load JS).

### Accessibility (Fix #11)

- **Skip-to-content** link at the top of `<body>` (`#main-content`) — visually hidden until focused.
- `<main id="main-content">` now wraps the page content in `layout.tsx`.
- External links standardized to `target="_blank" rel="noopener noreferrer"` with `(opens in new tab)` in their `aria-label`.
- Decorative icons marked `aria-hidden`, icon-only buttons get `aria-label`.
- AI chat log uses `role="log" aria-live="polite"`; estimator result announces via `aria-live`.
- Filter tabs in `ClientWork` get `role="tablist"` / `role="tab"` / `aria-selected`.
- Focus-visible rings (`focus-visible:ring-2 focus-visible:ring-primary/60`) added across CTAs, tabs, social icons, toggle pills.
- `prefers-reduced-motion` honored in `AnimatedCounter` (snaps straight to target) and globally via `globals.css`.

### Final polish (Fix #12)

- **404 page** — `app/not-found.tsx` with gradient heading + Home + Contact CTAs.
- **Privacy Policy page** — `app/privacy/page.tsx` (simple one-pager).
- Privacy link added to the Footer; Footer social icon buttons bumped to 40px square and labeled.
- **Scroll-to-top button** — `components/shared/ScrollToTop.tsx`, appears after 500 px of scroll, smooth-scrolls with `prefers-reduced-motion` respect built into global CSS.
- `scroll-behavior: smooth` already globally enabled via `globals.css`.
- Swept the codebase for `console.log` / `console.info` / `console.warn` / `console.debug` — none found.
- `.env.example` refreshed with accurate comments, including the new Vercel preview URL and a clearer `GITHUB_TOKEN` purpose.

---

## Files added

- `app/apple-icon.tsx`
- `app/not-found.tsx`
- `app/privacy/page.tsx`
- `components/shared/ScrollToTop.tsx`
- `lib/rate-limit.ts`

## Files modified

- `app/api/chat/route.ts`
- `app/api/estimate/route.ts`
- `app/api/github/route.ts`
- `app/layout.tsx`
- `app/opengraph-image.tsx`
- `app/sitemap.ts`
- `components/ai/AskAiChat.tsx`
- `components/ai/ProjectEstimator.tsx`
- `components/sections/About.tsx`
- `components/sections/AiDemo.tsx`
- `components/sections/ClientWork.tsx`
- `components/sections/Contact.tsx`
- `components/sections/Footer.tsx`
- `components/sections/GitHubRepos.tsx`
- `components/sections/Projects.tsx`
- `components/sections/Testimonials.tsx`
- `components/shared/AnimatedCounter.tsx`
- `components/shared/ProjectThumb.tsx`
- `components/shared/StatusBadge.tsx`
- `components/three/ParticleNetwork.tsx`
- `lib/constants.ts`
- `lib/groq.ts`
- `lib/site.ts`
- `.env.example`

---

## Deployment

### 1. Local verification

```bash
npm install
npm run dev
# → open http://localhost:3000 — verify every fix manually
```

Manual checklist:
- [ ] Scroll to "Trusted by Builders" → counters animate once.
- [ ] Scroll to "Open Source" → repo grid populates within a second (or fallback tiles appear with the rate-limit notice).
- [ ] "Client Delivery Dashboard" → 7 projects, 4 Shipped, 3 Proposal Stage. No prospect names visible.
- [ ] "Trusted by Builders" section below counters reads the honest placeholder with 3 CTAs — no Sarah K.
- [ ] About pill reads "Remote developer · Building for founders in US, UK, UAE, Australia, Germany & Canada".
- [ ] Ask-AI chat streams tokens; broken input path shows the friendly error.
- [ ] Project Estimator returns a card; has **Contact Muhammad →** button.
- [ ] `/privacy` renders; 404 page renders at `/anything-else`.
- [ ] Scroll past 500 px → scroll-to-top button appears bottom-right.
- [ ] WhatsApp link (from Contact section) opens WhatsApp with "Hi Muhammad, I'd like to discuss a project." pre-filled.

### 2. Production build

```bash
npm run build
npm run start
```

### 3. Commit and push

```bash
git add .
git commit -m "Fix: counters, GitHub API, anonymize clients, remove fake testimonial, SEO, favicon, OG image, performance, a11y"
git push
```

### 4. Vercel auto-deployment

- Confirm `GROQ_API_KEY` and `RESEND_API_KEY` are set in Vercel Project Settings → Environment Variables (Production + Preview).
- After deploy, paste the site URL in WhatsApp / Slack — preview should show the new 1200×630 OG card with the MA mark and gradient glow.
- Run Lighthouse on the deployed URL (desktop + mobile). Targets: Performance 90+, Accessibility 95+, SEO 100.
- Hit `/sitemap.xml` and `/robots.txt` and confirm both return 200.
- Hit `/icon`, `/apple-icon`, `/opengraph-image` and confirm all three return PNGs.
