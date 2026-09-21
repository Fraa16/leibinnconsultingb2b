import { useEffect, useRef, useState } from 'react';
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

/**
 * Drives the timeline from scroll position.
 *
 * The rail fills to wherever the viewport's vertical midpoint currently
 * sits on it, and a step counts as reached once its dot has crossed that
 * same midpoint — so the highlight is always exactly at the middle of the
 * screen.
 *
 * The fill height is written straight to the node rather than held in
 * state: it changes on every frame of a scroll, and re-rendering four
 * steps that often is wasted work. `reached` is state, but only changes
 * four times across the whole section.
 */
function useScrollProgress(stepCount: number) {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;

      const rect = rail.getBoundingClientRect();
      const midpoint = window.innerHeight / 2;

      if (fillRef.current) {
        const p = rect.height ? (midpoint - rect.top) / rect.height : 0;
        fillRef.current.style.height = `${Math.min(1, Math.max(0, p)) * 100}%`;
      }

      let last = -1;
      for (let i = 0; i < dotRefs.current.length; i++) {
        const dot = dotRefs.current[i];
        if (dot && dot.getBoundingClientRect().top <= midpoint) last = i;
      }
      // Returning the same value lets React skip the re-render entirely.
      setReached((prev) => (prev === last ? prev : last));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stepCount]);

  return { railRef, fillRef, dotRefs, reached };
}

export default function AblaufSection() {
  const { railRef, fillRef, dotRefs, reached } = useScrollProgress(processSteps.length);

  return (
    <Section id="ablauf" tone="dark" className="mt-3 md:mt-5">
      <div className="lc-inner">
        <SectionHeading
          eyebrow="Wie wir arbeiten"
          title="So arbeiten wir gemeinsam"
          titleMuted="– Schritt für Schritt"
        />

        <ol className="relative mt-20 md:mt-24">
          {/* Track, with the portion above the viewport midpoint filled. */}
          <div
            ref={railRef}
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
          >
            <div ref={fillRef} className="w-full bg-ice" style={{ height: '0%' }} />
          </div>

          {processSteps.map((step, i) => {
            const isRight = i % 2 === 1;
            const isReached = i <= reached;
            const isCurrent = i === reached;

            return (
              <li key={step.title} className="relative pb-14 last:pb-0">
                <span
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2
                              border-navy-deep transition-[background-color,box-shadow] duration-300
                              md:left-1/2 md:-translate-x-1/2
                              ${isReached ? 'bg-ice' : 'bg-white/30'}
                              ${isCurrent ? 'shadow-[0_0_0_5px_rgba(161,206,229,0.22)]' : ''}`}
                />

                <Reveal delay={i * 0.06}>
                  <div
                    className={`pl-10 md:w-[calc(50%-3rem)] md:pl-0 ${
                      isRight ? 'md:ml-auto md:pl-12 md:text-left' : 'md:mr-auto md:pr-12 md:text-right'
                    }`}
                  >
                    <span
                      className={`t-small block tabular-nums transition-colors duration-300 ${
                        isReached ? 'text-ice' : 'text-white/55'
                      }`}
                    >
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
