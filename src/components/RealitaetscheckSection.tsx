import { useState, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT, transition } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
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

function ImpactRow({ impact }: { impact: (typeof impacts)[number] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();

  return (
    <div className="border-t border-line first:border-t-0">
      <h4>
        <button
          id={`${id}-button`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="group flex w-full items-start justify-between gap-5 py-5 text-left"
        >
          <span className="flex-1">
            <span
              className={cn(
                'block text-h4 transition-colors duration-200',
                open ? 'text-ink-600' : 'text-content-strong group-hover:text-ink-600',
              )}
            >
              {impact.title}
            </span>
            <span className="mt-1.5 block text-small leading-relaxed text-content">
              {impact.description}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200',
              open
                ? 'border-ink-600 bg-ink-600 text-white'
                : 'border-line text-content-muted group-hover:border-ink-300 group-hover:text-ink-600',
            )}
          >
            {open ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
          </span>
        </button>
      </h4>

      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={reduced ? { duration: 0 } : transition(0.32)}
        className="overflow-hidden"
      >
        <p className="max-w-measure pb-6 pr-10 text-small leading-relaxed text-content">
          {impact.details}
        </p>
      </motion.div>
    </div>
  );
}

export default function RealitaetscheckSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants();
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="realitaetscheck" tone="canvas" size="lg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="overflow-hidden rounded-xl4 border border-line bg-panel"
      >
        <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <motion.div variants={item} className="p-7 sm:p-10 lg:p-12">
            <SectionHead
              eyebrow="Trifft eines der folgenden Szenarien auf Ihr Unternehmen zu?"
              title="Realitätscheck: Ihre aktuelle Ausgangslage"
              body="Viele mittelständische Unternehmen spüren den Fachkräftemangel täglich, haben aber kein klares Benefit-System, das potenzielle Mitarbeitende überzeugt."
              titleWidth="max-w-[16ch]"
            />

            {/*
              A quiet numbered ledger. The original rendered these as solid
              red circles with an X, which was the loudest thing on the page
              and read as an error state rather than a diagnostic.
            */}
            <ul className="mt-9">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-4 border-t border-line py-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ice-400"
                  />
                  <p className="text-small leading-relaxed text-content">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="bg-raised p-7 sm:p-10 lg:p-12">
            <SectionHead
              eyebrow="Wenn sich nichts ändert …"
              title="Mögliche Folgen für Ihr Unternehmen"
              body="Ohne strukturierte Benefits drohen steigende Kosten, längere Vakanzzeiten und der Verlust qualifizierter Mitarbeitender an die Konkurrenz."
              as="h3"
              titleWidth="max-w-[16ch]"
            />

            <div className="mt-8">
              {impacts.map((impact) => (
                <ImpactRow key={impact.title} impact={impact} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
