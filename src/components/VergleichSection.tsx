import { useState, type CSSProperties } from 'react';
import { Check, X } from 'lucide-react';
import { meetingImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Image from './ui/Image';
import SegmentedToggle from './ui/SegmentedToggle';
import { cn } from '../lib/cn';

type Mode = 'ohne' | 'mit';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/*
 * Six rows, each one an objection a Geschäftsführer of a 5–200-person firm
 * actually raises. The first five mirror the Realitätscheck's pain points;
 * the cost row carries the argument every serious player in this market
 * leads with — a tax-free euro arrives whole, a gross euro does not.
 *
 * The 50 € figure is the statutory Sachbezug limit (§ 8 Abs. 2 S. 11 EStG).
 * "Mehr als das Doppelte" is deliberately loose: the exact gross needed to
 * land 50 € net depends on tax class and income, and is higher in nearly
 * every case.
 */
const ROWS = [
  {
    area: 'Recruiting',
    ohne: 'Ihre Anzeigen versprechen „attraktive Benefits“. Was das heißt, erfahren Bewerbende frühestens im Gespräch.',
    mit: 'Jede Anzeige nennt konkrete Leistungen mit Euro-Wert. Bewerbende sehen sofort, was sie bei Ihnen mehr haben.',
  },
  {
    area: 'Bindung',
    ohne: 'Wer gehen will, vergleicht nur das Bruttogehalt. Da gewinnt meist der größere Arbeitgeber.',
    mit: 'Ihr Team spürt jeden Monat, was es an Ihnen hat. Ein Wechsel muss mehr bieten als ein paar Euro brutto.',
  },
  {
    area: 'Kosten',
    ohne: 'Damit 50 € mehr netto ankommen, kostet eine Gehaltserhöhung Sie meist mehr als das Doppelte.',
    mit: 'Ein steuerfreier Sachbezug von 50 € kostet Sie genau 50 € und kommt vollständig an.',
  },
  {
    area: 'Nutzung',
    ohne: 'Es gibt Angebote, aber kaum jemand weiß davon. Das Budget verpufft.',
    mit: 'Alle kennen ihre Leistungen und wissen, wie sie sie nutzen. Jeder Euro arbeitet.',
  },
  {
    area: 'Steuer & Recht',
    ohne: 'Niemand ist sicher, was erlaubt ist. Also passiert nichts, oder etwas, das bei der nächsten Lohnsteuerprüfung auffällt.',
    mit: 'Jeder Baustein steht auf einer klaren steuerlichen Grundlage. Ohne Grauzonen.',
  },
  {
    area: 'Verwaltung',
    ohne: 'Jede Leistung wird einzeln beantragt, geprüft und abgerechnet. Am Ende landet es auf dem Tisch der Geschäftsführung.',
    mit: 'Feste Abläufe statt Einzelfälle. Die Verwaltung läuft nebenher, nicht obendrauf.',
  },
];

/**
 * Ohne/Mit comparison. Flipping the switch turns the whole table navy and
 * swaps every description, each settling in a beat after the one above it.
 */
export default function VergleichSection() {
  const [mode, setMode] = useState<Mode>('ohne');
  const mit = mode === 'mit';

  return (
    <Section id="vergleich" tone="panel" size="lg">
      <SectionHead
        eyebrow="Der Unterschied"
        title="Einzelne Extras oder ein System"
        titleWidth="max-w-[14ch]"
      >
        <div className="mt-6 lg:mt-0">
          <p className="max-w-measure text-lead text-content">
            Das Budget kann dasselbe sein. Was es bewirkt, hängt davon ab, ob ein System dahintersteht.
            Schalten Sie um und vergleichen Sie.
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

      {/* Letterbox band: presenting the system, above the system compared. */}
      <Reveal variant="mask" className="relative mt-[clamp(2.5rem,4vw,4rem)] overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)]">
        <Image
          image={meetingImage}
          // The photo's own alt from the original build; it travels with the
          // picture rather than being rewritten for its new position.
          alt="Kundengespräch - Modernes Benefit-System"
          sizes="(min-width: 1536px) 1400px, 92vw"
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,34,0.42) 0%, rgba(0,0,34,0.06) 42%, transparent 70%)',
          }}
        />
      </Reveal>

      <Reveal variant="group" className="mt-[clamp(1.25rem,2vw,2rem)]">
        <div
          className={cn(
            'overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border transition-colors duration-500 ease-brand',
            mit ? 'border-ink-950 bg-ink-950' : 'border-line bg-panel',
          )}
        >
          <div
            className={cn(
              'grid grid-cols-[2.5rem_1fr_2.5rem] gap-4 border-b px-5 py-4 text-meta uppercase transition-colors duration-500',
              'sm:grid-cols-[3.5rem_0.55fr_1.45fr_3rem] sm:px-8',
              mit ? 'border-line-onInk text-white/45' : 'border-line text-content-muted',
            )}
          >
            <span>Nr.</span>
            <span>Bereich</span>
            <span className="hidden sm:block">{mit ? 'Mit System' : 'Ohne System'}</span>
            <span className="sr-only">Status</span>
          </div>

          <ul>
            {ROWS.map((row, i) => (
              <li
                key={row.area}
                className={cn(
                  'a-rise grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-x-4 gap-y-2 border-b px-5 py-5',
                  'transition-colors duration-500 last:border-b-0 sm:grid-cols-[3.5rem_0.55fr_1.45fr_3rem] sm:px-8 sm:py-6',
                  mit ? 'border-line-onInk' : 'border-line',
                )}
                style={delay(100 + i * 80)}
              >
                <span className={cn('tnum text-meta transition-colors duration-500', mit ? 'text-ice-300' : 'text-ink-600')}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  className={cn(
                    'text-body font-medium transition-colors duration-500',
                    mit ? 'text-white' : 'text-content-strong',
                  )}
                >
                  {row.area}
                </span>

                {/* Keyed on the mode so each description re-settles when the switch flips. */}
                <span
                  key={mode}
                  className={cn(
                    'a-settle col-span-3 text-small leading-relaxed sm:col-span-1',
                    mit ? 'text-white/75' : 'text-content',
                  )}
                  style={delay(i * 55)}
                >
                  {mit ? row.mit : row.ohne}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    'col-start-3 row-start-1 grid h-8 w-8 place-items-center justify-self-end rounded-full',
                    'transition-colors duration-500 sm:col-start-4',
                    mit ? 'bg-ice-300 text-ink-950' : 'bg-ink-950/[0.06] text-content-faint',
                  )}
                >
                  {mit ? <Check size={15} strokeWidth={2.75} /> : <X size={15} strokeWidth={2.5} />}
                </span>
                <span className="sr-only">{mit ? 'Mit System' : 'Ohne System'}</span>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              'flex flex-col gap-5 border-t px-5 py-6 transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-8',
              mit ? 'border-line-onInk' : 'border-line',
            )}
          >
            <p key={mode} className={cn('a-settle max-w-measure text-small', mit ? 'text-white/70' : 'text-content')}>
              {mit
                ? 'Gleiches Budget, andere Wirkung. Genau dafür bauen wir Ihr System.'
                : 'So sieht es in den meisten Betrieben aus. Schalten Sie um, um den Unterschied zu sehen.'}
            </p>

            {mit ? (
              <Button to="/kontakt" variant="onInk">
                Erstgespräch sichern
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
