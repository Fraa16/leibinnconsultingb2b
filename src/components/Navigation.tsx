import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { cn } from '../lib/cn';
import Container from './ui/Container';

const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Ablauf', id: 'ablauf' },
  { label: 'Über uns', id: 'ueber-uns' },
];

const CTA = { label: 'Kontakt', id: 'kontakt' };

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { goTo } = useSiteNav();
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // rAF-throttled and passive — the original listener ran unthrottled on every
  // scroll event and blocked the scroll thread.
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

  // Scroll spy: marks the section currently in view.
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

  // Close the drawer on Escape and return focus to its trigger.
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

  // Never leave the drawer open across a navigation.
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleNav = (id: string) => {
    setIsMenuOpen(false);
    goTo(id);
  };

  const isHome = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-entrance',
        isScrolled || isMenuOpen
          ? 'bg-white/92 shadow-soft backdrop-blur-xl'
          : 'bg-white/70 backdrop-blur-md',
      )}
    >
      <Container width="shell">
        <nav className="flex h-20 items-center justify-between" aria-label="Hauptnavigation">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-h4 font-semibold tracking-tight text-ink-800
                       transition-colors hover:text-ink-600"
          >
            <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-ice-300" />
            Leibinn Consulting
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative rounded-lg px-3.5 py-2 text-small font-medium transition-colors',
                    active ? 'text-ink-600' : 'text-content hover:text-ink-600',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left rounded-full bg-ink-600 transition-transform duration-300 ease-entrance',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              );
            })}

            <button
              onClick={() => handleNav(CTA.id)}
              className="ml-3 rounded-xl bg-ink-600 px-5 py-2.5 text-small font-medium text-white
                         shadow-[0_4px_16px_rgba(42,45,124,0.26)] transition-all duration-200 ease-entrance
                         hover:-translate-y-0.5 hover:bg-ink-700 hover:shadow-[0_8px_24px_rgba(42,45,124,0.34)]
                         active:translate-y-0"
            >
              {CTA.label}
            </button>
          </div>

          <button
            ref={menuButtonRef}
            className="-mr-2 rounded-lg p-2 text-ink-800 transition-colors hover:text-ink-600 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Menü"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="border-t border-ink-100 bg-white/97 backdrop-blur-xl md:hidden"
      >
        <Container width="shell" className="space-y-1 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="block w-full rounded-lg px-3 py-3 text-left text-small font-medium text-content
                         transition-colors hover:bg-surface-subtle hover:text-ink-600"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav(CTA.id)}
            className="mt-2 block w-full rounded-xl bg-ink-600 px-3 py-3 text-center text-small
                       font-medium text-white transition-colors hover:bg-ink-700"
          >
            {CTA.label}
          </button>
        </Container>
      </div>
    </header>
  );
}
