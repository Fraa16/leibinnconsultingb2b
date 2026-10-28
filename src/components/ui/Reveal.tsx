import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal wrapper, per the handoff: 24px rise, 0.8s, triggered once at
 * 10% visibility. CSS-driven rather than framer-motion so it costs nothing on
 * first paint and degrades to a no-op under prefers-reduced-motion.
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
