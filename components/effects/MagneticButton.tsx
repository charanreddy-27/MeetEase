'use client';

import { useState, useRef, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
}

const MagneticButton = ({
  children,
  className,
  strength = 25,
  radius = 320,
  onClick,
}: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (distance < radius) {
      setPosition({
        x: ((e.clientX - centerX) * strength) / 100,
        y: ((e.clientY - centerY) * strength) / 100,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn('relative rounded-xl', className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
