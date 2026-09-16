import { motion, useReducedMotion } from 'framer-motion';
import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Card from './ui/Card';

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
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.07, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="branchen" tone="base" size="lg">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.div variants={item} className="mx-auto max-w-3xl text-center">
          <h2>Lösungen, die zu Ihrer Branche passen</h2>
          <p className="mx-auto mt-5 max-w-measure text-lead text-content">
            Jede Branche hat ihre eigenen Herausforderungen. Wir entwickeln Benefit-Systeme,
            die zur Realität Ihrer Mitarbeitenden passen.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <motion.div variants={item} key={industry.title}>
              <Card interactive padding="lg" className="group h-full">
                <span
                  aria-hidden="true"
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                             bg-gradient-to-br from-ink-600/[0.10] to-ice-300/25 text-ink-600
                             transition-colors duration-300 group-hover:from-ink-600 group-hover:to-ink-700 group-hover:text-white"
                >
                  <industry.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="text-h4">{industry.title}</h3>
                <p className="mt-3 text-small leading-relaxed text-content">
                  {industry.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
