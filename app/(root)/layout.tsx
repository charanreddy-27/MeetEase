import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
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
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-secondary-950 to-secondary-900">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          <main className="ml-0 flex-1 px-4 pt-20 transition-all duration-300 ease-in-out md:ml-[240px] md:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </StreamClientProvider>
  );
}
