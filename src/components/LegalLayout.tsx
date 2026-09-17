import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import Container from './ui/Container';

type LegalLayoutProps = {
  title: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Shared shell for /impressum and /datenschutz.
 *
 * Both pages were dead <button> elements in the footer. They are legally
 * required for a German commercial site, so the routes exist now — but the
 * content is scaffolding with explicit placeholders, not legal advice.
 */
export default function LegalLayout({ title, intro, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation />
      <main id="inhalt">
        <section className="pb-24 pt-32 md:pb-32 md:pt-40">
          <Container width="narrow">
            <h1 className="max-w-[18ch]">{title}</h1>
            {intro && <p className="mt-5 max-w-measure text-lead text-content">{intro}</p>}

            <div
              role="note"
              className="mt-8 flex items-start gap-3 rounded-xl2 border border-danger/25 bg-danger-surface px-5 py-4"
            >
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
              <p className="text-small leading-relaxed text-danger">
                Diese Seite ist ein unausgefülltes Gerüst. Alle mit [PLATZHALTER] markierten Angaben
                müssen ergänzt und die Texte vor der Veröffentlichung anwaltlich geprüft werden.
              </p>
            </div>

            <div className="mt-14 divide-y divide-line border-t border-line">{children}</div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="py-8">
      <h2 className="text-h3">{heading}</h2>
      <div className="mt-4 space-y-3 text-small leading-relaxed text-content [&_a]:text-ink-600 [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-ink-50 px-1.5 py-0.5 font-medium text-ink-700">[{children}]</span>
  );
}
