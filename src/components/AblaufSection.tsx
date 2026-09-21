import Section from './ui/Section';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import CTAButton from './ui/CTAButton';

const processSteps = [
  {
    title: 'Analyse & Standortbestimmung',
    text: 'Im Erstgespräch erfassen wir Ihre aktuelle Situation, Ihre Ziele und Herausforderungen. Wir analysieren, welche Benefits bereits existieren und wo Optimierungspotenzial liegt.',
  },
  {
    title: 'Konzeption & Budgetrahmen',
    text: 'Wir entwickeln ein maßgeschneidertes Benefit-System, das zu Ihrer Branche, Ihren Mitarbeitenden und Ihrem Budget passt. Sie erhalten eine klare Übersicht über Kosten und erwartete Effekte.',
  },
  {
    title: 'Umsetzung & Kommunikation',
    text: 'Gemeinsam setzen wir das Benefit-System um und entwickeln eine Kommunikationsstrategie für interne und externe Zielgruppen. Ihre Mitarbeitenden und Bewerbende erfahren klar, was Sie bieten.',
  },
  {
    title: 'Feinschliff & Weiterentwicklung',
    text: 'Nach der Einführung begleiten wir Sie bei der Optimierung. Wir passen das System an neue Anforderungen an und stellen sicher, dass es langfristig wirksam bleibt.',
  },
];

export default function AblaufSection() {
  return (
    <Section id="ablauf" tone="dark" className="mt-3 md:mt-5">
      <div className="lc-inner">
        <SectionHeading
          eyebrow="Wie wir arbeiten"
          title="So arbeiten wir gemeinsam"
          titleMuted="– Schritt für Schritt"
        />

        {/* Timeline: a single centre rail on desktop with steps alternating
            either side; a left rail on mobile. The old version stacked four
            cards each with a 200px number bleeding out of its own box. */}
        <ol className="relative mt-20 md:mt-24">
          {/* The rail */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
          />

          {processSteps.map((step, i) => {
            const isRight = i % 2 === 1;
            return (
              <li key={step.title} className="relative pb-14 last:pb-0">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-navy-deep md:left-1/2 md:-translate-x-1/2 ${
                    i === 0 ? 'bg-white' : 'bg-white/45'
                  }`}
                />

                <Reveal delay={i * 0.06}>
                  <div
                    className={`pl-10 md:w-[calc(50%-3rem)] md:pl-0 ${
                      isRight ? 'md:ml-auto md:pl-12 md:text-left' : 'md:mr-auto md:pr-12 md:text-right'
                    }`}
                  >
                    <span className="t-small block tabular-nums text-white/55">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="t-h3 mt-2 text-white">{step.title}</h3>
                    <p
                      className={`t-body mt-3 text-white/60 ${
                        isRight ? 'md:mr-auto' : 'md:ml-auto'
                      } md:max-w-sm`}
                    >
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.1} className="mt-16 flex justify-center">
          <CTAButton to="/kontakt" variant="ghost">
            Unverbindliche Beratung anfragen
          </CTAButton>
        </Reveal>
      </div>
    </Section>
  );
}
