import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Container from './Container';

type SectionProps = {
  children: ReactNode;
  id?: string;
  /**
   * `panel` and `raised` are inset rounded light panels; `ink` and `inkDeep`
   * run full-bleed dark. The page alternates between them.
   */
  tone?: 'canvas' | 'panel' | 'raised' | 'ink' | 'inkDeep';
  size?: 'sm' | 'md' | 'lg';
  width?: 'shell' | 'content' | 'narrow';
  contained?: boolean;
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

/** Light panels are inset from the page edge and rounded; dark ones are not. */
const INSET = 'mx-[clamp(0.5rem,1.2vw,1rem)] rounded-[clamp(1.25rem,2.4vw,2rem)]';

const SIZES = {
  sm: 'py-[clamp(3.5rem,7vw,5rem)]',
  md: 'py-[clamp(4.5rem,8vw,7rem)]',
  lg: 'py-[clamp(6rem,10vw,9rem)]',
} as const;

export default function Section({
  children,
  id,
  tone = 'canvas',
  size = 'lg',
  width = 'content',
  contained = true,
  className,
  innerClassName,
}: SectionProps) {
  const isLightPanel = tone === 'panel' || tone === 'raised';

  return (
    <section
      id={id}
      className={cn('relative overflow-hidden', TONES[tone], SIZES[size], isLightPanel && INSET, className)}
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
