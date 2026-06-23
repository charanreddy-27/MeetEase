# MeetEase — Senior Engineering / Recruiter Evaluation

> **Reviewer lens:** Senior Frontend / Full-Stack hiring panel at a top-tier product company
> (think FAANG-adjacent / well-funded scale-up). I reviewed this the way I'd review a take-home
> or a portfolio project a candidate walked me through on-site: looking past the visuals into
> architecture, data flow, security, testing, and production-readiness.
>
> **Date:** 2026-06-21 · **Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind ·
> Clerk (auth) · Stream Video SDK · Anthropic Claude (streaming) · Web Speech API

---

## TL;DR

**Overall: 7.2 / 10 as a portfolio project. ~5.5 / 10 as "production-ready code."**

This is **clearly top-quartile for a portfolio**. It is a real, working video-conferencing app
with three hard integrations done correctly (auth, real-time video, streaming LLM), a polished and
cohesive design system, and several genuinely thoughtful details (graceful AI fallback, browser-native
transcription, SSE parsing by hand). Most candidate projects are TODO apps or dashboards with fake
data; this clears that bar comfortably.

What stops it from being a "hire on the spot, this person ships production code" signal: **mock data
sitting next to a real data layer**, **zero automated tests**, **no CI**, **deliberate security
relaxations left in the codebase**, and a handful of **polish/consistency gaps** (dead code, broken
icon refs, branding drift). These are exactly the things a reviewer pokes at to separate "can build a
demo" from "can own a service."

**If I were screening:** I'd advance this candidate and use the gaps below as the technical
conversation. Fixing even the top 5 would push this to a confident 8.5+.

---

## How I'd calibrate the level

| Signal | Reads as |
|---|---|
| Integrates Clerk + Stream + Anthropic and they actually work | Mid → Senior |
| Hand-written SSE stream parser with graceful degradation | Senior |
| Cohesive, themable design system (CSS variables + tokens) | Mid → Senior |
| Mock data in list views, no tests, no CI, security toggles in code | Junior → Mid |
| **Net** | **Strong Mid-level, reaching for Senior. The gap to Senior is *rigor*, not capability.** |

The capability ceiling here is high. The consistency floor is what needs raising.

---

## Scorecard

| Category | Score | One-line |
|---|:---:|---|
| Product concept & scope | 8.5 | Ambitious, coherent, recognizable product |
| UI / UX & design system | 8.5 | Polished, consistent, modern; strong first impression |
| Architecture | 7.0 | Sensible App Router structure; some duplication & dead code |
| Code quality / TypeScript | 7.0 | `strict` on, clean components; inconsistent data patterns |
| Core functionality | 7.5 | Video + AI are real; list pages are mocked |
| Data integrity | 5.0 | Real data layer exists but unused on key pages |
| Security | 4.5 | Intentional "explore mode" relaxations shipped in code |
| Performance | 7.0 | Good instincts; some heavy client bundles, no images opt |
| Accessibility | 5.5 | Decent semantics; clickable divs, focus/contrast gaps |
| Testing | 1.0 | None. No unit, no integration, no e2e, no tooling |
| Tooling / DevEx / CI | 4.0 | Lint + Prettier present; no CI, no hooks, no tests |
| Documentation | 7.5 | Multiple thorough setup docs; some are stale/marketing-y |
| **Weighted overall** | **7.2** | Excellent portfolio piece; not yet production-grade |

---

## What's genuinely impressive (lead with these in an interview)

1. **The AI route is real and well-engineered** — [`app/api/ai/route.ts`](app/api/ai/route.ts)
   streams Claude responses, **parses Anthropic's SSE format by hand**, and has a **graceful
   offline fallback** that produces a useful local summary when `ANTHROPIC_API_KEY` is missing.
   That "degrade gracefully instead of dying" instinct is a senior trait.
2. **Browser-native transcription** — [`hooks/useSpeechRecognition.ts`](hooks/useSpeechRecognition.ts)
   uses the Web Speech API (no extra cost/keys) and feeds the AI copilot. Replacing a "simulated
   transcript" with the real thing shows product judgment.
3. **Real video integration** — Stream is wired end-to-end: token minting, client provider,
   call layouts, participant list, recordings query ([`hooks/useGetCalls.ts`](hooks/useGetCalls.ts)).
