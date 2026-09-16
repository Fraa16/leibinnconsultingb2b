import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type EyebrowProps = {
  children: ReactNode;
  /** `onInk` for use on the dark navy sections. */
  tone?: 'default' | 'onInk';
  /** Draws the short accent rule before the label. */
  rule?: boolean;
  className?: string;
};

/**
 * The kicker above a section heading.
 *
 * The old markup expressed this four different ways — `text-subheading
 * text-subheading uppercase`, `text-sm font-medium text-primary tracking-wide
 * uppercase`, `text-xs tracking-[0.2em] uppercase text-white/60`, and an
 * inline flex with a hand-built accent bar.
 */
export default function Eyebrow({ children, tone = 'default', rule = true, className }: EyebrowProps) {
  const color = tone === 'onInk' ? 'text-ice-300' : 'text-ink-600';

  return (
    <p className={cn('flex items-center gap-2.5 text-eyebrow uppercase', color, className)}>
      {rule && (
        <span
          aria-hidden="true"
          className={cn('h-4 w-[3px] shrink-0 rounded-full', tone === 'onInk' ? 'bg-ice-300' : 'bg-ink-600')}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
