import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText } from 'lucide-react';
import Section from './ui/Section';
import SectionHeading from './ui/SectionHeading';
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

export default function BranchenSection() {
  return (
    <Section id="branchen" tone="canvas">
      <div className="lc-inner">
        <SectionHeading
          eyebrow="Branchen"
          title="Lösungen, die zu Ihrer"
          titleMuted="Branche passen"
          lead="Jede Branche hat ihre eigenen Herausforderungen. Wir entwickeln Benefit-Systeme, die zur Realität Ihrer Mitarbeitenden passen."
        />

        {/* Borderless editorial grid — no card chrome, no hover lift.
            Structure comes from the hairlines and the whitespace. */}
        <div className="mt-16 grid gap-x-14 gap-y-0 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.title} delay={(i % 3) * 0.05}>
                <div className="lc-rule h-full py-8">
                  <Icon className="h-5 w-5 text-navy" aria-hidden="true" strokeWidth={1.75} />
                  <h3 className="t-h3 mt-5">{industry.title}</h3>
                  <p className="t-body mt-2.5 text-ink-muted">{industry.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
