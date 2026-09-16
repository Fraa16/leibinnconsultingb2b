import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { meetingImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
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

export default function AnsatzSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ansatz" tone="base" size="md">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-xl3 bg-surface-subtle shadow-card"
      >
        {/*
          Desktop: the photo occupies the right edge and is faded in with a
          mask. The original clipped it with polygon() and then painted a
          hardcoded #F7F7F7 gradient on top, which only worked against that
          exact background colour.
        */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image
            image={meetingImage}
            alt=""
            sizes="50vw"
            className="h-full w-full object-cover"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            }}
          />
        </div>

        <div className="relative p-7 sm:p-10 lg:w-[54%] lg:p-14 xl:p-16">
          <motion.div variants={item}>
            <Eyebrow>Ein starkes Fundament für moderne Arbeitgeber</Eyebrow>
            <h2 className="mt-5 max-w-[20ch]">
              Warum ein strukturiertes Benefit-System heute unverzichtbar ist
            </h2>
          </motion.div>

          <motion.div variants={item} className="mt-7 space-y-5">
            <p className="max-w-[52ch] text-lead text-content">
              Viele Unternehmen investieren in einzelne Benefits, ohne ein klares System dahinter.
              Maßnahmen entstehen spontan, bleiben in der Kommunikation blass und entfalten kaum Wirkung
              im Alltag. Mitarbeitende erleben Benefits dann eher als lose Extras – nicht als verlässlichen
              Bestandteil ihrer Arbeitswelt.
            </p>
            <p className="max-w-[52ch] text-lead text-content">
              Ein strukturiertes Benefit-System bündelt diese Bausteine zu einem klaren Fundament:
              steuerlich sinnvoll, nachvollziehbar für Führungskräfte und transparent für Mitarbeitende.
              So wird auf einen Blick erkennbar, wofür Sie als Arbeitgeber stehen – und warum sich
              Leistungsträger langfristig für Ihr Unternehmen entscheiden sollten.
            </p>
          </motion.div>

          <ul className="mt-9 space-y-4">
            {bulletPoints.map((point) => {
              const [leadIn, rest] = splitLeadIn(point);
              return (
                <motion.li variants={item} key={point} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-600/10 text-ink-600"
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <p className="max-w-[52ch] text-small leading-relaxed text-content">
                    <strong className="font-semibold text-content-strong">{leadIn}</strong> {rest}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: the photo sits below the copy as a full-width band. */}
        <div className="relative mt-2 h-64 lg:hidden">
          <Image
            image={meetingImage}
            alt="Kundengespräch - Modernes Benefit-System"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-900/25 to-transparent"
          />
        </div>
      </motion.div>
    </Section>
  );
}
