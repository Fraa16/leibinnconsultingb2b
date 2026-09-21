import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Pill from '../components/ui/Pill';

export type LegalBlock = { heading: string; lines: string[] };

/**
 * Shared shell for Impressum and Datenschutz.
 *
 * These routes exist because §5 DDG (formerly §5 TMG) requires a
 * reachable Impressum and Art. 13 GDPR requires a privacy notice on a
 * German commercial site. Previously both were <button> elements with no
 * handler, i.e. legally missing.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  blocks,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <Navigation />

      <main className="pt-[calc(6.5rem+var(--lc-gutter))]">
        <div className="lc-inner pb-24 md:pb-32">
          <div className="max-w-3xl">
            <Pill>{eyebrow}</Pill>
            <h1 className="t-h2 mt-7">{title}</h1>
            {intro && <p className="t-lead mt-6 text-ink-muted">{intro}</p>}

            <div className="mt-14">
              {blocks.map((block) => (
                <section key={block.heading} className="lc-rule py-8">
                  <h2 className="t-h3">{block.heading}</h2>
                  <div className="mt-3 space-y-2">
                    {block.lines.map((line, i) => (
                      <p key={i} className="t-body text-ink-muted">
                        {line}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <Link to="/" className="lc-btn lc-btn-ghost mt-12">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
