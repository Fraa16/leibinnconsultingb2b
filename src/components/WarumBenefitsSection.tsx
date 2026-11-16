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
  /** The segment's gradient, light end to dark end. Palette colours only. */
  from: string;
  to: string;
  /** The segment is light enough that marks on it must be dark. */
  light: boolean;
  /** Concrete, statute-backed building blocks that work on this area. */
  buildings: Building[];
};

const AREAS: Area[] = [
  {
    id: 'attraktivitaet',
    // Soft hyphen at the compound joint: left to `hyphens: auto` the word
    // breaks as "Arbeitgeberattraktivi-tät" in a narrow column.
    label: 'Arbeitgeber­attraktivität',
    description: 'Bewerbende sehen konkret, was sie bei Ihnen mehr haben als anderswo.',
    icon: Magnet,
    from: '#C4E2F0', // ice-200
    to: '#A1CEE5', // ice-300
    light: true,
    buildings: [
      { name: 'Sachbezug bis 50 € im Monat', basis: '§ 8 Abs. 2 S. 11 EStG' },
      { name: 'Jobticket oder Deutschlandticket', basis: '§ 3 Nr. 15 EStG' },
      { name: 'Dienstrad zusätzlich zum Gehalt', basis: '§ 3 Nr. 37 EStG' },
      { name: 'Internetpauschale bis 50 € im Monat', basis: 'pauschal versteuert, § 40 Abs. 2 EStG' },
    ],
  },
  {
    id: 'bindung',
    label: 'Mitarbeiter­bindung',
    description: 'Leistungen, die jeden Monat ankommen, machen einen Wechsel teurer als ein paar Euro brutto.',
    icon: Anchor,
    from: '#75AED4', // ice-400
    to: '#4F92BE', // ice-500
    light: false,
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
    from: '#6472AC', // ink-400
    to: '#3D458F', // ink-500
    light: false,
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
    from: '#2A2D7C', // ink-600
    to: '#15174F', // ink-800
    light: false,
    buildings: [
      { name: 'Zwei Betriebsveranstaltungen bis je 110 €', basis: '§ 19 Abs. 1 Nr. 1a EStG' },
      { name: 'Kinderbetreuungszuschuss', basis: '§ 3 Nr. 33 EStG' },
      { name: 'Essenszuschuss', basis: 'Sachbezugswert nach SvEV' },
      { name: 'Weiterbildung im betrieblichen Interesse', basis: '§ 3 Nr. 19 EStG' },
    ],
  },
];

const ord = (i: number) => String(i + 1).padStart(2, '0');

/** Other areas that list the same building block: the overlap, made concrete. */
const alsoIn = (name: string, self: number) =>
  AREAS.flatMap((a, i) => (i !== self && a.buildings.some((b) => b.name === name) ? [i] : []));

/*
 * ── Geometry ──────────────────────────────────────────────────────────────
 *
 * One disc, four segments: the headline drawn. The construction is the
 * yin-yang's, taken to four. Each segment has a round head, a circle of half
 * the disc's radius that touches the rim on one side and the centre on the
 * other, and a tail that tapers away clockwise under the next segment's head.
 * So every segment lies over the one before it and under the one after it,
 * which is the overlap the section talks about.
 *
 * Nothing is blended. A segment is what is left of "its quarter plus its
 * head" once the next head (grown by GAP, which leaves the white seam) is
 * cut out of it, and the shading where one passes under the next is a
 * blurred copy of that head, clipped to the segment below.
 */
const C = 500; // centre of the 1000-unit box
const R = 432; // disc
const HEAD = R / 2;
const GAP = 9; // white seam between segments
const PLATE = R + 14; // white plate the disc sits on
const ORBIT = 480; // hairline ring that carries the selection
const HUB = 92;
const CHIP = 54; // icon discs
const ELBOW = 80; // how far a leader runs diagonally before turning level

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (r: number, deg: number) => ({ x: C + r * Math.cos(rad(deg)), y: C + r * Math.sin(rad(deg)) });
const n = (v: number) => Number(v.toFixed(1));

