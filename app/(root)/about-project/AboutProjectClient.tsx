'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Github,
  Linkedin,
  Video,
  Captions,
  Bot,
  DoorOpen,
  ShieldCheck,
  Lightbulb,
  PencilRuler,
  Rocket,
  Wrench,
  Flame,
  Sparkles,
} from 'lucide-react';

import { developer, project } from '@/lib/site';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GradientButton from '@/components/effects/GradientButton';

const timeline = [
  {
    date: 'Jan 2026',
    Icon: Lightbulb,
    title: 'Ideation',
    body: 'One nagging question: what would a video app feel like if the AI weren’t a bolt-on widget in the corner, but wired into the meeting itself? I sketched the pipeline on a napkin — mic → transcript → model — and couldn’t stop thinking about it.',
  },
  {
    date: 'Feb 2026',
    Icon: PencilRuler,
    title: 'Design & scoping',
    body: 'Built the design language first: warm near-black surfaces, a rose primary, glassmorphism. Decided early that the app would run in “explore mode” — no login wall — so anyone could open it and poke around.',
  },
  {
    date: 'Mar 2026',
    Icon: Video,
    title: 'MVP — it makes calls',
    body: 'Stream for the video layer, Clerk for identity, the app shell and routing. The unglamorous foundation: you could start a call, join a call, and see other humans.',
  },
  {
    date: 'Apr 2026',
    Icon: Flame,
    title: 'The part that broke everything',
    body: 'Wiring the live transcript into Claude in real time. Two components that faked their data had to become one real pipeline — and Anthropic’s streaming API speaks Server-Sent Events, not JSON. Getting the deltas to land smoothly while audio was still flowing was the week I earned this project.',
  },
  {
    date: 'May 2026',
    Icon: Sparkles,
    title: 'Polish',
    body: 'Empty, loading, and error states. Accessibility passes. SEO and social cards. And the decision that aged best: make every external service degrade gracefully instead of crashing when its keys are missing.',
  },
  {
    date: 'Jun 2026',
    Icon: Rocket,
    title: 'Launch',
    body: 'Shipped to Vercel — and immediately hit a MIDDLEWARE_INVOCATION_FAILED 500 because the edge auth middleware throws without keys. Made the middleware crash-proof, redeployed, and watched it come up clean. Launch days are never quiet.',
  },
];

const features = [
  {
    Icon: Video,
    title: 'HD multi-party video',
    body: 'Low-latency WebRTC calls with grid and speaker layouts, screen share, and recordings — powered by Stream.',
  },
  {
    Icon: Captions,
    title: 'Live in-browser transcription',
    body: 'Real-time speech-to-text using the browser’s native Web Speech API. No paid STT service, no extra latency.',
  },
  {
    Icon: Bot,
    title: 'Claude-powered copilot',
    body: 'Summaries, action items, and “catch me up” — generated from the live transcript and streamed token-by-token.',
  },
  {
    Icon: DoorOpen,
    title: 'Guest “explore mode”',
    body: 'No login wall. Anyone can open the app and browse; sign-in is optional and switches on the moment keys are configured.',
  },
  {
    Icon: ShieldCheck,
    title: 'Crash-proof by design',
    body: 'Clerk, Stream, and Anthropic can each be missing and the app still loads. Resilience is a feature, not an afterthought.',
  },
];

const decisions = [
  {
    title: 'A single “meeting intelligence” pipeline',
    body: 'Live transcription and the AI copilot used to be two disconnected, faked components. I unified them behind one React context so the microphone feeds a real transcript, and that transcript is what Claude actually reads. One source of truth turned a demo into a system.',
  },
  {
    title: 'Streaming the LLM, not waiting on it',
    body: 'The /api/ai route proxies Anthropic’s SSE stream, parses each chunk, and re-emits only the text deltas to the client. The copilot starts answering before the model has finished thinking — which is the whole difference between “snappy” and “did it freeze?”',
  },
  {
    title: 'Graceful degradation across every service',
    body: 'No Anthropic key → the copilot runs an honest offline fallback. No Stream key → the app is browsable without video. No Clerk key → guest-only mode instead of a 500. Each integration fails soft, independently.',
  },
  {
    title: 'Edge middleware that can’t take down the site',
    body: 'Clerk’s middleware throws at the edge without keys — the exact MIDDLEWARE_INVOCATION_FAILED error this project shipped with. The fix: only invoke Clerk when configured, and wrap it so any auth hiccup falls through to guest mode. The site stays up no matter what.',
  },
];

