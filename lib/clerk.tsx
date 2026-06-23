'use client';

/**
 * Safe Clerk wrappers — "explore mode" for authentication.
 * ------------------------------------------------------------------
 * Clerk is the one external service that *hard-crashes* the whole app when its
 * keys are missing: `clerkMiddleware()` throws at the edge, `<ClerkProvider>`
 * throws on render, and every `useUser()` / `<SignedIn>` throws "must be used
 * within <ClerkProvider>". That's exactly the `MIDDLEWARE_INVOCATION_FAILED`
 * 500 you hit on a fresh Vercel deploy with no env vars set.
 *
 * This module brings Clerk in line with how the rest of the app already
 * behaves (Stream → no video but still browsable, Anthropic → offline copilot):
 * when no publishable key is configured, auth quietly degrades to a guest-only
 * experience instead of taking the site down. Add the keys and full auth — sign
 * in, user button, protected identity — switches on automatically.
 *
 * `NEXT_PUBLIC_*` vars are inlined at build time, so `clerkEnabled` is a stable
 * compile-time constant. Branching hook/component bindings on it is safe and
 * never violates the rules of hooks (the binding never changes at runtime).
 */

import {
  useUser as useClerkUser,
  SignedIn as ClerkSignedIn,
  SignedOut as ClerkSignedOut,
  UserButton as ClerkUserButton,
} from '@clerk/nextjs';
import type { ComponentProps, ReactNode } from 'react';

export const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);

/* ---- useUser ------------------------------------------------------------ */
type UseUserReturn = ReturnType<typeof useClerkUser>;

const useStubUser = (): UseUserReturn =>
  ({ isLoaded: true, isSignedIn: false, user: null }) as unknown as UseUserReturn;

/** Drop-in replacement for Clerk's `useUser` that no-ops when Clerk is off. */
export const useSafeUser: typeof useClerkUser = clerkEnabled
  ? useClerkUser
  : (useStubUser as typeof useClerkUser);

/* ---- SignedIn / SignedOut ----------------------------------------------- */
/** Renders children only when a real user is signed in (nothing when off). */
export const SafeSignedIn = clerkEnabled
  ? ClerkSignedIn
  : (_props: { children?: ReactNode }) => null;

/** Renders children when signed out — and always, when Clerk is off. */
export const SafeSignedOut = clerkEnabled
  ? ClerkSignedOut
  : ({ children }: { children?: ReactNode }) => <>{children}</>;

/* ---- UserButton --------------------------------------------------------- */
export const SafeUserButton = clerkEnabled
  ? ClerkUserButton
  : (_props: ComponentProps<typeof ClerkUserButton>) => null;
