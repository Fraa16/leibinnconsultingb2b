import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Container from './Container';

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Background surface. `ink` is the dark navy treatment. */
  tone?: 'base' | 'subtle' | 'muted' | 'ink';
  /** Vertical rhythm. */
  size?: 'sm' | 'md' | 'lg';
  width?: 'shell' | 'content' | 'narrow';
  /** Set false to lay out the inner content yourself. */
  contained?: boolean;
  className?: string;
  innerClassName?: string;
};

const TONES = {
  base: 'bg-surface',
  subtle: 'bg-surface-subtle',
  muted: 'bg-surface-muted',
  ink: 'bg-ink-900 text-white',
} as const;

const SIZES = {
  sm: 'py-14 md:py-18',
  md: 'py-18 md:py-24 lg:py-28',
  lg: 'py-24 md:py-32 lg:py-40',
} as const;

/**
 * Standard page section: owns the background rhythm and vertical spacing that
 * were previously re-declared inline on every section with eight different
 * padding combinations.
 */
export default function Section({
  children,
  id,
  tone = 'base',
  size = 'md',
  width = 'content',
  contained = true,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative overflow-hidden', TONES[tone], SIZES[size], className)}>
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
