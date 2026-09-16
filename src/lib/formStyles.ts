/**
 * Shared form-control styling.
 *
 * Kept out of the Field component file so that module only exports a
 * component, which is what react-refresh needs for fast refresh to work.
 */
export const controlClasses =
  'w-full rounded-xl border border-ink-200/70 bg-white/90 px-3.5 py-2.5 text-small text-content-strong ' +
  'placeholder:text-content-subtle shadow-[0_1px_2px_rgba(21,23,79,0.04)] transition-all duration-200 ' +
  'hover:border-ink-300 focus:border-ink-600 focus:outline-none focus:ring-2 focus:ring-ink-600/25 ' +
  // Only flag invalid fields once the visitor has tried to submit.
  '[.submitted_&:invalid]:border-danger [.submitted_&:invalid]:ring-2 [.submitted_&:invalid]:ring-danger/20';
