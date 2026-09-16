import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import pattern2 from '../patterns/2.png';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Card from './ui/Card';
import Button from './ui/Button';
import GridBackground from './GridBackground';

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

export default function VorteileSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.08, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="vorteile" tone="subtle" size="lg">
      <GridBackground gridSize={40} gridOpacity={0.05} glowIntensity={0.14} glowSpread={900} />
      <img
        src={pattern2}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 w-80 select-none opacity-50 lg:w-96"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={item} className="flex h-full flex-col justify-between">
          <div>
            <Eyebrow>Warum unser Ansatz wirkt</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-h3">
              Vorteile, die im Alltag Ihrer Mitarbeitenden ankommen
            </h2>
            <p className="mt-4 max-w-measure text-small leading-relaxed text-content">
              Wir entwickeln Benefit-Konzepte speziell für kleine und mittlere Unternehmen – mit
              klarem Fokus auf Umsetzbarkeit, steuerlicher Sicherheit und messbarer Wirkung im Alltag.
            </p>
          </div>
          <div className="mt-7">
            {/* Previously scrollToSection('kontakt'), which resolved to nothing. */}
            <Button to="/kontakt" icon={<ArrowRight size={16} />}>
              Jetzt Vorteile im Gespräch prüfen
            </Button>
          </div>
        </motion.div>

        {benefits.map((benefit) => (
          <motion.div variants={item} key={benefit.title} className="h-full">
            <Card tone="glass" padding="lg" interactive className="flex h-full min-h-[15rem] flex-col">
              <h3 className="text-h4">{benefit.title}</h3>
              <p className="mt-3 text-small leading-relaxed text-content">{benefit.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
