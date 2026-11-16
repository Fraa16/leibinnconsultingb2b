import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { skylineImage, cutoutImage } from '../lib/images';
import Container from './ui/Container';
import Eyebrow from './ui/Eyebrow';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import SplitWords from './ui/SplitWords';
import { ARROW_HOVER } from './ui/Button';
import { cn } from '../lib/cn';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

const ASSURANCES = ['Kostenlos und unverbindlich', 'Antwort innerhalb von 24 Stunden', 'Persönlich mit Cedrik Leibinn'];

/**
 * The close: one large navy block that is itself the call to action.
 *
 * The whole block is a single link to /kontakt, so there is one obvious thing
 * to do and the target is as big as the section. Cedrik stands in it, cut
 * out of his photograph, his head breaking above the block's top edge and his
 * chest dissolving into the navy below. The skyline sits far back behind him.
 *
 * On hover the block lifts, the arrow moves the way every CTA on the site
 * does, and he comes forward a fraction — the block answers as one object.
 */
export default function FinalCTASection() {
  return (
    <section
      id="termin"
      className="relative bg-canvas pb-[clamp(5rem,9vw,8rem)] pt-[clamp(9rem,14vw,12rem)]"
    >
      <Container>
        <Reveal variant="group">
          <Link
            to="/kontakt"
            aria-label="Kostenloses Erstgespräch mit Cedrik Leibinn sichern"
            className={cn(
              'a-rise group relative block rounded-[clamp(1.5rem,3vw,2.5rem)] bg-ink-950 text-white',
              'shadow-[0_40px_80px_-40px_rgba(0,0,34,0.55)] transition-[transform,box-shadow] duration-500 ease-brand',
              'hover:-translate-y-1 hover:shadow-[0_50px_90px_-36px_rgba(0,0,34,0.6)]',
              'focus-visible:ring-offset-canvas',
            )}
          >
            {/* Background layer, clipped to the block; the figure is not. */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <Image
                image={skylineImage}
                alt=""
                sizes="100vw"
                wrapperClassName="absolute inset-0 block"
                className="h-full w-full object-cover opacity-50 mix-blend-luminosity"
                style={{ objectPosition: '50% 70%' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(100deg, rgba(0,0,34,0.98) 0%, rgba(0,0,34,0.92) 44%, rgba(21,23,79,0.72) 78%, rgba(21,23,79,0.58) 100%)',
                }}
              />
              <div className="ink-glow absolute inset-0" />
            </div>

            <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              {/* ── Copy ── */}
              <div className="order-2 px-7 pb-9 pt-8 sm:px-10 sm:pb-11 lg:order-1 lg:px-14 lg:py-16">
                <Eyebrow tone="onInk">Nächster Schritt</Eyebrow>
                <h2 className="a-words mt-7 max-w-[13ch] text-white" style={delay(160)}>
                  <SplitWords>Sprechen wir über Ihr Benefit-System</SplitWords>
                </h2>
                <p className="a-rise mt-6 max-w-[42ch] text-lead text-white/70" style={delay(420)}>
                  Im Erstgespräch schauen wir auf Ihre Situation und Ihre Ziele. Sie gehen mit einer
                  ehrlichen Einschätzung und konkreten Ansatzpunkten raus, ob wir danach zusammenarbeiten
                  oder nicht.
                </p>

                {/* A pill that looks like the site's buttons; the block itself is the link. */}
                <span
                  className="a-rise mt-9 inline-flex h-[3.875rem] items-center gap-2.5 whitespace-nowrap rounded-full bg-canvas
                             px-6 text-small font-medium text-ink-950 transition-colors duration-200 group-hover:bg-white
                             sm:px-8 sm:text-body"
                  style={delay(540)}
                >
                  {/*
                    "Kostenlos" is in the line directly below, and the block's
                    accessible name says it in full; the shorter label is what
                    fits one line inside the block on a 375px phone.
                  */}
                  Erstgespräch sichern
                  <span aria-hidden="true" className={cn('inline-flex text-ink-600', ARROW_HOVER)}>
                    <ArrowUpRight size={18} />
                  </span>
                </span>

                <ul className="a-rise mt-8 flex flex-wrap gap-x-6 gap-y-3" style={delay(640)}>
                  {ASSURANCES.map((line) => (
                    <li key={line} className="flex items-center gap-2.5 text-small text-white/65">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-ice-300/15 text-ice-300">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Cedrik ── */}
              {/*
                Sized by width at every breakpoint. The crop is wider than it
                is tall (shoulders), so sizing by height would push him into
                the copy on desktop and past the viewport on a phone. He rises
                above the block's top edge by sitting higher than the column,
                and fades out into the navy where the crop ends.
              */}
              <div className="relative order-1 h-[52vw] sm:h-[40vw] lg:order-2 lg:h-auto">
                {/*
                  Positioning on the outer element, motion on the inner one:
                  the reveal's `transform: none` would otherwise cancel the
                  centring translate on small screens.
                */}
                <div
                  className="pointer-events-none absolute bottom-0 left-1/2 w-[88%] -translate-x-1/2 sm:w-[66%]
                             lg:bottom-auto lg:left-auto lg:right-[3%] lg:top-[-18%] lg:w-[94%] lg:translate-x-0"
                >
                  <div className="a-rise" style={delay(300)}>
                    <div
                      className="origin-bottom transition-transform duration-700 ease-brand group-hover:scale-[1.025]"
                      style={{
                        // His chest dissolves into the navy instead of ending on a hard crop line.
                        maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
                        WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
                      }}
                    >
                      <Image
                        image={cutoutImage}
                        alt="Cedrik Leibinn, Gründer von Leibinn Consulting"
                        sizes="(min-width: 1024px) 40vw, 88vw"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>

                <span
                  className="a-fade absolute bottom-5 right-5 hidden rounded-full border border-white/15 bg-ink-950/70 px-4 py-2
                             text-meta uppercase text-white/85 backdrop-blur-sm lg:block"
                  style={delay(900)}
                >
                  Cedrik Leibinn · Gründer
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
