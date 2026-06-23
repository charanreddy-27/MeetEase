# MeetEase — Interview Prep

Everything you need to talk about this project convincingly. Read it once before an
interview; rehearse the pitch and the two STAR stories out loud.

---

## 🎤 The 30-second elevator pitch

> "MeetEase is a video conferencing app where the AI isn't bolted on — it's wired in. Your
> microphone feeds a live transcript using the browser's own speech engine, and that transcript
> goes to Claude in real time, so you can ask it to summarize or pull action items *during* the
> call, not the next morning. It's Next.js 14, Stream for video, and a streaming Anthropic
> integration. The part I'm proudest of: every external service degrades gracefully, so the app
> deploys and runs even with zero keys configured."

---

## 🗣️ The 2-minute walkthrough

Use this structure: **problem → what it does → how it's built → the hard part → the result.**

1. **The problem.** "Most meeting tools treat AI as an afterthought — a summary that emails you
   an hour later. I wanted a meeting that understands itself *while it's happening*."

2. **What it does.** "HD video calls, live in-browser transcription, and a Claude copilot that
   summarizes, extracts action items, and catches you up — all from the live transcript. There's
   also a guest 'explore mode' so anyone can open it without signing up."

3. **How it's built.** "Next.js 14 App Router. Stream handles the WebRTC video layer. Clerk does
   auth. Transcription uses the browser's native Web Speech API — free and zero-latency. The
   copilot is a Next API route that proxies Anthropic's streaming endpoint."

4. **The hard part.** "Two things. First, making transcription and the copilot *one* pipeline
   instead of two mocked components — they now share a single React context, so the model reads
   the real words. Second, streaming: I parse Anthropic's Server-Sent Events stream and re-emit
   just the text deltas, so the copilot starts replying before the model finishes thinking."

5. **The result.** "It deploys to Vercel and — this is the bit I like — it stays up even if none
   of the API keys are configured. Each integration fails soft. Adding keys lights up features
   progressively instead of being all-or-nothing."

---

## ⭐ STAR stories

### STAR 1 — The production 500 nobody saw locally

- **Situation:** "First deploy to Vercel returned `500: MIDDLEWARE_INVOCATION_FAILED`. Worked
  perfectly on my machine."
- **Task:** "Find why the edge middleware was crashing, and make sure a deploy could never fail
  like that again."
- **Action:** "I traced it to Clerk's `clerkMiddleware()` — it validates its keys the moment it
  runs and throws at the edge. My `.env` was git-ignored, so Vercel had no keys. Rather than just
  'add the keys and move on,' I made the whole auth layer crash-proof: the middleware only invokes
  Clerk when a publishable key exists and otherwise passes through; the root layout renders
  `ClerkProvider` conditionally; and I wrote safe `useUser`/`SignedIn` wrappers so client hooks
  don't throw without a provider."
- **Result:** "The site now deploys and loads with zero environment variables — guest mode —
  and adding keys switches full auth on. A misconfiguration can't take the site down anymore."
- **Why it lands:** shows debugging, knowing the framework deeply, and turning a bug into a
  resilience feature.

### STAR 2 — Turning two demos into one system

- **Situation:** "Transcription and the AI assistant existed, but each used fake data. They looked
  impressive and did nothing real together."
- **Task:** "Make the copilot actually answer from what's being said in the meeting."
- **Action:** "I built a `MeetingIntelligenceProvider` React context as the single source of
  truth — the microphone writes finalized utterances into it, and the copilot reads a timestamped
  transcript out of it. Then I built the streaming `/api/ai` route so responses render live."
- **Result:** "The copilot went from a convincing prop to a working feature. You speak, and it
  can summarize what you just said."
- **Why it lands:** shows you can spot 'fake' and care about real end-to-end behavior.

### STAR 3 — Latency as a UX decision (optional)

- **Situation:** "The first version of the copilot awaited the full Claude response — multi-second
  freezes that read as 'broken.'"
- **Task:** "Make it feel instant."
- **Action:** "Switched to Anthropic's streaming API and wrote a `ReadableStream` transformer that
  parses the SSE chunks and emits text deltas to the client as they arrive."
