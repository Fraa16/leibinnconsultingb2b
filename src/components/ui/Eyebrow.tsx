import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type EyebrowProps = {
  children: ReactNode;
  tone?: 'default' | 'onInk';
  className?: string;
};

/**
 * Section kicker, as a bordered pill with a status dot.
 *
 * Previously this was a bare tracked caption, which is what a default build
 * produces. Giving it an outline and a dot turns it into a deliberate object
 * and gives every section head the same recognisable opening beat.
 */
export default function Eyebrow({ children, tone = 'default', className }: EyebrowProps) {
  const onInk = tone === 'onInk';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border py-1.5 pl-2.5 pr-3.5 text-label uppercase',
        onInk
          ? 'border-line-onInkStrong bg-white/[0.06] text-ice-200'
          : 'border-line bg-panel text-ink-600',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', onInk ? 'bg-ice-300' : 'bg-ice-400')}
      />
      {children}
    </span>
  );
}