4. **Design system maturity** — HSL CSS variables + Tailwind token mapping
   ([`app/globals.css`](app/globals.css), [`tailwind.config.ts`](tailwind.config.ts)) means the
   entire app re-themes from one place. Glassmorphism/neumorphism utilities are reusable, not
   one-off. This is how design systems are actually built.
5. **Thoughtful component layering** — reusable effects (`ScrollReveal`, `MouseGlow`, `SpotlightCard`,
   `Counter`) are decoupled from sections. Good separation.
6. **Documentation depth** — `SETUP_GUIDE.md`, `QUICK_START.md`, `VERCEL_DEPLOYMENT.md`,
   `HOSTING_OPTIONS.md`, a production check script. Most candidates ship a one-line README.

---

## Critical issues (a reviewer *will* find these — fix before showing)

### 1. Mock data living next to a real data layer 🔴
`useGetCalls()` already queries Stream for real calls, and `CallList` renders them — but the
**Upcoming**, **Previous**, and **Recordings** pages render **hardcoded arrays with June 2023 dates**
and fake thumbnail paths:
- [`app/(root)/(home)/upcoming/page.tsx`](app/(root)/(home)/upcoming/page.tsx)
- [`app/(root)/(home)/previous/page.tsx`](app/(root)/(home)/previous/page.tsx)
- [`app/(root)/(home)/recordings/page.tsx`](app/(root)/(home)/recordings/page.tsx)

**Why it matters:** It signals "I built the UI but didn't finish wiring it." The fix is small
because the data layer exists — swap the static arrays for `CallList` / `useGetCalls`. This is the
single highest-ROI change for credibility.

### 2. Security relaxations shipped in code ("Explore Mode") 🔴
Auth is intentionally disabled in three places and the comments say so:
- [`middleware.ts`](middleware.ts) — no routes protected.
- [`app/api/ai/route.ts`](app/api/ai/route.ts) — auth check commented out.
- [`app/api/get-token/route.ts`](app/api/get-token/route.ts) — **mints a Stream token for any
  client-supplied `guestId` that starts with `"guest-"`**. That's an unauthenticated token-minting
  endpoint: anyone can get a valid Stream token and consume your Stream quota / impersonate guest IDs.

**Why it matters:** A reviewer reads this as "doesn't distinguish demo convenience from a security
boundary." Acceptable for a *deployed demo*, but it must be behind an env flag, not the default, and
never left in a repo you present as production-quality. Gate it: `if (process.env.NEXT_PUBLIC_EXPLORE_MODE === 'true')`.

### 3. Zero tests, zero CI 🔴
No test runner, no unit/integration/e2e, no `.github/workflows`. For a real-time app with token
logic, SSE parsing, and date-bucketing (`endedCalls`/`upcomingCalls`), the absence of even a handful
of unit tests is the clearest "not production-grade" tell. At minimum:
- Unit-test `localFallback()` and the date bucketing in `useGetCalls`.
- One Playwright smoke test: load home → open AI copilot → see a response.
- A GitHub Action running `lint` + `tsc --noEmit` + `build` on PR.

### 4. Dead / broken code 🟠
[`components/EnhancedMeetingControls.tsx`](components/EnhancedMeetingControls.tsx) is imported nowhere
and references **8 icon files that don't exist** (`mic-on.svg`, `end-call.svg`, etc.). Either delete
it or rebuild it with `lucide-react` icons and wire it in. Dead code with broken refs reads as "didn't
clean up."

### 5. Branding / config drift 🟠
- `package.json` `name` is still `"meetsync"`; support page emails are `@meetsync.com`;
  `MeetingCard` falls back to `meetease.com`. Pick one name everywhere.
- Two token-minting paths exist (`actions/stream.actions.ts` *and* `app/api/get-token/route.ts`) with
  divergent auth behavior. Consolidate to one.

---

## High-impact improvements (ranked by ROI for a job hunt)

