import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Height of the floating nav, so anchors never land underneath it. */
const NAV_OFFSET = 104;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  return true;
}

/**
 * Single source of truth for in-page navigation.
 *
 * Replaces the copy of `scrollToSection` that previously lived in five
 * separate components. Also handles the cross-page case: jumping to a
 * section from /kontakt routes home first, then scrolls once the target
 * has actually mounted (rather than guessing with a fixed timeout).
 */
export function useSmoothScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname === '/') {
        scrollToId(id);
        return;
      }

      navigate('/');

      // Poll briefly for the element instead of a blind setTimeout —
      // the old 100ms guess raced the route transition and silently
      // did nothing when the render was slow.
      let tries = 0;
      const tick = () => {
        if (scrollToId(id) || tries++ > 40) return;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    [navigate, location.pathname],
  );
}
