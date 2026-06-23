import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// 🚪 EXPLORE MODE — authentication is currently DISABLED.
// Anyone can browse the app without signing in. Clerk is still loaded (so login
// works if a user chooses to), but no route is force-protected.
//
// 🛡️  This middleware is also crash-proof. Clerk's `clerkMiddleware()` throws at
// the edge when its keys aren't configured — that's the classic Vercel
// `MIDDLEWARE_INVOCATION_FAILED` 500 on a fresh deploy. So we only invoke Clerk
// when a publishable key is present, and even then we fall back to a clean
// pass-through if anything goes wrong. The site stays up regardless; adding the
// Clerk env vars simply switches authentication on.
//
// 🔒 To re-enable the login wall (once keys are set), protect routes inside the
// handler:
//
//   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
//   const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
//   const handler = clerkMiddleware((auth, req) => {
//     if (!isPublicRoute(req)) auth().protect();
//   });
// ─────────────────────────────────────────────────────────────────────────────

const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
const handler = clerkConfigured ? clerkMiddleware() : null;

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  if (!handler) return NextResponse.next();

  try {
    return await handler(request, event);
  } catch (error) {
    // Never let an auth hiccup take the whole site down — degrade to guest mode.
    console.error('Clerk middleware error — falling back to guest mode:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
