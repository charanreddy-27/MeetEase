'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        'glassmorphic-card flex min-h-[260px] w-full flex-col justify-between rounded-2xl p-6 text-left xl:max-w-[270px]',
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
        <Image src={img} alt={title} width={28} height={28} className="brightness-150" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
        <p className="text-base font-normal opacity-90">{description}</p>
      </div>
    </motion.button>
  );
};

export default HomeCard;
