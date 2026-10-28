import { useId } from 'react';

type RangeSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** Rendered large beside the label — already formatted. */
  display: string;
  suffix?: string;
  className?: string;
};

/**
 * Range input with a brand-tinted track.
 *
 * The native input is kept (not re-implemented with pointer events) so it
 * stays keyboard- and screen-reader-operable; the fill is painted as a
 * gradient on the track and the thumb is styled per browser.
 */
export default function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  suffix,
  className,
}: RangeSliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-meta uppercase text-content-muted">
          {label}
        </label>
        <output htmlFor={id} className="tnum text-stat text-content-strong">
          {display}
          {suffix && <span className="ml-1.5 text-h4 text-content-muted">{suffix}</span>}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="brand-range mt-4 w-full"
        style={{
          background: `linear-gradient(to right, #15174F 0%, #A1CEE5 ${pct}%, #E6E9F0 ${pct}%, #E6E9F0 100%)`,
        }}
      />

      <div className="mt-2 flex justify-between text-meta uppercase text-content-faint">
        <span className="tnum">{min}</span>
        <span className="tnum">{max}</span>
      </div>
    </div>
  );
}
