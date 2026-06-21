'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import Accordion from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Do participants need an account to join?',
    answer:
      'No. Anyone with a meeting link or ID can join straight from their browser — no downloads or sign-ups required.',
  },
  {
    question: 'How does the AI copilot work?',
    answer:
      'Once live transcription is on, the copilot reads the conversation in real time and can summarize, extract action items, or answer questions about what was said.',
  },
  {
    question: 'Is my meeting data secure?',
    answer:
      'Yes. Meetings are encrypted in transit and at rest, with waiting rooms, host controls, and password protection available for every call.',
  },
  {
    question: 'Can I record and revisit meetings?',
    answer:
      'Absolutely. Recordings are saved to the cloud and available in the Recordings section, where you can play back, download, or share them anytime.',
  },
  {
    question: 'Which devices are supported?',
    answer:
      'MeetEase runs in any modern browser on desktop, tablet, and mobile — the interface adapts to whatever screen you join from.',
  },
];

const FaqSection = () => {
  return (
    <ScrollReveal className="py-8">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Frequently asked <span className="gradient-text">questions</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Everything you need to know before your first call.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion items={faqs} defaultOpen={0} />
      </div>
    </ScrollReveal>
  );
};

export default FaqSection;
