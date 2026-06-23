'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Plus, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', route: '/', icon: '/icons/home.svg' },
  { label: 'Personal Room', route: '/personal-room', icon: '/icons/room.svg' },
  { label: 'Upcoming', route: '/upcoming', icon: '/icons/calendar.svg' },
  { label: 'Previous', route: '/previous', icon: '/icons/history.svg' },
  { label: 'Recordings', route: '/recordings', icon: '/icons/recording.svg' },
  { label: 'Join Meeting', route: '/meeting/join', icon: '/icons/join.svg' },
  { label: 'Settings', route: '/settings', icon: '/icons/settings.svg' },
  { label: 'The Build', route: '/about-project', icon: '/icons/summary.svg' },
  { label: 'About', route: '/about', icon: '/icons/user.svg' },
  { label: 'Support', route: '/support', icon: '/icons/support.svg' },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    navLinks.forEach((link) => router.prefetch(link.route));
  }, [router]);

  const handleNavigation = (route: string) => {
    setIsOpen(false);
    router.push(route);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            className="z-50 flex flex-col gap-1 p-2 focus:outline-none"
            aria-label="Menu"
          >
            <span
              className={cn(
                'block h-0.5 w-5 bg-foreground transition-all duration-300',
                isOpen && 'translate-y-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-5 bg-foreground transition-all duration-300',
                isOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-5 bg-foreground transition-all duration-300',
                isOpen && '-translate-y-1.5 -rotate-45',
              )}
            />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="z-50 w-full max-w-[300px] border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl"
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-border/60 p-4">
              <div className="flex items-center gap-2">
                <div className="relative size-9 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500" />
                  <Image
                    src="/icons/logo.svg"
                    width={36}
                    height={36}
                    alt="MeetEase"
                    className="relative z-10 p-1.5"
                    priority
                  />
                </div>
                <span className="font-heading text-lg font-bold gradient-text">
                  MeetEase
                </span>
              </div>
            </div>

            <nav className="scrollbar-thin scrollbar-thumb-secondary-700 flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.route === '/'
                      ? pathname === '/'
                      : pathname === link.route || pathname.startsWith(`${link.route}/`);

                  return (
                    <li key={link.route}>
                      <button
                        onClick={() => handleNavigation(link.route)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all',
                          isActive
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                        )}
                      >
                        <span className="relative flex size-5 flex-shrink-0 items-center justify-center">
                          <Image
                            src={link.icon}
                            alt=""
                            width={18}
                            height={18}
                            className={cn(
                              'brightness-110',
                              isActive ? 'opacity-100' : 'opacity-70',
                            )}
                          />
                        </span>
                        <span className="text-sm font-medium">{link.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-2.5 border-t border-border/60 p-3">
              <button
                className="neumorphic-button-primary flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium"
                onClick={() => handleNavigation('/meeting/new')}
              >
                <Plus className="size-4" />
                New Meeting
              </button>
              <button
                className="neumorphic-button flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground"
                onClick={() => handleNavigation('/meeting/join')}
              >
                <LogIn className="size-4" />
                Join Meeting
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
