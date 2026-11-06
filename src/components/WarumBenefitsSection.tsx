import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Magnet, Anchor, HeartPulse, Users, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import { LOCKUP_MARK } from './ui/logo-paths';
import { cn } from '../lib/cn';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

type Building = { name: string; basis: string };

type Area = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Circle centre in the 1000-unit viewBox. */
  cx: number;
  cy: number;
  /** Where the text block centres, in % of the diagram. */
  textX: number;
  textY: number;
  fill: string;
  /** The circle is dark enough that its text must be white. */
  dark: boolean;
  /** Concrete, statute-backed building blocks that work on this area. */
  buildings: Building[];
};

/*
 * Geometry: four circles of radius 290 pushed 200 units off a shared centre
 * along the diagonals. Neighbours overlap by a wide lens, opposites only just
 * meet, and all four share the centre point — which is where the hub sits.
 *
 * The square from 130 to 390 on each axis (and its mirrors) lies inside one
 * circle and outside the other three, so the text placed there never crosses
 * an overlap. That square is 26% of the diagram, which sets the text width.
 */
const R = 290;
const HUB = 80;

const AREAS: Area[] = [
  {
    id: 'attraktivitaet',
    // Soft hyphen at the compound joint: left to `hyphens: auto` the word
    // breaks as "Arbeitgeberattraktivi-tät" inside the circle.
    label: 'Arbeitgeber\u00ADattraktivität',
    description: 'Bewerbende sehen konkret, was sie bei Ihnen mehr haben als anderswo.',
    icon: Magnet,
    cx: 300,
    cy: 300,
    textX: 26,
    textY: 26,
    fill: '#A1CEE5',
    dark: false,
    buildings: [
      { name: 'Sachbezug bis 50 € im Monat', basis: '§ 8 Abs. 2 S. 11 EStG' },
      { name: 'Jobticket oder Deutschlandticket', basis: '§ 3 Nr. 15 EStG' },
      { name: 'Dienstrad zusätzlich zum Gehalt', basis: '§ 3 Nr. 37 EStG' },
      { name: 'Internetpauschale bis 50 € im Monat', basis: 'pauschal versteuert, § 40 Abs. 2 EStG' },
    ],
  },
  {
    id: 'bindung',
    label: 'Mitarbeiterbindung',
    description: 'Leistungen, die jeden Monat ankommen, machen einen Wechsel teurer als ein paar Euro brutto.',
    icon: Anchor,
    cx: 700,
    cy: 300,
    textX: 74,
    textY: 26,
    fill: '#75AED4',
    dark: false,
    buildings: [
      { name: 'Betriebliche Altersvorsorge mit Arbeitgeberzuschuss', basis: '§ 3 Nr. 63 EStG' },
      { name: 'Erholungsbeihilfe bis 156 € im Jahr', basis: 'pauschal versteuert, § 40 Abs. 2 EStG' },
      { name: 'Geschenke zu persönlichen Anlässen bis 60 €', basis: 'R 19.6 LStR' },
      { name: 'Sachbezug bis 50 € im Monat', basis: '§ 8 Abs. 2 S. 11 EStG' },
    ],
  },
  {
    id: 'gesundheit',
    label: 'Gesundheit & Wohlbefinden',
    description: 'Weniger Ausfalltage, mehr Energie im Team. Der Gesetzgeber fördert es mit bis zu 600 € im Jahr.',
    icon: HeartPulse,
    cx: 700,
    cy: 700,
    textX: 74,
    textY: 74,
    fill: '#6472AC',
    dark: true,
    buildings: [
      { name: 'Gesundheitsförderung bis 600 € im Jahr', basis: '§ 3 Nr. 34 EStG' },
      { name: 'Zertifizierte Präventionskurse', basis: 'im Rahmen von § 3 Nr. 34 EStG' },
      { name: 'Betriebliche Krankenversicherung', basis: 'als Sachbezug möglich' },
      { name: 'Dienstrad zusätzlich zum Gehalt', basis: '§ 3 Nr. 37 EStG' },
    ],
  },
  {
    id: 'kultur',
    label: 'Teamkultur & Identifikation',
    description: 'Gemeinsame Leistungen zeigen Wertschätzung dort, wo man sie bemerkt: im Alltag.',
    icon: Users,
    cx: 300,
    cy: 700,
    textX: 26,
    textY: 74,
    fill: '#3D458F',
    dark: true,
    buildings: [
      { name: 'Zwei Betriebsveranstaltungen bis je 110 €', basis: '§ 19 Abs. 1 Nr. 1a EStG' },
      { name: 'Kinderbetreuungszuschuss', basis: '§ 3 Nr. 33 EStG' },
      { name: 'Essenszuschuss', basis: 'Sachbezugswert nach SvEV' },
      { name: 'Weiterbildung im betrieblichen Interesse', basis: '§ 3 Nr. 19 EStG' },
    ],
  },
];

