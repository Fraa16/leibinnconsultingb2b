import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. Smaller than the old 40px — less "sliding deck". */
  y?: number;
};

/**
 * Scroll-reveal wrapper.
 *
 * Deliberately restrained: 14px of travel over 0.55s. The previous
 * 40px/0.7s with stacked per-item delays meant the last card in a row
 * landed more than a second after it entered the viewport, which read
 * as lag rather than polish. Collapses to a no-op under
 * prefers-reduced-motion.
 */
export default function Reveal({ children, className = '', delay = 0, y = 14 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
