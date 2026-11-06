import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import Container from './ui/Container';
import Logo from './ui/Logo';
import Reveal from './ui/Reveal';
import { LOCKUP_NAME } from './ui/logo-paths';

const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Rechner', id: 'rechner' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Kontakt', id: 'kontakt' },
];

/**
 * Footer: logo and statement, link column, and the wordmark blown up and
 * cropped along the bottom edge. The statement is set at H2 rather than the
 * display size it had, so the footer reads as a close, not a second hero.
 */
export default function Footer() {
  const { goTo } = useSiteNav();

  return (
    <footer id="footer" className="relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="ink-glow pointer-events-none absolute inset-0" />

      <Container className="relative pb-10 pt-[clamp(4.5rem,8vw,7rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <Logo onInk tagline />
            <p className="mt-8 max-w-[16ch] text-h2 text-white">
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
        The wordmark itself — the brand's serif, not the UI face — blown up and
        cropped to a sliver along the bottom edge, as the brand designs do.
        Sized by height so the same share of the letterforms shows at every
        width. Hidden from assistive tech: the name is already announced by
        the logo above.
      */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(1.75rem,4.4vw,4.5rem)] select-none overflow-hidden"
      >
        {/*
          Full page width, height left to the artwork's own ratio, and the
          band clipped to roughly two thirds of it — so the crop lands in the
          same place at every width instead of eating the outer letters.
        */}
        <svg
          viewBox="479 25 1521 106"
          preserveAspectRatio="xMidYMin meet"
          className="absolute inset-x-0 top-0 w-full"
        >
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.26" />
              <stop offset="1" stopColor="#A1CEE5" stopOpacity="0.10" />
            </linearGradient>
          </defs>
          <g fill="url(#footer-wordmark)">
            {LOCKUP_NAME.map((d) => (
              <path key={d.length + d.slice(0, 24)} d={d} />
            ))}
          </g>
        </svg>
      </div>
    </footer>
  );
}
