import type { ReactNode } from 'react';
import Pill from './Pill';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  /** Rendered in full ink. */
  title: ReactNode;
  /** Rendered in the muted tone — the reference's two-tone headline. */
  titleMuted?: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  lead,
  align = 'center',
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal className={centered ? 'flex justify-center' : ''}>
          <Pill>{eyebrow}</Pill>
        </Reveal>
      )}

      <Reveal delay={eyebrow ? 0.06 : 0}>
        <Tag className={`t-h2 ${eyebrow ? 'mt-7' : ''} ${centered ? 'mx-auto max-w-4xl' : 'max-w-3xl'}`}>
          {title}
          {titleMuted && <span className="t-muted"> {titleMuted}</span>}
        </Tag>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`t-lead text-ink-muted mt-6 ${
              centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
