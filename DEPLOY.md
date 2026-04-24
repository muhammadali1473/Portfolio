# Deploy to Vercel — step by step

Vercel is the best place for this site — it's made by the team behind Next.js, the edge runtime works out of the box, and the free tier is enough for a portfolio.

## 1. Put the code on GitHub

Open a terminal at `D:\All_project\portfolio` and run:

```bash
git init
git add .
git commit -m "Initial portfolio"
```

Then create a new empty repo at https://github.com/new (private or public — both work). Once created, follow the "push an existing repo" commands GitHub shows, roughly:

```bash
git branch -M main
git remote add origin https://github.com/muhammadali1473/portfolio.git
git push -u origin main
```

## 2. Import to Vercel

1. Go to https://vercel.com/new and sign in with GitHub.
2. Pick the portfolio repo → **Import**.
3. Framework preset: Vercel auto-detects **Next.js** — leave everything at defaults.
4. **Do NOT deploy yet** — click the "Environment Variables" section first.

## 3. Add environment variables

Paste these, one per row, into Vercel's env-var UI. Scope them to all envs (Production, Preview, Development) unless noted.

| Key | Value | Notes |
| --- | --- | --- |
| `GROQ_API_KEY` | `gsk_...` | Your new Groq key (rotate the chat-shared one first) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Optional — defaults to this |
| `GITHUB_TOKEN` | *(optional)* | A read-only PAT raises the anonymous 60 req/hr GitHub limit |
| `RESEND_API_KEY` | `re_...` | From https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | `hello@yourdomain.com` | Must be on a Resend-verified domain |
| `RESEND_TO_EMAIL` | `get.muhammad5@gmail.com` | Where form submissions land |
| `NEXT_PUBLIC_SITE_URL` | `https://muhammadali.dev` | Your final domain |
| `NEXT_PUBLIC_EMAIL` | `get.muhammad5@gmail.com` | Shown in the footer |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+923354266488` | International format |
| `NEXT_PUBLIC_PHONE` | `+92 335 4266488` | Display format |
| `NEXT_PUBLIC_LINKEDIN_URL` | `https://linkedin.com/in/muhammad-ali-130166282` | |
| `NEXT_PUBLIC_GITHUB_URL` | `https://github.com/muhammadali1473` | |
| `NEXT_PUBLIC_X_URL` | `https://x.com/get_Muham` | |
| `NEXT_PUBLIC_UPWORK_URL` | `https://www.upwork.com/freelancers/~01bd36b0801e739e81` | |
| `NEXT_PUBLIC_CALENDLY_URL` | *(optional)* | Fill in when you have one |

Click **Deploy**. First build takes ~2 minutes.

## 4. Add a custom domain

1. Vercel project → **Settings** → **Domains**.
2. Type `muhammadali.dev` (or whatever domain you own) → **Add**.
3. Vercel shows DNS records. Copy them.
4. Add those records at your domain registrar's DNS panel.
5. SSL is issued automatically within a few minutes.

Once the custom domain is live, **update `NEXT_PUBLIC_SITE_URL`** in Vercel envs to `https://muhammadali.dev` and **redeploy** so OG images + canonical URLs reference the right host.

## 5. Verify the live site

Open the deployed URL and tick:

- Hero loads, 3D crystal rotates, mouse parallax works
- All 13 sections scroll without runtime errors (check browser console)
- Theme toggle switches Day ↔ Night and persists on refresh
- GitHub section fetches public repos (no 404)
- AI chat streams a response
- Project estimator returns a JSON recommendation
- Contact form sends an email (use your own email to test — check your inbox at `RESEND_TO_EMAIL`)
- Mobile viewport (DevTools → 375×812) renders cleanly

## 6. (Optional but recommended)

- **Compress the profile photo.** Right now `public/profile.png` is ~1.5 MB. Export a 512×512 JPEG/WebP at ~150 KB and overwrite it. Next.js's `<Image>` will optimize per device but a smaller source is always faster.
- **Uninstall unused 3D deps.** Saves ~15 MB in `node_modules`:
  ```bash
  npm uninstall three @react-three/fiber @react-three/drei @types/three
  ```
- **Set up Vercel Analytics** (free tier). In the Vercel dashboard → project → **Analytics** → enable.
- **Rotate the Groq key** you shared earlier today in the chat. Replace it in Vercel env vars.

## If something breaks

- Build fails on Vercel but works locally? → Delete `.next` locally, commit any uncommitted work, push, and retrigger the Vercel deploy from the dashboard.
- GitHub section shows "Couldn't load repositories"? → Add `GITHUB_TOKEN` (scopes: `public_repo`) to raise the rate limit.
- Contact form shows "Email service not configured"? → `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is wrong. Verify the sending domain in Resend.
- Theme flashes on first paint? → The inline script in `app/layout.tsx` should prevent this. If it happens, check that `suppressHydrationWarning` is still on `<html>` and `<body>`.