/** Head centres sit on the diagonals: 01 top left, then clockwise. */
const angle = (i: number) => -135 + i * 90;

const GEO = AREAS.map((_, i) => {
  const a = angle(i);
  const head = at(HEAD, a);
  // A wedge reaching well past the rim; the disc clip trims it to the quarter.
  const w0 = at(900, a);
  const w1 = at(900, a + 45);
  const w2 = at(900, a + 90);
  const dot = at(ORBIT, a);
  const dx = Math.sign(dot.x - C);
  const dy = Math.sign(dot.y - C);
  return {
    head,
    quarter: `M${C} ${C}L${n(w0.x)} ${n(w0.y)}L${n(w1.x)} ${n(w1.y)}L${n(w2.x)} ${n(w2.y)}Z`,
    // Everything except this head, as an even-odd cut-out.
    cut:
      `M-600 -600H1600V1600H-600Z` +
      `M${n(head.x - HEAD - GAP)} ${n(head.y)}a${HEAD + GAP} ${HEAD + GAP} 0 1 0 ${2 * (HEAD + GAP)} 0` +
      `a${HEAD + GAP} ${HEAD + GAP} 0 1 0 ${-2 * (HEAD + GAP)} 0Z`,
    // Where the visible part of the head is widest: 12° back from the diagonal.
    chip: at(262, a - 12.2),
    gradient: [at(R, a - 30), at(R * 0.9, a + 95)],
    dot,
    elbow: { x: dot.x + dx * ELBOW, y: dot.y + dy * ELBOW },
    left: dx < 0,
    top: dy < 0,
  };
});

/** The selection arc, drawn at 01's position and turned to the active one. */
const ARC = (() => {
  const a = at(ORBIT, angle(0) - 27);
  const b = at(ORBIT, angle(0) + 27);
  return `M${n(a.x)} ${n(a.y)}A${ORBIT} ${ORBIT} 0 0 1 ${n(b.x)} ${n(b.y)}`;
})();

/* Where each control sits: the corners of a 2×3 grid around the disc on small
 * screens, and beside it, hung from its leader, on large ones. */
const PLACE = [
  'col-start-1 row-start-1 self-end lg:left-0 lg:top-[8.06%]',
  'col-start-2 row-start-1 self-end lg:right-0 lg:top-[8.06%]',
  'col-start-2 row-start-3 self-start lg:right-0 lg:bottom-[8.06%]',
  'col-start-1 row-start-3 self-start lg:left-0 lg:bottom-[8.06%]',
];

/**
 * The four areas of effect as one disc built from four interlocking segments.
 *
 * The shapes carry only an icon. The words sit outside them: beside the disc
 * on a leader line on large screens, at its four corners on small ones. That
 * keeps the diagram a diagram at any size, and the copy on a plain ground
 * where it can be read.
 *
 * Choosing an area turns the arc on the outer ring to its segment, fills its
 * icon disc and swaps the panel to the statute-backed building blocks behind
 * it. The labels are the controls (a real radio group, arrow keys included);
 * the segments and icon discs are a pointer shortcut to the same choice.
 */