1. **Wire the list pages to real data** (Critical #1). Biggest credibility win, smallest effort.
2. **Add a tests + CI baseline** (Critical #3). This is the differentiator between candidates.
3. **Gate Explore Mode behind an env flag** (Critical #2). Shows you understand boundaries.
4. **Add loading skeletons + empty/error states** to data views. Right now lists either show fake
   data or (when wired) a single message. Real apps handle loading/empty/error explicitly.
5. **Error boundaries + a real `error.tsx`** per route segment. The app has `not-found.tsx` but no
   `error.tsx`; an unhandled Stream/Clerk failure currently has no graceful UI.
6. **Persist user settings.** [`settings/page.tsx`](app/(root)/settings/page.tsx) `setTimeout`-fakes a
   save and the theme picker doesn't talk to `next-themes`. Wire it to Clerk metadata or a small store.
7. **Accessibility pass:** several clickable `<div>`s (theme/time pickers in settings, recording
   cards), missing `aria-label`s on icon-only buttons, and gradient text on glass needs a contrast
   check. Run axe/Lighthouse and fix the criticals.
8. **Input validation on API routes** (e.g., `zod`). The AI route trusts body shape; `get-token`
   trusts `guestId`. Validate and rate-limit.
9. **`next/image` everywhere + `next.config` image domains.** Recording thumbnails and avatars should
   use `next/image`; raw `<img>`/missing assets hurt LCP and look unfinished.
10. **Observability:** wrap the AI/token routes with structured logging + a Sentry (or similar) hook.
    "What happens when Anthropic 429s in prod?" is a question you want a confident answer to.

---

## Nice-to-haves (polish that separates 8 from 9)

- **Optimistic UI + React Query/SWR** for calls instead of bare `useEffect`+`useState` fetching
  (caching, retries, dedupe come free).
- **Keyboard shortcuts / command palette** (`cmdk`) — high perceived sophistication, low cost.
- **Storybook** for the design system — recruiters love a documented component library.
- **Real OG/social images + metadata per route** for shareability.
- **i18n scaffolding** — the settings UI advertises languages it doesn't implement.
- **Reduced-motion already respected in CSS** — good; extend it to the framer-motion components too.
- **Lighthouse / bundle budget in CI** — the meeting routes ship ~350–378 kB First Load JS; worth
  measuring and code-splitting the Stream SDK.

---

## Suggested 30-day roadmap (if this candidate were iterating)

**Week 1 — Make it honest.**
Replace mock data with `CallList`/`useGetCalls` on upcoming/previous/recordings. Delete dead code.
Unify branding. Gate Explore Mode behind `NEXT_PUBLIC_EXPLORE_MODE`.

**Week 2 — Make it safe & resilient.**
`zod` validation + basic rate limiting on API routes. `error.tsx` + error boundaries. Loading
skeletons and explicit empty/error states. Persist settings.

**Week 3 — Make it trustworthy.**
Vitest unit tests for `localFallback`, date bucketing, token expiry math. One Playwright smoke flow.
GitHub Actions: lint + typecheck + build + test on PR.

**Week 4 — Make it shine.**
Accessibility pass (axe clean). `next/image` + image config. Sentry. README rewrite that leads with
architecture + a 30-second demo GIF. Optional: Storybook for the effects/UI library.

---

## How to talk about it in an interview (turn weaknesses into signal)

- **Lead with the AI route:** "I parse Anthropic's SSE stream manually and degrade to a local
  summarizer when no key is present, so the feature never hard-fails." That's a senior answer.
- **Pre-empt the data question:** "The list pages currently render seed data; the real Stream-backed
  layer is in `useGetCalls` and `CallList` — here's the one-line swap and why I'd add SWR caching."
  Owning the gap beats being caught by it.
- **Frame Explore Mode as a *decision*:** "I deliberately disabled the auth wall for a public demo and
  documented exactly how to restore it — in production it sits behind an env flag." Intent + awareness.
- **Have a testing story even if tests are thin:** name *what* you'd test and *why* (token expiry,
  date bucketing, SSE edge cases). Knowing what to test is itself the signal.

---

## Bottom line

A **genuinely impressive portfolio project** that proves you can ship a real, integrated, good-looking
product — that already puts you ahead of most applicants. The distance from here to "obvious hire" is
**discipline, not talent**: finish the data wiring, add a test/CI baseline, treat security toggles as
configuration, and tidy the loose ends. Do the Week-1 and Week-3 work and this becomes a standout
piece I'd happily walk a hiring committee through.

**Portfolio rating: 7.2/10 today → realistically 8.5–9/10 after ~2 focused weeks.**
