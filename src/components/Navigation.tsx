import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

type NavLink = { label: string; id: string; route?: string };

const navLinks: NavLink[] = [
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Ablauf', id: 'ablauf' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Kontakt', id: 'kontakt', route: '/kontakt' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();
  const scrollTo = useSmoothScroll();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close the menu on route change. */
  useEffect(() => setIsOpen(false), [location.pathname]);

  /* Escape closes; body scroll locks while the sheet is open. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  /* Highlight the section currently in view. */
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId('kontakt');
      return;
    }
    const ids = navLinks.filter((l) => !l.route).map((l) => l.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const linkClass = (id: string) =>
    `relative inline-flex min-h-[24px] items-center text-[0.9375rem] font-normal
     transition-colors duration-200 ${
      activeId === id ? 'text-white' : 'text-white/70 hover:text-white'
    }`;

  const renderLink = (link: NavLink, onNavigate?: () => void) =>
    link.route ? (
      <Link key={link.id} to={link.route} className={linkClass(link.id)} onClick={onNavigate}>
        {link.label}
      </Link>
    ) : (
      <a
        key={link.id}
        href={`/#${link.id}`}
        className={linkClass(link.id)}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(link.id);
          onNavigate?.();
        }}
      >
        {link.label}
      </a>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="mx-auto flex max-w-content justify-center px-3 pt-3 md:pt-5">
        <nav
          aria-label="Hauptnavigation"
          className="pointer-events-auto w-full max-w-4xl rounded-full border border-white/10
                     bg-navy-deep/80 px-5 py-3 backdrop-blur-xl
                     shadow-[0_8px_40px_rgba(11,12,57,0.22)] md:px-7"
        >
          <div className="flex items-center justify-between gap-6">
            <Link
              to="/"
              className="text-[1.0625rem] font-medium tracking-[-0.02em] text-white"
              onClick={() => location.pathname === '/' && scrollTo('hero')}
            >
              Leibinn&nbsp;Consulting
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((l) => renderLink(l))}
            </div>

            <button
              type="button"
              className="-mr-1 p-1 text-white md:hidden"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile sheet, inside the pill so it shares the rounded frame. */}
          <div
            id="mobile-nav"
            ref={panelRef}
            hidden={!isOpen}
            className="md:hidden"
          >
            <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3">
              {navLinks.map((l) => (
                <div key={l.id} className="flex min-h-[44px] items-center">
                  {renderLink(l, () => setIsOpen(false))}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
