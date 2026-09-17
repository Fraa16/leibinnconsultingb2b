/**
 * Shared form-control styling.
 *
 * Kept out of the Field component file so that module only exports a
 * component, which is what react-refresh needs for fast refresh to work.
 */
export const controlClasses =
  'w-full rounded-xl border border-line bg-canvas px-4 py-3 text-small text-content-strong ' +
  'placeholder:text-content-faint transition-colors duration-200 ' +
  'hover:border-line-strong focus:border-ink-600 focus:bg-panel focus:outline-none focus:ring-4 focus:ring-ink-600/10 ' +
  // Only flag invalid fields once the visitor has tried to submit.
  '[.submitted_&:invalid]:border-danger [.submitted_&:invalid]:ring-4 [.submitted_&:invalid]:ring-danger/10';
