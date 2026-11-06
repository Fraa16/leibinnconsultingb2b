import { useId } from 'react';
import { cn } from '../../lib/cn';
import {
  LOCKUP_MARK,
  LOCKUP_NAME,
  LOCKUP_TAGLINE,
  LOCKUP_VIEWBOX,
  LOCKUP_COMPACT_SHIFT,
} from './logo-paths';

type LogoProps = {
  /** Paint for a dark surface. */
  onInk?: boolean;
  /**
   * Draw the "Investment Consulting" line under the name. It is set small
   * enough that below roughly 230px of lockup it stops being type and starts
   * being a grey smudge, so the header leaves it off.
   */
  tagline?: boolean;
  className?: string;
};

/*
 * The mark's gradient, sampled off the supplied artwork: #A1CEE6 at the top
 * left falling to #282C7D at the bottom right. Those are ice-300 and ink-600
 * to within a digit — the site palette was derived from this logo — so the
 * mark sits in the page rather than on it.
 *
 * On a navy surface the dark end would disappear into the background, so it
 * lifts to ink-500 and the light end carries the shape.
 */
const GRADIENT = {
  from: '#A1CEE5',
  to: '#2A2D7C',
  toOnInk: '#5B62C9',
};

/**
 * The brand lockup, traced to vector (see scripts/trace-logo.mjs).
 *
 * Inlined rather than loaded as a file so the mark can take the gradient
 * while the type follows the surrounding colour — one component for the
 * white header pill and the navy footer both.
 */
export default function Logo({ onInk = false, tagline = false, className }: LogoProps) {
  // React's generated ids carry colons, which are legal in an attribute but
  // trip up anything that later tries to use the id as a CSS selector.
  const gradientId = `logo-mark-${useId().replace(/:/g, '')}`;

  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      role="img"
      aria-label="Leibinn Consulting"
      className={cn('block w-auto', tagline ? 'h-10 sm:h-11' : 'h-7 xl:h-8', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.92" y2="0.78">
          <stop offset="0" stopColor={GRADIENT.from} />
          <stop offset="1" stopColor={onInk ? GRADIENT.toOnInk : GRADIENT.to} />
        </linearGradient>
      </defs>

      <g fill={`url(#${gradientId})`}>
        {LOCKUP_MARK.map((d) => (
          <path key={d.length + d.slice(0, 24)} d={d} />
        ))}
      </g>

      <g
        fill={onInk ? '#FFFFFF' : '#15174F'}
        transform={tagline ? undefined : `translate(0 ${LOCKUP_COMPACT_SHIFT})`}
      >
        {LOCKUP_NAME.map((d) => (
          <path key={d.length + d.slice(0, 24)} d={d} />
        ))}
      </g>

      {tagline && (
        <g fill={onInk ? 'rgba(255,255,255,0.62)' : '#2A2D7C'}>
          {LOCKUP_TAGLINE.map((d) => (
            <path key={d.length + d.slice(0, 24)} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
}
