import type { CSSProperties } from 'react';
import { fensterImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Eyebrow from './ui/Eyebrow';
import Accordion from './ui/Accordion';
import Image from './ui/Image';
import SplitWords from './ui/SplitWords';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

const painPoints = [
  'Auf Ihre Stellenanzeigen kommen zu wenige passende Bewerbungen.',
  'Gute Leute gehen nach ein paar Jahren zu größeren Arbeitgebern.',
  'Es gibt Benefits, aber kaum jemand nutzt sie.',
  'Niemand weiß genau, was steuerlich erlaubt ist.',
  'In Anzeigen und Gesprächen bleiben Ihre Benefits vage.',
];

const impacts = [
  {
    title: 'Längere Vakanzzeiten',
    description: 'Stellen bleiben Monate offen, Aufträge warten.',
    details:
      'Schlüsselpositionen bleiben unbesetzt, Projekte verschieben sich, und Ihr Team fängt die Arbeit mit Überstunden auf. Die passenden Bewerbenden unterschreiben in der Zwischenzeit bei einem Arbeitgeber, der klarer sagt, was er bietet.',
  },
  {
    title: 'Steigende Gehaltskosten',
    description: 'Sie zahlen mehr und gewinnen nichts dazu.',
    details:
      'Jede Gehaltsrunde wird teurer, aber Ihr Betrieb wird dadurch nicht attraktiver als der nächste. Ein großer Teil jeder Erhöhung geht an Steuern und Sozialabgaben, und beim nächsten Angebot der Konkurrenz beginnt es von vorn.',
  },
  {
    title: 'Höhere Fluktuation',
    description: 'Ihre Besten sind die Ersten, die gehen.',
    details:
      'Mit jeder Kündigung gehen Wissen und Kundenbeziehungen. Dazu kommen Recruiting, Einarbeitung und Monate, bis die neue Person so weit ist wie die alte. Und wer bleibt, merkt sich, wie oft das passiert.',
  },
  {
    title: 'Verschenkte Steuerpotenziale',
    description: 'Steuerfreie Spielräume bleiben liegen.',
    details:
      'Allein der monatliche Sachbezug erlaubt 600 € pro Person und Jahr, steuer- und sozialversicherungsfrei. Für Gesundheitsförderung kommen bis zu 600 € dazu. Wer das nicht nutzt, zahlt für dieselbe Wirkung brutto deutlich mehr.',
  },
];

/**
 * Two beats: the situation as numbered columns divided by vertical rules,
 * then the consequences on a dark card. The columns arrive one by one, each
 * with its rule drawing in; the consequences come in row by row.
 */
export default function RealitaetscheckSection() {
  return (
    <Section id="realitaetscheck" tone="panel" size="lg">
      <SectionHead
        eyebrow="Kommt Ihnen das bekannt vor?"
        title="Realitätscheck: Wo Ihr Betrieb heute steht"
        lead="Im Mittelstand bleiben Stellen heute oft monatelang offen. Benefits gibt es in den meisten Betrieben trotzdem, nur kein System dahinter, das Bewerbende überzeugt."
        titleWidth="max-w-[15ch]"
      />

      {/* Five columns split by vertical hairlines; a stacked list on mobile. */}
      <Reveal
        as="ol"
        variant="group"
        className="relative mt-[clamp(3rem,5vw,4.5rem)] grid md:grid-cols-2 lg:grid-cols-5"
      >
        <span aria-hidden="true" className="a-line absolute inset-x-0 top-0 h-px bg-line" />
        {painPoints.map((point, i) => (
          <li
            key={point}
            className="relative border-b border-line px-0 py-7 md:px-6 md:first-of-type:pl-0 lg:border-b-0 lg:py-8
                       lg:last-of-type:pr-0"
            style={delay(120 + i * 110)}
          >
            {i > 0 && (
              <span aria-hidden="true" className="a-rail absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block" />
            )}
            <span aria-hidden="true" className="a-fade tnum text-meta uppercase text-ink-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="a-rise mt-4 text-body text-content-strong" lang="de" style={{ hyphens: 'auto' }}>
              {point}
            </p>
          </li>
        ))}
      </Reveal>

      {/* Consequences, on the dark card the handoff uses for this beat. */}
      <Reveal variant="group" className="mt-[clamp(3rem,5vw,4.5rem)]">
        <div className="ink-glow relative overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] bg-ink-950 p-7 sm:p-10 lg:p-14">
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="flex flex-col">
              <Eyebrow tone="onInk">Wenn sich nichts ändert</Eyebrow>
              <h3 className="a-words mt-7 max-w-[13ch] text-h2 text-white" style={delay(120)}>
                <SplitWords>Was das Ihren Betrieb kostet</SplitWords>
              </h3>
              <p className="a-rise mt-6 max-w-[44ch] text-lead text-white/65" style={delay(360)}>
                Fehlende Struktur fällt selten sofort auf. Sie zeigt sich in offenen Stellen, höheren
                Gehältern und Kündigungen, die man hätte verhindern können.
              </p>

              {/*
                The accordion beside this runs taller than the copy, so the
                photo takes up the remaining height of the column, kept clear
                of the paragraph above it.
              */}
              <div className="mt-auto hidden pt-12 lg:block">
                <Reveal variant="mask" delay={260} className="overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)]">
                  <Image
                    image={fensterImage}
                    alt="Cedrik Leibinn am Fenster mit Blick über die Stadt"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="aspect-[16/11] w-full object-cover"
                    style={{ objectPosition: '62% 30%' }}
                  />
                </Reveal>
              </div>
            </div>

            <Accordion
              tone="onInk"
              numbered
              defaultOpen={null}
              items={impacts.map((impact) => ({
                id: impact.title,
                title: impact.title,
                meta: impact.description,
                body: impact.details,
              }))}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
