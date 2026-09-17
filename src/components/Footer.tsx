import { Link } from 'react-router-dom';
import { useSiteNav } from '../hooks/useSiteNav';
import Container from './ui/Container';
import Logo from './ui/Logo';

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
    <footer id="footer" className="border-t border-line-onInk bg-ink-950 text-white">
      <Container width="shell" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <div>
            <Logo onInk />

            <p className="mt-5 max-w-sm text-small leading-relaxed text-white/50">
              Benefit-Systeme für kleine und mittelständische Unternehmen.
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h4 className="text-label uppercase text-white/40">Navigation</h4>
            <ul className="mt-6 space-y-px">
              {NAV_LINKS.map((link) => (
                <li key={link.id} className="border-b border-line-onInk last:border-b-0">
                  <button
                    onClick={() => goTo(link.id)}
                    className="w-full py-2.5 text-left text-small text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line-onInk pt-7 sm:flex-row sm:items-center">
          <p className="text-small text-white/35">
            © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>
          {/* Both were inert <button> elements, although both pages are
              legally required for a German commercial site. */}
          <div className="flex gap-7">
            <Link to="/impressum" className="text-small text-white/35 transition-colors hover:text-white">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-small text-white/35 transition-colors hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
