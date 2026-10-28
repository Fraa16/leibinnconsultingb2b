import { useState } from 'react';
import { Star, Link2, HeartPulse, Users } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
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

export default function WarumBenefitsSection() {
  const [active, setActive] = useState<SegmentId | null>(null);

  return (
    <Section id="warum-benefits" tone="canvas" size="lg">
      <SectionHead
        eyebrow="Warum moderne Benefits unverzichtbar sind"
        title="Die vier zentralen Wirkungsbereiche moderner Benefits"
        lead="Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden. Ein klares Benefit-System stärkt jede dieser Ebenen messbar."
        align="center"
        titleWidth="max-w-[20ch]"
      />

      <Reveal className="mt-[clamp(3rem,5vw,4.5rem)]">
        <div className="relative grid place-items-center py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(42,45,124,0.10) 0%, rgba(42,45,124,0.03) 45%, transparent 70%)',
            }}
          />
          <svg
            viewBox="390 110 680 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Die vier zentralen Wirkungsbereiche moderner Benefits"
            className="relative aspect-square w-full max-w-[20rem] sm:max-w-[24rem]"
          >
            {segments.map((s) => (
              <path
                key={s.id}
                d={PATHS[s.id]}
                fill={s.color}
                className="transition-opacity duration-300 ease-brand"
                opacity={active === null || active === s.id ? 1 : 0.14}
              />
            ))}
          </svg>
        </div>
      </Reveal>

      {/* The four fields as a ruled ledger, matching the Ansatz section. */}
      <div className="mt-[clamp(2.5rem,4vw,4rem)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {segments.map((segment, i) => (
          <Reveal
            key={segment.id}
            delay={i * 70}
            className={cn(
              'border-b border-line py-7 transition-colors duration-300 sm:border-b-0 sm:px-6 sm:py-8',
              'lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 sm:first:pl-0',
              active === segment.id && 'bg-panel',
            )}
          >
            <div
              onMouseEnter={() => setActive(segment.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(segment.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl2"
                style={{ backgroundColor: segment.color }}
              >
                <segment.icon className="h-[18px] w-[18px] text-white" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-h4">{segment.label}</h3>
              <p className="mt-3 text-small leading-relaxed text-content">{segment.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
