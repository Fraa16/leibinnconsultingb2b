import { useState, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Minus } from 'lucide-react';
import pattern3 from '../patterns/3.png';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT, transition } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import { cn } from '../lib/cn';

const painPoints = [
  'Sie erhalten deutlich weniger qualifizierte Bewerbungen als benötigt.',
  'Mitarbeitende wechseln nach einigen Jahren zu größeren Arbeitgebern.',
  'Vereinzelte Benefits existieren, werden aber kaum aktiv genutzt.',
  'Unsicherheit, was steuerlich sinnvoll oder rechtlich zulässig ist.',
  'Benefits werden in Stellenanzeigen oder Gesprächen nur unklar kommuniziert.',
];

const impacts = [
  {
    title: 'Längere Vakanzzeiten',
    description: 'Offene Stellen bleiben länger unbesetzt und bremsen Wachstum.',
    details:
      'Kritische Positionen bleiben monatelang unbesetzt, Projekte verzögern sich, und das bestehende Team muss Mehrarbeit leisten. Die Wettbewerbsfähigkeit Ihres Unternehmens leidet, während qualifizierte Bewerber sich für attraktivere Arbeitgeber entscheiden.',
  },
  {
    title: 'Steigende Gehaltskosten',
    description: 'Höhere Löhne ohne echten Attraktivitätsgewinn führen zu unnötigen Kosten.',
    details:
      'Immer höhere Gehälter ohne spürbaren Attraktivitätsgewinn gegenüber Wettbewerbern. Die Personalkosten steigen kontinuierlich, ohne dass sich die Position Ihres Unternehmens als attraktiver Arbeitgeber verbessert. Dies führt zu einer Kostenspirale ohne nachhaltigen Nutzen.',
  },
  {
    title: 'Höhere Fluktuation',
    description: 'Gut qualifizierte Mitarbeitende orientieren sich schneller um.',
    details:
      'Langjährige Mitarbeitende verlassen das Unternehmen, wertvolles Know-how geht verloren. Die Kosten für Rekrutierung, Einarbeitung und der Produktivitätsverlust während der Einarbeitungsphase belasten Ihr Unternehmen zusätzlich. Die Unternehmenskultur leidet unter der ständigen Fluktuation.',
  },
  {
    title: 'Verschenkte Steuerpotenziale',
    description: 'Vorteile bleiben ungenutzt und belasten Ihre Personalkosten.',
    details:
      'Steuerliche Spielräume bleiben ungenutzt, während andere Unternehmen davon profitieren. Sie verschenken Möglichkeiten, Mitarbeitende steueroptimiert zu vergüten und zahlen unnötig hohe Lohnnebenkosten. Ihre Konkurrenz nutzt diese Vorteile bereits strategisch.',
  },
];

function ImpactAccordion({ impact }: { impact: (typeof impacts)[number] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <motion.div
      variants={reduced ? STATIC_VARIANTS : staggerChild}
      className={cn(
        'overflow-hidden rounded-xl2 border bg-surface transition-colors duration-300',
        open ? 'border-ink-200 shadow-card' : 'border-ink-100 shadow-soft hover:border-ink-200',
      )}
    >
      <h4>
        {/* aria-expanded / aria-controls were missing entirely — the accordion
            was invisible to screen readers. */}
        <button
          id={buttonId}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-5 p-6 text-left transition-colors hover:bg-ink-50/60"
        >
          <span className="flex-1">
            {/* An accent rule stands in for a step number — the brief fixes the
                site's copy, so no new visible text is introduced. */}
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'h-4 w-[3px] shrink-0 rounded-full transition-colors duration-300',
                  open ? 'bg-ink-600' : 'bg-ink-200',
                )}
              />
              <span className="text-h4 text-content-strong">{impact.title}</span>
            </span>
            <span className="mt-2 block pl-[1.4rem] text-small leading-relaxed text-content">
              {impact.description}
            </span>
          </span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={cn(
              'mt-1 shrink-0 text-ink-400 transition-transform duration-300 ease-entrance',
              open && 'rotate-180',
            )}
          />
        </button>
      </h4>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={reduced ? { duration: 0 } : transition(0.32)}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="border-t border-ink-100 pt-4">
            <p className="text-small leading-relaxed text-content">{impact.details}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RealitaetscheckSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants();
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="realitaetscheck" tone="subtle" size="lg">
      <img
        src={pattern3}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 w-80 select-none opacity-[0.55] lg:w-96"
      />

      <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div variants={item}>
            <Eyebrow>Trifft eines der folgenden Szenarien auf Ihr Unternehmen zu?</Eyebrow>
            <h2 className="mt-5 max-w-[18ch]">Realitätscheck: Ihre aktuelle Ausgangslage</h2>
            <p className="mt-5 max-w-measure text-lead text-content">
              Viele mittelständische Unternehmen spüren den Fachkräftemangel täglich, haben aber
              kein klares Benefit-System, das potenzielle Mitarbeitende überzeugt.
            </p>
          </motion.div>

          {/*
            Was a stack of solid red-500 circles with an X — visually the
            loudest thing on the page. A quiet danger-toned marker carries the
            same meaning without shouting.
          */}
          <ul className="mt-10 space-y-px overflow-hidden rounded-xl2 border border-ink-100 bg-surface shadow-soft">
            {painPoints.map((point) => (
              <motion.li
                variants={item}
                key={point}
                className="flex items-start gap-4 border-b border-ink-100 px-5 py-4 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger-surface text-danger"
                >
                  <Minus size={14} strokeWidth={2.75} />
                </span>
                <p className="text-small leading-relaxed text-content">{point}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div variants={item}>
            <Eyebrow>Wenn sich nichts ändert …</Eyebrow>
            <h3 className="mt-5 max-w-[18ch] text-h2">Mögliche Folgen für Ihr Unternehmen</h3>
            <p className="mt-5 max-w-measure text-lead text-content">
              Ohne strukturierte Benefits drohen steigende Kosten, längere Vakanzzeiten und der
              Verlust qualifizierter Mitarbeitender an die Konkurrenz.
            </p>
          </motion.div>

          <div className="mt-10 space-y-3">
            {impacts.map((impact) => (
              <ImpactAccordion key={impact.title} impact={impact} />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
