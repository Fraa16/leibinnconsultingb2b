import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type EyebrowProps = {
  children: ReactNode;
  tone?: 'default' | 'onInk';
  className?: string;
};

/**
 * Section kicker: a short rule, then a small tracked caps label.
 *
 * This is the brand's most recognisable signature — all three handoff
 * siblings open every section with it (36×1.5px rule, 13px/600, .08em, gap
 * 14px). It replaces the bordered pill used in the previous pass.
 */
export default function Eyebrow({ children, tone = 'default', className }: EyebrowProps) {
  const onInk = tone === 'onInk';

  return (
    <p
      className={cn(
        'flex items-center gap-3.5 text-label uppercase',
        onInk ? 'text-ice-300' : 'text-ink-600',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-[1.5px] w-9 shrink-0', onInk ? 'bg-ice-300' : 'bg-ink-600')}
      />
      <span>{children}</span>
    </p>
  );
}
