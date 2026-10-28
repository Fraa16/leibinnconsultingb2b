import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

type SectionHeadProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Sits in the right column on desktop, bottom-aligned with the headline. */
  lead?: ReactNode;
  tone?: 'default' | 'onInk';
  as?: 'h2' | 'h3';
  /** Centre it instead of using the two-column split. */
  align?: 'split' | 'center';
  titleWidth?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * The handoff's standard section header: a two-column grid of
 * `minmax(0,1.5fr) minmax(0,1fr)`, eyebrow and H2 on the left, lead paragraph
 * on the right, bottom-aligned, gap clamp(40px,6vw,120px). Stacks on mobile.
 */
export default function SectionHead({
  eyebrow,
  title,
  lead,
  tone = 'default',
  as: Tag = 'h2',
  align = 'split',
  titleWidth = 'max-w-[18ch]',
  className,
  children,
}: SectionHeadProps) {
  const onInk = tone === 'onInk';

  if (align === 'center') {
    return (
      <Reveal className={cn('mx-auto flex max-w-3xl flex-col items-center text-center', className)}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Tag
          className={cn(
            eyebrow ? 'mt-7' : undefined,
            onInk ? 'text-white' : undefined,
            Tag === 'h3' ? 'text-h2' : undefined,
            titleWidth,
          )}
        >
          {title}
        </Tag>
        {lead && (
          <p className={cn('mt-6 max-w-measure text-lead', onInk ? 'text-white/65' : 'text-content')}>
            {lead}
          </p>
        )}
        {children}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        'grid items-end gap-x-[clamp(2.5rem,6vw,7.5rem)] gap-y-6',
        'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]',
        className,
      )}
    >
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Tag
          className={cn(
            eyebrow ? 'mt-7' : undefined,
            onInk ? 'text-white' : undefined,
            Tag === 'h3' ? 'text-h2' : undefined,
            titleWidth,
          )}
        >
          {title}
        </Tag>
      </div>

      {(lead || children) && (
        <div>
          {lead && (
            <p className={cn('max-w-measure text-lead', onInk ? 'text-white/65' : 'text-content')}>
              {lead}
            </p>
          )}
          {children}
        </div>
      )}
    </Reveal>
  );
}
