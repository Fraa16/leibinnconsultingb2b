import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import { cn } from '../lib/cn';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

type Industry = {
  id: string;
  icon: LucideIcon;
  title: string;
  situation: string;
  fits: string[];
};

/*
 * Each industry: the working reality in two sentences, and the four building
 * blocks that answer it. The building blocks are statutory instruments any
 * firm can use — the point is which ones lead for which workforce.
 */
const INDUSTRIES: Industry[] = [
  {
    id: 'handwerk',
    icon: Hammer,
    title: 'Handwerk & Bau',
    situation:
      'Früher Start, körperliche Arbeit, wechselnde Baustellen. Gefragt sind Gesundheit, Erholung und Zuschüsse, die jeden Monat ankommen.',
    fits: ['Gesundheitsförderung bis 600 € im Jahr', 'Erholungsbeihilfe', 'Sachbezug bis 50 € im Monat', 'Dienstrad zusätzlich zum Gehalt'],
  },
  {
    id: 'pflege',
    icon: Heart,
    title: 'Pflege & Soziales',
    situation:
      'Schichtdienst und hohe emotionale Belastung. Hier zählen Entlastung, Wertschätzung und Hilfe bei der Organisation von Familie und Beruf.',
    fits: ['Kinderbetreuungszuschuss', 'Gesundheitsförderung bis 600 € im Jahr', 'Erholungsbeihilfe', 'Jobticket oder Deutschlandticket'],
  },
  {
    id: 'dienstleister',
    icon: Briefcase,
    title: 'Dienstleister',
    situation:
      'Projektarbeit, Kundentermine, wechselnde Einsatzorte. Mobilität, Weiterbildung und Freiraum für die Familie haben hier das größte Gewicht.',
    fits: ['Dienstrad zusätzlich zum Gehalt', 'Deutschlandticket', 'Weiterbildung im betrieblichen Interesse', 'Internetpauschale bis 50 € im Monat'],
  },
  {
    id: 'handel',
    icon: ShoppingBag,
    title: 'Einzelhandel & Gastronomie',
    situation:
      'Wochenenden, Feiertage, Stoßzeiten. Ihr Team schätzt planbare Freizeit und Extras, die sofort im Geldbeutel ankommen.',
    fits: ['Sachbezug bis 50 € im Monat', 'Essenszuschuss', 'Personalrabatt bis 1.080 € im Jahr', 'Erholungsbeihilfe'],
  },
  {
    id: 'produktion',
    icon: Cog,
    title: 'Produktion & Fertigung',
    situation:
      'Schichtarbeit, Präzision, körperliche Anforderungen. Gesundheitsvorsorge und Absicherung fürs Alter punkten hier am stärksten.',
    fits: ['Betriebliche Altersvorsorge mit Zuschuss', 'Betriebliche Krankenversicherung', 'Gesundheitsförderung bis 600 € im Jahr', 'Sachbezug bis 50 € im Monat'],
  },
  {
    id: 'verwaltung',
    icon: FileText,
    title: 'Verwaltung & Bürobetriebe',
    situation:
      'Bildschirmarbeit und lange Sitzzeiten. Gefragt sind Angebote für Gesundheit, Mobilität und flexibles Arbeiten.',
    fits: ['Internetpauschale bis 50 € im Monat', 'Gesundheitsförderung bis 600 € im Jahr', 'Dienstrad zusätzlich zum Gehalt', 'Deutschlandticket'],
  },
];

/**
 * Industry explorer: six tabs, one panel. Showing one industry at a time is
 * the point — six full descriptions side by side was a wall nobody read; a
 * visitor picks their own and gets their situation and four concrete
 * building blocks.
 *
 * Proper tabs semantics: arrow keys move between industries, and only the
 * selected tab is in the tab order.
 */
export default function BranchenSection() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const industry = INDUSTRIES[active];

  const choose = (i: number, focus = false) => {
    setActive(i);
    if (focus) listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = INDUSTRIES.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    choose(next[event.key], true);
  };

  return (
    <Section id="branchen" tone="canvas" size="lg">
      <SectionHead
        eyebrow="Branchen"
        title="Was in Ihrer Branche wirkt"
        lead="Im Schichtbetrieb zählt etwas anderes als im Büro. Wählen Sie Ihre Branche und sehen Sie, welche Bausteine dort am meisten bewirken."
        titleWidth="max-w-[13ch]"
      />

      <Reveal variant="group" className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10">
        {/* ── Tabs ── */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Branchen"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1.5"
        >
          {INDUSTRIES.map((item, i) => {
            const on = active === i;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                aria-selected={on}
                aria-controls="branchen-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => choose(i)}
                className={cn(
                  'a-rise group flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left',
                  'transition-[background-color,border-color,color,box-shadow] duration-300 ease-brand lg:gap-4 lg:px-4 lg:py-3.5',
                  on
                    ? 'border-ink-950 bg-ink-950 text-white shadow-cta'
                    : 'border-line bg-panel text-content-strong hover:border-ink-300',
                )}
                style={delay(80 + i * 70)}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    // No icon on phones: two tabs share a row there, and the label needs the width.
                    'hidden h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 sm:grid lg:h-10 lg:w-10',
                    on ? 'bg-white/10 text-ice-300' : 'bg-canvas text-ink-600 group-hover:bg-ink-50',
                  )}
                >
                  <item.icon size={18} strokeWidth={1.7} />
                </span>
                <span className="text-small font-medium leading-tight lg:text-body" lang="de" style={{ hyphens: 'auto' }}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Panel ── */}
        <div
          id="branchen-panel"
          role="tabpanel"
          aria-labelledby={`tab-${industry.id}`}
          className="a-rise relative overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)] bg-ink-950 p-7 sm:p-10 lg:p-12"
          style={delay(260)}
        >
          <div aria-hidden="true" className="ink-glow pointer-events-none absolute inset-0" />

          {/* Keyed on the industry so the panel re-settles on every switch. */}
          <div key={industry.id} className="relative">
            <div className="a-settle flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ice-300 text-ink-950">
                <industry.icon size={24} strokeWidth={1.6} />
              </span>
              <span className="tnum text-meta uppercase text-ice-300">
                {String(active + 1).padStart(2, '0')} / {String(INDUSTRIES.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="a-settle mt-8 text-h2 text-white" style={delay(60)}>
              {industry.title}
            </h3>
            <p className="a-settle mt-5 max-w-measure text-lead text-white/70" style={delay(120)}>
              {industry.situation}
            </p>

            <p className="a-settle mt-10 text-meta uppercase text-white/45" style={delay(180)}>
              Passende Bausteine
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {industry.fits.map((fit, i) => (
                <li
                  key={fit}
                  className="a-settle flex items-start gap-3 rounded-xl2 border border-line-onInk bg-white/[0.04] px-4 py-3.5"
                  style={delay(220 + i * 60)}
                >
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ice-300 text-ink-950">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="text-small text-white">{fit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
