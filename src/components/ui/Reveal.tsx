import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /**
   * - `rise`  the element itself fades up (default)
   * - `group` the element only carries the trigger; children choreograph
   *           themselves with the `a-*` classes
   * - `mask`  the element opens upward behind a clip, its image settling
   *           from a slight zoom
   * - `fade`  opacity only
   */
  variant?: 'rise' | 'group' | 'mask' | 'fade';
  /**
   * Delay in ms. Set as `--d`, which children inherit — so a delayed group
   * delays everything inside it, unless a child sets its own `--d`.
   */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

const VARIANT_CLASS = {
  rise: 'reveal',
  group: 'reveal-group',
  mask: 'a-mask',
  fade: 'a-fade',
} as const;

/**
 * One scroll trigger. See the motion system notes in `src/index.css`.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'rise',
  delay = 0,
  className,
  style,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn(VARIANT_CLASS[variant], className)}
      style={delay ? { ...style, ['--d' as string]: `${delay}ms` } : style}
    >
      {/* The clip goes on an inner layer; see `.a-mask-inner` for why. */}
      {variant === 'mask' ? <div className="a-mask-inner">{children}</div> : children}
    </Tag>
  );
}
