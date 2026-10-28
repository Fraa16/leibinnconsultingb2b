import { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import RangeSlider from './ui/RangeSlider';
import Slot from './ui/Slot';
import { euro, de } from '../hooks/useReveal';
import { cn } from '../lib/cn';

/*
 * Statutory allowances. These are the figures the brand handoff specifies,
 * and they drive the result, so they are real rather than placeholders.
 *
 * They must be confirmed by a tax adviser before launch — the amounts and
 * their conditions change, and this tool states them to prospects.
 */
const ALLOWANCES = [
  {
    id: 'gesundheit',
    title: 'Gesundheitsförderung',
    statute: '§ 3 Nr. 34 EStG',
    amountLabel: '600 € / Jahr',
    perYear: 600,
  },
  {
    id: 'sachbezug',
    title: 'Sachbezug',
    statute: '§ 8 Abs. 2 S. 11 EStG',
    amountLabel: '50 € / Monat',
    perYear: 50 * 12,
  },
] as const;

const PRESETS = [10, 25, 50, 100];

/**
 * Steuerfrei-Rechner.
 *
 * Interaction and arithmetic are complete; the surrounding wording is marked
 * as slots for the client. Formula per the handoff:
 *   perHead = (health ? 600 : 0) + (sachbezug ? 50 × 12 : 0)
 *   total   = perHead × employees
 */
export default function RechnerSection() {
  const [employees, setEmployees] = useState(40);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    gesundheit: true,
    sachbezug: true,
  });

  const perHead = ALLOWANCES.reduce((sum, a) => sum + (enabled[a.id] ? a.perYear : 0), 0);
  const total = perHead * employees;

  return (
    <Section id="rechner" tone="ink" size="lg">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <SectionHead
        eyebrow={<Slot tone="onInk">Platzhalter: Eyebrow</Slot>}
        title={<Slot tone="onInk">Platzhalter: Überschrift für den Rechner</Slot>}
        lead={<Slot tone="onInk">Platzhalter: ein bis zwei Sätze, die den Rechner einordnen</Slot>}
        tone="onInk"
        titleWidth="max-w-[22ch]"
        className="relative"
      />

      <Reveal className="relative mt-[clamp(3rem,5vw,4.5rem)]">
        <div className="grid overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line-onInkStrong lg:grid-cols-[1fr_1.05fr]">
          {/* ── Inputs ── */}
          <div className="bg-white/[0.04] p-7 sm:p-9 lg:p-11">
            <RangeSlider
              label="Mitarbeitende"
              value={employees}
              min={3}
              max={250}
              onChange={setEmployees}
              display={de(employees)}
              className="[&_label]:text-white/55 [&_output]:text-white [&_div:last-child]:text-white/35"
            />

            <div className="mt-7 flex flex-wrap gap-2">
              {PRESETS.map((n) => (
                <button
                  key={n}
                  onClick={() => setEmployees(n)}
                  aria-pressed={employees === n}
                  className={cn(
                    'tnum rounded-full border px-4 py-2 text-small transition-colors duration-200',
                    employees === n
                      ? 'border-ice-300 bg-ice-300 text-ink-950'
                      : 'border-line-onInkStrong text-white/70 hover:border-white/35 hover:text-white',
                  )}
                >
                  {n} MA
                </button>
              ))}
            </div>

            <div className="mt-9 space-y-3">
              {ALLOWANCES.map((a) => {
                const on = enabled[a.id];
                return (
                  <label
                    key={a.id}
                    className={cn(
                      'flex cursor-pointer items-start gap-4 rounded-xl2 border p-5 transition-colors duration-200',
                      on
                        ? 'border-ice-300/50 bg-white/[0.07]'
                        : 'border-line-onInk hover:border-line-onInkStrong',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setEnabled((prev) => ({ ...prev, [a.id]: !prev[a.id] }))}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors duration-200',
                        on ? 'border-ice-300 bg-ice-300 text-ink-950' : 'border-white/30',
                      )}
                    >
                      {on && <Check size={12} strokeWidth={3} />}
                    </span>

                    <span className="flex-1">
                      <span className="block text-body font-medium text-white">{a.title}</span>
                      <span className="mt-1 block text-small text-white/50">
                        <span className="tnum">{a.amountLabel}</span> · {a.statute}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ── Result ── */}
          <div className="border-t border-line-onInkStrong bg-ink-950 p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-11">
            <p className="text-meta uppercase text-white/45">
              <Slot tone="onInk">Platzhalter: Label über dem Ergebnis</Slot>
            </p>

            <p className="accent-text tnum mt-6 whitespace-nowrap text-total">{euro(total)}</p>

            <p className="mt-4 text-small text-white/55">
              für <span className="tnum text-white">{de(employees)}</span> Mitarbeitende,{' '}
              <Slot tone="onInk">Platzhalter: Zusatz</Slot>
            </p>

            <dl className="mt-9 border-t border-line-onInk">
              {ALLOWANCES.filter((a) => enabled[a.id]).map((a) => (
                <div key={a.id} className="flex items-baseline justify-between gap-4 border-b border-line-onInk py-3.5">
                  <dt className="text-small text-white/55">{a.title}</dt>
                  <dd className="tnum text-small text-white">{euro(a.perYear * employees)}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-small text-white/55">Pro Mitarbeitendem und Jahr</dt>
                <dd className="tnum text-small text-ice-300">{euro(perHead)}</dd>
              </div>
            </dl>

            <Button to="/kontakt" variant="onInk" size="xl" fullWidth className="mt-8" icon={<ArrowUpRight size={18} />}>
              <Slot>Platzhalter: CTA</Slot>
            </Button>

            <p className="mt-5 text-small leading-relaxed text-white/40">
              Vereinfachte Modellrechnung auf Basis der genannten Freibeträge. Keine Steuerberatung.
              Beträge und Voraussetzungen sind vor Veröffentlichung steuerlich zu prüfen.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
