import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Eyebrow from './Eyebrow';

type SectionHeadProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'onInk';
  /** Render the title as an h3 where the page outline needs it. */
  as?: 'h2' | 'h3';
  /** Caps the headline measure; headlines read better broken early. */
  titleWidth?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * The opening beat of every section: pill → headline → supporting line.
 *
 * Having one component own this is what keeps the vertical rhythm identical
 * from section to section; previously each one hand-rolled its own spacing and
 * they visibly disagreed.
 */
export default function SectionHead({
  eyebrow,
  title,
  body,
  align = 'left',
  tone = 'default',
  as: Tag = 'h2',
  titleWidth = 'max-w-[20ch]',
  className,
  children,
}: SectionHeadProps) {
  const centered = align === 'center';
  const onInk = tone === 'onInk';

  return (
    <div className={cn(centered && 'mx-auto flex flex-col items-center text-center', className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}

      <Tag
        className={cn(
          eyebrow ? 'mt-6' : '',
          onInk ? 'text-white' : 'text-content-strong',
          Tag === 'h3' && 'text-h2',
          titleWidth,
          centered && 'mx-auto',
        )}
      >
        {title}
      </Tag>

      {body && (
        <p
          className={cn(
            'mt-5 max-w-measure text-lead',
            onInk ? 'text-white/65' : 'text-content',
            centered && 'mx-auto',
          )}
        >
          {body}
        </p>
      )}

      {children}
    </div>
  );
}
