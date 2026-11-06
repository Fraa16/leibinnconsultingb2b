import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useReveal } from '../../hooks/useReveal';

type EyebrowProps = {
  children: ReactNode;
  tone?: 'default' | 'onInk';
  className?: string;
};

/**
 * Section kicker: a short rule, then a small tracked caps label.
 *
 * The brand's most recognisable signature: all three handoff siblings open
 * every section with it (36×1.5px rule, 13px/600, .08em, gap 14px). On
 * arrival the rule draws in and the label follows it.
 *
 * It observes itself rather than relying on an ancestor to trigger it, so it
 * can be dropped anywhere without the risk of a rule that never draws.
 */
export default function Eyebrow({ children, tone = 'default', className }: EyebrowProps) {
  const ref = useReveal<HTMLParagraphElement>();
  const onInk = tone === 'onInk';

  return (
    <p
      ref={ref}
      className={cn(
        'flex items-center gap-3.5 text-label uppercase',
        onInk ? 'text-ice-300' : 'text-ink-600',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('a-line h-[1.5px] w-9 shrink-0', onInk ? 'bg-ice-300' : 'bg-ink-600')}
      />
      <span className="a-fade" style={{ ['--d' as string]: '220ms' }}>
        {children}
      </span>
    </p>
  );
}
