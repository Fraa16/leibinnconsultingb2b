import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type CTAButtonProps = {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  withArrow?: boolean;
};

/**
 * The single CTA component for the whole site.
 *
 * Renders a real <Link>, so these are focusable, middle-clickable and
 * crawlable — the previous CTAs were <button onClick={navigate}> and
 * <a href> mixed arbitrarily.
 */
export default function CTAButton({
  to,
  children,
  variant = 'primary',
  className = '',
  withArrow = true,
}: CTAButtonProps) {
  return (
    <Link to={to} className={`lc-btn lc-btn-${variant} ${className}`}>
      {children}
      {withArrow && <ArrowRight size={16} className="lc-arrow" aria-hidden="true" />}
    </Link>
  );
}
