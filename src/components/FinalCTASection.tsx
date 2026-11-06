import { Check, ArrowUpRight } from 'lucide-react';
import { skylineImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Image from './ui/Image';
import Ornament from './ui/Ornament';

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt Produktverkauf',
  'Persönliche Begleitung von Cedrik Leibinn – vom ersten Schritt bis zur Umsetzung',
];

/** Full-bleed dark close, running straight into the footer. */
export default function FinalCTASection() {
  return (
    <Section id="termin" tone="ink" size="lg">
      {/*
        The closing band carries a photograph instead of flat navy. It sits
        under a heavy scrim — it is a backdrop, not a subject, and the type
        over it has to stay at full contrast.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          image={skylineImage}
          alt=""
          sizes="100vw"
          wrapperClassName="absolute inset-0 block"
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 62%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(11,12,57,0.97) 0%, rgba(11,12,57,0.94) 46%, rgba(21,23,79,0.87) 100%)',
          }}
        />
      </div>

      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
      <Ornament className="-left-20 top-[-6rem] w-[36rem] text-ice-300" rotate={8} opacity={0.09} />

      <div className="relative grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHead
            eyebrow="BEREIT FÜR DEN NÄCHSTEN SCHRITT?"
            title="Lassen Sie uns Ihr Benefit-System auf Mittelstands-Niveau bringen"
            lead="In einem ersten Gespräch schauen wir gemeinsam auf Ihre aktuelle Situation und Ihre Ziele. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein Gefühl dafür, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann."
            tone="onInk"
            titleWidth="max-w-[16ch]"
            className="lg:!grid-cols-1"
          />

          <ul className="mt-10 border-t border-line-onInk">
            {assurances.map((line, i) => (
              <Reveal
                as="li"
                key={line}
                delay={i * 80}
                className="flex items-start gap-4 border-b border-line-onInk py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ice-300/15 text-ice-300"
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <p className="text-small leading-relaxed text-white/60">{line}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal
          delay={160}
          className="rounded-[clamp(1.25rem,2.4vw,1.75rem)] border border-line-onInkStrong bg-white/[0.05] p-7 sm:p-9"
        >
          <p className="text-h3 text-white">Kostenloses Erstgespräch mit Cedrik Leibinn</p>
          <p className="mt-4 text-small leading-relaxed text-white/60">
            Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag – persönlich, ohne Vertriebsschleifen.
          </p>

          {/* Was a raw <a href>, which forced a full document reload. */}
          <Button to="/kontakt" variant="onInk" size="xl" fullWidth className="mt-8" icon={<ArrowUpRight size={18} />}>
            Erstgespräch sichern
          </Button>

          <p className="mt-5 border-t border-line-onInk pt-5 text-small text-white/45">
            Unverbindlich &amp; kostenlos – Ihr Erstgespräch für ein strukturiertes Benefit-System.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
