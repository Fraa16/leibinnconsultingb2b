import { ArrowUpRight } from 'lucide-react';
import { loungeImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Image from './ui/Image';

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

/**
 * Process, on the handoff's pattern: a narrow statement column beside a
 * bordered list of steps, each opened by a pill badge carrying its ordinal.
 */
export default function AblaufSection() {
  return (
    <Section id="ablauf" tone="canvas" size="lg">
      {/*
        The headline runs full width: at 46 characters it was breaking into
        five lines when confined to a narrow sticky column.
      */}
      <SectionHead
        title="So arbeiten wir gemeinsam – Schritt für Schritt"
        titleWidth="max-w-[22ch]"
        className="lg:!grid-cols-1"
      />

      {/*
        The photo holds a sticky column beside the steps. Four steps make a
        tall list, and a column of nothing but rules reads as a document;
        pinning the image keeps the people in view the whole way down it.
      */}
      <div className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)] border border-line bg-panel">
            <Image
              image={loungeImage}
              alt="Cedrik Leibinn im Beratungsgespräch mit einem Mandanten"
              sizes="(min-width: 1024px) 34vw, 100vw"
              // Kept near the master's own 3:2. A portrait crop of a wide
              // two-shot cuts horizontally, and one of the two people with it.
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <ol className="border-t border-line">
            {processSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.stepNumber}
                delay={i * 80}
                className="group border-b border-line py-8 lg:py-10"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
                  <span
                    className="tnum inline-flex h-8 shrink-0 items-center rounded-full border border-ink-600/25
                               bg-ink-600/[0.06] px-3.5 text-meta uppercase text-ink-700"
                  >
                    {String(step.stepNumber).padStart(2, '0')}
                  </span>

                  <div className="flex-1">
                    <h3 className="max-w-[20ch] text-h3">{step.title}</h3>
                    <p className="mt-3 max-w-measure text-body text-content">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            {/* Previously scrolled to a #kontakt anchor that does not exist here. */}
            <Button to="/kontakt" variant="secondary" icon={<ArrowUpRight size={17} />}>
              Unverbindliche Beratung anfragen
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
