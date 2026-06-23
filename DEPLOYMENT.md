# Deploying MeetEase to Vercel

This is the exact path from a fresh repo to a live URL — plus the fix for the
`MIDDLEWARE_INVOCATION_FAILED` error, and a checklist of the things only you can do.

---

## ⚡ TL;DR — the error you probably hit

If your deploy shows:

```
500: INTERNAL_SERVER_ERROR
Code: MIDDLEWARE_INVOCATION_FAILED
```

…it's because **Clerk's auth middleware throws at the edge when its keys aren't set**, and
`.env` is git-ignored so your local keys never reached Vercel.

**Two things fix it (both already handled / documented):**

1. **The code is now crash-proof.** The middleware only runs Clerk when a publishable key is
   present and falls through to guest mode otherwise — so the site stays up regardless. _(Done.)_
2. **Add your environment variables in the Vercel dashboard** so full auth actually works.
   This is the manual step below. _(You.)_

---

## Step 1 — Push to GitHub

```bash
git add .
git commit -m "Finalize MeetEase for deployment"
git push origin main
```

## Step 2 — Import the project into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and **Import** your GitHub repo.
2. Vercel auto-detects Next.js. Leave the defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (already set in `vercel.json`)
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
3. **Don't click Deploy yet** — add environment variables first (Step 3).

## Step 3 — Add environment variables (the important part)

In the import screen (or later under **Project → Settings → Environment Variables**), add:

| Key | Value | Required for |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_…` / `pk_test_…` | Sign-in / sign-up |
| `CLERK_SECRET_KEY` | `sk_live_…` / `sk_test_…` | Sign-in / sign-up |
| `NEXT_PUBLIC_STREAM_API_KEY` | your Stream key | Video calls |
| `STREAM_SECRET_KEY` | your Stream secret | Video tokens |
| `ANTHROPIC_API_KEY` | `sk-ant-…` | AI copilot (else offline fallback) |
| `AI_MODEL` | `claude-sonnet-4-6` | Optional — copilot model |
| `NEXT_PUBLIC_BASE_URL` | `https://your-app.vercel.app` | Correct OG tags + sitemap |

Notes:
- Set each for **Production** (and Preview, if you want preview deploys to work).
- The app deploys and loads **even with none of these set** — it just runs in guest /
  offline mode. They unlock the real features.
- After adding or changing env vars, **redeploy** (Deployments → ⋯ → Redeploy) — Vercel does
  not pick up new vars on an existing build.

## Step 4 — Deploy

Click **Deploy**. First build takes ~1–2 minutes. When it's green, open the URL.

## Step 5 — Custom domain (optional)

1. **Project → Settings → Domains → Add.**
2. Enter your domain (e.g. `meetease.charanreddy.dev`).
3. Add the **CNAME** / **A** record Vercel shows you at your DNS provider.
4. Once it verifies, update `NEXT_PUBLIC_BASE_URL` to the custom domain and redeploy.

---

## ✅ Manual checklist — only you can do these

- [ ] Create a [Clerk](https://clerk.com) app → copy publishable + secret keys
- [ ] Create a [Stream](https://getstream.io) app → copy API key + secret
- [ ] (Optional) Create an [Anthropic](https://console.anthropic.com) key for the live copilot
- [ ] Add all of the above to **Vercel → Settings → Environment Variables**
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your real deployed URL, then **redeploy**
- [ ] In the **Clerk dashboard**, add your Vercel domain to the allowed origins / paths
- [ ] Drop a hero **screenshot/GIF** into `README.md` (replace the placeholder)
- [ ] Update the **live URL** in `README.md` and `app/layout.tsx` metadata if it differs
- [ ] Verify the repo URL in `lib/site.ts` matches your actual GitHub repo
- [ ] (Optional) Post about it on LinkedIn, then paste the URL into `lib/site.ts` →
      `project.linkedinPost` so the "Read the LinkedIn post" button goes live on `/about-project`

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `MIDDLEWARE_INVOCATION_FAILED` 500 | Clerk keys missing on Vercel | Add Clerk env vars + redeploy (Step 3) |
| Sign-in page says "not configured" | No Clerk publishable key | Add Clerk env vars + redeploy |
| Video never connects | No Stream keys | Add Stream env vars + redeploy |
| Copilot replies "offline mode" | No `ANTHROPIC_API_KEY` | Add the key + redeploy |
| OG image / links use wrong domain | `NEXT_PUBLIC_BASE_URL` unset | Set it to your URL + redeploy |
| Icons 404 in production only | Filename case mismatch (Linux is case-sensitive) | Already fixed; keep asset references lowercase |
