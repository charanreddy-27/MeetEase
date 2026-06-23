'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Github,
  Linkedin,
  Mail,
  FileText,
  Sparkles,
  Zap,
  Wrench,
  Lightbulb,
  Heart,
} from 'lucide-react';

import { developer, project } from '@/lib/site';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GradientButton from '@/components/effects/GradientButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const learnings = [
  {
    Icon: Zap,
    title: 'Graceful degradation is a feature, not an apology.',
    body: "MeetEase talks to three external services — Clerk, Stream, Anthropic. Any of them can be missing and the app still loads instead of throwing a 500. That one decision is the difference between a demo that breaks on a fresh deploy and one a stranger can actually open.",
  },
  {
    Icon: Sparkles,
    title: 'The browser already ships a speech engine.',
    body: 'Live transcription runs on the Web Speech API — no paid STT, no extra latency, no key to leak. Sometimes the most impressive feature is the one you didn’t pay for.',
  },
  {
    Icon: Wrench,
    title: 'Streaming an LLM is mostly plumbing.',
    body: "Parsing Anthropic’s SSE stream, re-emitting only the text deltas, and keeping the client dumb made the copilot feel instant. The model is the easy part; the pipe around it is the work.",
  },
  {
    Icon: Lightbulb,
    title: 'Latency is a UX decision, not an afterthought.',
    body: 'In a live call, a spinner that lingers reads as “broken,” not “loading.” Designing the empty, loading, and error states first changed how the whole thing felt.',
  },
  {
    Icon: Heart,
    title: 'The boring 20% is what makes it feel real.',
    body: 'Favicons, OG cards, missing-key fallbacks, an honest 404 — none of it demos well. All of it is what separates “works on my machine” from “ship it.”',
  },
];

const AboutClient = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-20 py-6">
      {/* ----------------------------------------------------------- Intro */}
      <section className="relative">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm text-primary-300">
            <span className="size-2 animate-pulse rounded-full bg-primary-500" />
            {developer.title} · {developer.location}
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tighter sm:text-5xl">
            Hi, I&apos;m <span className="gradient-text">{developer.shortName}</span>.
          </h1>

          <div className="mt-6 max-w-2xl space-y-4 text-base text-muted-foreground md:text-lg">
            <p>
              I build AI systems that have to hold up when it counts — the kind where
              &ldquo;looks great in a notebook&rdquo; isn&apos;t the finish line, it&apos;s
              the part right before the hard part.
            </p>
            <p>
              Before production LLMs, I wrote real-time control code for jet engines at
              DRDO. That job teaches you something the web rarely does:{' '}
              <span className="text-foreground">
                a millisecond of lag isn&apos;t a bug — it&apos;s a flameout.
              </span>{' '}
              I&apos;ve carried that allergy to hand-waving into everything I&apos;ve built
              since, MeetEase included.
            </p>
            <p>
              MeetEase started as a simple question: what would a video app feel like if
              the AI weren&apos;t a bolt-on? So I wired the microphone straight through to
              a live transcript and handed that transcript to Claude. The result listens,
              summarizes, and pulls action items while you&apos;re still talking.
            </p>
          </div>
        </ScrollReveal>

        {/* Portfolio tease */}
        <ScrollReveal delay={0.1} className="mt-8">
          <a
            href={developer.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="glassmorphic-card border-glow-rose group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all"
          >
            <p className="text-sm text-muted-foreground md:text-base">
              This is one project. There are more where it came from — a
              Springer-published model that reads chest X-rays, document pipelines that run
              themselves, and a few jet engines — over at{' '}
              <span className="font-medium text-foreground">charanreddy.dev</span>.
            </p>
            <ArrowUpRight className="size-5 flex-shrink-0 text-primary-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </ScrollReveal>
      </section>

      {/* ------------------------------------------ What I learned building this */}
      <section>
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            What I learned building this
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Five things MeetEase taught me — the technical and the human.
          </p>
        </ScrollReveal>

        <div className="mt-8 space-y-4">
          {learnings.map(({ Icon, title, body }, i) => (
            <ScrollReveal key={title} delay={i * 0.05}>
              <div className="group flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary-500/40">
                <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
                  <Icon className="size-5 text-primary-400" />
                </div>
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

      {/* ----------------------------------------------------------- Contact */}
      <ContactSection />
    </div>
  );
};

/* ------------------------------------------------------------------ Contact */

const actionButtons = [
  { label: 'Book a call', href: developer.bookACall, Icon: Calendar },
  { label: 'Email', href: `mailto:${developer.email}`, Icon: Mail },
  { label: 'GitHub', href: developer.github, Icon: Github },
  { label: 'LinkedIn', href: developer.linkedin, Icon: Linkedin },
  { label: 'Résumé', href: developer.portfolio, Icon: FileText },
];

export const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || 'someone'} (via MeetEase)`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ''}`,
    );
    window.location.href = `mailto:${developer.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <ScrollReveal>
        <div className="glassmorphic-card relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-600/15 via-transparent to-accent-600/15" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Have an idea? <span className="gradient-text">Let&apos;s talk.</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Want to build something — or break something interesting? I&apos;m always up
              for a good problem. The fastest way to reach me is below.
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {actionButtons.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="neumorphic-button group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <Icon className="size-4 text-primary-400" />
                  {label}
                </a>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 bg-secondary-800/60"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 bg-secondary-800/60"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you building?"
                  rows={4}
                  className="mt-2 bg-secondary-800/60"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <GradientButton type="submit" className="px-6 py-2.5 text-base">
                  <span className="flex items-center gap-2">
                    Send message
                    <Mail className="size-4" />
                  </span>
                </GradientButton>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-1 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Crafted with intent.</span>
              <span className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-success-500" />
                Available for new projects.
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutClient;
