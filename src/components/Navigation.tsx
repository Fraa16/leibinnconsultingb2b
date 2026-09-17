import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { cn } from '../lib/cn';
import Logo from './ui/Logo';

const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Ablauf', id: 'ablauf' },
  { label: 'Über uns', id: 'ueber-uns' },
];

const CTA = { label: 'Kontakt', id: 'kontakt' };

/**
 * Floating navigation bar.
 *
 * Previously a full-bleed white strip pinned to the top edge, which is the
 * default and reads as such. Insetting it as a bordered, rounded bar gives the
 * page a frame and matches the pill language used by the eyebrows and buttons.
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { goTo } = useSiteNav();
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 16);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleNav = (id: string) => {
    setIsMenuOpen(false);
    goTo(id);
  };

  const isHome = location.pathname === '/';

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <header
        className={cn(
          'mx-auto max-w-shell rounded-[1.75rem] border transition-all duration-300 ease-entrance',
          isScrolled || isMenuOpen
            ? 'border-line bg-panel/85 shadow-nav backdrop-blur-xl'
            : 'border-transparent bg-panel/55 backdrop-blur-md',
        )}
      >
        <nav className="flex h-16 items-center justify-between pl-5 pr-3 sm:pl-6" aria-label="Hauptnavigation">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-small font-medium transition-colors duration-200',
                    active
                      ? 'bg-ink-50 text-ink-700'
                      : 'text-content hover:bg-ink-50/70 hover:text-content-strong',
                  )}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav(CTA.id)}
              className="group hidden items-center gap-1.5 rounded-full bg-ink-600 px-5 py-2.5 text-small
                         font-medium text-white shadow-ink transition-colors duration-200 hover:bg-ink-700 sm:inline-flex"
            >
              {CTA.label}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              ref={menuButtonRef}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel
                         text-content-strong transition-colors hover:bg-raised lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Menü"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <div id="mobile-menu" hidden={!isMenuOpen} className="lg:hidden">
          <div className="mx-3 mb-3 space-y-1 border-t border-line pt-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-small font-medium
                           text-content transition-colors hover:bg-raised hover:text-content-strong"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav(CTA.id)}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink-600
                         px-3 py-3 text-small font-medium text-white transition-colors hover:bg-ink-700"
            >
              {CTA.label}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
