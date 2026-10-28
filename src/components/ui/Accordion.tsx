import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

export type AccordionItem = {
  id: string;
  title: ReactNode;
  /** Short line shown next to the title while collapsed. */
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
  className?: string;
};

/**
 * Single-open accordion, as used for both the System rows and the FAQ in the
 * handoff: one item at a time, the icon rotating 45° into a close state.
 */
export default function Accordion({
  items,
  defaultOpen = 0,
  tone = 'light',
  numbered = false,
  className,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const onInk = tone === 'onInk';

  return (
    <div className={cn('divide-y', onInk ? 'divide-line-onInk' : 'divide-line', className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-${i}-button`;
        const panelId = `${baseId}-${i}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className={cn(
                  'group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-200',
                  onInk ? 'hover:bg-white/[0.03]' : 'hover:bg-ink-950/[0.015]',
                )}
              >
                <span className="flex flex-1 items-start gap-5">
                  {numbered && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'tnum mt-1 shrink-0 text-meta uppercase',
                        onInk ? 'text-ice-300' : 'text-ink-600',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}

                  <span className="flex-1">
                    <span
                      className={cn(
                        'block text-h3 transition-colors duration-200',
                        onInk ? 'text-white' : 'text-content-strong group-hover:text-ink-600',
                      )}
                    >
                      {item.title}
                    </span>
                    {item.meta && (
                      <span
                        className={cn(
                          'mt-2 block text-small',
                          onInk ? 'text-white/55' : 'text-content',
                        )}
                      >
                        {item.meta}
                      </span>
                    )}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-brand',
                    open && 'rotate-45',
                    onInk
                      ? open
                        ? 'border-ice-300 bg-ice-300 text-ink-950'
                        : 'border-line-onInkStrong text-white/70 group-hover:border-white/40'
                      : open
                        ? 'border-ink-950 bg-ink-950 text-ice-300'
                        : 'border-line-strong text-content-muted group-hover:border-ink-300 group-hover:text-ink-600',
                  )}
                >
                  <Plus size={17} strokeWidth={1.75} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className={cn('pb-8', numbered && 'sm:pl-[3.25rem]')}
            >
              <div
                className={cn(
                  'max-w-measure text-body',
                  onInk ? 'text-white/60' : 'text-content',
                )}
              >
                {item.body}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
