import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Button from './ui/Button';

const processSteps = [
  {
    stepNumber: 1,
    title: 'Analyse & Standortbestimmung',
    text: 'Im Erstgespräch erfassen wir Ihre aktuelle Situation, Ihre Ziele und Herausforderungen. Wir analysieren, welche Benefits bereits existieren und wo Optimierungspotenzial liegt.',
  },
  {
    stepNumber: 2,
    title: 'Konzeption & Budgetrahmen',
    text: 'Wir entwickeln ein maßgeschneidertes Benefit-System, das zu Ihrer Branche, Ihren Mitarbeitenden und Ihrem Budget passt. Sie erhalten eine klare Übersicht über Kosten und erwartete Effekte.',
  },
  {
    stepNumber: 3,
    title: 'Umsetzung & Kommunikation',
    text: 'Gemeinsam setzen wir das Benefit-System um und entwickeln eine Kommunikationsstrategie für interne und externe Zielgruppen. Ihre Mitarbeitenden und Bewerbende erfahren klar, was Sie bieten.',
  },
  {
    stepNumber: 4,
    title: 'Feinschliff & Weiterentwicklung',
    text: 'Nach der Einführung begleiten wir Sie bei der Optimierung. Wir passen das System an neue Anforderungen an und stellen sicher, dass es langfristig wirksam bleibt.',
  },
];

export default function AblaufSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ablauf" tone="subtle" size="lg">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.h2 variants={item} className="max-w-[20ch]">
          So arbeiten wir gemeinsam – Schritt für Schritt
        </motion.h2>

        {/* A hairline connects the four steps into a single sequence. */}
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="rule-fade absolute inset-x-0 top-0 hidden h-px lg:block"
          />

          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <motion.li variants={item} key={step.stepNumber} className="group relative pt-8">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 right-2 select-none text-[7.5rem] font-semibold leading-none
                             transition-transform duration-300 ease-entrance group-hover:-translate-y-1 lg:text-[8.5rem]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(42,45,124,0.22) 0%, rgba(42,45,124,0.16) 58%, rgba(42,45,124,0) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {step.stepNumber}
                </span>

                {/* Node on the connector line. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 hidden h-2.5 w-2.5 rounded-full bg-ink-600
                             ring-4 ring-surface-subtle transition-transform duration-300 group-hover:scale-125 lg:block"
                />

                <div className="relative">
                  <h3 className="max-w-[16ch] text-h4">{step.title}</h3>
                  <p className="mt-3 text-small leading-relaxed text-content">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div variants={item} className="mt-16 flex justify-center">
          {/* Previously scrollToSection('kontakt') — there is no #kontakt
              element on the homepage, so this button did nothing. */}
          <Button to="/kontakt" variant="link" icon={<ArrowRight size={16} />}>
            Unverbindliche Beratung anfragen
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
