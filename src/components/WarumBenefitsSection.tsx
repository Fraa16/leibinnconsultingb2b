import { useState } from 'react';
import { Star, Link2, HeartPulse, Users, type LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

type Segment = {
  id: string;
  label: string;
  description: string;
  /** Position on the brand's blue axis. */
  color: string;
  /** Foreground that clears 3:1 against `color`. */
  onColor: string;
  /** Same hue at low alpha, used for the halo on the active row. */
  soft: string;
  icon: LucideIcon;
};

/**
 * Four steps along the brand's blue axis, from the ice accent to the
 * deepest navy. The previous fills (#2A2D7C, #15174F, #202266, #0B0C39)
 * were four navies within ~10% lightness of each other, so the diagram
 * read as two shapes rather than four and nothing tied it to the list.
 */
const segments: Segment[] = [
  {
    id: 'attraktivitaet',
    label: 'Arbeitgeberattraktivität',
    description:
      'Ihre Benefits machen auf einen Blick sichtbar, warum sich qualifizierte Bewerbende für Ihr Unternehmen entscheiden sollten.',
    color: '#A1CEE5',
    onColor: '#15174F',
    soft: 'rgba(161, 206, 229, 0.38)',
    icon: Star,
  },
  {
    id: 'bindung',
    label: 'Mitarbeiterbindung',
    description:
      'Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.',
    color: '#657DB0',
    onColor: '#FFFFFF',
    soft: 'rgba(101, 125, 176, 0.3)',
    icon: Link2,
  },
  {
    id: 'gesundheit',
    label: 'Gesundheit & Wohlbefinden',
    description:
      'Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.',
    color: '#2A2D7C',
    onColor: '#FFFFFF',
    soft: 'rgba(42, 45, 124, 0.22)',
    icon: HeartPulse,
  },
  {
    id: 'kultur',
    label: 'Teamkultur & Identifikation',
    description:
      'Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.',
    color: '#0B0C39',
    onColor: '#FFFFFF',
    soft: 'rgba(11, 12, 57, 0.2)',
    icon: Users,
  },
];

/** Path data keyed to the segment ids above, in drawing order. */
const paths: Record<string, string> = {
  attraktivitaet:
    'M790.09 397.363c-77.281-122.695-256.68-122.633-333.906 0-53.73-101.582-3.926-228.254 104.683-266.058 40.008-14.032 84.535-14.028 124.535 0 108.594 37.77 158.426 164.515 104.688 266.058m0 0',
  bindung:
    'M711.672 669.738c-101.613 53.711-228.32 3.914-266.14-104.656-14.024-39.969-14.024-84.457-.032-124.418 37.762-108.605 164.559-158.476 266.172-104.73-122.73 77.261-122.664 256.59 0 333.804m0 0',
  gesundheit:
    'M1005.863 502.277c.145 43.45-15.324 86.555-43.097 119.993v.003C907.94 689.5 811.305 710.234 733.707 671.48c-94.95-46.546-132.984-163.812-83.484-257.156 77.28 122.692 256.683 122.63 333.91 0 14.234 26.969 21.73 57.219 21.73 87.953m0 0',
  kultur:
    'M1005.305 308.852c-.461 142.168-150.739 232.613-276.66 166.902 122.73-77.262 122.66-256.598 0-333.805 125.894-65.754 276.277 24.863 276.66 166.903m0 0',
};

function BenefitVennDiagram({
  activeId,
  onHover,
  className,
}: {
  activeId: string | null;
  onHover: (id: string | null) => void;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="430 110 600 600"
      className={className}
      role="img"
      aria-label="Diagramm: vier ineinandergreifende Wirkungsbereiche moderner Benefits"
    >
      {segments.map((segment) => {
        const isDimmed = activeId !== null && activeId !== segment.id;
        return (
          <path
            key={segment.id}
            d={paths[segment.id]}
            fill={segment.color}
            className={`venn-seg ${isDimmed ? 'is-dimmed' : ''}`}
            onMouseEnter={() => onHover(segment.id)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}
    </svg>
  );
}

export default function WarumBenefitsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  /** Set by click/tap, so touch users get the same link without a hover. */
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const current = activeId ?? pinnedId;

  return (
    <Section id="warum-benefits" tone="canvas">
      <div className="lc-inner">
        <SectionHeading
          eyebrow="Warum moderne Benefits unverzichtbar sind"
          title="Die vier zentralen Wirkungsbereiche"
          titleMuted="moderner Benefits"
          lead="Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden. Ein klares Benefit-System stärkt jede dieser Ebenen messbar."
        />

        {/* Diagram and list sit side by side from lg up, so the highlight
            link between them is read at a glance rather than inferred. */}
        <div className="mt-16 grid items-center gap-12 md:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <Reveal className="flex justify-center">
            <BenefitVennDiagram
              activeId={current}
              onHover={setActiveId}
              className="h-auto w-[min(21rem,64vw)] lg:w-full lg:max-w-[30rem]"
            />
          </Reveal>

          <div
            role="group"
            aria-label="Wirkungsbereiche – einen Bereich hervorheben"
            className="w-full"
          >
            {segments.map((segment, i) => {
              const Icon = segment.icon;
              const isActive = current === segment.id;
              return (
                <Reveal key={segment.id} delay={i * 0.05}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(segment.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(segment.id)}
                    onBlur={() => setActiveId(null)}
                    onClick={() =>
                      setPinnedId((p) => (p === segment.id ? null : segment.id))
                    }
                    className="venn-row group w-full text-left"
                    style={
                      { '--seg': segment.color, '--seg-soft': segment.soft } as React.CSSProperties
                    }
                  >
                    <span className="venn-row-inner">
                      <span className="flex items-center gap-4">
                        <span
                          className="venn-dot inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: segment.color, color: segment.onColor }}
                        >
                          <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                        </span>
                        <span className="t-h3">{segment.label}</span>
                      </span>
                      <span className="t-body mt-3 block pl-14 text-ink-muted">
                        {segment.description}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
            <div className="lc-rule" />
          </div>
        </div>
      </div>
    </Section>
  );
}
