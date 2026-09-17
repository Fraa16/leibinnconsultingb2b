import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'onInk' | 'onInkGhost' | 'link';
type Size = 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = CommonProps & {
  to?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

type LinkProps = CommonProps & { to: string; onClick?: () => void };

/*
 * Pill buttons, matching the pill eyebrow — one shape language across the
 * whole page. The brand cobalt carries every primary action.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink-600 text-white shadow-ink hover:bg-ink-700 active:bg-ink-800',
  secondary:
    'border border-line-strong bg-panel text-content-strong hover:border-ink-300 hover:bg-raised',
  onInk: 'bg-white text-ink-900 hover:bg-ice-50',
  onInkGhost:
    'border border-line-onInkStrong bg-white/[0.06] text-white hover:bg-white/[0.13] hover:border-white/30',
  link:
    'text-content-strong underline decoration-line-strong decoration-1 underline-offset-[7px] ' +
    'hover:text-ink-600 hover:decoration-ink-600 px-0 py-0 rounded-none',
};

const SIZES: Record<Size, string> = {
  md: 'px-6 py-3 text-small',
  lg: 'px-7 py-3.5 text-small',
};

function classes(variant: Variant, size: Size, fullWidth?: boolean, className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2 font-medium',
    variant !== 'link' && 'rounded-full',
    'transition-all duration-200 ease-entrance disabled:opacity-50 disabled:pointer-events-none',
    variant !== 'link' && SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full',
    className,
  );
}

function Icon({ icon }: { icon: ReactNode }) {
  return <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>;
}

export default function Button(props: ButtonProps | LinkProps) {
  const { children, variant = 'primary', size = 'md', className, icon, fullWidth } = props;
  const cls = classes(variant, size, fullWidth, className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} onClick={props.onClick} className={cls}>
        {children}
        {icon && <Icon icon={icon} />}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
      {icon && <Icon icon={icon} />}
    </button>
  );
}
