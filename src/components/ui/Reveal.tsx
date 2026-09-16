import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealVariants, STATIC_VARIANTS, VIEWPORT, transition } from '../../lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Render as a <section>/<li>/etc. instead of a <div>. */
  as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Scroll-reveal wrapper. Replaces AnimatedSection, which animated
 * unconditionally — this one collapses to a no-op when the visitor has asked
 * for reduced motion.
 */
export default function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      variants={reduced ? STATIC_VARIANTS : revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={reduced ? { duration: 0 } : transition(0.6, delay)}
      className={className}
    >
      {children}
    </Tag>
  );
}
