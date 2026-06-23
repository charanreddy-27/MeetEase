import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { clerkEnabled } from '@/lib/clerk';

export default function SignUpPage() {
  if (!clerkEnabled) return <AuthDisabled />;
  return <SignUp />;
}

function AuthDisabled() {
  return (
    <div className="glassmorphic-card max-w-sm rounded-2xl p-8 text-center">
      <h1 className="font-heading text-xl font-bold">Sign-up isn&apos;t configured</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This demo is running in guest-only <span className="text-foreground">explore mode</span>.
        Add your Clerk keys to switch authentication on — until then, everything is
        open to browse.
      </p>
      <Link
        href="/"
        className="neumorphic-button-primary mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm font-medium"
      >
        Continue exploring →
      </Link>
    </div>
  );
}
