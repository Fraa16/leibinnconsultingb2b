import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

/**
 * Persistent booking affordance, pinned bottom-left.
 *
 * The page is long; the primary CTA otherwise only exists at the top and
 * the very bottom. Appears once the hero is behind you, and never on the
 * contact page itself.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (location.pathname !== '/') return null;

  return (
    <Link
      to="/kontakt"
      className={`fixed bottom-5 left-5 z-40 hidden items-center gap-2.5 rounded-full
                  bg-navy-deep px-5 py-3.5 text-[0.9375rem] font-medium text-white
                  shadow-[0_10px_34px_rgba(11,12,57,0.3)]
                  transition-all duration-300 ease-brand hover:bg-navy sm:inline-flex
                  ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      <CalendarDays size={17} aria-hidden="true" />
      Erstgespräch vereinbaren
    </Link>
  );
}
