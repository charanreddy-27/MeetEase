import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/effects/ScrollToTop';
import StreamClientProvider from '@/providers/StreamClientProvider';

// 🚪 EXPLORE MODE — the sign-in redirect is disabled so guests can browse the
// app without an account. To re-enable it, restore the lines below:
//
//   import { redirect } from 'next/navigation';
//   import { auth } from '@clerk/nextjs/server';
//   ...
//   const { userId } = auth();
//   if (!userId) redirect('/sign-in');

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StreamClientProvider>
      <div className="relative flex min-h-screen flex-col bg-background">
        {/* Ambient backdrop */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_-10%,hsl(346.8_77.2%_49.8%/0.10),transparent_45%),radial-gradient(circle_at_100%_0%,hsl(346.8_77.2%_49.8%/0.06),transparent_40%)]" />

        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          <main className="ml-0 flex-1 px-4 pb-16 pt-24 transition-all duration-300 ease-in-out md:ml-[240px] md:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </StreamClientProvider>
  );
}
