# MeetEase — Project Deep Dive

Architecture, data flow, and how the genuinely hard parts work. If `README.md` is the
trailer, this is the director's commentary.

---

## 1. The core idea

MeetEase is built around one pipeline:

```
🎙  microphone
     │  (Web Speech API, in the browser)
     ▼
📝  live transcript  ──────────────┐
     │  (MeetingIntelligence React context = single source of truth)
     ▼                              │
🤖  AI copilot  ──►  /api/ai  ──►  Anthropic Claude (streamed back token-by-token)
```

Everything else — auth, video, the UI — exists to make that pipeline usable. The design
decision that matters most: **transcription and the copilot are not two features, they are
two ends of one pipe.** They share state through a single context so the model reads the
*actual* words spoken, not a mock.

---

## 2. Folder structure

```
app/
  (auth)/                 # Sign-in / sign-up (route group, minimal chrome)
  (root)/
    layout.tsx            # App shell: Navbar + Sidebar + Footer + StreamClientProvider
    (home)/               # Home + dashboard pages (adds the floating AI copilot)
      page.tsx            # Landing / hero / features / FAQ
      personal-room/ upcoming/ previous/ recordings/
    about/                # 👤 About the developer (+ contact card)
    about-project/        # 🛠  About the build (timeline, decisions, stack)
    meeting/
      new/  join/  [id]/  # Create, join, and the live call room
    settings/  support/
  api/
    ai/route.ts           # Streams Claude responses (SSE proxy + offline fallback)
    get-token/route.ts    # Mints Stream tokens (with guest fallback)
  layout.tsx              # Root: fonts, metadata/SEO, conditional ClerkProvider
  opengraph-image.tsx     # Dynamic 1200×630 social card (edge, next/og)
  twitter-image.tsx       # Re-uses the OG image
  not-found.tsx           # Branded 404 with auto-redirect

components/
  effects/                # ScrollReveal, MouseGlow, GradientButton, SpotlightCard…
  sections/               # Stats, HowItWorks, Testimonials, FAQ
  ui/                     # shadcn-style primitives (button, card, input, dialog…)
  Navbar / Sidebar / MobileNav / Footer
  MeetingRoom / MeetingSetup / LiveTranscription / AIAssistant …

providers/
  StreamClientProvider.tsx        # Builds the Stream client (real user or guest)
  MeetingIntelligenceProvider.tsx # The transcript context — the heart of the app
  ThemeProvider.tsx

lib/
  clerk.tsx               # Safe Clerk wrappers (graceful "explore mode")
  site.ts                 # Single source of truth for developer + project links
  ai.ts                   # System prompt + AI types
  utils.ts                # cn() classname helper

hooks/      actions/      constants/      public/icons + images
```

---

## 3. Data flow, end to end

### Live transcription → transcript

`LiveTranscription` uses the browser's **Web Speech API** (`SpeechRecognition`). Finalized
utterances are pushed into `MeetingIntelligenceProvider` via `addEntry()`. That provider
holds the canonical `entries[]` and exposes `getTranscriptText()` — a timestamped, plain-text
rendering ready to feed an LLM. No paid speech-to-text service, no extra network latency.

### Transcript → copilot → Claude

`AIAssistant` reads `getTranscriptText()` and POSTs `{ mode, messages, transcript }` to
`/api/ai`. That route:

1. If `ANTHROPIC_API_KEY` is missing → returns a **local offline fallback** (still streamed,
   so the client code path is identical). Honest about being offline.
2. Otherwise → calls Anthropic with `stream: true`, then **parses the Server-Sent Events
   stream**, extracts only `content_block_delta` text deltas, and re-emits them as a plain
   text stream. The client renders tokens as they arrive — the copilot starts answering
   before the model finishes.

### Auth → identity → video

- `middleware.ts` runs Clerk **only when configured** (see §5).
- `StreamClientProvider` resolves the Clerk user (or a stable per-browser **guest id**),
  then mints a Stream token via `/api/get-token`.
- The call room (`/meeting/[id]`) uses Stream's `StreamCall` + custom `MeetingRoom` UI.

---

## 4. Graceful degradation (the "explore mode" philosophy)

Every external dependency fails **soft and independently**:

| Service | Missing key behavior | Where |
|---|---|---|
| Clerk | Guest-only mode; middleware passes through; sign-in pages show a friendly notice | `lib/clerk.tsx`, `middleware.ts`, `app/layout.tsx` |
| Stream | App fully browsable; video init is skipped | `providers/StreamClientProvider.tsx` |
| Anthropic | Copilot returns a local fallback summary/action-items | `app/api/ai/route.ts` |

This is why the app deploys and loads on Vercel with **zero** environment variables set —
and why adding keys progressively lights up features instead of flipping one big switch.

---

## 5. The hard parts (and how they work)

### a) The `MIDDLEWARE_INVOCATION_FAILED` problem

Clerk's `clerkMiddleware()` validates its publishable key the moment it's invoked, and throws
at the **edge** if it's absent. Because `.env` is git-ignored, a fresh Vercel deploy has no
keys → every request 500s before any page renders.

**Fix** (`middleware.ts`): build the Clerk handler only when a publishable key exists, and
wrap its invocation in try/catch that falls back to `NextResponse.next()`. The site can never
be taken down by an auth misconfiguration. The same flag (`clerkEnabled`) drives a conditional
`<ClerkProvider>` in the root layout and the `useSafeUser` / `SafeSignedIn` wrappers in
`lib/clerk.tsx`, so client hooks don't throw "must be used within ClerkProvider" either.

**Tradeoff:** a tiny bit of indirection around Clerk's API, in exchange for an app that is
genuinely impossible to crash via missing auth config.

### b) Streaming the LLM

Naively, you'd `await` the whole Claude response and render it — which feels frozen for
several seconds. Instead `/api/ai` pipes Anthropic's SSE stream through a `ReadableStream`
transformer that buffers partial lines, parses each `data:` event, and enqueues only the text
deltas. The client reads that stream and appends tokens live.

**Tradeoff:** parsing SSE by hand is fiddlier than using a heavy SDK, but it keeps the route
dependency-free and the latency honest.

### c) One pipeline, not two mocks

Originally, live transcription and the AI assistant were separate components with faked data.
`MeetingIntelligenceProvider` unifies them: the microphone writes to the same context the
copilot reads from. That single refactor is what turns "two demos" into "one system."

### d) Production-only bugs

Windows is case-insensitive; Vercel's Linux is not. References like `/icons/video.svg` worked
locally but 404'd in production because the file was committed as `Video.svg`. Fixed by
normalizing committed asset filenames to lowercase. Easy to miss, embarrassing to ship.

---

## 6. SEO & sharing

- `app/layout.tsx` sets `metadataBase`, a title template (`%s · MeetEase`), description,
  Open Graph, Twitter card, keywords, and icons.
- `app/opengraph-image.tsx` generates a branded **1200×630** card at the edge with `next/og` —
  no static binary to maintain. `twitter-image.tsx` reuses it.
- `/about` and `/about-project` set their own per-page titles via server `metadata` exports
  (the interactive UI lives in client subcomponents).

---

## 7. What I'd reach for next

See **[INTERVIEW_PREP.md](INTERVIEW_PREP.md) → "What I'd improve next"** — persistence for
transcripts, server-side speaker diarization, and protecting the `/api/ai` route with rate
limiting before it ever sees real traffic.
