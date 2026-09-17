import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type ContainerProps = {
  children: ReactNode;
  /** shell = nav/hero · content = sections · narrow = prose */
  width?: 'shell' | 'content' | 'narrow';
  className?: string;
};

const WIDTHS = {
  shell: 'max-w-shell',
  content: 'max-w-content',
  narrow: 'max-w-3xl',
} as const;

export default function Container({ children, width = 'content', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', WIDTHS[width], className)}>
      {children}
    </div>
  );
}
