import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Button from './ui/Button';

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt Produktverkauf',
  'Persönliche Begleitung von Cedrik Leibinn – vom ersten Schritt bis zur Umsetzung',
];

/**
 * Full-bleed dark close. Previously a navy card floating on a light section,
 * which made the page end on a weak, unresolved note; running it edge to edge
 * into the footer gives the scroll a proper landing.
 */
export default function FinalCTASection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section tone="ink" size="xl">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(161,206,229,0.12) 0%, rgba(161,206,229,0.03) 45%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20"
      >
        <div>
          <motion.div variants={item}>
            <SectionHead
              eyebrow="BEREIT FÜR DEN NÄCHSTEN SCHRITT?"
              title="Lassen Sie uns Ihr Benefit-System auf Mittelstands-Niveau bringen"
              body="In einem ersten Gespräch schauen wir gemeinsam auf Ihre aktuelle Situation und Ihre Ziele. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein Gefühl dafür, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann."
              tone="onInk"
              titleWidth="max-w-[19ch]"
            />
          </motion.div>

          <ul className="mt-10 space-y-px border-t border-line-onInk">
            {assurances.map((line) => (
              <motion.li
                variants={item}
                key={line}
                className="flex items-start gap-3.5 border-b border-line-onInk py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ice-300/15 text-ice-300"
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <p className="text-small leading-relaxed text-white/65">{line}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={item}
          className="rounded-xl4 border border-line-onInkStrong bg-white/[0.05] p-7 backdrop-blur-sm sm:p-9"
        >
          <p className="text-h3 text-white">Kostenloses Erstgespräch mit Cedrik Leibinn</p>
          <p className="mt-4 text-small leading-relaxed text-white/60">
            Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag – persönlich, ohne Vertriebsschleifen.
          </p>

          {/* Was a raw <a href>, which forced a full document reload. */}
          <Button to="/kontakt" variant="onInk" size="lg" fullWidth className="mt-8" icon={<ArrowRight size={16} />}>
            Erstgespräch sichern
          </Button>

          <p className="mt-4 border-t border-line-onInk pt-4 text-center text-small text-white/45">
            Unverbindlich &amp; kostenlos – Ihr Erstgespräch für ein strukturiertes Benefit-System.
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
