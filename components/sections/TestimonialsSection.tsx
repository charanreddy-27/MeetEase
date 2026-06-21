'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import SpotlightCard from '@/components/effects/SpotlightCard';

const testimonials = [
  {
    quote:
      'MeetEase replaced three tools for us. The AI summaries alone save our team hours every week.',
    name: 'Sarah Johnson',
    role: 'Head of Product, Northwind',
    initials: 'SJ',
  },
  {
    quote:
      'The whiteboard and live transcription make remote workshops feel genuinely in-person.',
    name: 'David Chen',
    role: 'Engineering Lead, Lumen',
    initials: 'DC',
  },
  {
    quote:
      'Crystal-clear quality and zero setup for our clients. Onboarding friction basically disappeared.',
    name: 'Amara Okafor',
    role: 'Founder, Brightpath',
    initials: 'AO',
  },
];

const TestimonialsSection = () => {
  return (
    <ScrollReveal className="py-8">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Loved by <span className="gradient-text">modern teams</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Join thousands of teams running better meetings every day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <SpotlightCard className="glassmorphic-card h-full rounded-2xl p-6">
              <Quote className="mb-3 size-7 text-primary-500/40" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-primary-500 text-primary-500" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-600 text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </ScrollReveal>
  );
};

export default TestimonialsSection;
