import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from './ui/Section';
import Pill from './ui/Pill';
import Reveal from './ui/Reveal';

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt Produktverkauf',
  'Persönliche Begleitung von Cedrik Leibinn – vom ersten Schritt bis zur Umsetzung',
];

export default function FinalCTASection() {
  return (
    <Section tone="dark" className="mt-3 bg-navy-black md:mt-5">
      {/* Soft light fall across the block, echoing the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 18% 0%, rgba(42,45,124,0.55) 0%, rgba(42,45,124,0) 62%)',
        }}
      />

      <div className="lc-inner relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Pill>Bereit für den nächsten Schritt?</Pill>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="t-h2 mt-7 text-white">
                Lassen Sie uns Ihr Benefit-System{' '}
                <span className="t-muted">auf Mittelstands-Niveau bringen</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="t-lead mt-7 max-w-xl text-white/60">
                In einem ersten Gespräch schauen wir gemeinsam auf Ihre aktuelle Situation und Ihre
                Ziele. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein Gefühl
                dafür, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-9 space-y-3.5">
                {assurances.map((line) => (
                  <li key={line} className="flex items-start gap-3.5">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-ice"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="t-body text-white/70">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="rounded-card border border-white/12 bg-white/[0.045] p-8 backdrop-blur-sm lg:p-9">
              <h3 className="t-h3 text-white">Kostenloses Erstgespräch mit Cedrik Leibinn</h3>

              <p className="t-body mt-4 text-white/60">
                Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag – persönlich,
                ohne Vertriebsschleifen.
              </p>

              <Link to="/kontakt" className="lc-btn lc-btn-primary mt-8 w-full">
                Erstgespräch sichern
                <ArrowRight size={16} className="lc-arrow" aria-hidden="true" />
              </Link>

              <p className="t-small mt-4 text-white/55">
                Unverbindlich &amp; kostenlos – Ihr Erstgespräch für ein strukturiertes Benefit-System.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
