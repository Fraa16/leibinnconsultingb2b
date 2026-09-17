import type { ReactNode } from 'react';

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Label + control pairing.
 *
 * The original form had eight <label> elements with no `htmlFor` and eight
 * inputs with no `id` or `name`, so nothing was programmatically associated
 * and nothing was submitted.
 */
export default function Field({ id, label, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-small font-medium text-content-strong">
        {label}
      </label>
      {children}
    </div>
  );
}
