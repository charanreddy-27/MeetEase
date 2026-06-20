import { clerkMiddleware } from '@clerk/nextjs/server';

// ─────────────────────────────────────────────────────────────────────────────
// 🚪 EXPLORE MODE — authentication is currently DISABLED.
// Anyone can browse the app without signing in. Clerk is still loaded (so login
// works if a user chooses to), but no route is force-protected.
//
// 🔒 To re-enable the login wall, restore the block below:
//
//   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
//
//   const isPublicRoute = createRouteMatcher([
//     '/sign-in(.*)',
//     '/sign-up(.*)',
//     '/api/webhook/clerk(.*)',
//   ]);
//
//   export default clerkMiddleware((auth, request) => {
//     if (!isPublicRoute(request)) {
//       auth().protect();
//     }
//   });
// ─────────────────────────────────────────────────────────────────────────────

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
