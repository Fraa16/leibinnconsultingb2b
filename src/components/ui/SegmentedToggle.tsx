import { cn } from '../../lib/cn';

type Option<T extends string> = { value: T; label: string };

type SegmentedToggleProps<T extends string> = {
  options: [Option<T>, Option<T>];
  value: T;
  onChange: (value: T) => void;
  tone?: 'light' | 'onInk';
  'aria-label': string;
  className?: string;
};

/**
 * Two-way switch with a sliding thumb — the handoff's comparison and
 * video/phone controls. Thumb slides .35s on cubic-bezier(.2,.7,.2,1).
 *
 * Implemented as a radiogroup so it is operable from the keyboard.
 */
export default function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  tone = 'light',
  'aria-label': ariaLabel,
  className,
}: SegmentedToggleProps<T>) {
  const activeIndex = options.findIndex((o) => o.value === value);
  const onInk = tone === 'onInk';

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'relative inline-grid grid-cols-2 rounded-full p-1',
        onInk ? 'bg-white/[0.07]' : 'border border-line bg-panel',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full',
          'transition-transform duration-[350ms] ease-brand',
          onInk ? 'bg-ice-300' : 'bg-ink-950',
        )}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 whitespace-nowrap rounded-full px-5 py-2.5 text-small font-medium',
              'transition-colors duration-[250ms]',
              active
                ? onInk
                  ? 'text-ink-950'
                  : 'text-white'
                : onInk
                  ? 'text-white/65 hover:text-white'
                  : 'text-content hover:text-content-strong',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
