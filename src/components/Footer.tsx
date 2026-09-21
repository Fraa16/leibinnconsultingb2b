import { Link } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const sectionLinks = [
  { label: 'Ansatz', id: 'ansatz' },
  { label: 'Branchen', id: 'branchen' },
  { label: 'Ablauf', id: 'ablauf' },
  { label: 'Über uns', id: 'ueber-uns' },
];

const legalLinks = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
];

export default function Footer() {
  const scrollTo = useSmoothScroll();

  return (
    <footer id="footer" className="relative overflow-hidden bg-canvas">
      <div className="lc-inner pb-0 pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="t-h3">Leibinn Consulting</p>
            <p className="t-body mt-3 max-w-xs text-ink-muted">
              Benefit-Systeme für kleine und mittelständische Unternehmen.
            </p>
            <Link to="/kontakt" className="lc-btn lc-btn-ghost mt-7">
              Erstgespräch anfragen
            </Link>
          </div>

          <nav aria-label="Seitenbereiche">
            <h2 className="t-small font-medium text-ink">Navigation</h2>
            <ul className="mt-4 space-y-2.5">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.id);
                    }}
                    className="t-body inline-flex min-h-[24px] items-center text-ink-muted transition-colors hover:text-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/kontakt" className="t-body inline-flex min-h-[24px] items-center text-ink-muted transition-colors hover:text-navy">
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <h2 className="t-small font-medium text-ink">Rechtliches</h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="t-body inline-flex min-h-[24px] items-center text-ink-muted transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lc-rule mt-16 flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-ink-muted">
            © {new Date().getFullYear()} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>
          <p className="t-small text-ink-subtle">
            Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
          </p>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge. */}
      <div aria-hidden="true" className="select-none overflow-hidden">
        <p
          className="whitespace-nowrap px-3 font-medium leading-[0.78] tracking-[-0.055em] text-navy-deep/[0.07]"
          style={{ fontSize: 'clamp(4rem, 15.5vw, 15rem)' }}
        >
          Leibinn Consulting
        </p>
      </div>
    </footer>
  );
}
