import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { cn } from '../lib/cn';
import Logo from './ui/Logo';

/*
 * The five original entries, plus the two new sections that earn a direct
 * link. Section ids are scroll targets on the homepage; `kontakt` is a route.
 */
const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Rechner', id: 'rechner' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Ablauf', id: 'ablauf' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'FAQ', id: 'faq' },
];

const CTA = { label: 'Kontakt', id: 'kontakt' };

/**
 * Floating pill navigation.
 *
 * Follows the brand handoff: a sticky pill inset 16px from the top, 72px
 * high, radius 999, translucent with a 16px blur and a 1px hairline. Below
 * the breakpoint it collapses to a compact pill and a full-screen navy
 * overlay with numbered entries.
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

  // Lock the page while the overlay is open, and close it on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleNav = (id: string) => {
    setIsMenuOpen(false);
    goTo(id);
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <header
          className={cn(
            'mx-auto flex max-w-shell items-center justify-between rounded-full border',
            'h-16 pl-5 pr-2 transition-all duration-300 ease-brand lg:h-[4.5rem] lg:pl-7 lg:pr-2.5',
            isScrolled
              ? 'border-ink-950/[0.08] bg-panel/[0.86] shadow-nav backdrop-blur-xl'
              : 'border-ink-950/[0.05] bg-panel/60 backdrop-blur-md',
          )}
        >
          <Link to="/" className="shrink-0" aria-label="Leibinn Consulting — zur Startseite">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
            {NAV_LINKS.map((link) => {
              const active = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-small font-medium transition-colors duration-200',
                    active ? 'text-content-strong' : 'text-content/80 hover:text-content-strong',
                  )}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav(CTA.id)}
              className="group hidden h-[3.25rem] items-center gap-2 rounded-full bg-ink-950 pl-6 pr-5
                         text-small font-medium text-white shadow-cta transition-colors duration-200
                         hover:bg-ink-800 sm:inline-flex"
            >
              {CTA.label}
              <ArrowUpRight
                size={17}
                className="text-ice-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <button
              ref={menuButtonRef}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-950/10
                         text-content-strong transition-colors hover:bg-ink-950/[0.04] lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Menü"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      {/* Full-screen overlay, numbered like the handoff's mobile menu. */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fixed inset-0 z-40 flex flex-col bg-ink-950 px-5 pb-8 pt-24 lg:hidden"
      >
        <nav className="flex-1 overflow-y-auto" aria-label="Hauptnavigation">
          <ul className="divide-y divide-line-onInk border-y border-line-onInk">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="flex w-full items-baseline gap-5 py-5 text-left transition-colors hover:text-white"
                >
                  <span aria-hidden="true" className="tnum text-meta uppercase text-ice-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-h3 text-white">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => handleNav(CTA.id)}
          className="mt-8 flex h-[3.875rem] w-full items-center justify-center gap-2.5 rounded-full
                     bg-canvas text-body font-medium text-ink-950 transition-colors hover:bg-white"
        >
          {CTA.label}
          <ArrowUpRight size={18} className="text-ink-600" />
        </button>
      </div>
    </>
  );
}
