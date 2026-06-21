import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  'AI-powered meeting summaries & action items',
  'Real-time collaborative whiteboard',
  'Live transcription in 30+ languages',
  'Enterprise-grade end-to-end encryption',
];

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative grid min-h-screen lg:grid-cols-2">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,hsl(346.8_77.2%_49.8%/0.15),transparent_45%),radial-gradient(circle_at_100%_100%,hsl(346.8_77.2%_49.8%/0.10),transparent_45%)]" />

      {/* Brand / pitch panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden border-r border-border/60 p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-10 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500" />
            <Image
              src="/icons/logo.svg"
              width={40}
              height={40}
              alt="MeetEase"
              className="relative z-10 p-1.5"
              priority
            />
          </div>
          <span className="font-heading text-2xl font-bold gradient-text">MeetEase</span>
        </Link>

        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight">
            Smarter meetings,
            <br />
            <span className="gradient-text">beautifully simple.</span>
          </h1>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-muted-foreground">
                <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-400">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          Trusted by 2,000+ teams worldwide.
        </p>
      </section>

      {/* Auth form */}
      <section className="flex items-center justify-center p-6">{children}</section>
    </main>
  );
};

export default AuthLayout;
