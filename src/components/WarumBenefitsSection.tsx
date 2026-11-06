import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Star, Link2, HeartPulse, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Ornament from './ui/Ornament';
import { cn } from '../lib/cn';

type SegmentId = 'attraktivitaet' | 'bindung' | 'gesundheit' | 'kultur';

type Segment = {
  id: SegmentId;
  label: string;
  description: string;
  /** Degrees clockwise from twelve o'clock. */
  angle: number;
  colour: string;
  icon: LucideIcon;
};

const SEGMENTS: Segment[] = [
  {
    id: 'attraktivitaet',
    label: 'Arbeitgeberattraktivität',
    description:
      'Ihre Benefits machen auf einen Blick sichtbar, warum sich qualifizierte Bewerbende für Ihr Unternehmen entscheiden sollten.',
    angle: 0,
    colour: '#2A2D7C',
    icon: Star,
  },
  {
    id: 'bindung',
    label: 'Mitarbeiterbindung',
    description:
      'Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.',
    angle: 90,
    colour: '#15174F',
    icon: Link2,
  },
  {
    id: 'gesundheit',
    label: 'Gesundheit & Wohlbefinden',
    description:
      'Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.',
    angle: 180,
    colour: '#202266',
    icon: HeartPulse,
  },
  {
    id: 'kultur',
    label: 'Teamkultur & Identifikation',
    description:
      'Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.',
    angle: 270,
    colour: '#0B0C39',
    icon: Users,
  },
];

/*
 * Quatrefoil geometry. Four circles pushed off a shared centre by OFFSET, with
 * a radius large enough that neighbours overlap and all four meet in the
 * middle — which is the section's actual argument: the four areas are not
 * separate programmes, they are one system seen from four sides.
 */
const VIEW = 420;
const MID = VIEW / 2;
const RADIUS = 118;
const OFFSET = 80;
const HUB = 40;

const petalCentre = (angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { cx: MID + OFFSET * Math.cos(rad), cy: MID + OFFSET * Math.sin(rad) };
};

/** Where the ordinal sits: out along the segment's own axis, clear of the hub. */
const ordinalPoint = (angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  const r = OFFSET + RADIUS * 0.56;
  return { x: MID + r * Math.cos(rad), y: MID + r * Math.sin(rad) };
};

const ord = (i: number) => String(i + 1).padStart(2, '0');

/**
 * The four areas of effect, as a diagram you can work rather than look at.
 *
 * Selecting an area — from the list or by hitting its petal — brings that
 * petal forward and recedes the others, so the shape answers "which of these
 * am I reading about" without a legend. The list is the accessible control:
 * real radio semantics, arrow-key navigation, every description in the
 * document whatever is selected. The diagram is a pointer affordance layered
 * on top of it, which is why it is hidden from assistive tech rather than
 * duplicated into it.
 */
