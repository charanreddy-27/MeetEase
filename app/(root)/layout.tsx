import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import StreamClientProvider from '@/providers/StreamClientProvider';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

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
