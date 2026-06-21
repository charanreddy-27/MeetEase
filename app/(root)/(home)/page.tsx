'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar, Video, Users, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import MeetingTypeList from '@/components/MeetingTypeList';
import ScrollReveal from '@/components/effects/ScrollReveal';
import MouseGlow from '@/components/effects/MouseGlow';
import AnimatedBackground from '@/components/effects/AnimatedBackground';
import SpotlightCard from '@/components/effects/SpotlightCard';
import GradientButton from '@/components/effects/GradientButton';
import StatsSection from '@/components/sections/StatsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="relative flex flex-col">
      <MouseGlow />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pb-12 pt-4">
        <AnimatedBackground variant="gradient" />

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px]">
          <ScrollReveal>
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm text-primary-300">
                  <span className="size-2 animate-pulse rounded-full bg-primary-500" />
                  Next-Generation Video Conferencing
                </span>
              </motion.div>

              <motion.h1
                className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/[1.1]"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="gradient-text">MeetEase</span>
                <br />
                <span className="text-foreground">Smarter Meetings.</span>
              </motion.h1>

              <motion.p
                className="max-w-lg text-base text-muted-foreground md:text-lg"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                Experience seamless collaboration with AI-powered features, real-time
                tools, and superior performance — all in one beautifully crafted platform.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <GradientButton asChild className="px-6 py-2.5 text-base">
                  <Link href="/meeting/new" className="flex items-center gap-2">
                    Start New Meeting
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                        duration: 1,
                      }}
                    >
                      <ArrowRight className="size-4" />
                    </motion.span>
                  </Link>
                </GradientButton>

                <Link
                  href="/meeting/join"
                  className="neumorphic-button group flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-medium text-foreground"
                >
                  Join Meeting
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>

              <motion.p
                className="flex items-center gap-2 pt-2 text-sm text-muted-foreground"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="inline-block size-2 rounded-full bg-success-500" />
                Trusted by 2,000+ teams worldwide
              </motion.p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <SpotlightCard className="glassmorphic-card border-glow-rose relative w-full rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold text-foreground">Today</h2>
                <span className="text-sm font-medium text-primary-400">{time}</span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{date}</p>

              <div className="space-y-3">
                {[
                  { title: 'Weekly Team Sync', t: '12:30 PM', p: '4 participants', d: '30 min' },
                  { title: 'Product Review', t: '3:00 PM', p: '6 participants', d: '45 min' },
                ].map((m) => (
                  <motion.div
                    key={m.title}
                    whileHover={{ scale: 1.02 }}
                    className="glassmorphic-inner-card rounded-xl p-3"
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{m.title}</h3>
                      <span className="text-sm text-primary-400">{m.t}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{m.p}</span>
                      <span className="size-1 rounded-full bg-secondary-500" />
                      <span>{m.d}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Quick actions */}
      <ScrollReveal className="py-8">
        <SectionHeading title="Quick Actions" subtitle="Jump straight into what matters" />
        <MeetingTypeList />
      </ScrollReveal>

      {/* ----------------------------------------------------------------- Stats */}
      <StatsSection />

      {/* -------------------------------------------------------------- Features */}
      <ScrollReveal className="py-8">
        <SectionHeading
          title="Why Choose MeetEase?"
          subtitle="Discover how our platform transforms your meeting experience with cutting-edge features"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'ai', label: 'AI Features' },
            { id: 'collaboration', label: 'Collaboration' },
            { id: 'security', label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'neumorphic-button-primary'
                  : 'neumorphic-button text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard icon="/icons/ai-assistant.svg" title="AI Meeting Assistant" description="Real-time meeting summaries, action items, and smart suggestions." />
              <FeatureCard icon="/icons/whiteboard.svg" title="Collaborative Whiteboard" description="Draw and collaborate in real-time with your team." />
              <FeatureCard icon="/icons/transcription.svg" title="Live Transcription" description="Automatic speech-to-text with multiple language support." />
              <FeatureCard icon="/icons/background.svg" title="Virtual Backgrounds" description="Choose from a variety of backgrounds or upload your own." />
              <FeatureCard icon="/icons/reactions.svg" title="Live Reactions" description="Express yourself with animated emoji reactions." />
              <FeatureCard icon="/icons/recording.svg" title="Cloud Recording" description="Record meetings and access them anytime." />
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="glassmorphic-card border-glow-rose rounded-2xl p-6 md:col-span-2">
                <h3 className="mb-3 font-heading text-lg font-bold gradient-text">
                  AI-Powered Meeting Experience
                </h3>
                <p className="mb-4 text-sm text-muted-foreground md:text-base">
                  Our advanced AI features transform how you conduct and follow up on meetings.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <AIFeatureItem title="Smart Summaries" description="AI automatically creates concise meeting summaries" />
                  <AIFeatureItem title="Action Item Detection" description="Identifies and tracks tasks mentioned during meetings" />
                  <AIFeatureItem title="Sentiment Analysis" description="Understands meeting mood and participant engagement" />
                  <AIFeatureItem title="Voice Commands" description="Control meetings with natural language instructions" />
                </div>
              </div>
              <FeatureCard icon="/icons/ai-assistant.svg" title="AI Meeting Assistant" description="Your personal copilot that organizes, summarizes and extracts key information." />
              <FeatureCard icon="/icons/transcription.svg" title="Multilingual Transcription" description="Real-time transcription with support for 30+ languages and dialects." />
            </div>
          )}

          {activeTab === 'collaboration' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FeatureCard icon="/icons/whiteboard.svg" title="Interactive Whiteboard" description="Multiple drawing tools, templates, and real-time editing." />
              <FeatureCard icon="/icons/document.svg" title="Document Collaboration" description="Edit documents together during meetings with version history." />
              <FeatureCard icon="/icons/polls.svg" title="Live Polls & Surveys" description="Gather feedback and make decisions with interactive polls." />
              <FeatureCard icon="/icons/breakout.svg" title="Breakout Rooms" description="Split into smaller groups for focused discussions." />
            </div>
          )}

          {activeTab === 'security' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="glassmorphic-card border-glow-rose rounded-2xl p-6 md:col-span-2">
                <h3 className="mb-3 font-heading text-lg font-bold gradient-text">
                  Enterprise-Grade Security
                </h3>
                <p className="mb-4 text-sm text-muted-foreground md:text-base">
                  End-to-end encryption and advanced security features keep your meetings private.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['End-to-End Encryption', 'SOC 2 Compliant', 'GDPR Compliant', 'HIPAA Compliant'].map((s) => (
                    <span key={s} className="rounded-full border border-border/60 bg-secondary-800/60 px-3 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <FeatureCard icon="/icons/lock.svg" title="Meeting Access Control" description="Waiting rooms, password protection, and host controls." />
              <FeatureCard icon="/icons/shield.svg" title="Data Protection" description="Your meeting data is encrypted at rest and in transit." />
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* ---------------------------------------------------------- How it works */}
      <HowItWorksSection />

      {/* ----------------------------------------------------------- Quick access */}
      <ScrollReveal className="py-8">
        <SectionHeading title="Quick Access" subtitle="Everything one click away" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <QuickAccessCard Icon={Users} title="Personal Room" description="Your dedicated meeting space" link="/personal-room" />
          <QuickAccessCard Icon={Calendar} title="Upcoming Meetings" description="View your scheduled meetings" link="/upcoming" />
          <QuickAccessCard Icon={Video} title="Recordings" description="Access your meeting recordings" link="/recordings" />
          <QuickAccessCard Icon={Sparkles} title="Settings" description="Configure your preferences" link="/settings" />
        </div>
      </ScrollReveal>

      {/* ---------------------------------------------------------- Testimonials */}
      <TestimonialsSection />

      {/* ------------------------------------------------------------------- FAQ */}
      <FaqSection />

      {/* ------------------------------------------------------------------- CTA */}
      <ScrollReveal className="py-8">
        <div className="glassmorphic-card relative overflow-hidden rounded-3xl p-8 text-center md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-600/15 via-transparent to-accent-600/15" />
          <div className="relative z-10 mx-auto max-w-2xl space-y-5">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Ready to <span className="gradient-text">elevate your meetings?</span>
            </h2>
            <p className="text-muted-foreground">
              Start your first meeting in seconds — no downloads, no friction.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <GradientButton asChild className="px-6 py-2.5 text-base">
                <Link href="/meeting/new" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
              </GradientButton>
              <Link
                href="/support"
                className="neumorphic-button flex items-center justify-center rounded-xl px-6 py-2.5 text-base font-medium text-foreground"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

/* ----------------------------------------------------------------- helpers */

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 text-center">
    <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
        {subtitle}
      </p>
    )}
  </div>
);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group h-full rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary-500/40"
  >
    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary-500/10 transition-colors group-hover:bg-primary-500/20">
      <Image src={icon} width={22} height={22} alt={title} className="brightness-110" />
    </div>
    <h3 className="mb-2 font-heading text-base font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

const AIFeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15">
      <CheckCircle2 className="size-4 text-primary-400" />
    </div>
    <div>
      <h4 className="font-medium text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface QuickAccessCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
}

const QuickAccessCard = ({ Icon, title, description, link }: QuickAccessCardProps) => (
  <Link href={link} className="group">
    <motion.div
      whileHover={{ y: -4 }}
      className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur-sm transition-colors hover:border-primary-500/40"
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 transition-colors group-hover:from-primary-500/30 group-hover:to-accent-500/30">
        <Icon className="size-5 text-primary-400" />
      </div>
      <h3 className="mb-1 font-heading text-base font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </motion.div>
  </Link>
);

export default Home;
