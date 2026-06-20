'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  { label: 'Features', route: '/features', icon: '/icons/features.svg' },
  { label: 'Pricing', route: '/pricing', icon: '/icons/pricing.svg' },
  { label: 'Support', route: '/support', icon: '/icons/support.svg' },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Prefetch all routes for instant navigation
  useEffect(() => {
    navLinks.forEach(link => {
      router.prefetch(link.route);
    });
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
            className="flex flex-col gap-1 p-2 focus:outline-none z-50" 
            aria-label="Menu"
          >
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "translate-y-1.5 rotate-45"
            )}></span>
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "-translate-y-1.5 -rotate-45"
            )}></span>
          </button>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full max-w-[280px] p-0 border-none bg-gradient-to-b from-secondary-900 to-secondary-950 z-50"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-secondary-800/50">
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-accent-600 rounded-lg" />
                  <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="MeetEase"
                    className="relative z-10 p-1"
                    priority
                  />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-accent-400">
                  MeetEase
                </span>
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-secondary-700 scrollbar-track-transparent">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                  
                  return (
                    <li key={link.route}>
                      <button
                        onClick={() => handleNavigation(link.route)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3",
                          isActive 
                            ? "bg-gradient-to-r from-purple-500/20 to-accent-600/20 text-purple-400 shadow-sm" 
                            : "text-secondary-300 hover:bg-secondary-800/80 hover:text-white"
                        )}
                      >
                        <div className="relative flex-shrink-0 size-5 flex items-center justify-center">
                          <Image
                            src={link.icon}
                            alt=""
                            width={18}
                            height={18}
                            className={cn(
                              "brightness-110 contrast-125",
                              isActive ? "text-purple-400 filter-none" : "opacity-80"
                            )}
                          />
                          {isActive && (
                            <span className="absolute -right-0.5 -top-0.5 size-2 bg-purple-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{link.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="p-3 border-t border-secondary-800/50 bg-secondary-900/95">
              <div className="flex flex-col gap-2.5">
                <button 
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-500 to-accent-600 hover:from-purple-600 hover:to-accent-700 text-white rounded-lg transition-all shadow-md text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => handleNavigation('/meeting/new')}
                >
                  <Image 
                    src="/icons/add-meeting.svg" 
                    alt="" 
                    width={16} 
                    height={16}
                    className="brightness-110"
                  />
                  New Meeting
                </button>
                <button 
                  className="w-full py-2.5 px-3 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg transition-colors text-sm font-medium border border-secondary-700/50"
                  onClick={() => handleNavigation('/sign-out')}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
