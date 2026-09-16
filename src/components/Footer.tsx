import { Link } from 'react-router-dom';
import { useSiteNav } from '../hooks/useSiteNav';
import Container from './ui/Container';

const NAV_LINKS = [
  { label: 'Startseite', id: 'hero' },
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Über uns', id: 'ueber-uns' },
  { label: 'Kontakt', id: 'kontakt' },
];

export default function Footer() {
  const { goTo } = useSiteNav();

  return (
    <footer id="footer" className="bg-ink-950 text-white">
      <Container width="shell" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <h3 className="flex items-center gap-2.5 text-h4 font-semibold tracking-tight text-white">
              <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-ice-300" />
              Leibinn Consulting
            </h3>
            <p className="mt-4 max-w-sm text-small leading-relaxed text-white/55">
              Benefit-Systeme für kleine und mittelständische Unternehmen.
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h4 className="text-eyebrow uppercase text-ice-300">Navigation</h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    className="text-small text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-small text-white/45">
            © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>
          {/*
            These were <button> elements with no onClick — inert, although both
            pages are legally required for a German commercial site.
          */}
          <div className="flex gap-7">
            <Link to="/impressum" className="text-small text-white/45 transition-colors hover:text-white">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-small text-white/45 transition-colors hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
