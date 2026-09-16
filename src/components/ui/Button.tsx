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
  /** Renders a trailing icon that nudges right on hover. */
  icon?: ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = CommonProps & {
  to?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

type LinkProps = CommonProps & {
  to: string;
  onClick?: () => void;
};

/*
 * The brand cobalt drives every call to action.
 *
 * The Bolt build had drifted onto #016FB9 — a bright azure used 19 times that
 * appears nowhere in the brand palette and reads cold-generic next to the
 * navy. Consolidating on ink-600 means the whole page resolves to one system,
 * and the ice accent is freed up to do contrast work on the dark sections.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink-600 text-white shadow-[0_4px_20px_rgba(42,45,124,0.28)] ' +
    'hover:bg-ink-700 hover:shadow-[0_10px_30px_rgba(42,45,124,0.36)] hover:-translate-y-0.5 ' +
    'active:translate-y-0 active:bg-ink-800',
  secondary:
    'border border-ink-600/25 text-ink-600 bg-transparent ' +
    'hover:bg-ink-600/[0.06] hover:border-ink-600/40',
  onInk:
    'bg-white text-ink-800 shadow-[0_8px_28px_rgba(0,0,0,0.28)] ' +
    'hover:bg-ice-50 hover:-translate-y-0.5 active:translate-y-0',
  onInkGhost:
    'border border-white/30 text-white bg-white/[0.07] ' +
    'hover:bg-white/[0.14] hover:border-white/45',
  link:
    'text-content-strong underline-offset-[6px] decoration-1 underline decoration-content-strong/30 ' +
    'hover:text-ink-600 hover:decoration-ink-600 px-0 py-0 rounded-none',
};

const SIZES: Record<Size, string> = {
  md: 'px-6 py-3 text-small',
  lg: 'px-7 py-3.5 text-small',
};

function classes(variant: Variant, size: Size, fullWidth?: boolean, className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-2 rounded-xl font-medium',
    'transition-all duration-200 ease-entrance',
    'disabled:opacity-50 disabled:pointer-events-none',
    variant !== 'link' && SIZES[size],
    VARIANTS[variant],
    fullWidth && 'w-full',
    className,
  );
}

function Icon({ icon }: { icon: ReactNode }) {
  return (
    <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
  );
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
