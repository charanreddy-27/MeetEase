'use client';

import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  y?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  y = 24,
  className,
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      if (once) setHasAnimated(true);
    } else if (!isInView && !once && hasAnimated) {
      controls.start('hidden');
      setHasAnimated(false);
    }
  }, [isInView, controls, once, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
