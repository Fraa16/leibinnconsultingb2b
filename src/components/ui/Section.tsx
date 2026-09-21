import type { ReactNode } from 'react';

type Tone = 'canvas' | 'surface' | 'dark';

const toneClass: Record<Tone, string> = {
  /* Sits flush on the page canvas — no block, no radius. */
  canvas: 'bg-canvas',
  /* A white block floating on the canvas. */
  surface: 'lc-block bg-white',
  /* A deep navy block floating on the canvas. */
  dark: 'lc-block on-dark bg-navy-deep text-white',
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Opt out of the standard vertical rhythm (e.g. full-bleed media). */
  flush?: boolean;
};

/**
 * Every section on the site goes through here, which is what keeps the
 * vertical rhythm and the light/dark alternation consistent. Previously
 * each section invented its own padding (py-24, py-20, py-16 md:py-20,
 * py-12 md:py-16 lg:py-20) and its own near-identical off-white.
 */
export default function Section({
  id,
  tone = 'canvas',
  children,
  className = '',
  flush = false,
}: SectionProps) {
  return (
    <section id={id} className={`${toneClass[tone]} ${className}`}>
      <div className={flush ? '' : 'lc-pad'}>{children}</div>
    </section>
  );
}
