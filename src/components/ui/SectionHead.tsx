import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import SplitWords from './SplitWords';

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

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/**
 * The handoff's standard section header: a two-column grid of
 * `minmax(0,1.5fr) minmax(0,1fr)`, eyebrow and H2 on the left, lead paragraph
 * on the right, bottom-aligned. Stacks on mobile.
 *
 * One trigger, staged inside: the eyebrow rule draws, the headline rises
 * word by word out of its own line boxes, then the lead and any controls.
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

  const heading = (
    <Tag
      className={cn(
        'a-words',
        eyebrow ? 'mt-7' : undefined,
        onInk ? 'text-white' : undefined,
        Tag === 'h3' ? 'text-h2' : undefined,
        titleWidth,
      )}
      style={delay(120)}
    >
      <SplitWords>{title}</SplitWords>
    </Tag>
  );

  const leadParagraph = lead && (
    <p
      className={cn(
        'a-rise max-w-measure text-lead',
        align === 'center' && 'mt-6',
        onInk ? 'text-white/65' : 'text-content',
      )}
      style={delay(380)}
    >
      {lead}
    </p>
  );

  if (align === 'center') {
    return (
      <Reveal
        variant="group"
        className={cn('mx-auto flex max-w-3xl flex-col items-center text-center', className)}
      >
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        {heading}
        {leadParagraph}
        {children && (
          <div className="a-rise" style={delay(480)}>
            {children}
          </div>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal
      variant="group"
      className={cn(
        'grid items-end gap-x-[clamp(2.5rem,6vw,7.5rem)] gap-y-6',
        'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]',
        className,
      )}
    >
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        {heading}
      </div>

      {(lead || children) && (
        <div>
          {leadParagraph}
          {children && (
            <div className="a-rise" style={delay(480)}>
              {children}
            </div>
          )}
        </div>
      )}
    </Reveal>
  );
}