const techStack = [
  { name: 'Next.js 14 (App Router)', why: 'Server components, edge middleware, and file-based OG images — one framework end to end.' },
  { name: 'Stream Video SDK', why: 'WebRTC is a tar pit; Stream handles the SFU and TURN so I could spend my time on the AI layer.' },
  { name: 'Clerk', why: 'Authentication I don’t want to own — drop-in, themeable, and now degrades gracefully.' },
  { name: 'Anthropic Claude', why: 'The copilot’s brain. Strong summarization and a clean streaming API.' },
  { name: 'Web Speech API', why: 'Free, native, zero-latency transcription straight from the browser.' },
  { name: 'Tailwind + Framer Motion', why: 'A consistent design system and motion that earns its keep, without leaving the markup.' },
  { name: 'Vercel', why: 'Zero-config deploys for Next.js, with first-class edge middleware.' },
];

const AboutProjectClient = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-20 py-6">
      {/* ------------------------------------------------------------ The why */}
      <section>
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm text-primary-300">
            <span className="size-2 animate-pulse rounded-full bg-primary-500" />
            About the project
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tighter sm:text-5xl">
            <span className="gradient-text">MeetEase</span> — the build story
          </h1>

          <div className="mt-6 max-w-2xl space-y-4 text-base text-muted-foreground md:text-lg">
            <p>
              Most video apps treat AI like a feature you bolt on after the fact: a
              summary email that shows up an hour later, a transcript you have to go
              hunting for. I wanted the opposite — a meeting that{' '}
              <span className="text-foreground">understands itself while it&apos;s happening.</span>
            </p>
            <p>
              So MeetEase pipes your microphone into a live transcript and hands that
              transcript to Claude in real time. Ask it to summarize, pull action items,
              or catch you up on what you missed — mid-call, not tomorrow morning. The
              hard part was never the model. It was making the plumbing feel instant.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ----------------------------------------------------------- Timeline */}
      <section>
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            How it came together
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Six months, one honest &ldquo;this is where it got hard&rdquo; week.
          </p>
        </ScrollReveal>

        <div className="relative mt-8">
          {/* vertical line */}
          <div className="absolute bottom-2 left-[22px] top-2 w-px bg-gradient-to-b from-primary-500/60 via-border to-transparent" />
          <div className="space-y-6">
            {timeline.map(({ date, Icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 0.05}>
                <div className="relative flex gap-5">
                  <div className="relative z-10 flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-primary-500/30 bg-background">
                    <Icon className="size-5 text-primary-400" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                        {date}
                      </span>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Features */}
      <section>
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            What it does
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map(({ Icon, title, body }, i) => (
            <ScrollReveal key={title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary-500/40">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                  <Icon className="size-5 text-primary-400" />
                </div>
                <h3 className="mb-1.5 font-heading text-base font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- Technical decisions */}
      <section>
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            Interesting decisions &amp; challenges
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            The parts worth talking about in an interview.
          </p>
        </ScrollReveal>

        <div className="mt-8 space-y-4">
          {decisions.map(({ title, body }, i) => (
            <ScrollReveal key={title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                <Wrench className="mt-0.5 size-5 flex-shrink-0 text-primary-400" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- Tech stack */}
      <section>
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            Tech stack
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            And the one-line reason behind each choice.
          </p>
        </ScrollReveal>

        <div className="mt-8 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm">
          {techStack.map(({ name, why }) => (
            <div
              key={name}
              className="flex flex-col gap-1 p-5 transition-colors hover:bg-accent/40 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="font-heading text-sm font-semibold text-foreground sm:w-56 sm:flex-shrink-0">
                {name}
              </span>
              <span className="text-sm text-muted-foreground">{why}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Project links */}
      <section>
        <ScrollReveal>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="neumorphic-button flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-foreground"
            >
              <Github className="size-4 text-primary-400" />
              Source on GitHub
            </a>
            {project.linkedinPost ? (
              <a
                href={project.linkedinPost}
                target="_blank"
                rel="noopener noreferrer"
                className="neumorphic-button flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-foreground"
              >
                <Linkedin className="size-4 text-primary-400" />
                Read the LinkedIn post
              </a>
            ) : (
              <span
                className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 px-5 py-2.5 text-sm font-medium text-muted-foreground"
                title="Add your LinkedIn post URL in lib/site.ts"
              >
                <Linkedin className="size-4" />
                LinkedIn write-up — coming soon
              </span>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section>
        <ScrollReveal>
          <div className="glassmorphic-card relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-600/15 via-transparent to-accent-600/15" />
            <div className="relative z-10 mx-auto max-w-2xl space-y-5">
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Want to build something — or{' '}
                <span className="gradient-text">break something interesting?</span>
              </h2>
              <p className="text-muted-foreground">
                I&apos;m {developer.shortName}, and I&apos;m always up for a good problem.
                Let&apos;s talk.
              </p>
              <div className="flex justify-center">
                <GradientButton asChild className="px-6 py-2.5 text-base">
                  <Link href="/about#contact" className="flex items-center gap-2">
                    Get in touch
                    <ArrowRight className="size-4" />
                  </Link>
                </GradientButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default AboutProjectClient;
