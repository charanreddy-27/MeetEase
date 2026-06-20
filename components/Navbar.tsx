'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Performance optimized scroll listener with throttling
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
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-secondary-900/95 backdrop-blur-md py-2 shadow-md border-b border-secondary-800/50" 
          : "bg-secondary-950/80 backdrop-blur-sm py-3"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
          prefetch={true}
        >
          <div className="relative size-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-accent-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="MeetEase"
              className="relative z-10 p-1"
              priority
            />
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-accent-400 hidden sm:block">
            MeetEase
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/support">Support</NavLink>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox: "hover:scale-105 transition-transform shadow-sm"
                }
              }}
            />
          </SignedIn>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link 
      href={href}
      className="text-secondary-300 hover:text-white transition-colors relative group py-1.5 px-1 text-sm font-medium"
      prefetch={true}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-accent-500 transition-all duration-300 group-hover:w-full opacity-80" />
    </Link>
  );
};

export default Navbar;
