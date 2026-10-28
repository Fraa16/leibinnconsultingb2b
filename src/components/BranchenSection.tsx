import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';

const industries = [
  {
    icon: Hammer,
    title: 'Handwerk & Bau',
    description:
      'Körperlich anspruchsvolle Arbeit, früher Arbeitsbeginn, Außeneinsätze – Ihre Mitarbeitenden brauchen Benefits, die Gesundheit und Erholung unterstützen.',
  },
  {
    icon: Heart,
    title: 'Pflege & Soziales',
    description:
      'Hohe emotionale Belastung, Schichtdienst, direkte Arbeit mit Menschen – hier zählen Benefits, die Wertschätzung zeigen und Entlastung bieten.',
  },
  {
    icon: Briefcase,
    title: 'Dienstleister',
    description:
      'Projektarbeit, Kundenkontakt, flexible Einsatzorte – Benefits sollten Mobilität, Weiterbildung und Work-Life-Balance fördern.',
  },
  {
    icon: ShoppingBag,
    title: 'Einzelhandel & Gastronomie',
    description:
      'Wochenend- und Feiertagsarbeit, direkter Kundenkontakt, Spitzenzeiten – Ihre Mitarbeitenden schätzen planbare Freizeit und finanzielle Extras.',
  },
  {
    icon: Cog,
    title: 'Produktion & Fertigung',
    description:
      'Schichtarbeit, körperliche Anforderungen, Präzisionsarbeit – hier punkten Sie mit Gesundheitsvorsorge und Altersabsicherung.',
  },
  {
    icon: FileText,
    title: 'Verwaltung & Bürobetriebe',
    description:
      'Bildschirmarbeit, lange Sitzzeiten, konzentrierte Tätigkeiten – Benefits für Gesundheit, Mobilität und flexible Arbeitsmodelle sind gefragt.',
  },
];

/** Six fields as one ruled table rather than six floating cards. */
export default function BranchenSection() {
  return (
    <Section id="branchen" tone="panel" size="lg">
      <SectionHead
        title="Lösungen, die zu Ihrer Branche passen"
        lead="Jede Branche hat ihre eigenen Herausforderungen. Wir entwickeln Benefit-Systeme, die zur Realität Ihrer Mitarbeitenden passen."
        titleWidth="max-w-[16ch]"
      />

      <div className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-px overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, i) => (
          <Reveal
            key={industry.title}
            delay={i * 60}
            className="group bg-panel p-7 transition-colors duration-300 hover:bg-raised lg:p-9"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl2 border border-line
                         bg-canvas text-ink-600 transition-colors duration-300
                         group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-ice-300"
            >
              <industry.icon size={19} strokeWidth={1.6} />
            </span>

            <h3 className="mt-6 text-h4" lang="de" style={{ hyphens: 'auto' }}>
              {industry.title}
            </h3>
            <p className="mt-3 text-small leading-relaxed text-content">{industry.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
