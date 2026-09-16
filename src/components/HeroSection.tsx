import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { heroImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, transition } from '../lib/motion';
import Image from './ui/Image';
import Button from './ui/Button';

export default function HeroSection() {
  const { goTo } = useSiteNav();
  const reduced = useReducedMotion();

  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.11, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <section id="hero" className="relative overflow-hidden bg-surface">
      {/* Cool wash behind the copy — replaces the flat #eef5f9 linear-gradient. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-white via-ice-50 to-ice-100"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-[-18%] hidden h-[42rem] w-[42rem] rounded-full lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(42,45,124,0.10) 0%, rgba(42,45,124,0.03) 45%, transparent 70%)',
        }}
      />

      {/*
        Mobile: the photo is the background, under a navy scrim.
        Desktop (lg+): the photo becomes the right-hand panel instead.
      */}
      <div aria-hidden="true" className="absolute inset-0 lg:hidden">
        <Image
          image={heroImage}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 22%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,12,57,0.86) 0%, rgba(21,23,79,0.72) 48%, rgba(11,12,57,0.90) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-shell">
        <div className="flex min-h-[38rem] lg:min-h-[44rem]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex w-full flex-col justify-center px-5 pb-20 pt-32
                       sm:px-8 lg:w-[57%] lg:pb-28 lg:pl-12 lg:pr-14 lg:pt-36 xl:pl-20"
          >
            <motion.p
              variants={item}
              className="mb-7 flex items-center gap-2.5 text-eyebrow uppercase text-ice-300 lg:text-ink-600"
            >
              <span
                aria-hidden="true"
                className="h-4 w-[3px] shrink-0 rounded-full bg-ice-300 lg:bg-ink-600"
              />
              Für kleine und mittelständische Unternehmen
            </motion.p>

            <motion.h1
              variants={item}
              className="mb-6 max-w-[16ch] text-display text-white lg:text-ink-800"
            >
              Vom Fachkräftemangel zum{' '}
              <em className="not-italic text-ice-300 lg:text-ink-600">begehrten Arbeitgeber</em>
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-10 max-w-[46ch] text-lead text-white/75 lg:text-content"
            >
              Gewinnen und binden Sie qualifizierte Mitarbeitende durch ein strukturiertes
              Benefit-System — steuerlich optimiert, verwaltungsarm und spürbar wirksam,
              ohne massive Gehaltserhöhungen.
            </motion.p>

            <motion.div variants={item} className="mb-9 flex flex-col gap-3 sm:flex-row">
              {/*
                Two variants of each button: the mobile hero sits on the photo
                scrim, the desktop hero on the light wash.
              */}
              <Button
                to="/kontakt"
                size="lg"
                variant="onInk"
                className="lg:hidden"
                icon={<ArrowRight size={16} />}
              >
                Kostenloses Strategiegespräch sichern
              </Button>
              <Button
                to="/kontakt"
                size="lg"
                variant="primary"
                className="hidden lg:inline-flex"
                icon={<ArrowRight size={16} />}
              >
                Kostenloses Strategiegespräch sichern
              </Button>

              <Button
                onClick={() => goTo('realitaetscheck')}
                size="lg"
                variant="onInkGhost"
                className="lg:hidden"
              >
                Realitätscheck lesen
              </Button>
              <Button
                onClick={() => goTo('realitaetscheck')}
                size="lg"
                variant="secondary"
                className="hidden lg:inline-flex"
              >
                Realitätscheck lesen
              </Button>
            </motion.div>

            <motion.p variants={item} className="text-eyebrow normal-case tracking-normal text-white/45 lg:text-content-subtle">
              Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduced ? { duration: 0 } : transition(1.1, 0.1)}
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] lg:block"
          >
            <Image
              image={heroImage}
              alt="Cedrik Leibinn — Berater für Mitarbeiterbindung"
              priority
              sizes="46vw"
              className="h-full w-full object-cover"
              style={{
                objectPosition: 'center 22%',
                // A mask fades the panel into whatever is behind it, rather
                // than overlaying a hardcoded background colour.
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 26%), linear-gradient(to top, transparent 0%, black 14%)',
                maskComposite: 'intersect',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 26%), linear-gradient(to top, transparent 0%, black 14%)',
                WebkitMaskComposite: 'source-in',
              }}
            />
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1.4 }}
        onClick={() => goTo('realitaetscheck')}
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
        aria-label="Nach unten scrollen"
      >
        <span className="text-eyebrow uppercase text-content-subtle transition-colors group-hover:text-ink-600">
          Mehr erfahren
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-content-subtle transition-colors group-hover:text-ink-600"
        >
          <ChevronDown size={15} />
        </motion.span>
      </motion.button>
    </section>
  );
}
