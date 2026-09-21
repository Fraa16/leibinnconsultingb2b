import { useId } from 'react';

type BaseProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

const controlClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink
   placeholder:text-ink-subtle transition-colors duration-200
   focus:outline-none focus-visible:outline-none
   focus:border-navy focus:ring-2 focus:ring-navy/25
   ${hasError ? 'border-red-600/60' : 'border-ink/15'}`;

/**
 * Label, control, hint and error wired together by id.
 *
 * The previous form rendered bare <label> elements with no htmlFor and no
 * id on the input, so nothing was announced to a screen reader and
 * clicking a label did not focus its field.
 */
export function TextField({
  label,
  required,
  error,
  hint,
  className = '',
  multiline,
  ...props
}: BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline?: boolean }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="t-small mb-2 block font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-navy" aria-hidden="true">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClass(!!error)} resize-y`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClass(!!error)}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-ink-subtle">{hint}</p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-red-700">{error}</p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  required,
  error,
  className = '',
  children,
  ...props
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="t-small mb-2 block font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-navy" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={controlClass(!!error)}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-red-700">{error}</p>
      )}
    </div>
  );
}
