'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Support', href: '/support' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 py-2 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-3',
      )}
    >
      <div className="mx-auto flex h-12 items-center justify-between px-4 md:px-8">
        <Link href="/" className="z-10 flex items-center gap-2 group" prefetch>
          <div className="relative size-9 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 opacity-90 transition-opacity group-hover:opacity-100" />
            <Image
              src="/icons/logo.svg"
              width={36}
              height={36}
              alt="MeetEase"
              className="relative z-10 p-1.5"
              priority
            />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            <span className="gradient-text">MeetEase</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch
                className={cn(
                  'group relative px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.name}
                <span
                  className={cn(
                    'absolute inset-x-2 bottom-1 h-0.5 origin-left bg-gradient-to-r from-primary-500 to-accent-500 transition-transform duration-200',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <SignedIn>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    'hover:scale-105 transition-transform shadow-sm ring-2 ring-primary-500/30',
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/sign-in"
                className="neumorphic-button rounded-xl px-4 py-2 text-sm font-medium text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="neumorphic-button-primary flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    duration: 0.8,
                  }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </SignedOut>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
