import { useState } from 'react';
import { Check, X, ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SegmentedToggle from './ui/SegmentedToggle';
import Slot from './ui/Slot';
import { cn } from '../lib/cn';

type Mode = 'ohne' | 'mit';

/** Five rows, matching the five fields the Realitätscheck section sets out. */
const ROWS = [1, 2, 3, 4, 5];

/**
 * Ohne/Mit comparison.
 *
 * The toggle, the sliding thumb and the two table states are built; the row
 * wording is the client's to write, so each cell is a marked slot.
 */
export default function VergleichSection() {
  const [mode, setMode] = useState<Mode>('ohne');
  const mit = mode === 'mit';

  return (
    <Section id="vergleich" tone="panel" size="lg">
      <SectionHead
        eyebrow={<Slot>Platzhalter: Eyebrow</Slot>}
        title={<Slot>Platzhalter: Überschrift für den Vergleich</Slot>}
        titleWidth="max-w-[20ch]"
      >
        <div className="mt-6 lg:mt-0">
          <p className="max-w-measure text-lead text-content">
            <Slot>Platzhalter: ein bis zwei Sätze zur Einordnung</Slot>
          </p>
          <SegmentedToggle
            aria-label="Vergleich: ohne oder mit System"
            className="mt-6"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'ohne', label: 'Ohne System' },
              { value: 'mit', label: 'Mit System' },
            ]}
          />
        </div>
      </SectionHead>

      <Reveal className="mt-[clamp(2.5rem,4vw,4rem)]">
        <div
          className={cn(
            'overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border transition-colors duration-[350ms] ease-brand',
            mit ? 'border-line-onInkStrong bg-ink-950' : 'border-line bg-panel',
          )}
        >
          <div
            className={cn(
              'grid grid-cols-[3rem_1fr_3rem] gap-4 border-b px-5 py-4 text-meta uppercase sm:grid-cols-[4rem_0.7fr_1.3fr_3.5rem] sm:px-8',
              mit ? 'border-line-onInk text-white/40' : 'border-line text-content-muted',
            )}
          >
            <span>Nr.</span>
            <span>Bereich</span>
            <span className="hidden sm:block">{mit ? 'Mit System' : 'Ohne System'}</span>
            <span className="sr-only">Status</span>
          </div>

          <ul>
            {ROWS.map((n, i) => (
              <li
                key={n}
                className={cn(
                  'grid grid-cols-[3rem_1fr_3rem] items-center gap-4 border-b px-5 py-5 last:border-b-0 sm:grid-cols-[4rem_0.7fr_1.3fr_3.5rem] sm:px-8 sm:py-6',
                  mit ? 'border-line-onInk' : 'border-line',
                )}
              >
                <span className={cn('tnum text-meta', mit ? 'text-ice-300' : 'text-content-muted')}>
                  {String(n).padStart(2, '0')}
                </span>

                <span className={cn('text-small', mit ? 'text-white' : 'text-content-strong')}>
                  <Slot tone={mit ? 'onInk' : 'light'}>Bereich {n}</Slot>
                </span>

                <span className="col-span-3 text-small sm:col-span-1">
                  <Slot tone={mit ? 'onInk' : 'light'}>
                    Platzhalter: Beschreibung {mit ? 'mit' : 'ohne'} System
                  </Slot>
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    'col-start-3 row-start-1 grid h-8 w-8 place-items-center justify-self-end rounded-full sm:col-start-4',
                    mit ? 'bg-ice-300 text-ink-950' : 'bg-ink-950/[0.06] text-content-faint',
                  )}
                >
                  {mit ? <Check size={15} strokeWidth={2.75} /> : <X size={15} strokeWidth={2.5} />}
                </span>
                <span className="sr-only">{mit ? 'Mit System' : 'Ohne System'}</span>
                {/* Index kept so the delay stays stable across toggles. */}
                <span hidden>{i}</span>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              'flex flex-col gap-5 border-t px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8',
              mit ? 'border-line-onInk' : 'border-line',
            )}
          >
            <p className={cn('max-w-measure text-small', mit ? 'text-white/60' : 'text-content')}>
              <Slot tone={mit ? 'onInk' : 'light'}>Platzhalter: Fazit-Zeile</Slot>
            </p>

            {mit ? (
              <Button to="/kontakt" variant="onInk" icon={<ArrowUpRight size={17} />}>
                <Slot>Platzhalter: CTA</Slot>
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setMode('mit')}>
                Mit System ansehen
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
