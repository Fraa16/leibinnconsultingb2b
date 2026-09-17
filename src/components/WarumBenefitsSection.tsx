import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Link2, HeartPulse, Users } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT, transition } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import { cn } from '../lib/cn';

type SegmentId = 'attraktivitaet' | 'bindung' | 'gesundheit' | 'kultur';

const segments = [
  {
    id: 'attraktivitaet' as SegmentId,
    label: 'Arbeitgeberattraktivität',
    description:
      'Ihre Benefits machen auf einen Blick sichtbar, warum sich qualifizierte Bewerbende für Ihr Unternehmen entscheiden sollten.',
    color: '#2A2D7C',
    icon: Star,
  },
  {
    id: 'bindung' as SegmentId,
    label: 'Mitarbeiterbindung',
    description:
      'Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.',
    color: '#15174F',
    icon: Link2,
  },
  {
    id: 'gesundheit' as SegmentId,
    label: 'Gesundheit & Wohlbefinden',
    description:
      'Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.',
    color: '#202266',
    icon: HeartPulse,
  },
  {
    id: 'kultur' as SegmentId,
    label: 'Teamkultur & Identifikation',
    description:
      'Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.',
    color: '#0B0C39',
    icon: Users,
  },
];

const PATHS: Record<SegmentId, string> = {
  attraktivitaet:
    'M790.09 397.363c-77.281-122.695-256.68-122.633-333.906 0-53.73-101.582-3.926-228.254 104.683-266.058 40.008-14.032 84.535-14.028 124.535 0 108.594 37.77 158.426 164.515 104.688 266.058m0 0',
  bindung:
    'M711.672 669.738c-101.613 53.711-228.32 3.914-266.14-104.656-14.024-39.969-14.024-84.457-.032-124.418 37.762-108.605 164.559-158.476 266.172-104.73-122.73 77.261-122.664 256.59 0 333.804m0 0',
  gesundheit:
    'M1005.863 502.277c.145 43.45-15.324 86.555-43.097 119.993v.003C907.94 689.5 811.305 710.234 733.707 671.48c-94.95-46.546-132.984-163.812-83.484-257.156 77.28 122.692 256.683 122.63 333.91 0 14.234 26.969 21.73 57.219 21.73 87.953m0 0',
  kultur:
    'M1005.305 308.852c-.461 142.168-150.739 232.613-276.66 166.902 122.73-77.262 122.66-256.598 0-333.805 125.894-65.754 276.277 24.863 276.66 166.903m0 0',
};

function BenefitVennDiagram({ active }: { active: SegmentId | null }) {
  return (
    <svg
      viewBox="390 110 680 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Die vier zentralen Wirkungsbereiche moderner Benefits"
      className="h-full w-full"
    >
      {segments.map((s) => (
        <path
          key={s.id}
          d={PATHS[s.id]}
          fill={s.color}
          className="transition-opacity duration-300 ease-entrance"
          opacity={active === null || active === s.id ? 1 : 0.16}
        />
      ))}
    </svg>
  );
}

export default function WarumBenefitsSection() {
  const [active, setActive] = useState<SegmentId | null>(null);
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.08, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="warum-benefits" tone="canvas" size="lg">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.div variants={item}>
          <SectionHead
            eyebrow="Warum moderne Benefits unverzichtbar sind"
            title="Die vier zentralen Wirkungsbereiche moderner Benefits"
            body="Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden. Ein klares Benefit-System stärkt jede dieser Ebenen messbar."
            align="center"
            titleWidth="max-w-[22ch]"
          />
        </motion.div>

        {/*
          The diagram is the section's one graphic moment, so it gets a panel
          of its own. The four fields sit underneath as a ledger — the same
          pattern used in the Ansatz section, so the page has a vocabulary.
        */}
        <motion.div
          variants={item}
          className="mt-14 overflow-hidden rounded-xl4 border border-line bg-panel"
        >
          <div className="relative grid place-items-center px-6 py-12 sm:py-16">
            <div
              aria-hidden="true"
              className="grid-lines-light pointer-events-none absolute inset-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(42,45,124,0.10) 0%, rgba(42,45,124,0.03) 45%, transparent 70%)',
              }}
            />
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={reduced ? { duration: 0 } : transition(0.75)}
              className="relative aspect-square w-full max-w-[22rem] sm:max-w-[26rem]"
            >
              <BenefitVennDiagram active={active} />
            </motion.div>
          </div>

          <div className="grid divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {segments.map((segment, i) => (
              <div
                key={segment.id}
                onMouseEnter={() => setActive(segment.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(segment.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className={cn(
                  'p-6 transition-colors duration-300 lg:p-7',
                  'sm:border-line',
                  i % 2 === 1 && 'sm:border-l',
                  'lg:border-l lg:first:border-l-0',
                  i === 2 && 'sm:border-t sm:border-line lg:border-t-0',
                  i === 3 && 'sm:border-t sm:border-line lg:border-t-0',
                  active === segment.id && 'bg-raised',
                )}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: segment.color }}
                >
                  <segment.icon className="h-4 w-4 text-white" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-h4">{segment.label}</h3>
                <p className="mt-2.5 text-small leading-relaxed text-content">
                  {segment.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
