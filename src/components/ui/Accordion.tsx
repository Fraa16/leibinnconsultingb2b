import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useReveal } from '../../hooks/useReveal';

export type AccordionItem = {
  id: string;
  title: ReactNode;
  /** Short line shown under the title while collapsed. */
  meta?: ReactNode;
  body: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Index open on mount; null for all closed. */
  defaultOpen?: number | null;
  tone?: 'light' | 'onInk';
  /** Shows a tracked ordinal to the left of each title. */
  numbered?: boolean;
  /** Title size. FAQ questions read better a step down from the default. */
  size?: 'lg' | 'md';
  className?: string;
};

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/** Gap between successive rows arriving. */
const STAGGER = 110;

/**
 * Single-open accordion, as used for the consequences and the FAQ.
 *
 * Two motions. On arrival the rows come in one after another: each rule
 * draws across, the ordinal fades up, the title rises, the plus turns in.
 * On opening, the panel grows to its content's height rather than snapping
 * (see `.acc-panel` in `src/index.css`) while the text settles in a beat
 * behind it; the plus turns 45° into a close mark.
 */
export default function Accordion({
  items,
  defaultOpen = 0,
  tone = 'light',
  numbered = false,
  size = 'lg',
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const ref = useReveal<HTMLDivElement>();
  const onInk = tone === 'onInk';
  const rule = onInk ? 'bg-line-onInk' : 'bg-line';

  return (
    // self-start: in a grid row the list would otherwise stretch to the
    // neighbouring column's height, and its closing rule would hang there.
    <div ref={ref} className={cn('relative self-start', className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-${i}-button`;
        const panelId = `${baseId}-${i}-panel`;
        const base = i * STAGGER;

        return (
          <div key={item.id} className="relative">
            <span aria-hidden="true" className={cn('a-line absolute inset-x-0 top-0 h-px', rule)} style={delay(base)} />

            <h3>
              <button
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span className="flex flex-1 items-start gap-5">
                  {numbered && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'a-fade tnum mt-1.5 shrink-0 text-meta uppercase',
                        onInk ? 'text-ice-300' : 'text-ink-600',
                      )}
                      style={delay(base + 120)}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}

                  <span className="a-rise flex-1" style={delay(base + 80)}>
                    <span
                      className={cn(
                        'block transition-colors duration-300 ease-brand',
                        size === 'lg' ? 'text-h3' : 'text-h4',
                        onInk
                          ? 'text-white'
                          : open
                            ? 'text-ink-600'
                            : 'text-content-strong group-hover:text-ink-600',
                      )}
                    >
                      {item.title}
                    </span>
                    {item.meta && (
                      <span className={cn('mt-2 block text-small', onInk ? 'text-white/55' : 'text-content')}>
                        {item.meta}
                      </span>
                    )}
                  </span>
                </span>

                <span aria-hidden="true" className="a-pop mt-0.5 shrink-0" style={delay(base + 200)}>
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 ease-brand',
                      onInk
                        ? open
                          ? 'border-ice-300 bg-ice-300 text-ink-950'
                          : 'border-line-onInkStrong text-white/70 group-hover:border-white/50 group-hover:text-white'
                        : open
                          ? 'border-ink-950 bg-ink-950 text-ice-300'
                          : 'border-line-strong text-content-muted group-hover:border-ink-600 group-hover:text-ink-600',
                    )}
                  >
                    {/*
                      The glyph turns, not its circle: a circle looks the same
                      rotated, but its bounding box grows to 62px and spills
                      past the row on a narrow screen.
                    */}
                    <Plus
                      size={17}
                      strokeWidth={1.75}
                      className={cn('transition-transform duration-500 ease-brand', open && 'rotate-45')}
                    />
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-state={open ? 'open' : 'closed'}
              className="acc-panel"
            >
              <div>
                <div className={cn('acc-body pb-8', numbered && 'sm:pl-[2.6rem]')}>
                  <div className={cn('max-w-measure text-body', onInk ? 'text-white/65' : 'text-content')}>
                    {item.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <span
        aria-hidden="true"
        className={cn('a-line absolute inset-x-0 bottom-0 h-px', rule)}
        style={delay(items.length * STAGGER)}
      />
    </div>
  );
}
