import { Star, Link2, HeartPulse, Users } from 'lucide-react';
import Section from './ui/Section';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/** Brand mark: four interlocking segments, one per effect area. */
function BenefitVennDiagram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="430 110 600 600"
      className={className}
      role="img"
      aria-label="Diagramm: vier ineinandergreifende Wirkungsbereiche moderner Benefits"
    >
      {/* Arbeitgeberattraktivität */}
      <path
        fill="#2A2D7C"
        d="M790.09 397.363c-77.281-122.695-256.68-122.633-333.906 0-53.73-101.582-3.926-228.254 104.683-266.058 40.008-14.032 84.535-14.028 124.535 0 108.594 37.77 158.426 164.515 104.688 266.058m0 0"
      />
      {/* Mitarbeiterbindung */}
      <path
        fill="#15174F"
        d="M711.672 669.738c-101.613 53.711-228.32 3.914-266.14-104.656-14.024-39.969-14.024-84.457-.032-124.418 37.762-108.605 164.559-158.476 266.172-104.73-122.73 77.261-122.664 256.59 0 333.804m0 0"
      />
      {/* Gesundheit & Wohlbefinden */}
      <path
        fill="#202266"
        d="M1005.863 502.277c.145 43.45-15.324 86.555-43.097 119.993v.003C907.94 689.5 811.305 710.234 733.707 671.48c-94.95-46.546-132.984-163.812-83.484-257.156 77.28 122.692 256.683 122.63 333.91 0 14.234 26.969 21.73 57.219 21.73 87.953m0 0"
      />
      {/* Teamkultur & Identifikation */}
      <path
        fill="#0B0C39"
        d="M1005.305 308.852c-.461 142.168-150.739 232.613-276.66 166.902 122.73-77.262 122.66-256.598 0-333.805 125.894-65.754 276.277 24.863 276.66 166.903m0 0"
      />
    </svg>
  );
}

const segments = [
  {
    label: 'Arbeitgeberattraktivität',
    description:
      'Ihre Benefits machen auf einen Blick sichtbar, warum sich qualifizierte Bewerbende für Ihr Unternehmen entscheiden sollten.',
    color: '#2A2D7C',
    icon: Star,
  },
  {
    label: 'Mitarbeiterbindung',
    description:
      'Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.',
    color: '#15174F',
    icon: Link2,
  },
  {
    label: 'Gesundheit & Wohlbefinden',
    description:
      'Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.',
    color: '#202266',
    icon: HeartPulse,
  },
  {
    label: 'Teamkultur & Identifikation',
    description:
      'Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.',
    color: '#0B0C39',
    icon: Users,
  },
];

export default function WarumBenefitsSection() {
  return (
    <Section id="warum-benefits" tone="canvas">
      <div className="lc-inner">
        <SectionHeading
          eyebrow="Warum moderne Benefits unverzichtbar sind"
          title="Die vier zentralen Wirkungsbereiche"
          titleMuted="moderner Benefits"
          lead="Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden. Ein klares Benefit-System stärkt jede dieser Ebenen messbar."
        />

        {/* The diagram sits in normal flow at a contained size. The previous
            version absolutely positioned four labels with hardcoded 100px
            offsets inside a 16/9 box, which collided at most widths between
            md and xl. */}
        <Reveal delay={0.1} className="mt-16 flex justify-center md:mt-20">
          <BenefitVennDiagram className="h-auto w-[min(21rem,68vw)]" />
        </Reveal>

        {/* Effect areas — borderless grid, robust at every width. */}
        <div className="mt-16 grid gap-x-12 gap-y-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {segments.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <Reveal key={segment.label} delay={i * 0.05}>
                <div className="lc-rule h-full py-7">
                  <span
                    className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: segment.color }}
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem] text-white" aria-hidden="true" />
                  </span>
                  <h3 className="t-h3">{segment.label}</h3>
                  <p className="t-body mt-2.5 text-ink-muted">{segment.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
