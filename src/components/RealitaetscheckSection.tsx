import { motion } from 'framer-motion';
import { ChevronRight, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import pattern3 from '../patterns/3.png';

export default function RealitaetscheckSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const painPoints = [
    'Sie erhalten deutlich weniger qualifizierte Bewerbungen als benötigt.',
    'Mitarbeitende wechseln nach einigen Jahren zu größeren Arbeitgebern.',
    'Vereinzelte Benefits existieren, werden aber kaum aktiv genutzt.',
    'Unsicherheit, was steuerlich sinnvoll oder rechtlich zulässig ist.',
    'Benefits werden in Stellenanzeigen oder Gesprächen nur unklar kommuniziert.',
  ];

  const impacts = [
    {
      title: 'Längere Vakanzzeiten',
      description: 'Offene Stellen bleiben länger unbesetzt und bremsen Wachstum.',
      details:
        'Kritische Positionen bleiben monatelang unbesetzt, Projekte verzögern sich, und das bestehende Team muss Mehrarbeit leisten. Die Wettbewerbsfähigkeit Ihres Unternehmens leidet, während qualifizierte Bewerber sich für attraktivere Arbeitgeber entscheiden.',
    },
    {
      title: 'Steigende Gehaltskosten',
      description: 'Höhere Löhne ohne echten Attraktivitätsgewinn führen zu unnötigen Kosten.',
      details:
        'Immer höhere Gehälter ohne spürbaren Attraktivitätsgewinn gegenüber Wettbewerbern. Die Personalkosten steigen kontinuierlich, ohne dass sich die Position Ihres Unternehmens als attraktiver Arbeitgeber verbessert. Dies führt zu einer Kostenspirale ohne nachhaltigen Nutzen.',
    },
    {
      title: 'Höhere Fluktuation',
      description: 'Gut qualifizierte Mitarbeitende orientieren sich schneller um.',
      details:
        'Langjährige Mitarbeitende verlassen das Unternehmen, wertvolles Know-how geht verloren. Die Kosten für Rekrutierung, Einarbeitung und der Produktivitätsverlust während der Einarbeitungsphase belasten Ihr Unternehmen zusätzlich. Die Unternehmenskultur leidet unter der ständigen Fluktuation.',
    },
    {
      title: 'Verschenkte Steuerpotenziale',
      description: 'Vorteile bleiben ungenutzt und belasten Ihre Personalkosten.',
      details:
        'Steuerliche Spielräume bleiben ungenutzt, während andere Unternehmen davon profitieren. Sie verschenken Möglichkeiten, Mitarbeitende steueroptimiert zu vergüten und zahlen unnötig hohe Lohnnebenkosten. Ihre Konkurrenz nutzt diese Vorteile bereits strategisch.',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="realitaetscheck"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden bg-bright-snow"
    >
      {/* Pattern positioning - adjust these values:
          - bottom: distance from bottom edge (e.g., 0px, 20px, 40px)
          - left: distance from left edge (e.g., 0px, 20px, 40px)
          - opacity: visibility (0.05 = 5%, 0.1 = 10%, 0.2 = 20%)
          - width/height: size in pixels (e.g., w-64 = 256px, w-96 = 384px, w-[500px] = 500px)
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-58px',
          left: '0px',
          opacity: 0.8
        }}
      >
        <img
          src={pattern3}
          alt=""
          className="object-contain"
          style={{ width: '384px', height: '384px' }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={item} className="space-y-4">
              <p className="text-subheading text-subheading uppercase">
                Trifft eines der folgenden Szenarien auf Ihr Unternehmen zu?
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-black">
                Realitätscheck: Ihre aktuelle Ausgangslage
              </h2>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                Viele mittelständische Unternehmen spüren den Fachkräftemangel täglich, haben aber
                kein klares Benefit-System, das potenzielle Mitarbeitende überzeugt.
              </p>
            </motion.div>

            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.li key={index} variants={item} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      <X size={16} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <p className="text-base lg:text-lg leading-relaxed text-black/80">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-px bg-black/10 mx-8 hidden lg:block"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={item} className="space-y-4">
              <p className="text-subheading text-subheading uppercase">
                Wenn sich nichts ändert …
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-black">
                Mögliche Folgen für Ihr Unternehmen
              </h3>
              <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                Ohne strukturierte Benefits drohen steigende Kosten, längere Vakanzzeiten und der
                Verlust qualifizierter Mitarbeitender an die Konkurrenz.
              </p>
            </motion.div>

            <div className="space-y-4">
              {impacts.map((impact, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-white border border-black/10 rounded-xl shadow-sm transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-2">
                          {impact.title}
                        </h4>
                        <p className="text-base leading-relaxed text-black/70">
                          {impact.description}
                        </p>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`flex-shrink-0 text-black/40 transition-transform duration-300 ${
                          expandedCard === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedCard === index ? 'auto' : 0,
                      opacity: expandedCard === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-black/10 pt-4">
                        <p className="text-base leading-relaxed text-black/70">
                          {impact.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
