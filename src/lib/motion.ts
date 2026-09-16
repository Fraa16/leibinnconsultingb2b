import type { Transition, Variants } from 'framer-motion';

/**
 * One motion spec for the whole site.
 *
 * The original code declared `ease: 'easeOut'` as a bare string inside variant
 * objects, which framer-motion v12 types reject — that was 6 of the 6 existing
 * typecheck errors. Easing lives here as a typed cubic-bezier tuple instead.
 */
export const EASE_ENTRANCE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition = (duration = 0.6, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_ENTRANCE,
});

/** Standard scroll-reveal: lift and fade, once. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition() },
};

/** Parent that staggers its children's reveals. */
export const staggerVariants = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Child of a staggered parent. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transition(0.55) },
};

/** Shared viewport config so every reveal triggers at the same point. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Collapses any variant set to a no-op for prefers-reduced-motion. */
export const STATIC_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};
