import { motion, useReducedMotion } from 'framer-motion';
import { meetingImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Image from './ui/Image';

/** Each bullet reads "Lead-in: body" — split so the lead-in can carry weight. */
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

/**
 * The dark anchor of the page.
 *
 * Every section used to sit on a light surface, so the page read as one
 * undifferentiated column. Putting the core argument on navy gives the scroll
 * a centre of gravity and makes the sections either side feel intentional.
 */
export default function AnsatzSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ansatz" tone="ink" size="lg">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[38rem] w-[38rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(161,206,229,0.13) 0%, rgba(161,206,229,0.03) 45%, transparent 70%)',
        }}
      />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT} className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.78fr] lg:gap-16">
          <div>
            <motion.div variants={item}>
              <SectionHead
                eyebrow="Ein starkes Fundament für moderne Arbeitgeber"
                title="Warum ein strukturiertes Benefit-System heute unverzichtbar ist"
                tone="onInk"
                titleWidth="max-w-[18ch]"
              />
            </motion.div>

            <motion.div variants={item} className="mt-8 space-y-5">
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
            </motion.div>
          </div>

          <motion.div variants={item}>
            <div className="overflow-hidden rounded-xl4 border border-line-onInkStrong">
              <Image
                image={meetingImage}
                alt="Kundengespräch - Modernes Benefit-System"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
              />
            </div>
          </motion.div>
        </div>

        {/* Bullets as a four-column ledger under a full-width hairline. */}
        <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-line-onInk sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {bulletPoints.map((point) => {
            const [leadIn, rest] = splitLeadIn(point);
            return (
              <motion.div variants={item} key={point} className="pt-8">
                {/*
                  Inline, not a block — a block-level span would introduce a
                  line break and split the sentence in the rendered text.
                */}
                <p className="text-small leading-relaxed text-white/60">
                  <strong className="font-semibold text-white">{leadIn}</strong> {rest}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