export default function WarumBenefitsSection() {
  const [active, setActive] = useState(0);
  // Quarter turns of the selection arc. Kept apart from `active` so the arc
  // always takes the short way round instead of unwinding from 04 back to 01.
  const [turns, setTurns] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const area = AREAS[active];

  const choose = (i: number, focus = false) => {
    if (i !== active) {
      const step = (i - active + 4) % 4;
      setTurns((t) => t + (step === 3 ? -1 : step));
      setActive(i);
    }
    if (focus) groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[i]?.focus();
  };

  // Arrow keys walk clockwise round the disc, which is also reading order.
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

  const pointer = (i: number) => ({
    onClick: () => choose(i),
    onMouseEnter: () => setHovered(i),
    onMouseLeave: () => setHovered(null),
  });

  return (
    <Section id="warum-benefits" tone="canvas" size="lg">
      <SectionHead
        eyebrow="Wo Benefits wirken"
        title="Vier Bereiche, ein System"
        lead="Ein gut gebautes Benefit-System zahlt auf vier Bereiche gleichzeitig ein. Die meisten Bausteine wirken in mehr als einem davon, deshalb überschneiden sie sich. Wählen Sie einen Bereich, um die passenden Bausteine zu sehen."
        align="center"
        titleWidth="max-w-[16ch]"
      />

      <Reveal
        variant="group"
        className="mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] grid max-w-[30rem] gap-9 md:max-w-none md:grid-cols-2 md:items-center md:gap-10 lg:block"
      >
        {/*
          The stage. Small screens: a grid, labels in the corners, disc in the
          middle row. Large screens: a 2:1 box, the disc in its middle half and
          the labels hung from the leaders that run out of the SVG either side.
        */}
        <div
          ref={groupRef}
          role="radiogroup"
          aria-label="Wirkungsbereiche"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 gap-x-5 gap-y-2 lg:relative lg:block lg:aspect-[2/1]"
        >
          <div className="col-span-2 row-start-2 aspect-square lg:absolute lg:inset-y-0 lg:left-1/4 lg:w-1/2">
            <svg viewBox="0 0 1000 1000" aria-hidden="true" className="h-full w-full overflow-visible">
              <defs>
                <clipPath id="wb-disc">
                  <circle cx={C} cy={C} r={R} />
                </clipPath>
                {GEO.map((g, i) => (
                  <clipPath key={`cut-${i}`} id={`wb-cut-${i}`}>
                    <path d={g.cut} clipRule="evenodd" />
                  </clipPath>
                ))}
                {GEO.map((g, i) => (
                  <clipPath key={`seg-${i}`} id={`wb-seg-${i}`} clipPath={`url(#wb-cut-${(i + 1) % 4})`}>
                    <path d={g.quarter} />
                    <circle cx={n(g.head.x)} cy={n(g.head.y)} r={HEAD} />
                  </clipPath>
                ))}
                {GEO.map((g, i) => (
                  <linearGradient
                    key={`fill-${i}`}
                    id={`wb-fill-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={n(g.gradient[0].x)}
                    y1={n(g.gradient[0].y)}
                    x2={n(g.gradient[1].x)}
                    y2={n(g.gradient[1].y)}
                  >
                    <stop offset="0" stopColor={AREAS[i].from} />
                    <stop offset="1" stopColor={AREAS[i].to} />
                  </linearGradient>
                ))}
                <linearGradient id="wb-mark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4F92BE" />
                  <stop offset="1" stopColor="#2A2D7C" />
                </linearGradient>
                <filter id="wb-shade" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="20" />
                </filter>
                <filter id="wb-plate" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="30" stdDeviation="34" floodColor="#15174F" floodOpacity="0.2" />
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#15174F" floodOpacity="0.08" />
                </filter>
                <filter id="wb-chip" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#000022" floodOpacity="0.26" />
                </filter>
              </defs>

              {/* ── Outer ring, leaders, selection arc ── */}
              <circle
                cx={C}
                cy={C}
                r={ORBIT}
                fill="none"
                stroke="#D3D8E4"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                className="a-fade"
                style={delay(300)}
              />

              {GEO.map((g, i) => {
                const on = active === i;
                const stroke = on ? '#2A2D7C' : '#D3D8E4';
                return (
                  /*
                   * Entrance on the groups, colour change on the lines: a
                   * Tailwind transition utility on the same element would
                   * replace the `a-*` class's own transition and the reveal
                   * would snap.
                   */
                  <g key={AREAS[i].id}>
                    {/* The level run out to the label: large screens only. */}
                    <g
                      className="a-line hidden lg:block"
                      // Drawn outward from the disc: the fill-box origin is the
                      // elbow end, whichever side the line is on.
                      style={{
                        transformBox: 'fill-box',
                        transformOrigin: g.left ? 'right center' : 'left center',
                        ...delay(1020 + i * 90),
                      }}
                    >
                      <line
                        x1={g.left ? -500 : n(g.elbow.x)}
                        x2={g.left ? n(g.elbow.x) : 1500}
                        y1={n(g.elbow.y)}
                        y2={n(g.elbow.y)}
                        stroke={stroke}
                        strokeWidth={on ? 1.5 : 1}
                        vectorEffect="non-scaling-stroke"
                        className="transition-[stroke] duration-500 ease-brand"
                      />
                    </g>
                    <g className="a-fade" style={delay(900 + i * 90)}>
                      <line
                        x1={n(g.dot.x)}
                        y1={n(g.dot.y)}
                        x2={n(g.elbow.x)}
                        y2={n(g.elbow.y)}
                        stroke={stroke}
                        strokeWidth={on ? 1.5 : 1}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        className="transition-[stroke] duration-500 ease-brand"
                      />
                    </g>
                  </g>
                );
              })}

              <g className="a-fade" style={delay(820)}>
                <g
                  className="transition-transform duration-700 ease-brand"
                  style={{ transformOrigin: `${C}px ${C}px`, transform: `rotate(${turns * 90}deg)` }}
                >
                  <path d={ARC} fill="none" stroke="#2A2D7C" strokeWidth={7} strokeLinecap="round" />
                </g>
              </g>

              {GEO.map((g, i) => (
                <g key={AREAS[i].id} className="a-bloom" style={delay(820 + i * 90)}>
                  <circle
                    cx={n(g.dot.x)}
                    cy={n(g.dot.y)}
                    r={active === i ? 15 : 10}
                    fill={active === i ? '#2A2D7C' : '#FFFFFF'}
                    stroke={active === i ? '#FFFFFF' : '#98A3CE'}
                    strokeWidth={active === i ? 6 : 3}
                    className="transition-all duration-500 ease-brand"
                  />
                </g>
              ))}

              {/* ── The disc ── */}
              <g className="a-bloom" style={delay(0)}>
                <circle cx={C} cy={C} r={PLATE} fill="#FFFFFF" filter="url(#wb-plate)" />
              </g>

              {GEO.map((_, i) => {
                const next = GEO[(i + 1) % 4].head;
                const lit = active === i || hovered === i;
                return (
                  <g key={AREAS[i].id} className="a-bloom" style={delay(140 + i * 120)}>
                    <g clipPath="url(#wb-disc)">
                      <g clipPath={`url(#wb-seg-${i})`} className="cursor-pointer" {...pointer(i)}>
                        <rect width={1000} height={1000} fill={`url(#wb-fill-${i})`} />
                        {/* The next segment's head lies on top and shades this one. */}
                        <circle
                          cx={n(next.x)}
                          cy={n(next.y + 10)}
                          r={HEAD + GAP + 10}
                          fill={AREAS[i].light ? '#15174F' : '#000022'}
                          opacity={AREAS[i].light ? 0.4 : 0.58}
                          filter="url(#wb-shade)"
                        />
                        {/* A touch of light on the segment under the pointer or chosen. */}
                        <rect
                          width={1000}
                          height={1000}
                          fill="#FFFFFF"
                          className="transition-opacity duration-500 ease-brand"
                          style={{ opacity: lit ? 0.07 : 0 }}
                        />
                      </g>
                    </g>
                  </g>
                );
              })}

              {/* Hub: the one point all four meet. */}
              <g className="a-bloom" style={delay(640)}>
                <circle cx={C} cy={C} r={HUB} fill="#FFFFFF" filter="url(#wb-chip)" />
                <g transform={`translate(${C - 56} ${C - 33}) scale(0.2623)`} fill="url(#wb-mark)">
                  {LOCKUP_MARK.map((d) => (
                    <path key={d.length} d={d} />
                  ))}
                </g>
              </g>

              {/* Icon discs: the anchor of each segment. */}
              {GEO.map((g, i) => {
                const a = AREAS[i];
                const on = active === i;
                return (
                  <g key={a.id} className="a-bloom" style={delay(720 + i * 90)}>
                    <g
                      className="cursor-pointer transition-transform duration-500 ease-brand"
                      style={{
                        transformBox: 'fill-box',
                        transformOrigin: 'center',
                        transform: on ? 'scale(1.14)' : hovered === i ? 'scale(1.06)' : 'scale(1)',
                        color: on ? '#A1CEE5' : '#15174F',
                      }}
                      {...pointer(i)}
                    >
                      <circle
                        cx={n(g.chip.x)}
                        cy={n(g.chip.y)}
                        r={CHIP}
                        fill={on ? '#000022' : '#FFFFFF'}
                        filter="url(#wb-chip)"
                        className="transition-[fill] duration-500 ease-brand"
                      />
                      <a.icon
                        x={n(g.chip.x - 23)}
                        y={n(g.chip.y - 23)}
                        width={46}
                        height={46}
                        strokeWidth={1.75}
                        className="transition-colors duration-500 ease-brand"
                      />
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── The controls ── */}
          {AREAS.map((a, i) => {
            const on = active === i;
            const g = GEO[i];
            return (
              /*
               * Position and animation live on separate elements: this wrapper
               * is placed, the button inside rises. An `a-*` class on a placed
               * element is the second pitfall in the README's Motion notes.
               */
              <div key={a.id} className={cn('lg:absolute lg:w-[24.5%]', PLACE[i])}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'a-rise group block w-full rounded-xl2 py-2 lg:py-0 lg:text-left',
                    g.left ? 'text-left' : 'text-right',
                    g.top ? 'lg:pt-4' : 'lg:pb-4',
                  )}
                  style={delay(560 + i * 110)}
                >
                  <span
                    aria-hidden="true"
                    className={cn('flex items-center gap-2 lg:flex-row', g.left ? 'flex-row' : 'flex-row-reverse')}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
                    />
                    <span
                      className={cn(
                        'tnum text-meta transition-colors duration-300',
                        on ? 'text-ink-600' : 'text-content-muted group-hover:text-ink-600',
                      )}
                    >
                      {ord(i)}
                    </span>
                  </span>

                  <span
                    className={cn(
                      'mt-2 block text-[1.0625rem] font-medium leading-[1.2] tracking-[-0.02em] transition-colors duration-300',
                      'lg:mt-2.5 lg:text-h4 lg:leading-[1.2]',
                      on ? 'text-ink-600' : 'text-content-strong group-hover:text-ink-600',
                    )}
                    lang="de"
                  >
                    {a.label}
                  </span>

                  {/* Beside the disc there is room for the line of copy; in the
                      corners there is not, and the panel carries it instead. */}
                  <span className="mt-2 hidden text-small text-content lg:block">{a.description}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Building blocks for the chosen area ── */}
        <div
          className="a-rise relative overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)] border border-line bg-panel lg:mt-[clamp(3rem,5vw,4.5rem)]"
          style={delay(900)}
          aria-live="polite"
        >
          <div
            key={area.id}
            className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-10 lg:p-9"
          >
            {/* Its own delay: `--d` inherits, and the panel's entrance delay
                would otherwise hold this column back on every swap. */}
            <div className="a-settle" style={delay(0)}>
              <div className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid h-11 w-11 shrink-0 place-items-center rounded-full',
                    area.light ? 'text-ink-800' : 'text-white',
                  )}
                  style={{ background: `linear-gradient(135deg, ${area.from}, ${area.to})` }}
                >
                  <area.icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
                </span>
                <p className="text-meta uppercase text-ink-600">Typische Bausteine</p>
              </div>
              <p className="mt-4 text-h4 text-content-strong">{area.label}</p>
              <p className="mt-2 text-small text-content lg:hidden">{area.description}</p>
              <p className="mt-3 text-small text-content-muted">
                Ob ein Baustein steuerfrei bleibt, hängt im Einzelfall von den Voraussetzungen ab.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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
                    {alsoIn(b.name, active).map((other) => (
                      <span
                        key={other}
                        className="mt-2 flex items-center gap-2 text-[0.8125rem] font-medium text-ink-600"
                      >
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${AREAS[other].from}, ${AREAS[other].to})`,
                          }}
                        />
                        Wirkt auch in: {AREAS[other].label}
                      </span>
                    ))}
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