const ord = (i: number) => String(i + 1).padStart(2, '0');

/**
 * The four areas of effect as a large Venn diagram you can work.
 *
 * Every circle carries its own number, icon, label and line of copy, so the
 * diagram reads on its own without a legend. The circles blend where they
 * overlap — multiply, so each lens is the product of its two colours — which
 * is the section's argument made visible: most building blocks work on more
 * than one area at once.
 *
 * Choosing an area lifts its circle and swaps the panel beneath to the
 * concrete, statute-backed building blocks behind it. The text blocks are
 * the controls (a real radio group, arrow keys included); the circles are a
 * pointer shortcut to the same choice. Below `lg` there is no room for text
 * inside the circles, so the diagram shows numbers and the same controls
 * stack into a list under it.
 */
export default function WarumBenefitsSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const lifted = hovered ?? active;
  const area = AREAS[active];

  const choose = (i: number, focus = false) => {
    setActive(i);
    if (focus) groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[i]?.focus();
  };

  // Arrow keys walk clockwise round the diagram, which is also list order.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = AREAS.length - 1;
    const moves: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    choose(moves[event.key], true);
  };

  return (
    <Section id="warum-benefits" tone="canvas" size="lg">
      <SectionHead
        eyebrow="Wo Benefits wirken"
        title="Vier Bereiche, ein System"
        lead="Ein gut gebautes Benefit-System zahlt auf vier Bereiche gleichzeitig ein. Die meisten Bausteine wirken in mehr als einem davon, deshalb überschneiden sie sich. Wählen Sie einen Bereich, um die passenden Bausteine zu sehen."
        align="center"
        titleWidth="max-w-[16ch]"
      />

      <Reveal variant="group" className="relative mx-auto mt-[clamp(3rem,5vw,4.5rem)] w-full max-w-[54rem]">
        {/*
          The wrapper is exactly the diagram's box on lg, where the controls
          are laid over it; below lg the controls fall into normal flow under
          the diagram and the wrapper grows to hold them.
        */}
        <div className="relative">
          {/* ── The diagram ── */}
          <div className="relative mx-auto aspect-square w-full max-w-[26rem] lg:max-w-none">
            <svg viewBox="0 0 1000 1000" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <filter id="venn-lift" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="22" stdDeviation="26" floodColor="#15174F" floodOpacity="0.26" />
                </filter>
              </defs>

              {AREAS.map((a, i) => (
                <g key={a.id} className="a-bloom" style={delay(i * 140)}>
                  <circle
                    cx={a.cx}
                    cy={a.cy}
                    r={R}
                    fill={a.fill}
                    onClick={() => choose(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer transition-[transform,filter] duration-500 ease-brand"
                    style={{
                      // Opacity stays constant: dimming the others would take
                      // the white type on the two darker circles below AA.
                      mixBlendMode: 'multiply',
                      opacity: 0.95,
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      transform: lifted === i ? 'scale(1.03)' : 'scale(1)',
                      filter: lifted === i ? 'url(#venn-lift)' : undefined,
                    }}
                  />
                </g>
              ))}

              {/* Selection rings, painted after the blend so they stay crisp. */}
              <g className="a-fade pointer-events-none" style={delay(760)}>
                {AREAS.map((a, i) => (
                  <circle
                    key={a.id}
                    cx={a.cx}
                    cy={a.cy}
                    r={R + 16}
                    fill="none"
                    stroke="#2A2D7C"
                    strokeWidth={2.5}
                    strokeDasharray="1 11"
                    strokeLinecap="round"
                    className="transition-opacity duration-500 ease-brand"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ))}
              </g>

              {/* Hub: the one point all four share. */}
              <g className="a-bloom" style={delay(620)}>
                <circle cx={500} cy={500} r={HUB} fill="#FFFFFF" />
                <circle cx={500} cy={500} r={HUB} fill="none" stroke="rgba(21,23,79,0.12)" strokeWidth={2} />
                <g transform="translate(445 465) scale(0.256)" fill="#2A2D7C">
                  {LOCKUP_MARK.map((d) => (
                    <path key={d.length} d={d} />
                  ))}
                </g>
              </g>
            </svg>

            {/* Numbers inside the circles, for the compact diagram only. */}
            <div aria-hidden="true" className="lg:hidden">
              {AREAS.map((a, i) => (
                <span
                  key={a.id}
                  className={cn(
                    'a-fade tnum absolute -translate-x-1/2 -translate-y-1/2 text-[0.8125rem] font-semibold tracking-[0.12em]',
                    a.dark ? 'text-white' : 'text-ink-950',
                  )}
                  style={{ left: `${a.textX}%`, top: `${a.textY}%`, ...delay(500 + i * 90) }}
                >
                  {ord(i)}
                </span>
              ))}
            </div>
          </div>

          {/* ── The controls: inside the circles on lg, a list under the diagram otherwise ── */}
          <div
            ref={groupRef}
            role="radiogroup"
            aria-label="Wirkungsbereiche"
            onKeyDown={onKeyDown}
            className="mt-10 border-t border-line lg:absolute lg:inset-0 lg:mt-0 lg:border-0"
          >
            {AREAS.map((a, i) => {
              const on = active === i;
              return (
                /*
                 * Position and animation live on separate elements: the
                 * centring translate is on this wrapper, the rise on the
                 * button inside. On one element the revealed state's
                 * `transform: none` would wipe out the centring.
                 */
                <div
                  key={a.id}
                  className="lg:absolute lg:w-[25%] lg:-translate-x-1/2 lg:-translate-y-1/2"
                  style={{ left: `${a.textX}%`, top: `${a.textY}%` }}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      'a-rise flex w-full gap-4 border-b border-line py-5 text-left',
                      'lg:flex-col lg:items-center lg:gap-0 lg:rounded-2xl lg:border-0 lg:px-2 lg:py-2 lg:text-center',
                      a.dark ? 'lg:text-white' : 'lg:text-ink-950',
                    )}
                    style={delay(520 + i * 120)}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                        // list (small screens)
                        on ? 'border-ink-950 bg-ink-950 text-ice-300' : 'border-line bg-panel text-ink-600',
                        // inside the circle (lg)
                        a.dark
                          ? on
                            ? 'lg:border-white lg:bg-white lg:text-ink-800'
                            : 'lg:border-white/30 lg:bg-white/10 lg:text-white'
                          : on
                            ? 'lg:border-ink-950 lg:bg-ink-950 lg:text-ice-300'
                            : 'lg:border-ink-950/20 lg:bg-white/40 lg:text-ink-800',
                      )}
                    >
                      <a.icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
                    </span>

                    <span className="min-w-0 flex-1 lg:mt-4 lg:flex-none">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'tnum mr-2 text-meta text-ink-600 lg:mr-0 lg:block',
                          a.dark ? 'lg:text-white/75' : 'lg:text-ink-800/75',
                        )}
                      >
                        {ord(i)}
                      </span>
                      <span
                        className={cn(
                          'text-h4 lg:mt-1.5 lg:block lg:text-[1.1875rem] lg:leading-[1.2]',
                          on ? 'text-ink-600' : 'text-content-strong',
                          'lg:text-inherit',
                        )}
                        lang="de"
                        style={{ hyphens: 'auto' }}
                      >
                        {a.label}
                      </span>
                      <span
                        className={cn(
                          'mt-2 block text-small leading-relaxed text-content lg:mt-2.5 lg:text-[0.875rem] lg:leading-[1.45]',
                          a.dark ? 'lg:text-white/90' : 'lg:text-ink-950/80',
                        )}
                      >
                        {a.description}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Building blocks for the chosen area ── */}
        <div
          className="a-rise relative mt-12 overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)] border border-line bg-panel lg:mt-16"
          style={delay(900)}
          aria-live="polite"
        >
          <div key={area.id} className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-10 lg:p-9">
            <div className="a-settle">
              <p className="text-meta uppercase text-ink-600">Typische Bausteine</p>
              <p className="mt-3 text-h4 text-content-strong">{area.label}</p>
              <p className="mt-3 text-small text-content-muted">
                Ob ein Baustein steuerfrei bleibt, hängt im Einzelfall von den Voraussetzungen ab.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {area.buildings.map((b, i) => (
                <li
                  key={b.name}
                  className="a-settle flex items-start gap-3 rounded-xl2 border border-line bg-canvas px-4 py-3.5"
                  style={delay(80 + i * 70)}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-600 text-white"
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-small font-medium text-content-strong">{b.name}</span>
                    <span className="mt-0.5 block text-[0.8125rem] text-content-muted">{b.basis}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
