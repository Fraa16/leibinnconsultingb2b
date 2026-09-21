import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Picture from './ui/Picture';
import { heroImage, fallbackSrc } from '../lib/media';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const reduce = useReducedMotion();

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.075, delayChildren: 0.12 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="hero"
      className="lc-block on-dark bg-navy-black mt-[calc(4.75rem+var(--lc-gutter))]"
    >
      {/* Desktop: the photograph fills the block and the copy sits on a
          directional scrim. Below lg the block is portrait-shaped, where a
          landscape photo behind a full column of text only turns to mud —
          so there it gets its own band under the copy instead. */}
      <div className="absolute inset-0 hidden lg:block">
        <Picture
          image={heroImage}
          fallback={fallbackSrc.hero}
          alt="Cedrik Leibinn, Gründer von Leibinn Consulting"
          sizes="100vw"
          priority
          className="block h-full w-full"
          imgClassName="hero-photo h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(11,12,57,0.94) 0%, rgba(11,12,57,0.9) 42%, rgba(11,12,57,0.66) 58%, rgba(11,12,57,0.24) 80%, rgba(11,12,57,0.05) 100%)',
          }}
        />
      </div>

      {/* Soft navy wash so the mobile block is not a flat rectangle. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'radial-gradient(130% 80% at 15% 0%, rgba(42,45,124,0.7) 0%, rgba(42,45,124,0) 65%)',
        }}
      />

      <div className="lc-inner relative flex min-h-[clamp(30rem,80vh,44rem)] flex-col justify-center pb-10 pt-24 md:pb-12 md:pt-28 lg:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="mb-8 flex">
            <span className="lc-pill">Für kleine und mittelständische Unternehmen</span>
          </motion.div>

          <motion.h1 variants={item} className="t-display text-white">
            Vom Fachkräftemangel zum{' '}
            <span className="block text-ice">begehrten Arbeitgeber</span>
          </motion.h1>

          <motion.p variants={item} className="t-lead mt-8 max-w-xl text-white/70">
            Gewinnen und binden Sie qualifizierte Mitarbeitende durch ein strukturiertes
            Benefit-System — steuerlich optimiert, verwaltungsarm und spürbar wirksam,
            ohne massive Gehaltserhöhungen.
          </motion.p>

          <motion.div variants={item} className="mt-11 flex flex-col gap-3 sm:flex-row">
            <Link to="/kontakt" className="lc-btn lc-btn-primary">
              Kostenloses Strategiegespräch sichern
              <ArrowRight size={16} className="lc-arrow" aria-hidden="true" />
            </Link>

            <a
              href="/#realitaetscheck"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('realitaetscheck');
              }}
              className="lc-btn lc-btn-ghost"
            >
              Realitätscheck lesen
            </a>
          </motion.div>

          <motion.p variants={item} className="t-small mt-10 text-white/55">
            Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
          </motion.p>
        </motion.div>

        {/* Mobile / tablet: the photograph as its own plate. */}
        <motion.div
          variants={item}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'show'}
          className="relative mt-12 overflow-hidden rounded-card lg:hidden"
        >
          <Picture
            image={heroImage}
            fallback={fallbackSrc.hero}
            alt="Cedrik Leibinn, Gründer von Leibinn Consulting"
            sizes="(max-width: 1023px) 92vw, 1px"
            priority
            className="block"
            imgClassName="h-[clamp(13rem,42vw,20rem)] w-full object-cover"
            style={{ objectPosition: '52% 16%' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
