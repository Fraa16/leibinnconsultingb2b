import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Single source of truth for in-page and cross-page navigation.
 *
 * Replaces six copy-pasted `scrollToSection` blocks that each recomputed the
 * header offset by hand using the deprecated `window.pageYOffset`. The offset
 * now comes from `scroll-padding-top` in index.css, so `scrollIntoView` lands
 * in the right place on its own and honours `prefers-reduced-motion` via CSS.
 *
 * It also fixes the dead CTAs: `kontakt` is a route, not a section on the
 * homepage, so anything targeting it is routed instead of scrolled.
 */

/** Nav targets that are routes rather than homepage sections. */
const ROUTES: Record<string, string> = {
  kontakt: '/kontakt',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
};

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

export function useSiteNav() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Go to a nav target by id. Routes navigate; sections scroll — and when the
   * section lives on a page we are not currently on, we navigate home and hand
   * the target to HomePage via router state instead of guessing with a timeout.
   */
  const goTo = useCallback(
    (id: string) => {
      const route = ROUTES[id];
      if (route) {
        navigate(route);
        return;
      }
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: id } });
        return;
      }
      scrollToSection(id);
    },
    [navigate, location.pathname],
  );

  return { goTo, scrollToSection };
}
