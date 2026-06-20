'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [count, setCount] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-950 to-secondary-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full animate-pulse"></div>
          <Image 
            src="/icons/404.svg" 
            alt="404" 
            width={128} 
            height={128} 
            className="relative z-10"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">404 - Page Not Found</h1>
        
        <div className="glass p-6 rounded-xl mb-6">
          <p className="text-secondary-300 mb-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-sm text-secondary-400">
            Redirecting to home in <span className="text-primary-400 font-medium">{count}</span> seconds...
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/support">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary-950 to-transparent"></div>
    </div>
  );
} 