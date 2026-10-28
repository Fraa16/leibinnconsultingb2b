import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type SlotProps = {
  /** What the client needs to write here. */
  children: ReactNode;
  tone?: 'light' | 'onInk';
  /** `block` for paragraphs and headings, `inline` inside a sentence. */
  as?: 'block' | 'inline';
  className?: string;
};

/**
 * A visible, unmistakable copy placeholder.
 *
 * The new sections (comparison, calculator, testimonials, FAQ, booking) are
 * built out structurally, but their wording is the client's to write. Rather
 * than inventing marketing copy, every such string is rendered through this
 * so it is obvious on the page what still needs filling in — and so a stray
 * placeholder can never be mistaken for finished copy at launch.
 */
export default function Slot({ children, tone = 'light', as = 'inline', className }: SlotProps) {
  const onInk = tone === 'onInk';

  return (
    <span
      data-slot="true"
      className={cn(
        as === 'block' ? 'block' : 'inline-block',
        'rounded-md border border-dashed px-2 py-0.5 align-middle',
        onInk
          ? 'border-ice-300/45 bg-ice-300/[0.07] text-ice-200'
          : 'border-ink-600/35 bg-ink-600/[0.05] text-ink-700',
        className,
      )}
    >
      {children}
    </span>
  );
}
