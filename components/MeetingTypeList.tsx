/* eslint-disable camelcase */
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const meetingTypes = [
  {
    id: 'instant',
    title: 'Instant Meeting',
    description: 'Start a meeting right now',
    icon: '/icons/video.svg',
    gradient: 'from-primary-500 to-primary-700',
    badge: { text: 'Popular', variant: 'gradient' as const },
  },
  {
    id: 'schedule',
    title: 'Schedule Meeting',
    description: 'Plan for later',
    icon: '/icons/calendar.svg',
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    id: 'join',
    title: 'Join Meeting',
    description: 'Via invitation code',
    icon: '/icons/join.svg',
    gradient: 'from-secondary-500 to-secondary-700',
  },
  {
    id: 'personal',
    title: 'Personal Room',
    description: 'Your permanent meeting space',
    icon: '/icons/user.svg',
    gradient: 'from-warning-500 to-warning-700',
    badge: { text: 'New', variant: 'success' as const },
  },
];

const MeetingTypeList = () => {
  const router = useRouter();

  const handleClick = (id: string) => {
    switch (id) {
      case 'instant':
        router.push('/meeting/new?type=instant');
        break;
      case 'schedule':
        router.push('/meeting/new?type=scheduled');
        break;
      case 'join':
        router.push('/meeting/join');
        break;
      case 'personal':
        router.push('/meeting/new?type=personal');
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {meetingTypes.map((type) => (
        <motion.button
          key={type.id}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClick(type.id)}
          className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur-sm transition-colors hover:border-primary-500/40"
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10',
              type.gradient,
            )}
          />

          {type.badge && (
            <Badge variant={type.badge.variant} className="absolute right-3 top-3 text-xs">
              {type.badge.text}
            </Badge>
          )}

          <div
            className={cn(
              'mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110',
              type.gradient,
            )}
          >
            <Image
              src={type.icon}
              alt={type.title}
              width={24}
              height={24}
              className="brightness-150"
            />
          </div>

          <h3 className="mb-1 font-heading text-base font-semibold">{type.title}</h3>
          <p className="text-xs text-muted-foreground">{type.description}</p>

          <div className="mt-3 flex size-7 translate-y-2 items-center justify-center rounded-full bg-primary-500/15 text-primary-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default MeetingTypeList;
