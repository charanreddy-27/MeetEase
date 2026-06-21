'use client';

import { motion } from 'framer-motion';
import { CalendarPlus, Share2, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

const steps = [
  {
    Icon: CalendarPlus,
    title: 'Create or schedule',
    description: 'Spin up an instant meeting or schedule one for later in a single click.',
  },
  {
    Icon: Share2,
    title: 'Invite your team',
    description: 'Share a link or code — guests join from any device, no downloads needed.',
  },
  {
    Icon: Sparkles,
    title: 'Let AI do the rest',
    description: 'Live transcription, summaries, and action items are captured automatically.',
  },
];

const HowItWorksSection = () => {
  return (
    <ScrollReveal className="py-8">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Up and running in <span className="gradient-text">three steps</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          From idea to insight without the friction.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* connecting line */}
        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent md:block" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            whileHover={{ y: -4 }}
            className="relative z-10 flex flex-col items-center rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-sm"
          >
            <div className="relative mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
              <step.Icon className="size-7 text-primary-400" />
              <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-600 text-xs font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mb-2 font-heading text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  );
};

export default HowItWorksSection;
