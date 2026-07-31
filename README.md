# Muhammad Ali — Portfolio
  
Full-stack developer and AI specialist. This is my personal portfolio site — a dark-first, AI-powered marketing site built to win high-ticket freelance engagements.

**Live:** https://muhammadali.dev _(coming soon)_
   
## What's inside    

- **13 sections**: Hero, About, Tech Stack, Services, Featured Work, MCP Expertise, Client Dashboard, GitHub public repos, AI Live Demo, Pricing, Process, Testimonials, Contact
- **Two live AI widgets** powered by Groq (Llama 3.3 70B):
  - Streaming chat assistant that answers questions about me  
  - Project estimator that returns structured recommendations in JSON mode    
- **GitHub repos** fetched live from the REST API, private filtered server-side         
- **Day / Night theme toggle** with no-flash hydration     
- **CSS-only 3D hero crystal** with mouse parallax
- **Dynamic Open Graph image** generated at the edge   
- **Branded project mockups** per project — no stock images
- **Full SEO**: JSON-LD Person schema, sitemap, robots, metadata API
- **Resend-backed contact form** that degrades gracefully if the API key isn't set     

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 18 + TypeScript 5
- [Tailwind CSS 3.4](https://tailwindcss.com) + [Framer Motion 11](https://www.framer.com/motion)
- [Groq SDK](https://console.groq.com) for AI inference
- [Resend](https://resend.com) for transactional email
- [Lucide](https://lucide.dev) icons, [Inter](https://rsms.me/inter) + JetBrains Mono fonts
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
git clone https://github.com/muhammadali1473/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `GROQ_API_KEY` | Powers the AI demos | <https://console.groq.com/keys> (free) |
| `GROQ_MODEL` | Model override | defaults to `llama-3.3-70b-versatile` |
| `GITHUB_TOKEN` | Raises the 60 req/hr GitHub API limit | optional — GitHub → Settings → Developer settings |
| `RESEND_API_KEY` | Sends contact-form emails | <https://resend.com/api-keys> |
| `RESEND_FROM_EMAIL` | Verified sender domain | Resend → Domains |
| `RESEND_TO_EMAIL` | Where messages land | e.g. `you@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | Final production URL | `https://yourdomain.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International format | `+923354266488` |
| `NEXT_PUBLIC_PHONE` | Display format | `+92 335 4266488` |
| `NEXT_PUBLIC_LINKEDIN_URL` | | |
| `NEXT_PUBLIC_GITHUB_URL` | | |
| `NEXT_PUBLIC_X_URL` | | |
| `NEXT_PUBLIC_UPWORK_URL` | | |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | |

Without `GROQ_API_KEY` the AI widgets show a friendly "not configured" message. Without `RESEND_API_KEY` the contact form tells the visitor to email directly.

## Deploy

See [DEPLOY.md](./DEPLOY.md) for a step-by-step Vercel walkthrough.

Short version:
1. Push this repo to GitHub.
2. Import at <https://vercel.com/new>.
3. Paste env vars from `.env.example`.
4. Click **Deploy**.

## Customize

All site copy lives in [`lib/constants.ts`](./lib/constants.ts) — services, projects, pricing, process steps, testimonials, tech stack. Swap text there first before editing components.

- **Profile photo**: overwrite [`public/profile.png`](./public/profile.png) (512×512 JPEG/WebP, ~150 KB recommended).
- **Project mockups**: each one is a hand-crafted React component in [`components/shared/ProjectThumb.tsx`](./components/shared/ProjectThumb.tsx) — branded per project, no external images.
- **Colors / gradients**: [`tailwind.config.ts`](./tailwind.config.ts) and [`app/globals.css`](./app/globals.css).

## Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## License

MIT — free to reuse and adapt.

---

Built with Next.js, Tailwind, and ❤ from Pakistan.
