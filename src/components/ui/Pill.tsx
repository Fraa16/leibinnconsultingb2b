import type { ReactNode } from 'react';

/** Outlined pill eyebrow that labels each section. */
export default function Pill({ children }: { children: ReactNode }) {
  return <span className="lc-pill">{children}</span>;
}
