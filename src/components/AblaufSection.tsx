import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
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
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.09, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ablauf" tone="panel" size="lg" divided>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.div variants={item}>
          <SectionHead title="So arbeiten wir gemeinsam – Schritt für Schritt" titleWidth="max-w-[18ch]" />
        </motion.div>

        {/*
          A timeline rail with numbered nodes. The original rendered each step
          number as a 200px ghost numeral bleeding out of its own card, which
          fought the headings for attention and broke the grid.
        */}
        <div className="relative mt-16">
          <div aria-hidden="true" className="rule-fade absolute inset-x-0 top-[1.125rem] hidden h-px lg:block" />

          <ol className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {processSteps.map((step) => (
              <motion.li variants={item} key={step.stepNumber} className="relative">
                <span
                  className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-line
                             bg-panel text-small font-semibold tabular-nums text-ink-600"
                >
                  {step.stepNumber}
                </span>

                <h3 className="mt-6 max-w-[15ch] text-h4">{step.title}</h3>
                <p className="mt-3 max-w-[38ch] text-small leading-relaxed text-content">
                  {step.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div variants={item} className="mt-14 border-t border-line pt-8">
          {/* Previously scrolled to a #kontakt anchor that does not exist here. */}
          <Button to="/kontakt" variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
            Unverbindliche Beratung anfragen
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
