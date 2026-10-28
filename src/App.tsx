import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// The landing page loads eagerly; the secondary routes are split out so the
// first paint only carries what it needs.
const KontaktPage = lazy(() => import('./pages/KontaktPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));

/**
 * Resets scroll on navigation. Without it, moving from the footer of the
 * homepage to /kontakt lands the visitor halfway down the contact page.
 * A section target handed over in router state is honoured instead.
 */
function ScrollManager() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const target = (state as { scrollTo?: string } | null)?.scrollTo;

    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    /*
     * Re-align a few times rather than once. The homepage is long and its
     * images load lazily, so content above the target can still grow after
     * the first scroll and leave the section off-position. Each pass is a
     * no-op once the layout has settled.
     *
     * The jump is instant, overriding the page's smooth `scroll-behavior`:
     * after a route change the visitor expects to arrive, and gliding
     * thousands of pixels takes well over a second.
     */
    const timers: number[] = [];
    const align = () =>
      document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });

    const frame = requestAnimationFrame(() => {
      align();
      timers.push(window.setTimeout(align, 250), window.setTimeout(align, 700));
    });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [pathname, state]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                   focus:rounded-lg focus:bg-ink-800 focus:px-4 focus:py-2.5 focus:text-small focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <Suspense fallback={<div className="min-h-screen bg-surface-subtle" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
