import { meetingImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Image from './ui/Image';
import Reveal from './ui/Reveal';

/** Each bullet reads "Lead-in: body" — the lead-in carries the weight. */
const bulletPoints = [
  'Struktur statt Einzelmaßnahmen: Ein durchdachtes Benefit-System schafft Orientierung für Mitarbeitende und Führungskräfte.',
  'Wirkung statt Aufwand: Sie investieren nicht mehr in lose Ideen, sondern in ein System, das messbare Ergebnisse liefert.',
  'Rechtssicherheit & Klarheit: Steuerliche Potenziale nutzen – ohne Unsicherheiten oder zusätzlichen Verwaltungsaufwand.',
  'Starke Arbeitgebermarke: Ein einheitliches, verständliches System zeigt Bewerbenden sofort, dass sich Engagement bei Ihnen lohnt.',
];

function splitLeadIn(text: string): [string, string] {
  const at = text.indexOf(':');
  return at === -1 ? ['', text] : [text.slice(0, at + 1), text.slice(at + 1).trimStart()];
}

/** The page's first dark anchor: the core argument, full-bleed on navy. */
export default function AnsatzSection() {
  return (
    <Section id="ansatz" tone="ink" size="lg">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <SectionHead
        eyebrow="Ein starkes Fundament für moderne Arbeitgeber"
        title="Warum ein strukturiertes Benefit-System heute unverzichtbar ist"
        tone="onInk"
        titleWidth="max-w-[16ch]"
        className="relative"
      />

      <div className="relative mt-[clamp(3rem,5vw,4.5rem)] grid items-start gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal className="space-y-6">
          <p className="max-w-measure text-lead text-white/65">
            Viele Unternehmen investieren in einzelne Benefits, ohne ein klares System dahinter.
            Maßnahmen entstehen spontan, bleiben in der Kommunikation blass und entfalten kaum Wirkung
            im Alltag. Mitarbeitende erleben Benefits dann eher als lose Extras – nicht als verlässlichen
            Bestandteil ihrer Arbeitswelt.
          </p>
          <p className="max-w-measure text-lead text-white/65">
            Ein strukturiertes Benefit-System bündelt diese Bausteine zu einem klaren Fundament:
            steuerlich sinnvoll, nachvollziehbar für Führungskräfte und transparent für Mitarbeitende.
            So wird auf einen Blick erkennbar, wofür Sie als Arbeitgeber stehen – und warum sich
            Leistungsträger langfristig für Ihr Unternehmen entscheiden sollten.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)] border border-line-onInkStrong">
            <Image
              image={meetingImage}
              alt="Kundengespräch - Modernes Benefit-System"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* The four principles as a ruled ledger across the full width. */}
      <div className="relative mt-[clamp(3rem,5vw,4.5rem)] grid border-t border-line-onInk sm:grid-cols-2 lg:grid-cols-4">
        {bulletPoints.map((point, i) => {
          const [leadIn, rest] = splitLeadIn(point);
          return (
            <Reveal
              key={point}
              delay={i * 70}
              className="border-b border-line-onInk py-7 sm:border-b-0 sm:px-6 sm:py-8
                         lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 sm:first:pl-0"
            >
              {/* Inline, so the sentence is not split in the rendered text. */}
              <p className="text-small leading-relaxed text-white/55">
                <strong className="font-medium text-white">{leadIn}</strong> {rest}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
