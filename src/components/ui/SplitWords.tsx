import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

/**
 * Splits a headline into words for the rising-word reveal (`.a-words` on the
 * heading, see `src/index.css`).
 *
 * Each word gets its own clipped box and a running index `--i` that staggers
 * it. Spaces stay as plain text nodes between the boxes, so the heading still
 * wraps, balances and copies exactly as before — selecting it yields the same
 * sentence, and so does `innerText`. Inline elements such as an `<em>` are
 * kept and their text split in place, with the index running on through them.
 */
export default function SplitWords({ children }: { children: ReactNode }) {
  let index = 0;

  const split = (node: ReactNode): ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
        .split(/(\s+)/)
        .map((part, k) => {
          if (part === '') return null;
          if (/^\s+$/.test(part)) return part;
          const i = index++;
          return (
            <span className="w" key={`${i}-${k}`}>
              <span style={{ ['--i' as string]: i }}>{part}</span>
            </span>
          );
        });
    }

    if (Array.isArray(node)) {
      return node.map((child, k) => <Fragment key={k}>{split(child)}</Fragment>);
    }

    if (isValidElement(node)) {
      const element = node as ReactElement<{ children?: ReactNode }>;
      return cloneElement(element, undefined, split(element.props.children));
    }

    return node;
  };

  return <>{split(children)}</>;
}
