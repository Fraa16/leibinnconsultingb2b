import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Button from './ui/Button';

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt Produktverkauf',
  'Persönliche Begleitung von Cedrik Leibinn – vom ersten Schritt bis zur Umsetzung',
];

export default function FinalCTASection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section tone="subtle" size="md">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative overflow-hidden rounded-xl3 shadow-float"
        style={{
          background: 'linear-gradient(120deg, #15174F 0%, #202266 48%, #0B0C39 100%)',
        }}
      >
        {/* Depth: a soft ice bloom in the corner rather than a flat gradient. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(161,206,229,0.20) 0%, rgba(161,206,229,0.05) 45%, transparent 70%)',
          }}
        />

        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14 lg:p-14">
          <div>
            <motion.div variants={item}>
              <Eyebrow tone="onInk">BEREIT FÜR DEN NÄCHSTEN SCHRITT?</Eyebrow>
              <h2 className="mt-5 max-w-[20ch] text-white">
                Lassen Sie uns Ihr Benefit-System auf Mittelstands-Niveau bringen
              </h2>
              <p className="mt-5 max-w-measure text-lead text-white/75">
                In einem ersten Gespräch schauen wir gemeinsam auf Ihre aktuelle Situation und Ihre Ziele. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein Gefühl dafür, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann.
              </p>
            </motion.div>

            <ul className="mt-8 space-y-3">
              {assurances.map((line) => (
                <motion.li variants={item} key={line} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ice-300/20 text-ice-300"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <p className="text-small leading-relaxed text-white/75">{line}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            variants={item}
            className="rounded-xl2 border border-white/12 bg-white/[0.07] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-7"
          >
            <p className="text-h4 text-white">Kostenloses Erstgespräch mit Cedrik Leibinn</p>
            <p className="mt-3 text-small leading-relaxed text-white/70">
              Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag – persönlich, ohne Vertriebsschleifen.
            </p>

            {/* Was a raw <a href="/kontakt">, which forced a full document
                reload and threw away the SPA's state. */}
            <Button to="/kontakt" variant="onInk" fullWidth className="mt-6" icon={<ArrowRight size={16} />}>
              Erstgespräch sichern
            </Button>

            <p className="mt-3.5 text-center text-eyebrow normal-case tracking-normal text-white/55">
              Unverbindlich &amp; kostenlos – Ihr Erstgespräch für ein strukturiertes Benefit-System.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
