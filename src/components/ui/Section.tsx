import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Container from './Container';

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Surface. `ink` and `inkDeep` are the dark anchors that break the rhythm. */
  tone?: 'canvas' | 'panel' | 'raised' | 'ink' | 'inkDeep';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'shell' | 'content' | 'narrow';
  contained?: boolean;
  /** Hairline above the section — stitches adjacent light sections together. */
  divided?: boolean;
  className?: string;
  innerClassName?: string;
};

const TONES = {
  canvas: 'bg-canvas text-content',
  panel: 'bg-panel text-content',
  raised: 'bg-raised text-content',
  ink: 'bg-ink-900 text-white/70',
  inkDeep: 'bg-ink-950 text-white/70',
} as const;

// Premium templates breathe. These are deliberately larger than the defaults.
const SIZES = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28 lg:py-32',
  lg: 'py-24 md:py-32 lg:py-40',
  xl: 'py-28 md:py-40 lg:py-52',
} as const;

export default function Section({
  children,
  id,
  tone = 'canvas',
  size = 'lg',
  width = 'content',
  contained = true,
  divided = false,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        TONES[tone],
        SIZES[size],
        divided && 'border-t border-line',
        className,
      )}
    >
      {contained ? (
        <Container width={width} className={cn('relative', innerClassName)}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
