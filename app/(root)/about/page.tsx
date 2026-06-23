import type { Metadata } from 'next';

import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About the developer',
  description:
    'Charan is an AI & Automation Engineer who builds production LLM systems. The story behind MeetEase, what it taught him, and how to get in touch.',
};

export default function AboutPage() {
  return <AboutClient />;
}
