import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import Slot from './ui/Slot';
import { cn } from '../lib/cn';

/** Three slides; the quotes and attributions are the client's to supply. */
const SLIDES = [0, 1, 2];

/**
 * Testimonial carousel.
 *
 * Cycling, progress bars and keyboard-operable controls are built. Quotes,
 * names and roles are slots — real testimonials need the clients' consent
 * before they go on the page, so none are invented here.
 */
export default function StimmenSection() {
  const [index, setIndex] = useState(0);

  const go = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length);

  return (
    <Section id="stimmen" tone="canvas" size="lg">
      <Reveal>
        <div className="ink-glow relative overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] bg-ink-950 p-7 sm:p-10 lg:p-14">

          <div className="relative flex min-h-[26rem] flex-col justify-between gap-10">
            <div className="flex items-center gap-4">
              <span className="tnum rounded-full border border-line-onInkStrong px-3.5 py-1.5 text-meta uppercase text-ice-300">
                {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>

              <div className="flex gap-1.5" aria-hidden="true">
                {SLIDES.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      'h-[3px] w-14 rounded-full transition-colors duration-300',
                      s === index ? 'bg-ice-300' : 'bg-white/15',
                    )}
                  />
                ))}
              </div>
            </div>

            <blockquote aria-live="polite">
              <p className="max-w-[22ch] text-h2 text-white">
                <Slot tone="onInk">Platzhalter: Kundenzitat {index + 1}</Slot>
              </p>
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-onInk pt-7">
              <div>
                <p className="text-body text-white">
                  <Slot tone="onInk">Platzhalter: Name</Slot>
                </p>
                <p className="mt-2 text-small text-white/50">
                  <Slot tone="onInk">Platzhalter: Rolle, Unternehmen</Slot>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Vorheriges Zitat"
                  className="grid h-14 w-14 place-items-center rounded-full border border-line-onInkStrong
                             text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => go(index + 1)}
                  aria-label="Nächstes Zitat"
                  className="grid h-14 w-14 place-items-center rounded-full bg-ice-300 text-ink-950
                             transition-colors hover:bg-ice-200"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
