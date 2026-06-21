'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,hsl(346.8_77.2%_49.8%/0.15),transparent_55%)]" />

      <div className="w-full max-w-md text-center">
        <p className="font-heading text-[7rem] font-extrabold leading-none gradient-text">404</p>

        <h1 className="mb-4 font-heading text-2xl font-bold md:text-3xl">Page Not Found</h1>

        <div className="glassmorphic-card mb-6 rounded-2xl p-6">
          <p className="mb-3 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting home in{' '}
            <span className="font-medium text-primary-400">{count}</span> seconds…
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="gradient">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
