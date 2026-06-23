<div align="center">

# MeetEase

### Smarter meetings, beautifully simple.

**An AI-native video conferencing app — HD calls, live in-browser transcription, and a Claude-powered copilot that summarizes the meeting and pulls action items while you're still talking.**

[Live demo](https://meet-ease-charan.vercel.app/) · [The build story](https://meet-ease-charan.vercel.app/about-project) · [About the developer](https://meet-ease-charan.vercel.app/about)

</div>

> _Replace the live link above with your real Vercel URL once deployed. Drop a hero screenshot or GIF below — it's the first thing a recruiter sees._

<!-- ![MeetEase screenshot](public/images/screenshot.png) -->
<p align="center"><em>📸 Add a screenshot or 30-second GIF here.</em></p>

---

## Why this exists

Most video apps treat AI like an afterthought — a summary email that lands an hour later, a transcript you have to go hunting for. MeetEase flips that: your microphone feeds a **live transcript**, and that transcript is handed to **Claude in real time**. Ask it to summarize, extract action items, or catch you up — mid-call, not tomorrow.

The hard part was never the model. It was making the plumbing feel instant, and making the app stay up even when its external services aren't configured.

## Features

- 🎥 **HD multi-party video** — grid & speaker layouts, screen share, recordings (Stream)
- 📝 **Live in-browser transcription** — native Web Speech API, no paid STT, no extra latency
- 🤖 **Claude-powered copilot** — summaries, action items, and "catch me up", streamed token-by-token
- 🚪 **Guest "explore mode"** — no login wall; sign-in is optional and switches on when keys are set
- 🛡️ **Crash-proof by design** — Clerk, Stream, and Anthropic can each be missing and the app still loads
- 🎨 **Crafted UI** — dark-first rose/near-black design system, glassmorphism, tasteful motion

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Server components, edge middleware, file-based OG images |
| Video | **Stream Video SDK** | WebRTC is a tar pit; Stream handles the SFU/TURN |
| Auth | **Clerk** | Drop-in, themeable auth — that now degrades gracefully |
| AI | **Anthropic Claude** | Strong summarization + a clean streaming API |
| Transcription | **Web Speech API** | Free, native, zero-latency speech-to-text |
| Styling | **Tailwind CSS** + **Framer Motion** | A consistent design system + motion that earns its keep |
| Hosting | **Vercel** | Zero-config Next.js deploys with first-class edge middleware |

## Run it locally

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
#   …then fill in the keys (see below). All are optional — the app runs
#   in guest "explore mode" without them.

# 3. Develop
npm run dev          # http://localhost:3000

# 4. Production build
npm run build && npm start
```

### Environment variables

Every integration is **optional** and degrades gracefully — set what you have.

| Variable | Service | Without it |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | [Clerk](https://clerk.com) | Guest-only mode (no sign-in), app still loads |
| `NEXT_PUBLIC_STREAM_API_KEY` / `STREAM_SECRET_KEY` | [Stream](https://getstream.io) | App is browsable, video disabled |
| `ANTHROPIC_API_KEY` | [Anthropic](https://console.anthropic.com) | Copilot runs an honest offline fallback |
| `NEXT_PUBLIC_BASE_URL` | — | Defaults to localhost; set to your deployed URL |

> 💡 **Deploying?** See **[DEPLOYMENT.md](DEPLOYMENT.md)** — including the fix for the
> `MIDDLEWARE_INVOCATION_FAILED` error you'll hit if Clerk keys aren't set on Vercel.

## Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** — ship to Vercel, env vars, custom domain, manual checklist
- **[PROJECT_DEEP_DIVE.md](PROJECT_DEEP_DIVE.md)** — architecture, data flow, the hard parts
- **[INTERVIEW_PREP.md](INTERVIEW_PREP.md)** — how to talk about this project

---

## About the developer

**Chanda Charan Reddy** — AI & Automation Engineer, Bangalore.

I build production LLM systems — from a Springer-published model that reads chest X-rays to document pipelines that run themselves. Before all that, I wrote real-time control code for jet engines at DRDO, which is where I learned that a millisecond of lag isn't a bug — it's a flameout.

MeetEase is one project. There are more (and a few jet engines) over at my portfolio.

[🌐 Portfolio](https://www.charanreddy.dev) · [💼 LinkedIn](https://www.linkedin.com/in/chandacharanreddy/) · [🐙 GitHub](https://github.com/charanreddy-27) · [📅 Book a call](https://cal.com/charanreddy-27/30min)

> **Building something — or want to break something interesting?** [Let's talk.](https://cal.com/charanreddy-27/30min)
