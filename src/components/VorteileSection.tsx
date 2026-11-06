import type { CSSProperties, RefObject } from 'react';
import { Building2, Network, ShieldCheck, Route, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import SplitWords from './ui/SplitWords';
import { useCountUp } from '../hooks/useReveal';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/*
 * One line each. The previous version gave every point three sentences of
 * reasoning; on a page like this a reader takes in the title and maybe a
 * clause, so the clause is all that is left.
 */
const POINTS: { title: string; line: string; icon: LucideIcon }[] = [
  { title: 'Fokus auf KMU', line: 'Gebaut für Betriebe ohne eigene HR-Abteilung.', icon: Building2 },
  { title: 'Ein System, keine Einzellösungen', line: 'Benefits, Arbeitgebermarke und Recruiting greifen ineinander.', icon: Network },
  { title: 'Steuerlich durchdacht', line: 'Alle gesetzlichen Spielräume genutzt, keine Grauzonen.', icon: ShieldCheck },
  { title: 'Begleitung bis zum Ende', line: 'Von der Bestandsaufnahme bis zur Kommunikation an Ihr Team.', icon: Route },
  { title: 'Praxisnah umgesetzt', line: 'Einfach zu erklären und leicht zu verwalten. Deshalb wird es genutzt.', icon: Wrench },
];

function ProofTile() {
  const { ref, current } = useCountUp(55, 1600);
  return (
    <div className="flex h-full flex-col justify-between bg-panel p-7 lg:p-9">
      <p className="text-meta uppercase text-content-muted">Vertrauen</p>
      <div>
        <p
          ref={ref as RefObject<HTMLParagraphElement>}
          className="tnum mt-6 text-[clamp(4rem,8vw,6.5rem)] font-medium leading-none tracking-[-0.05em] text-ink-600"
        >
          {Math.round(current)}+
        </p>
        <p className="mt-3 text-h4 text-content-strong">Mandanten</p>
      </div>
    </div>
  );
}

/**
 * Why us, as a bento. The navy head tile states the difference that matters
 * against the benefit platforms this firm competes with: they supply the
 * mechanics, not the decision about what fits.
 */
export default function VorteileSection() {
  return (
    <Section id="vorteile" tone="canvas" size="lg">
      <Reveal
        variant="group"
        className="grid gap-px overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line bg-line
                   sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Head tile: two columns, two rows on lg. */}
        <div className="ink-glow relative flex flex-col justify-between bg-ink-950 p-7 sm:col-span-2 lg:row-span-2 lg:p-11">
          <div className="relative">
            <Eyebrow tone="onInk">Warum Leibinn Consulting</Eyebrow>
            <h2 className="a-words mt-7 max-w-[15ch] text-h2 text-white" style={delay(120)}>
              <SplitWords>Kein Tool von der Stange. Ein System für Ihren Betrieb.</SplitWords>
            </h2>
            <p className="a-rise mt-6 max-w-[42ch] text-body text-white/65" style={delay(420)}>
              Benefit-Plattformen liefern die Abwicklung. Welche Leistungen zu Ihrem Betrieb passen,
              entscheiden sie nicht. Genau da setzen wir an.
            </p>
          </div>

          <div className="a-rise relative mt-10" style={delay(540)}>
            <Button to="/kontakt" variant="onInk">
              Im Erstgespräch prüfen
            </Button>
          </div>
        </div>

        {POINTS.map((point, i) => (
          <div
            key={point.title}
            className={
              'group relative bg-panel p-7 transition-colors duration-300 hover:bg-raised lg:p-9' +
              (i === 4 ? ' lg:col-span-2' : '')
            }
          >
            <div className="a-rise" style={delay(160 + i * 90)}>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-canvas text-ink-600
                           transition-colors duration-300 group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-ice-300"
              >
                <point.icon size={19} strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-h4">{point.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-content">{point.line}</p>
            </div>
          </div>
        ))}

        <div className="a-rise lg:col-span-2" style={delay(620)}>
          <ProofTile />
        </div>
      </Reveal>
    </Section>
  );
}
