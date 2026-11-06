import { useEffect, useRef, useState } from 'react';
import { Search, PencilRuler, Rocket, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { loungeImage } from '../lib/images';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Image from './ui/Image';
import { cn } from '../lib/cn';

const STEPS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Analyse & Standortbestimmung',
    text: 'Im Erstgespräch klären wir, wo Sie stehen: welche Benefits es schon gibt, was davon genutzt wird und wo Geld liegen bleibt.',
    icon: Search,
  },
  {
    title: 'Konzeption & Budgetrahmen',
    text: 'Wir entwickeln das System passend zu Branche, Team und Budget. Sie sehen schwarz auf weiß, was es kostet und was es bringt.',
    icon: PencilRuler,
  },
  {
    title: 'Umsetzung & Kommunikation',
    text: 'Wir führen das System mit Ihnen ein und sorgen dafür, dass es ankommt: im Team, in Ihren Stellenanzeigen und im Bewerbungsgespräch.',
    icon: Rocket,
  },
  {
    title: 'Feinschliff & Weiterentwicklung',
    text: 'Nach dem Start schauen wir nach, was wirkt, und passen an, wenn sich Ihr Betrieb oder die Rechtslage ändert.',
    icon: RefreshCw,
  },
];

/**
 * Tracks how far the reader has scrolled through the step list.
 *
 * The rail's fill is written straight to the element each frame; only the
 * index of the step the fill has reached goes through React state, and that
 * changes four times per pass, not sixty times a second.
 */
function useProgress(count: number) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.transform = 'scaleY(1)';
      setReached(count - 1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The fill's leading edge sits at 60% of the viewport height.
      const edge = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (edge - rect.top) / rect.height));
      fill.style.transform = `scaleY(${p.toFixed(4)})`;

      const nodes = list.querySelectorAll<HTMLElement>('[data-node]');
      let last = -1;
      nodes.forEach((node, i) => {
        if (node.getBoundingClientRect().top + 12 <= edge) last = i;
      });
      setReached(last);
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
  }, [count]);

  return { listRef, fillRef, reached };
}

/**
 * Process as a timeline. A rail runs down the steps and fills, ice into
 * cobalt, as the reader scrolls; each step's node lights and its copy comes
 * up to full strength the moment the fill reaches it. The photograph holds a
 * sticky column beside it on wide screens.
 */
export default function AblaufSection() {
  const { listRef, fillRef, reached } = useProgress(STEPS.length);

  return (
    <Section id="ablauf" tone="ink" size="lg" className="ink-glow">
      <SectionHead
        eyebrow="Ablauf"
        title="In vier Schritten zu Ihrem Benefit-System"
        tone="onInk"
        titleWidth="max-w-[16ch]"
        className="lg:!grid-cols-1"
      />

      <div className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="mask" className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,1.75rem)]">
            <Image
              image={loungeImage}
              alt="Cedrik Leibinn im Beratungsgespräch mit einem Mandanten"
              sizes="(min-width: 1024px) 38vw, 100vw"
              // Kept near the master's own 3:2. A portrait crop of a wide
              // two-shot cuts horizontally, and one of the two people with it.
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>

        <div>
          <ol ref={listRef} className="relative">
            {/* The rail, and its scroll-driven fill. */}
            <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-white/10" />
            <span
              ref={fillRef}
              aria-hidden="true"
              className="absolute bottom-6 left-[1.375rem] top-6 w-px origin-top"
              style={{
                transform: 'scaleY(0)',
                background: 'linear-gradient(to bottom, #A1CEE5, #5B62C9)',
                boxShadow: '0 0 12px rgba(161,206,229,0.45)',
              }}
            />

            {STEPS.map((step, i) => {
              const lit = i <= reached;
              return (
                <Reveal as="li" key={step.title} delay={i * 90} className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
                  <span
                    data-node
                    aria-hidden="true"
                    className={cn(
                      'relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-brand',
                      lit
                        ? 'border-ice-300 bg-ice-300 text-ink-950 shadow-[0_0_0_6px_rgba(161,206,229,0.12)]'
                        : 'border-white/20 bg-ink-900 text-white/50',
                    )}
                  >
                    <step.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>

                  <div className="flex-1 pt-1">
                    <span
                      className={cn(
                        'tnum text-meta uppercase transition-colors duration-500',
                        lit ? 'text-ice-300' : 'text-white/35',
                      )}
                    >
                      Schritt {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={cn(
                        'mt-2 max-w-[22ch] text-h3 transition-colors duration-500',
                        lit ? 'text-white' : 'text-white/55',
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 max-w-measure text-body transition-colors duration-500',
                        lit ? 'text-white/70' : 'text-white/40',
                      )}
                    >
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <Reveal className="mt-12 sm:pl-[4.75rem]">
            <Button to="/kontakt" variant="onInk">
              Mit Schritt 1 starten
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
