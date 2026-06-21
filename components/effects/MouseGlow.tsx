'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface MouseGlowProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  followSpeed?: number;
  pulseEffect?: boolean;
  pulseSpeed?: number;
  pulseScale?: number;
  zIndex?: number;
}

const MouseGlow = ({
  color = 'rgba(225, 29, 72, 0.12)',
  size = 600,
  blur = 150,
  opacity = 0.6,
  followSpeed = 0.08,
  pulseEffect = true,
  pulseSpeed = 4,
  pulseScale = 1.05,
  zIndex = 0,
}: MouseGlowProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const smoothlyUpdatePosition = () => {
      setMousePosition((prev) => ({
        x: prev.x + (lastMousePosition.current.x - prev.x) * followSpeed,
        y: prev.y + (lastMousePosition.current.y - prev.y) * followSpeed,
      }));
      animationFrameId.current = requestAnimationFrame(smoothlyUpdatePosition);
    };

    window.addEventListener('mousemove', updateMousePosition);
    animationFrameId.current = requestAnimationFrame(smoothlyUpdatePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [followSpeed, isVisible]);

  useEffect(() => {
    if (pulseEffect && isVisible) {
      controls.start({
        scale: [1, pulseScale, 1],
        transition: {
          duration: pulseSpeed,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'loop',
          ease: 'easeInOut',
        },
      });
    }
  }, [controls, pulseEffect, pulseScale, pulseSpeed, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
              backgroundColor: color,
              width: size,
              height: size,
              filter: `blur(${blur}px)`,
              opacity,
              x: mousePosition.x - size / 2,
              y: mousePosition.y - size / 2,
            }}
            animate={controls}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MouseGlow;
