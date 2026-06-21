'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import Counter from '@/components/effects/Counter';

const stats = [
  { to: 2000, suffix: '+', label: 'Teams onboarded' },
  { to: 12, suffix: 'M+', label: 'Minutes hosted' },
  { to: 99.9, suffix: '%', decimals: 1, label: 'Uptime SLA' },
  { to: 150, suffix: '+', label: 'Countries served' },
];

const StatsSection = () => {
  return (
    <ScrollReveal className="py-8">
      <div className="glassmorphic-card relative overflow-hidden rounded-3xl p-8 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-600/10 via-transparent to-accent-600/10" />
        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                  className="gradient-text"
                />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default StatsSection;
