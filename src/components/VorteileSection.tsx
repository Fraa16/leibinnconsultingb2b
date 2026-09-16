import { motion } from 'framer-motion';
import GridBackground from './GridBackground';
import pattern2 from '../patterns/2.png';

type BenefitCardProps = {
  title: string;
  description: string;
};

function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className="h-full min-h-[260px] rounded-3xl bg-white/20 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:bg-white/40 transition-all duration-300 ease-out hover:-translate-y-1">
        <div className="h-full flex flex-col p-6">
          <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-base lg:text-lg text-black/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function VorteileSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      title: 'Fokus auf KMU',
      description:
        'Wir kennen die Realität kleiner und mittlerer Unternehmen – begrenzte Ressourcen, wenig HR-Kapazität, hoher Wettbewerbsdruck. Unsere Konzepte sind speziell darauf ausgelegt, mit schlanken Strukturen schnell Wirkung zu entfalten.'
    },
    {
      title: 'Ganzheitlicher Blick',
      description:
        'Wir betrachten Benefits nicht isoliert, sondern im Zusammenspiel mit Ihrer Arbeitgebermarke, Ihrer Kultur und Ihrem Recruiting. So entsteht ein System, das nach innen und außen stimmig ist – statt einzelner, wirkungsloser Maßnahmen.'
    },
    {
      title: 'Steuerlich durchdacht',
      description:
        'Ihre Benefit-Lösungen orientieren sich an aktuellen steuerlichen und rechtlichen Rahmenbedingungen. Sie nutzen bestehende Spielräume optimal, ohne Grauzonen – und gewinnen Planungssicherheit für Ihre Personal- und Lohnkosten.'
    },
    {
      title: 'Begleitung von Anfang bis Ende',
      description:
        'Von der ersten Bestandsaufnahme über die Konzeption bis zur internen Kommunikation begleiten wir Sie Schritt für Schritt. Sie erhalten klare Fahrpläne und strukturierte Umsetzung – statt losem Beraterinput ohne Ende.'
    },
    {
      title: 'Praxisnahe Umsetzung',
      description:
        'Wir denken Benefits aus Sicht Ihrer Mitarbeitenden und Führungskräfte. Prozesse bleiben alltagstauglich, einfach zu erklären und leicht zu verwalten – damit das System genutzt wird und nicht in der Schublade verschwindet.'
    }
  ];

  return (
    <section id="vorteile" className="bg-[#F7F7F7] py-16 md:py-20 relative overflow-hidden">
      <GridBackground
        gridSize={40}
        gridOpacity={0.18}
        glowIntensity={0.20}
        glowSpread={1200}
        fadeTopBottom={true}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-58px',
          right: '0px',
          opacity: 0.8
        }}
      >
        <img
          src={pattern2}
          alt=""
          className="object-contain"
          style={{ width: '384px', height: '384px' }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative"
      >
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-subheading text-subheading uppercase mb-3">
                Warum unser Ansatz wirkt
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-black mb-3 leading-tight">
                Vorteile, die im Alltag Ihrer Mitarbeitenden ankommen
              </h2>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                Wir entwickeln Benefit-Konzepte speziell für kleine und mittlere Unternehmen – mit
                klarem Fokus auf Umsetzbarkeit, steuerlicher Sicherheit und messbarer Wirkung im Alltag.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => scrollToSection('kontakt')}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-[#016FB9] hover:bg-[#014f87] transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Jetzt Vorteile im Gespräch prüfen
              </button>
            </div>
          </div>

          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