export default function WarumBenefitsSection() {
  const [active, setActive] = useState<SegmentId>('attraktivitaet');
  const [hovered, setHovered] = useState<SegmentId | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /** What the diagram shows: a hover preview wins over the committed choice. */
  const shown = hovered ?? active;

  const select = (id: SegmentId, focus = false) => {
    setActive(id);
    if (focus) {
      listRef.current?.querySelector<HTMLButtonElement>(`[data-segment="${id}"]`)?.focus();
    }
  };

  /*
   * Radiogroup keys: arrows move and select, Home / End jump to the ends.
   * Tab leaves the group, which is why only the checked row is tabbable.
   */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = SEGMENTS.findIndex((s) => s.id === active);
    const last = SEGMENTS.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;

    if (next === null) return;
    event.preventDefault();
    select(SEGMENTS[next].id, true);
  };

  return (
    <Section id="warum-benefits" tone="canvas" size="lg">
      <SectionHead
        eyebrow="Warum moderne Benefits unverzichtbar sind"
        title="Die vier zentralen Wirkungsbereiche moderner Benefits"
        lead="Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden. Ein klares Benefit-System stärkt jede dieser Ebenen messbar."
        align="center"
        titleWidth="max-w-[20ch]"
      />

      <div className="mt-[clamp(3rem,5vw,4.5rem)] grid items-center gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal className="relative mx-auto w-full max-w-[30rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(42,45,124,0.10) 0%, rgba(42,45,124,0.03) 46%, transparent 72%)',
            }}
          />

          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            aria-hidden="true"
            className="relative block w-full"
          >
            <defs>
              {SEGMENTS.map((segment) => {
                const { cx, cy } = petalCentre(segment.angle);
                return (
                  <linearGradient
                    key={segment.id}
                    id={`petal-${segment.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={cx - RADIUS}
                    y1={cy - RADIUS}
                    x2={cx + RADIUS}
                    y2={cy + RADIUS}
                  >
                    <stop offset="0" stopColor="#A1CEE5" />
                    <stop offset="1" stopColor={segment.colour} />
                  </linearGradient>
                );
              })}
            </defs>

            {/*
              Painted with the selected petal last so it is both visually and
              for hit-testing on top; without the reorder, clicks in an
              overlap would land on whichever petal happened to come later.
            */}
            {[...SEGMENTS]
              .sort((a, b) => Number(a.id === shown) - Number(b.id === shown))
              .map((segment) => {
                const { cx, cy } = petalCentre(segment.angle);
                const point = ordinalPoint(segment.angle);
                const on = segment.id === shown;
                const index = SEGMENTS.indexOf(segment);

                return (
                  <g
                    key={segment.id}
                    role="presentation"
                    onClick={() => select(segment.id, true)}
                    onMouseEnter={() => setHovered(segment.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer transition-[transform,filter] duration-500 ease-brand"
                    style={{
                      // fill-box so each petal scales about its own centre
                      // rather than the middle of the whole diagram.
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      transform: on ? 'scale(1.035)' : 'scale(1)',
                      filter: on ? 'drop-shadow(0 16px 28px rgba(42,45,124,0.2))' : undefined,
                    }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={RADIUS}
                      fill={on ? `url(#petal-${segment.id})` : 'rgba(42,45,124,0.07)'}
                      fillOpacity={on ? 0.92 : 1}
                      stroke={on ? 'transparent' : 'rgba(42,45,124,0.3)'}
                      strokeWidth={1}
                      style={{ mixBlendMode: on ? 'normal' : 'multiply' }}
                      className="transition-[fill,stroke,fill-opacity] duration-500 ease-brand"
                    />
                    <text
                      x={point.x}
                      y={point.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="tnum transition-colors duration-500 ease-brand"
                      style={{
                        fontSize: 15,
                        letterSpacing: '0.14em',
                        fontWeight: 500,
                        fill: on ? '#FFFFFF' : 'rgba(42,45,124,0.45)',
                      }}
                    >
                      {ord(index)}
                    </text>
                  </g>
                );
              })}

            {/* The hub: where all four overlap, and where the mark belongs. */}
            <circle cx={MID} cy={MID} r={HUB} fill="#FFFFFF" />
            <circle cx={MID} cy={MID} r={HUB} fill="none" stroke="rgba(42,45,124,0.14)" strokeWidth={1} />
          </svg>

          <Ornament
            className="left-1/2 top-1/2 h-[2.6rem] w-[2.6rem] -translate-x-1/2 -translate-y-1/2 text-ink-600"
            opacity={0.55}
          />
        </Reveal>

        <div
          ref={listRef}
          role="radiogroup"
          aria-label="Die vier zentralen Wirkungsbereiche moderner Benefits"
          onKeyDown={onKeyDown}
          className="border-t border-line"
        >
          {SEGMENTS.map((segment, i) => {
            const on = segment.id === active;
            return (
              <Reveal key={segment.id} delay={i * 70}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={on}
                  data-segment={segment.id}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(segment.id)}
                  onMouseEnter={() => setHovered(segment.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'group relative flex w-full gap-5 border-b border-line py-6 pr-4 text-left',
                    'transition-colors duration-300 ease-brand sm:gap-6 sm:py-7',
                    on ? 'pl-5 sm:pl-6' : 'pl-0 hover:pl-3',
                  )}
                >
                  {/* Accent rule rather than a filled row: the page is ruled, not carded. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bottom-0 left-0 top-0 w-[2px] origin-center bg-ink-600',
                      'transition-transform duration-300 ease-brand',
                      on ? 'scale-y-100' : 'scale-y-0',
                    )}
                  />

                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl2 border',
                      'transition-colors duration-300 ease-brand',
                      on
                        ? 'border-transparent text-white'
                        : 'border-line bg-panel text-ink-600 group-hover:border-ink-300',
                    )}
                    style={on ? { backgroundColor: segment.colour } : undefined}
                  >
                    <segment.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'tnum text-meta uppercase transition-colors duration-300',
                          on ? 'text-ink-600' : 'text-content-faint',
                        )}
                      >
                        {ord(i)}
                      </span>
                      <span
                        className={cn(
                          'text-h4 transition-colors duration-300',
                          on ? 'text-content-strong' : 'text-content-strong/70',
                        )}
                      >
                        {segment.label}
                      </span>
                    </span>

                    <span
                      className={cn(
                        'mt-3 block max-w-measure text-small leading-relaxed transition-colors duration-300',
                        on ? 'text-content' : 'text-content-muted',
                      )}
                    >
                      {segment.description}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
