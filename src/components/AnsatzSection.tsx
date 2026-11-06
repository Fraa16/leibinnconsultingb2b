import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gespraechImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Image from './ui/Image';
import Reveal from './ui/Reveal';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/** Each principle reads "Lead-in: body"; the lead-in carries the weight. */
const principles = [
  'System statt Sammlung: Jede Leistung hat ihren Platz, und alle wissen, was es gibt.',
  'Wirkung pro Euro: Steuerfreie Bausteine kommen vollständig bei Ihrem Team an.',
  'Rechtssicher: Jeder Baustein steht auf einer klaren steuerlichen Grundlage, ohne Grauzonen.',
  'Sichtbar nach außen: Ihre Stellenanzeigen nennen konkrete Leistungen statt „attraktiver Benefits“.',
];

function splitLeadIn(text: string): [string, string] {
  const at = text.indexOf(':');
  return at === -1 ? ['', text] : [text.slice(0, at + 1), text.slice(at + 1).trimStart()];
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = () => window.matchMedia('(min-width: 1024px)').matches;

/**
 * Scroll-linked travel for the photo: it starts level with the headline and
 * comes to rest level with the body copy, arriving as the reader does.
 *
 * The distance is measured from the layout rather than guessed, so it holds
 * however the headline wraps. The column reserves that distance as bottom
 * padding, which keeps the travelling photo from ever overlapping the ledger
 * below. Transforms are written straight to the element on scroll — going
 * through React state would re-render the section every frame.
 */
function useTravel() {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Measure: how far below the headline the body copy starts.
  useEffect(() => {
    const measure = () => {
      if (!headRef.current || !bodyRef.current || !wide()) {
        setDistance(0);
        return;
      }
      const head = headRef.current.getBoundingClientRect().top;
      const body = bodyRef.current.getBoundingClientRect().top;
      setDistance(Math.max(0, Math.round(body - head)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (headRef.current) observer.observe(headRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Move: progress runs from the headline entering the lower viewport to the
  // body copy reaching the upper third.
  useEffect(() => {
    const photo = photoRef.current;
    const head = headRef.current;
    if (!photo || !head) return;

    if (!distance) {
      photo.style.transform = '';
      return;
    }
    if (reducedMotion()) {
      photo.style.transform = `translate3d(0, ${distance}px, 0)`;
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = head.getBoundingClientRect().top;
      const start = vh * 0.85;
      const end = vh * 0.15 - distance * 0.35;
      const p = Math.min(1, Math.max(0, (start - top) / (start - end)));
      // ease-out so the photo settles rather than stopping dead
      const eased = 1 - Math.pow(1 - p, 2.2);
      photo.style.transform = `translate3d(0, ${(eased * distance).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return { headRef, bodyRef, photoRef, distance };
}

/** The page's first dark anchor: the core argument, full-bleed on navy. */
export default function AnsatzSection() {
  const { headRef, bodyRef, photoRef, distance } = useTravel();

  return (
    <Section id="ansatz" tone="ink" size="lg" className="ink-glow">
      <div className="relative grid items-start gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div ref={headRef}>
            <SectionHead
              eyebrow="Der Ansatz"
              title="Warum Stückwerk nicht reicht"
              tone="onInk"
              titleWidth="max-w-[17ch]"
              className="lg:!grid-cols-1"
            />
          </div>

          <Reveal variant="group" className="mt-[clamp(2.5rem,4vw,3.5rem)]">
            <div ref={bodyRef} className="space-y-6">
              <p className="a-rise max-w-measure text-lead text-white/70" style={delay(80)}>
                Die meisten Betriebe haben längst Benefits: einen Tankgutschein hier, einen
                Fitnesszuschuss dort. Entstanden sind sie spontan, erklärt hat sie niemand richtig. Im
                Alltag nimmt sie kaum jemand wahr, und in keiner Stellenanzeige machen sie einen
                Unterschied.
              </p>
              <p className="a-rise max-w-measure text-lead text-white/70" style={delay(200)}>
                Ein Benefit-System ordnet diese Bausteine. Jede Leistung hat einen Zweck, einen klaren
                Wert in Euro und eine saubere steuerliche Grundlage. Führungskräfte können es in zwei
                Sätzen erklären, und Bewerbende sehen auf einen Blick, warum sich ein Wechsel zu Ihnen
                lohnt.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Bottom padding reserves the travel distance so nothing below is overlapped. */}
        <div style={{ paddingBottom: distance }}>
          <div ref={photoRef} className="will-change-transform">
            <Reveal variant="mask" delay={200} className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)]">
              <Image
                image={gespraechImage}
                alt="Cedrik Leibinn im Erstgespräch mit einer Mandantin"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* The four principles as a ruled ledger across the full width. */}
      <Reveal
        variant="group"
        className="relative mt-[clamp(3rem,5vw,4.5rem)] grid sm:grid-cols-2 lg:grid-cols-4"
      >
        <span aria-hidden="true" className="a-line absolute inset-x-0 top-0 h-px bg-line-onInk" />
        {principles.map((point, i) => {
          const [leadIn, rest] = splitLeadIn(point);
          return (
            <div
              key={point}
              className="relative border-b border-line-onInk py-7 sm:border-b-0 sm:px-6 sm:py-8
                         sm:first-of-type:pl-0 lg:last-of-type:pr-0"
              style={delay(100 + i * 110)}
            >
              {i > 0 && (
                <span aria-hidden="true" className="a-rail absolute bottom-0 left-0 top-0 hidden w-px bg-line-onInk lg:block" />
              )}
              {/* Inline, so the sentence is not split in the rendered text. */}
              <p className="a-rise text-small leading-relaxed text-white/60">
                <strong className="font-medium text-white">{leadIn}</strong> {rest}
              </p>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
