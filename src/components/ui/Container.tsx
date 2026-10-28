import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ContainerProps = {
  children: ReactNode;
  width?: 'shell' | 'content' | 'narrow';
  className?: string;
};

const WIDTHS = {
  shell: 'max-w-shell',
  content: 'max-w-content',
  narrow: 'max-w-3xl',
} as const;

/** Handoff: max content width 1280px, side padding clamp(24px, 4vw, 56px). */
export default function Container({ children, width = 'content', className }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-[clamp(1.25rem,4vw,3.5rem)]', WIDTHS[width], className)}
    >
      {children}
    </div>
  );
}
