import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Button from './ui/Button';

const benefits = [
  {
    title: 'Fokus auf KMU',
    description:
      'Wir kennen die Realität kleiner und mittlerer Unternehmen – begrenzte Ressourcen, wenig HR-Kapazität, hoher Wettbewerbsdruck. Unsere Konzepte sind speziell darauf ausgelegt, mit schlanken Strukturen schnell Wirkung zu entfalten.',
  },
  {
    title: 'Ganzheitlicher Blick',
    description:
      'Wir betrachten Benefits nicht isoliert, sondern im Zusammenspiel mit Ihrer Arbeitgebermarke, Ihrer Kultur und Ihrem Recruiting. So entsteht ein System, das nach innen und außen stimmig ist – statt einzelner, wirkungsloser Maßnahmen.',
  },
  {
    title: 'Steuerlich durchdacht',
    description:
      'Ihre Benefit-Lösungen orientieren sich an aktuellen steuerlichen und rechtlichen Rahmenbedingungen. Sie nutzen bestehende Spielräume optimal, ohne Grauzonen – und gewinnen Planungssicherheit für Ihre Personal- und Lohnkosten.',
  },
  {
    title: 'Begleitung von Anfang bis Ende',
    description:
      'Von der ersten Bestandsaufnahme über die Konzeption bis zur internen Kommunikation begleiten wir Sie Schritt für Schritt. Sie erhalten klare Fahrpläne und strukturierte Umsetzung – statt losem Beraterinput ohne Ende.',
  },
  {
    title: 'Praxisnahe Umsetzung',
    description:
      'Wir denken Benefits aus Sicht Ihrer Mitarbeitenden und Führungskräfte. Prozesse bleiben alltagstauglich, einfach zu erklären und leicht zu verwalten – damit das System genutzt wird und nicht in der Schublade verschwindet.',
  },
];

/**
 * Bento panel: the section head occupies the first cell of the grid as a navy
 * tile, and the five advantages fill the remaining five. Six cells, one ruled
 * block — rather than a heading floating above a row of shadowed cards.
 */
export default function VorteileSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.07, 0.1);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="vorteile" tone="panel" size="lg" divided>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-px overflow-hidden rounded-xl4 border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div
          variants={item}
          className="relative flex flex-col justify-between bg-ink-800 p-7 lg:p-8"
        >
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
          <div className="relative">
            <Eyebrow tone="onInk">Warum unser Ansatz wirkt</Eyebrow>
            <h2 className="mt-6 max-w-[14ch] text-h3 text-white">
              Vorteile, die im Alltag Ihrer Mitarbeitenden ankommen
            </h2>
            <p className="mt-4 text-small leading-relaxed text-white/60">
              Wir entwickeln Benefit-Konzepte speziell für kleine und mittlere Unternehmen – mit
              klarem Fokus auf Umsetzbarkeit, steuerlicher Sicherheit und messbarer Wirkung im Alltag.
            </p>
          </div>

          <div className="relative mt-8">
            {/* Previously scrolled to a #kontakt anchor that resolved to nothing. */}
            <Button to="/kontakt" variant="onInk" icon={<ArrowRight size={16} />}>
              Jetzt Vorteile im Gespräch prüfen
            </Button>
          </div>
        </motion.div>

        {benefits.map((benefit) => (
          <motion.div
            variants={item}
            key={benefit.title}
            className="bg-panel p-7 transition-colors duration-300 hover:bg-raised lg:p-8"
          >
            <h3 className="text-h4">{benefit.title}</h3>
            <p className="mt-3 text-small leading-relaxed text-content">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
