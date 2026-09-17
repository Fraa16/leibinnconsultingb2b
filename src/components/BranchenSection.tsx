import { motion, useReducedMotion } from 'framer-motion';
import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';

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
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.06, 0.1);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="branchen" tone="canvas" size="lg">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.div variants={item}>
          <SectionHead
            title="Lösungen, die zu Ihrer Branche passen"
            body="Jede Branche hat ihre eigenen Herausforderungen. Wir entwickeln Benefit-Systeme, die zur Realität Ihrer Mitarbeitenden passen."
            align="center"
            titleWidth="max-w-[20ch]"
          />
        </motion.div>

        {/*
          Shared-border grid: the wrapper's background shows through a 1px gap,
          so the cells read as one ruled table rather than six floating cards.
        */}
        <motion.div
          variants={item}
          className="mt-14 grid gap-px overflow-hidden rounded-xl4 border border-line bg-line
                     sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="group bg-panel p-7 transition-colors duration-300 hover:bg-raised lg:p-8"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line
                           bg-canvas text-ink-600 transition-colors duration-300
                           group-hover:border-ink-600 group-hover:bg-ink-600 group-hover:text-white"
              >
                <industry.icon size={19} strokeWidth={1.75} />
              </span>

              <h3 className="mt-6 text-h4">{industry.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-content">{industry.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
