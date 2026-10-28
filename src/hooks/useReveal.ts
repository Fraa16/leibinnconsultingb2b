import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal on scroll.
 *
 * Give the element `className="reveal"`; this adds `.is-revealed` once 10% of
 * it has been in view, and then stops observing. Matches the handoff spec
 * (0.8s, cubic-bezier(.2,.7,.2,1)); the CSS neutralises it under
 * prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `value` over 1.5s once the element is half visible.
 *
 * Returns the ref to attach and the current number. Pair it with the `.tnum`
 * class so the digits do not jitter while animating.
 */
export function useCountUp(value: number, duration = 1500) {
  const ref = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(value * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return { ref, current };
}

/** German number formatting, as the handoff specifies. */
export const de = (n: number) => Math.round(n).toLocaleString('de-DE');
export const euro = (n: number) => `${de(n)} €`;
