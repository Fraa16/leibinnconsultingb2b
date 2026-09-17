import { cn } from '../../lib/cn';

/**
 * Wordmark: vector monogram plus the company name.
 *
 * The mark is drawn rather than set as the letter "L" in a box, so it adds no
 * stray glyph to the page's text and scales cleanly. It mirrors the favicon.
 */
export default function Logo({ onInk = false, className }: { onInk?: boolean; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
        className="h-7 w-7 shrink-0"
      >
        <rect width="64" height="64" rx="15" fill={onInk ? '#FFFFFF' : '#15174F'} />
        <path d="M21 16h7.5v25.5H45V48H21z" fill={onInk ? '#15174F' : '#FFFFFF'} />
        <rect x="21" y="16" width="7.5" height="12" fill="#A1CEE5" />
      </svg>
      <span
        className={cn(
          'text-[0.9375rem] font-semibold tracking-[-0.02em]',
          onInk ? 'text-white' : 'text-content-strong',
        )}
      >
        Leibinn Consulting
      </span>
    </span>
  );
}