- **Result:** "Tokens appear immediately; the perceived latency dropped to near-zero."
- **Why it lands:** shows you treat performance as part of the design, not a cleanup task.

---

## 💬 Likely technical Q&A

**Q: Why the Web Speech API instead of Whisper or a paid STT service?**
A: For a live, in-browser experience it's the right tradeoff — zero latency, no key to leak, no
per-minute cost. The downside is browser support and accuracy variance, so if I needed
production-grade multilingual accuracy I'd add a server-side option (Whisper / Deepgram) behind
the same `MeetingIntelligence` context — the rest of the app wouldn't change.

**Q: How does the AI streaming actually work?**
A: The route calls Anthropic with `stream: true` and gets back Server-Sent Events. I read that
with a `ReadableStream`, buffer partial lines, parse each `data:` JSON event, and enqueue only
`content_block_delta` text. The client consumes a plain text stream and appends tokens. No SDK,
so the route stays dependency-light.

**Q: Why route the AI through your own backend instead of calling Anthropic from the client?**
A: The API key must never touch the browser. The route is the trust boundary — it holds the key,
shapes the system prompt with the transcript, and is where I'd add rate limiting and auth.

**Q: How do guests work without auth?**
A: `StreamClientProvider` generates a stable per-browser guest id (stored in localStorage). The
`/api/get-token` route mints a Stream token for either the Clerk user or that guest id. So
unauthenticated visitors can still explore — and `currentUser()` is wrapped so it never throws
when Clerk isn't configured.

**Q: What happens if Anthropic / Stream / Clerk is down or unconfigured?**
A: Each fails soft and independently. No Anthropic key → an honest offline fallback summary. No
Stream key → the app is browsable, video just isn't initialized. No Clerk key → guest-only mode,
and the middleware passes through instead of 500-ing.

**Q: Why Next.js App Router specifically?**
A: I wanted server components and edge middleware in one model, plus file-based metadata and OG
image generation. The dynamic OG card is a `next/og` route — branded social previews with no
binary asset to maintain.

**Q: How would this scale to many concurrent meetings?**
A: The video plane is Stream's problem — they run the SFU. My surface is the AI route, which is
stateless and horizontally scalable on Vercel functions. The bottleneck would be Anthropic rate
limits and cost, which I'd manage with per-user rate limiting and a smaller/cheaper model tier
for routine summaries.

**Q: What's the security story?**
A: API keys live only server-side. The AI route validates and filters incoming messages. Security
headers (HSTS, X-Frame-Options, nosniff, a scoped Permissions-Policy for camera/mic) are set in
`next.config.mjs` and `vercel.json`. Next step would be auth + rate limiting on `/api/ai`.

**Q: How did you keep the UI consistent?**
A: A single Tailwind token system (HSL CSS variables) plus shadcn-style primitives. New pages
like `/about` reuse the same `ScrollReveal`, `GradientButton`, and glassmorphism classes, so they
feel native rather than bolted on.

---

## 📈 What I'd improve next

Honest, specific, shows growth:

1. **Persistence.** Transcripts and summaries live in memory and vanish on refresh. I'd add a
   database (Postgres/Convex) so meetings have history.
2. **Rate limiting + auth on `/api/ai`.** It's open in explore mode — fine for a demo, not for
   real traffic. I'd gate it and add per-user quotas.
3. **Speaker diarization.** Right now everything is attributed loosely. Real "who said what"
   needs server-side audio processing.
4. **Tests.** There's no automated test suite yet. I'd start with the AI route's SSE parser and
   the graceful-degradation logic — the parts most likely to break silently.
5. **Real e2e encryption claims.** The UI mentions enterprise security; I'd either implement
   Stream's E2EE properly or soften the copy. Don't claim what you can't defend.

---

## ❓ Smart questions to ask the interviewer

- "Where does AI sit in your roadmap — a feature, or a layer you're rebuilding the product
  around?"
- "When something breaks in production, what does the path from alert to fix look like here?"
- "How do you balance shipping fast with the kind of resilience work that never demos well?"
- "What does the first 90 days look like for someone in this role — what would 'going well' mean?"
- "What's a technical decision the team made recently that you'd revisit?"
