import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { heroImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, transition } from '../lib/motion';
import Container from './ui/Container';
import Image from './ui/Image';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';

export default function HeroSection() {
  const { goTo } = useSiteNav();
  const reduced = useReducedMotion();

  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.1, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <section id="hero" className="relative overflow-hidden bg-canvas pb-16 pt-28 md:pb-20 md:pt-36 lg:pb-24 lg:pt-40">
      {/* Faint blueprint grid, fading out downward. */}
      <div
        aria-hidden="true"
        className="grid-lines-light pointer-events-none absolute inset-0"
        style={{ maskImage: 'linear-gradient(to bottom, black, transparent 78%)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 78%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 -top-40 hidden h-[40rem] w-[40rem] rounded-full lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(42,45,124,0.09) 0%, rgba(42,45,124,0.025) 45%, transparent 70%)',
        }}
      />

      <Container width="shell" className="relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.78fr] lg:gap-12 xl:gap-16"
        >
          <div>
            <motion.div variants={item}>
              <Eyebrow>Für kleine und mittelständische Unternehmen</Eyebrow>
            </motion.div>

            <motion.h1 variants={item} className="mt-7 max-w-[17ch] text-display">
              Vom Fachkräftemangel zum{' '}
              <em className="not-italic text-ink-600">begehrten Arbeitgeber</em>
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-[46ch] text-lead text-content">
              Gewinnen und binden Sie qualifizierte Mitarbeitende durch ein strukturiertes
              Benefit-System — steuerlich optimiert, verwaltungsarm und spürbar wirksam,
              ohne massive Gehaltserhöhungen.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/kontakt" size="lg" icon={<ArrowRight size={16} />}>
                Kostenloses Strategiegespräch sichern
              </Button>
              <Button onClick={() => goTo('realitaetscheck')} size="lg" variant="secondary">
                Realitätscheck lesen
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-10 border-t border-line pt-5">
              <p className="max-w-[52ch] text-small text-content-muted">
                Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
              </p>
            </motion.div>
          </div>

          {/*
            The photo is a framed object rather than a faded background. The
            previous treatment washed it into the page with a mask, which lost
            both the subject and any sense of deliberate composition.
          */}
          <motion.div
            variants={item}
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : transition(0.9, 0.25)}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl4 border border-line bg-ink-900 shadow-float">
              <Image
                image={heroImage}
                alt="Cedrik Leibinn — Berater für Mitarbeiterbindung"
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-[4/5] w-full object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
                style={{ objectPosition: 'center 18%' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: 'linear-gradient(to top, rgba(11,12,57,0.55), transparent)' }}
              />
            </div>

            {/* Ice accent rule anchoring the frame to the grid. */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-ice-400/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </Container>

      <motion.button
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1.2 }}
        onClick={() => goTo('realitaetscheck')}
        className="group mx-auto mt-14 hidden flex-col items-center gap-2 lg:flex"
        aria-label="Nach unten scrollen"
      >
        <span className="text-label uppercase text-content-faint transition-colors group-hover:text-ink-600">
          Mehr erfahren
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="grid h-8 w-8 place-items-center rounded-full border border-line bg-panel text-content-muted
                     transition-colors group-hover:border-ink-300 group-hover:text-ink-600"
        >
          <ChevronDown size={15} />
        </motion.span>
      </motion.button>
    </section>
  );
}
