'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Plus, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { label: 'Home', route: '/', imgURL: '/icons/home.svg' },
  { label: 'Personal Room', route: '/personal-room', imgURL: '/icons/room.svg' },
  { label: 'Upcoming', route: '/upcoming', imgURL: '/icons/calendar.svg' },
  { label: 'Previous', route: '/previous', imgURL: '/icons/history.svg' },
  { label: 'Recordings', route: '/recordings', imgURL: '/icons/recording.svg' },
  { label: 'Join Meeting', route: '/meeting/join', imgURL: '/icons/join.svg' },
  { label: 'Settings', route: '/settings', imgURL: '/icons/settings.svg' },
  { label: 'The Build', route: '/about-project', imgURL: '/icons/summary.svg' },
  { label: 'About', route: '/about', imgURL: '/icons/user.svg' },
  { label: 'Support', route: '/support', imgURL: '/icons/support.svg' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    sidebarLinks.forEach((link) => router.prefetch(link.route));
  }, [router]);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-border/60 bg-background/60 backdrop-blur-xl md:flex">
      <div className="scrollbar-thin scrollbar-thumb-secondary-700 scrollbar-track-transparent flex flex-1 flex-col overflow-y-auto px-3 pb-4 pt-20">
        <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        <div className="space-y-1">
          {sidebarLinks.map((item) => {
            const isActive =
              item.route === '/'
                ? pathname === '/'
                : pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                prefetch
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                  isActive
                    ? 'bg-primary-500/10 font-medium text-primary-400 shadow-sm'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                )}
              >
                {isActive && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-gradient-to-b from-primary-500 to-accent-500" />
                )}
                <span className="relative flex size-5 flex-shrink-0 items-center justify-center">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={18}
                    height={18}
                    className={cn(
                      'brightness-110 transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100',
                    )}
                  />
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto space-y-2.5 border-t border-border/60 bg-background/40 p-3">
        <Link
          href="/meeting/new"
          className="neumorphic-button-primary flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium"
        >
          <Plus className="size-4" />
          New Meeting
        </Link>
        <Link
          href="/meeting/join"
          className="neumorphic-button flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground"
        >
          <LogIn className="size-4" />
          Join Meeting
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
