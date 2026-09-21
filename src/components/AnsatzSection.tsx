import Section from './ui/Section';
import Pill from './ui/Pill';
import Reveal from './ui/Reveal';
import Picture from './ui/Picture';
import { gespraechImage, fallbackSrc } from '../lib/media';

/* Each bullet is written as "Label: sentence" — split on the first colon
   so the label can carry the visual weight. The copy itself is unchanged. */
const principles = [
  'Struktur statt Einzelmaßnahmen: Ein durchdachtes Benefit-System schafft Orientierung für Mitarbeitende und Führungskräfte.',
  'Wirkung statt Aufwand: Sie investieren nicht mehr in lose Ideen, sondern in ein System, das messbare Ergebnisse liefert.',
  'Rechtssicherheit & Klarheit: Steuerliche Potenziale nutzen – ohne Unsicherheiten oder zusätzlichen Verwaltungsaufwand.',
  'Starke Arbeitgebermarke: Ein einheitliches, verständliches System zeigt Bewerbenden sofort, dass sich Engagement bei Ihnen lohnt.',
].map((line) => {
  const idx = line.indexOf(':');
  return { label: line.slice(0, idx), body: line.slice(idx + 1).trim() };
});

export default function AnsatzSection() {
  return (
    <Section id="ansatz" tone="surface" className="mt-3 md:mt-5">
      <div className="lc-inner">
        {/* Statement left, argument right — the reference's asymmetric split. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Pill>Ein starkes Fundament für moderne Arbeitgeber</Pill>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-h2 mt-7">
                Warum ein strukturiertes Benefit-System{' '}
                <span className="t-muted">heute unverzichtbar ist</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-3">
            <div className="space-y-6">
              <p className="t-lead text-ink-muted">
                Viele Unternehmen investieren in einzelne Benefits, ohne ein klares System dahinter.
                Maßnahmen entstehen spontan, bleiben in der Kommunikation blass und entfalten kaum Wirkung
                im Alltag. Mitarbeitende erleben Benefits dann eher als lose Extras – nicht als verlässlichen
                Bestandteil ihrer Arbeitswelt.
              </p>
              <p className="t-lead text-ink-muted">
                Ein strukturiertes Benefit-System bündelt diese Bausteine zu einem klaren Fundament:
                steuerlich sinnvoll, nachvollziehbar für Führungskräfte und transparent für Mitarbeitende.
                So wird auf einen Blick erkennbar, wofür Sie als Arbeitgeber stehen – und warum sich
                Leistungsträger langfristig für Ihr Unternehmen entscheiden sollten.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The client's photograph, now a full-width editorial plate. */}
        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="overflow-hidden rounded-card">
            <Picture
              image={gespraechImage}
              fallback={fallbackSrc.gespraech}
              alt="Beratungsgespräch zu einem strukturierten Benefit-System"
              sizes="(max-width: 767px) 92vw, (max-width: 1279px) 88vw, 1160px"
              className="block"
              imgClassName="h-[clamp(15rem,38vw,28rem)] w-full object-cover"
              style={{ objectPosition: 'center 38%' }}
            />
          </div>
        </Reveal>

        {/* Principles — borderless grid, hairline separated. */}
        <div className="mt-16 grid gap-x-16 gap-y-0 md:mt-20 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <div className="lc-rule py-7">
                <h3 className="t-h3">{p.label}</h3>
                <p className="t-body mt-2.5 text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
