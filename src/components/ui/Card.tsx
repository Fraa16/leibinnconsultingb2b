import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type CardProps = {
  children: ReactNode;
  /** `glass` is the frosted treatment used over patterned backgrounds. */
  tone?: 'base' | 'glass' | 'ink';
  /** Adds hover lift — only for cards that are themselves interactive. */
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
};

const TONES = {
  base: 'bg-surface border border-ink-100 shadow-soft',
  glass: 'bg-white/55 backdrop-blur-xl border border-white/70 shadow-card',
  ink: 'bg-white/[0.06] border border-white/12 backdrop-blur-sm',
} as const;

const PADDING = { none: '', sm: 'p-5', md: 'p-6 md:p-7', lg: 'p-7 md:p-9' } as const;

export default function Card({
  children,
  tone = 'base',
  interactive = false,
  padding = 'md',
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl2',
        TONES[tone],
        PADDING[padding],
        interactive &&
          'transition-all duration-300 ease-entrance hover:-translate-y-1 hover:shadow-lift hover:border-ice-300/60',
        className,
      )}
    >
      {children}
    </div>
  );
}
