import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Pill from '../components/ui/Pill';
import CTAButton from '../components/ui/CTAButton';

/**
 * Previously any unknown path rendered a blank page, because the router
 * only declared "/" and "/kontakt".
 */
export default function NotFoundPage() {
  return (
    <>
      <Navigation />

      <main className="pt-[calc(6.5rem+var(--lc-gutter))]">
        <div className="lc-inner flex min-h-[52vh] flex-col justify-center pb-24 md:pb-32">
          <div className="max-w-xl">
            <Pill>Fehler 404</Pill>
            <h1 className="t-h2 mt-7">
              Diese Seite <span className="t-muted">gibt es nicht</span>
            </h1>
            <p className="t-lead mt-6 text-ink-muted">
              Der aufgerufene Link existiert nicht oder wurde verschoben. Von der Startseite aus
              finden Sie alle Inhalte zu unserem Benefit-System.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/">Zur Startseite</CTAButton>
              <CTAButton to="/kontakt" variant="ghost" withArrow={false}>
                Erstgespräch anfragen
              </CTAButton>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
