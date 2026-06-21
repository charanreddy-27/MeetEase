'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'grid' | 'dots' | 'gradient';
  color?: string;
  secondaryColor?: string;
  speed?: number;
  density?: number;
}

const AnimatedBackground = ({
  className,
  variant = 'gradient',
  color = 'rgba(225, 29, 72, 0.10)',
  secondaryColor = 'rgba(120, 113, 108, 0.08)',
  speed = 6,
  density = 32,
}: AnimatedBackgroundProps) => {
  if (variant === 'gradient') {
    return (
      <motion.div
        className={cn('absolute inset-0 -z-10 overflow-hidden', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${color}, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: speed * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${secondaryColor}, transparent 65%)`,
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: speed * 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
      </motion.div>
    );
  }

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      <svg className="absolute inset-0 h-full w-full" width="100%" height="100%">
        <defs>
          <pattern
            id={`${variant}-pattern`}
            width={variant === 'dots' ? density : density * 2}
            height={variant === 'dots' ? density : density * 2}
            patternUnits="userSpaceOnUse"
          >
            {variant === 'dots' && <circle cx={density / 2} cy={density / 2} r="1" fill={color} />}
            {variant === 'grid' && (
              <path
                d={`M ${density} 0 L 0 0 0 ${density}`}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${variant}-pattern)`} />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
