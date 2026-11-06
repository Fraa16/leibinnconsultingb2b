import { cn } from '../../lib/cn';
import { LOCKUP_MARK } from './logo-paths';

type OrnamentProps = {
  className?: string;
  /** Degrees. The brand sheets tilt the mark rather than always setting it level. */
  rotate?: number;
  /** Stroke opacity, 0–1. The brand sheets sit between 0.06 and 0.16. */
  opacity?: number;
};

/**
 * The wing mark drawn as a hairline contour, for use as a background graphic.
 *
 * The brand package ships these as a folder of "Logo frames" — flat PNGs with
 * the mark traced at various scales and crops, dropped behind a dark panel at
 * a few percent opacity. Redrawing them from the same vector the logo uses
 * costs nothing (the path is already in the bundle), keeps the hairline at
 * exactly 1px however large the ornament is scaled, and lets the colour
 * follow the surface it sits on.
 *
 * Purely decorative: it carries no meaning a screen reader needs.
 */
export default function Ornament({ className, rotate = 0, opacity = 0.1 }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 430 272"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className={cn('pointer-events-none absolute select-none', className)}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, opacity }}
    >
      {LOCKUP_MARK.map((d) => (
        <path
          key={d.length}
          d={d}
          stroke="currentColor"
          strokeWidth={1}
          // Keeps the contour a true hairline no matter how far it is scaled up.
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
