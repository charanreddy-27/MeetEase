import type { Metadata } from 'next';

import AboutProjectClient from './AboutProjectClient';

export const metadata: Metadata = {
  title: 'About the project',
  description:
    'The build story behind MeetEase — why it exists, a six-month timeline, the technical decisions and challenges, and the stack that powers it.',
};

export default function AboutProjectPage() {
  return <AboutProjectClient />;
}
