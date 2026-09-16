import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ContainerProps = {
  children: ReactNode;
  /** shell = nav/hero (1600px) · content = sections (1280px) · narrow = prose */
  width?: 'shell' | 'content' | 'narrow';
  className?: string;
};

const WIDTHS = {
  shell: 'max-w-shell',
  content: 'max-w-content',
  narrow: 'max-w-3xl',
} as const;

/**
 * Horizontal shell. The original markup mixed max-w-[1600px], max-w-7xl and
 * max-w-6xl with four different gutter combinations; this fixes one gutter
 * ramp for the whole site.
 */
export default function Container({ children, width = 'content', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', WIDTHS[width], className)}>
      {children}
    </div>
  );
}
