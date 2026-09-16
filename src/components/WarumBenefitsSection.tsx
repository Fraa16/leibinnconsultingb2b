import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Link2, HeartPulse, Users } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT, transition } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Card from './ui/Card';
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
    corner: 'tl',
  },
  {
    id: 'bindung' as SegmentId,
    label: 'Mitarbeiterbindung',
    description:
      'Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.',
    color: '#15174F',
    icon: Link2,
    corner: 'tr',
  },
  {
    id: 'gesundheit' as SegmentId,
    label: 'Gesundheit & Wohlbefinden',
    description:
      'Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.',
    color: '#202266',
    icon: HeartPulse,
    corner: 'br',
  },
  {
    id: 'kultur' as SegmentId,
    label: 'Teamkultur & Identifikation',
    description:
      'Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.',
    color: '#0B0C39',
    icon: Users,
    corner: 'bl',
  },
];

/** Paths keyed by segment so a hovered label can highlight its own petal. */
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
      viewBox="380 100 700 620"
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
          opacity={active === null || active === s.id ? 1 : 0.22}
        />
      ))}
    </svg>
  );
}

const CORNER_CLASSES: Record<string, string> = {
  tl: 'lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left',
  tr: 'lg:col-start-3 lg:row-start-1 lg:items-end lg:text-right',
  bl: 'lg:col-start-1 lg:row-start-3 lg:items-start lg:text-left',
  br: 'lg:col-start-3 lg:row-start-3 lg:items-end lg:text-right',
};

export default function WarumBenefitsSection() {
  const [active, setActive] = useState<SegmentId | null>(null);
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="warum-benefits" tone="base" size="lg">
      {/* Cool radial wash behind the diagram, replacing the stacked
          before:/after: pseudo-element gradients on the old wrapper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle, rgba(42,45,124,0.09) 0%, rgba(42,45,124,0.03) 42%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative"
      >
        <motion.div variants={item} className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Warum moderne Benefits unverzichtbar sind</Eyebrow>
          <h2 className="mt-5">Die vier zentralen Wirkungsbereiche moderner Benefits</h2>
          <p className="mx-auto mt-5 max-w-measure text-lead text-content">
            Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf
            Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden.
            Ein klares Benefit-System stärkt jede dieser Ebenen messbar.
          </p>
        </motion.div>

        {/* Mobile / tablet: stacked cards. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {segments.map((segment) => (
            <motion.div variants={item} key={segment.id}>
              <Card padding="md" className="h-full">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: segment.color }}
                  >
                    <segment.icon className="h-4 w-4 text-white" />
                  </span>
                  <h3 className="text-h4">{segment.label}</h3>
                </div>
                <p className="mt-3 text-small leading-relaxed text-content">{segment.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/*
          Desktop: a 3×3 grid puts each label in the quadrant matching its
          petal. The original placed them with absolute corners plus hardcoded
          ±100px transforms, which broke as soon as a label wrapped.
        */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto] lg:items-center lg:gap-x-8 lg:gap-y-10">
          {segments.map((segment) => (
            <motion.div
              variants={item}
              key={segment.id}
              onMouseEnter={() => setActive(segment.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(segment.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className={cn(
                'flex flex-col gap-3 rounded-xl2 p-3 transition-opacity duration-300',
                CORNER_CLASSES[segment.corner],
                active !== null && active !== segment.id && 'opacity-45',
              )}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-soft transition-transform duration-300 ease-entrance"
                style={{
                  backgroundColor: segment.color,
                  transform: active === segment.id ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <segment.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="text-h4">{segment.label}</h3>
              <p className="max-w-[34ch] text-small leading-relaxed text-content">
                {segment.description}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={reduced ? { duration: 0 } : transition(0.75)}
            className="col-start-2 row-start-1 row-span-3 mx-auto aspect-square w-full max-w-lg self-center"
          >
            <BenefitVennDiagram active={active} />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
