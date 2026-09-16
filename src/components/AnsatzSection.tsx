import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import kundengespraechImage from '../images/Kundengespräch.jpg';

export default function AnsatzSection() {
  const bulletPoints = [
    'Struktur statt Einzelmaßnahmen: Ein durchdachtes Benefit-System schafft Orientierung für Mitarbeitende und Führungskräfte.',
    'Wirkung statt Aufwand: Sie investieren nicht mehr in lose Ideen, sondern in ein System, das messbare Ergebnisse liefert.',
    'Rechtssicherheit & Klarheit: Steuerliche Potenziale nutzen – ohne Unsicherheiten oder zusätzlichen Verwaltungsaufwand.',
    'Starke Arbeitgebermarke: Ein einheitliches, verständliches System zeigt Bewerbenden sofort, dass sich Engagement bei Ihnen lohnt.',
  ];

  const desktopImagePosition = '0%';
  const mobileImagePosition = 'center';

  return (
    <section id="ansatz" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <AnimatedSection>
          {/* Elevated Card with Background Image */}
          <div className="bg-[#F7F7F7] rounded-2xl shadow-lg p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Background Image Layer - Right Aligned (Desktop only) */}
            <div className="absolute inset-0 hidden lg:block">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 52% 100%)',
                }}
              >
                <img
                  src={kundengespraechImage}
                  alt=""
                  className="absolute w-full h-full object-cover"
                  style={{
                    objectPosition: `${desktopImagePosition} center`,
                  }}
                />
              </div>
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, #F7F7F7 0%, #F7F7F7 47%, rgba(247, 247, 247, 0.9) 58%, transparent 75%)',
                }}
              />
            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-[65%] min-w-[300px]">
              <div className="mb-4">
                <span className="text-sm font-medium text-primary tracking-wide uppercase">
                  Ein starkes Fundament für moderne Arbeitgeber
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 leading-tight">
                Warum ein strukturiertes Benefit-System heute unverzichtbar ist
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-black/80 leading-relaxed text-lg">
                  Viele Unternehmen investieren in einzelne Benefits, ohne ein klares System dahinter.
                  Maßnahmen entstehen spontan, bleiben in der Kommunikation blass und entfalten kaum Wirkung
                  im Alltag. Mitarbeitende erleben Benefits dann eher als lose Extras – nicht als verlässlichen
                  Bestandteil ihrer Arbeitswelt.
                </p>

                <p className="text-black/80 leading-relaxed text-lg">
                  Ein strukturiertes Benefit-System bündelt diese Bausteine zu einem klaren Fundament:
                  steuerlich sinnvoll, nachvollziehbar für Führungskräfte und transparent für Mitarbeitende.
                  So wird auf einen Blick erkennbar, wofür Sie als Arbeitgeber stehen – und warum sich
                  Leistungsträger langfristig für Ihr Unternehmen entscheiden sollten.
                </p>
              </div>

              <div className="space-y-4">
                {bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                    <p className="text-black/70 leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Background Image */}
            <div className="lg:hidden mt-8 relative h-[300px] rounded-xl overflow-hidden -mx-8 sm:-mx-12">
              <img
                src={kundengespraechImage}
                alt="Kundengespräch - Modernes Benefit-System"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: mobileImagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
