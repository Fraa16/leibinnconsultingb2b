import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'onInk' | 'onInkGhost' | 'link';
type Size = 'md' | 'lg' | 'xl';

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
 * Pill buttons (999px) across the whole brand. Primary is the deep navy with
 * an ice-tinted icon, mirroring the B2B page's navy button with a gold icon.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink-950 text-white shadow-cta hover:bg-ink-800 [&_svg]:text-ice-300',
  secondary: 'border border-ink-950/15 text-content-strong hover:bg-ink-950/[0.05]',
  onInk: 'bg-canvas text-ink-950 hover:bg-white [&_svg]:text-ink-600',
  onInkGhost: 'border border-line-onInkStrong text-white hover:bg-white/10',
  link:
    'text-content-strong underline decoration-ink-950/25 decoration-1 underline-offset-[7px] ' +
    'hover:text-ink-600 hover:decoration-ink-600 px-0 py-0 rounded-none',
};

const SIZES: Record<Size, string> = {
  md: 'h-12 px-6 text-small',
  lg: 'h-[3.25rem] px-7 text-small',
  xl: 'h-[3.875rem] px-8 text-body',
};

function classes(variant: Variant, size: Size, fullWidth?: boolean, className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2.5 font-medium',
    variant !== 'link' && 'rounded-full',
    'transition-colors duration-200 ease-brand disabled:opacity-50 disabled:pointer-events-none',
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
  const { children, variant = 'primary', size = 'lg', className, icon, fullWidth } = props;
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
