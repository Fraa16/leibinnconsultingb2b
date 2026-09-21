import { useState, useId } from 'react';
import { Plus } from 'lucide-react';
import Section from './ui/Section';
import Pill from './ui/Pill';
import Reveal from './ui/Reveal';

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

function ImpactRow({
  impact,
  isOpen,
  onToggle,
  index,
}: {
  impact: (typeof impacts)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const uid = useId();
  const panelId = `impact-panel-${uid}`;
  const buttonId = `impact-button-${uid}`;

  return (
    <div className="lc-rule">
      <h4>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-start gap-5 py-6 text-left md:py-7"
        >
          <span className="t-small mt-1 w-6 shrink-0 tabular-nums text-white/55">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="flex-1">
            <span className="t-h3 block text-white">{impact.title}</span>
            <span className="t-body mt-1.5 block text-white/55">{impact.description}</span>
          </span>

          <span
            className={`mt-1 shrink-0 text-white/40 transition-transform duration-300 ease-brand
                        group-hover:text-ice ${isOpen ? 'rotate-45' : ''}`}
            aria-hidden="true"
          >
            <Plus size={20} />
          </span>
        </button>
      </h4>

      {/* 0fr -> 1fr animates to the content's natural height without
          measuring it in JS. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-300 ease-brand"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="t-body max-w-2xl pb-7 pl-11 text-white/60">{impact.details}</p>
        </div>
      </div>
    </div>
  );
}

export default function RealitaetscheckSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="realitaetscheck" tone="dark" className="mt-3 md:mt-5">
      <div className="lc-inner">
        {/* Asymmetric header: statement left, context right. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Pill>Trifft eines der folgenden Szenarien auf Ihr Unternehmen zu?</Pill>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-h2 mt-7 text-white">
                Realitätscheck:{' '}
                <span className="t-muted">Ihre aktuelle Ausgangslage</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-3">
            <p className="t-lead text-white/60">
              Viele mittelständische Unternehmen spüren den Fachkräftemangel täglich, haben aber
              kein klares Benefit-System, das potenzielle Mitarbeitende überzeugt.
            </p>
          </Reveal>
        </div>

        {/* Pain points — hairline rows, no decorative icons. */}
        <ul className="mt-16 md:mt-20">
          {painPoints.map((point, i) => (
            <Reveal key={point} delay={i * 0.04}>
              <li className="lc-rule flex items-baseline gap-5 py-5">
                <span className="t-small w-6 shrink-0 tabular-nums text-ice/75">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="t-lead text-white/85">{point}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Consequences */}
        <div className="mt-24 md:mt-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Reveal>
                <Pill>Wenn sich nichts ändert …</Pill>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="t-h2 mt-7 text-white">
                  Mögliche Folgen{' '}
                  <span className="t-muted">für Ihr Unternehmen</span>
                </h3>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="lg:pt-3">
              <p className="t-lead text-white/60">
                Ohne strukturierte Benefits drohen steigende Kosten, längere Vakanzzeiten und der
                Verlust qualifizierter Mitarbeitender an die Konkurrenz.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            {impacts.map((impact, i) => (
              <ImpactRow
                key={impact.title}
                impact={impact}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
            <div className="lc-rule" />
          </div>
        </div>
      </div>
    </Section>
  );
}
