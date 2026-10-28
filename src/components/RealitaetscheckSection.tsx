import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Eyebrow from './ui/Eyebrow';
import Accordion from './ui/Accordion';

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

/**
 * Two beats, as the handoff structures its problem section: the situation set
 * out as numbered columns divided by vertical rules, then the consequences on
 * a dark card. Both keep the site's existing copy verbatim.
 */
export default function RealitaetscheckSection() {
  return (
    <Section id="realitaetscheck" tone="panel" size="lg">
      <SectionHead
        eyebrow="Trifft eines der folgenden Szenarien auf Ihr Unternehmen zu?"
        title="Realitätscheck: Ihre aktuelle Ausgangslage"
        lead="Viele mittelständische Unternehmen spüren den Fachkräftemangel täglich, haben aber kein klares Benefit-System, das potenzielle Mitarbeitende überzeugt."
        titleWidth="max-w-[15ch]"
      />

      {/* Five columns split by vertical hairlines; a stacked list on mobile. */}
      <ol className="mt-[clamp(3rem,5vw,4.5rem)] grid border-t border-line md:grid-cols-2 lg:grid-cols-5">
        {painPoints.map((point, i) => (
          <Reveal
            as="li"
            key={point}
            delay={i * 70}
            className="border-b border-line px-0 py-7 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-l
                       lg:py-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
          >
            <span aria-hidden="true" className="tnum text-meta uppercase text-ink-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-4 text-body text-content-strong" lang="de" style={{ hyphens: 'auto' }}>
              {point}
            </p>
          </Reveal>
        ))}
      </ol>

      {/* Consequences, on the dark card the handoff uses for this beat. */}
      <Reveal className="mt-[clamp(3rem,5vw,4.5rem)]">
        <div className="relative overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] bg-ink-950 p-7 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <Eyebrow tone="onInk">Wenn sich nichts ändert …</Eyebrow>
              <h3 className="mt-7 max-w-[14ch] text-h2 text-white">
                Mögliche Folgen für Ihr Unternehmen
              </h3>
              <p className="mt-6 max-w-measure text-lead text-white/60">
                Ohne strukturierte Benefits drohen steigende Kosten, längere Vakanzzeiten und der
                Verlust qualifizierter Mitarbeitender an die Konkurrenz.
              </p>
            </div>

            <Accordion
              tone="onInk"
              numbered
              defaultOpen={null}
              className="border-t border-line-onInk"
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
