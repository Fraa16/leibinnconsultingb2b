import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../images/cedrik-hero.avif';

export default function HeroSection() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eef5f9 100%)' }}
    >
      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <img src={heroImage} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 22%' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(21,23,79,0.80) 0%, rgba(21,23,79,0.60) 50%, rgba(21,23,79,0.85) 100%)' }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        <div className="flex min-h-[680px]">

          {/* ── Content panel ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col justify-center w-full lg:w-[56%] px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-12 xl:pr-16 pt-36 pb-20 lg:pt-36 lg:pb-28"
          >

            {/* Eyebrow */}
            <motion.div variants={item} className="flex items-center gap-3 mb-7">
              <div className="w-[3px] h-[18px] rounded-full bg-[#A1CEE5]" />
              <span className="text-[11px] font-medium tracking-[0.13em] uppercase text-[#A1CEE5] lg:text-[#2A2D7C]">
                Für kleine und mittelständische Unternehmen
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-semibold leading-[1.1] tracking-tight mb-6 text-white lg:text-[#15174F]"
              style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.25rem)' }}
            >
              Vom Fachkräftemangel zum{' '}
              <br className="hidden sm:block" />
              <em className="not-italic text-[#A1CEE5] lg:text-[#2A2D7C]">
                begehrten Arbeitgeber
              </em>
            </motion.h1>

            {/* Body copy */}
            <motion.p
              variants={item}
              className="text-base sm:text-[1.0625rem] leading-relaxed font-light text-white/75 lg:text-black/55 mb-10 max-w-[500px]"
            >
              Gewinnen und binden Sie qualifizierte Mitarbeitende durch ein strukturiertes
              Benefit-System — steuerlich optimiert, verwaltungsarm und spürbar wirksam,
              ohne massive Gehaltserhöhungen.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mb-9">
              <button
                onClick={() => navigate('/kontakt')}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-[14px] rounded-[10px] font-medium text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#2A2D7C',
                  boxShadow: '0 4px 24px rgba(42,45,124,0.30)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(42,45,124,0.40)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(42,45,124,0.30)')}
              >
                Kostenloses Strategiegespräch sichern
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollToSection('realitaetscheck')}
                className="hero-secondary-btn inline-flex items-center justify-center px-7 py-[14px] rounded-[10px] font-medium text-sm transition-all duration-200"
              >
                Realitätscheck lesen
              </button>
            </motion.div>

            {/* Footnote */}
            <motion.p variants={item} className="text-[11px] font-light text-white/45 lg:text-black/35 tracking-wide">
              Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
            </motion.p>
          </motion.div>

          {/* ── Image panel (desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-0 right-0 h-full w-[47%] pointer-events-none"
          >
            <img
              src={heroImage}
              alt="Cedrik Leibinn — Berater für Mitarbeiterbindung"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 22%' }}
            />
            {/* Fade: left edge into content */}
            <div
              className="absolute inset-y-0 left-0 w-40"
              style={{ background: 'linear-gradient(to right, #eef5f9, transparent)' }}
            />
            {/* Fade: bottom edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-28"
              style={{ background: 'linear-gradient(to top, #eef5f9, transparent)' }}
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={() => scrollToSection('realitaetscheck')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 group"
        aria-label="Nach unten scrollen"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase text-black/30 font-medium group-hover:text-black/50 transition-colors">
          Mehr erfahren
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <ChevronDown size={15} className="text-black/30 group-hover:text-black/50 transition-colors" />
        </motion.div>
      </motion.button>

      {/* Scoped styles for secondary button desktop/mobile variants */}
      <style>{`
        .hero-secondary-btn {
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }
        .hero-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        @media (min-width: 1024px) {
          .hero-secondary-btn {
            border-color: rgba(42, 45, 124, 0.25);
            color: #2A2D7C;
            background: transparent;
          }
          .hero-secondary-btn:hover {
            background: rgba(42, 45, 124, 0.05);
          }
        }
      `}</style>
    </section>
  );
}
