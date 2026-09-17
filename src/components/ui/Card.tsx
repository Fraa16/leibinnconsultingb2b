import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type CardProps = {
  children: ReactNode;
  tone?: 'panel' | 'raised' | 'ink' | 'ghost';
  /** Restrained hover: the border and fill shift, nothing lifts or glows. */
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
};

const TONES = {
  panel: 'bg-panel border border-line',
  raised: 'bg-raised border border-line',
  ink: 'bg-white/[0.04] border border-line-onInk',
  ghost: 'bg-transparent border border-line',
} as const;

const PADDING = { none: '', sm: 'p-5', md: 'p-6 md:p-7', lg: 'p-7 md:p-9' } as const;

/**
 * Flat, bordered surface.
 *
 * The previous version leaned on drop shadows and a frosted-glass variant,
 * which is what made the grids read as generic. Structure here comes from the
 * hairline; depth is deliberately absent.
 */
export default function Card({
  children,
  tone = 'panel',
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
          'transition-colors duration-300 ease-entrance hover:border-line-strong hover:bg-raised',
        className,
      )}
    >
      {children}
    </div>
  );
}
