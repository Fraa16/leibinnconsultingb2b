import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import Container from './ui/Container';
import Logo from './ui/Logo';
import Reveal from './ui/Reveal';

const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Kontakt', id: 'kontakt' },
];

/**
 * Footer, on the handoff's pattern: a giant statement set in the display
 * size, link columns, and the wordmark blown up and cropped along the bottom
 * edge. The existing tagline carries the statement, so no copy is invented.
 */
export default function Footer() {
  const { goTo } = useSiteNav();

  return (
    <footer id="footer" className="relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative pb-10 pt-[clamp(4.5rem,8vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <Logo onInk />
            <p className="mt-8 max-w-[14ch] text-giant text-white">
              Benefit-Systeme für kleine und mittelständische Unternehmen.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:pt-4">
            <nav aria-label="Footer-Navigation">
              <h2 className="text-meta uppercase text-white/40">Navigation</h2>
              <ul className="mt-6 border-t border-line-onInk">
                {NAV_LINKS.map((link) => (
                  <li key={link.id} className="border-b border-line-onInk">
                    <button
                      onClick={() => goTo(link.id)}
                      className="group flex w-full items-center justify-between py-3.5 text-left
                                 text-body text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="text-white/25 transition-all duration-200 group-hover:translate-x-0.5
                                   group-hover:-translate-y-0.5 group-hover:text-ice-300"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line-onInk pt-7 sm:flex-row sm:items-center">
          <p className="text-small text-white/35">
            © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-8">
            <Link to="/impressum" className="text-small text-white/35 transition-colors hover:text-white">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-small text-white/35 transition-colors hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>

      {/*
        Wordmark blown up and cropped to a sliver along the bottom edge, as in
        the brand designs. Hidden from assistive tech since the name is
        already announced by the logo above.
      */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(3.5rem,8vw,7rem)] select-none overflow-hidden"
      >
        <span
          className="accent-text absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap
                     font-medium leading-none tracking-[-0.055em] opacity-[0.22]"
          style={{ fontSize: 'clamp(5rem,13vw,13rem)' }}
        >
          Leibinn Consulting
        </span>
      </div>
    </footer>
  );
}
