import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { heroImage } from '../lib/images';
import Container from './ui/Container';
import Image from './ui/Image';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import Slot from './ui/Slot';

/**
 * Hero, following the handoff's two-column pattern: copy left, a tall photo
 * card right with a floating panel overlapping its lower edge.
 *
 * All wording here is the site's existing copy. The floating panel's content
 * is a marked slot — in the brand designs it carries short trust proofs,
 * which this site does not yet have written.
 */
export default function HeroSection() {
  const { goTo } = useSiteNav();

  return (
    <section id="hero" className="relative overflow-hidden bg-canvas pb-20 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40">
      <div
        aria-hidden="true"
        className="grid-lines-light pointer-events-none absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 80%)',
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <Eyebrow>Für kleine und mittelständische Unternehmen</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 max-w-[16ch]">
                Vom Fachkräftemangel zum{' '}
                <em className="not-italic text-ink-600">begehrten Arbeitgeber</em>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-[46ch] text-lead text-content">
                Gewinnen und binden Sie qualifizierte Mitarbeitende durch ein strukturiertes
                Benefit-System — steuerlich optimiert, verwaltungsarm und spürbar wirksam,
                ohne massive Gehaltserhöhungen.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button to="/kontakt" size="xl" icon={<ArrowUpRight size={18} />}>
                  Kostenloses Strategiegespräch sichern
                </Button>
                <Button onClick={() => goTo('realitaetscheck')} size="xl" variant="link" className="sm:ml-4">
                  Realitätscheck lesen
                </Button>
              </div>
            </Reveal>

            {/* The handoff sets this kind of qualifier in a hairline-bounded row. */}
            <Reveal delay={320}>
              <div className="mt-11 border-y border-line py-5">
                <p className="max-w-[54ch] text-small text-content-muted">
                  Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative lg:pl-6">
            <div className="relative overflow-hidden rounded-[clamp(1.5rem,2.6vw,2rem)] bg-ink-900">
              <Image
                image={heroImage}
                alt="Cedrik Leibinn — Berater für Mitarbeiterbindung"
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-[clamp(26rem,50vw,42rem)] w-full object-cover"
                style={{ objectPosition: '50% 14%' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(155deg, rgba(42,45,124,0.34) 0%, transparent 44%), linear-gradient(to top, rgba(0,0,34,0.72) 0%, transparent 46%)',
                }}
              />
            </div>

            {/*
              Floating panel overlapping the photo — the device every page in
              the brand uses. Its content is the client's to write.
            */}
            <div
              className="relative z-10 -mt-10 ml-6 mr-2 rounded-xl3 border border-line bg-panel/95 p-5
                         shadow-float backdrop-blur-sm sm:ml-10 sm:p-6 lg:-mr-6"
            >
              <Slot as="block" className="text-small">
                Platzhalter: drei bis vier kurze Vertrauensbelege (z. B. Zertifizierungen,
                Mandantenzahl, Reaktionszeit)
              </Slot>
            </div>
          </Reveal>
        </div>
      </Container>

      <button
        onClick={() => goTo('realitaetscheck')}
        className="group mx-auto mt-16 hidden items-center gap-3 lg:flex"
        aria-label="Nach unten scrollen"
      >
        <span className="text-meta uppercase text-content-faint transition-colors group-hover:text-ink-600">
          Mehr erfahren
        </span>
        <span
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-content-muted
                     transition-colors group-hover:border-ink-300 group-hover:text-ink-600"
        >
          <ArrowDown size={15} />
        </span>
      </button>
    </section>
  );
}
