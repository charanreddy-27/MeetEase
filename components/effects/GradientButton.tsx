'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  glow?: boolean;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      className,
      children,
      gradientFrom = 'from-primary-600',
      gradientTo = 'to-accent-600',
      glow = true,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        className="group relative inline-block"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        {glow && (
          <div
            className={cn(
              'absolute inset-0 -z-10 rounded-xl bg-gradient-to-r opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100',
              gradientFrom,
              gradientTo,
            )}
          />
        )}
        <Button
          ref={ref}
          variant="default"
          className={cn(
            'relative rounded-xl border-0 bg-gradient-to-r text-white',
            gradientFrom,
            gradientTo,
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  },
);

GradientButton.displayName = 'GradientButton';

export default GradientButton;
