import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-[#F7F7F7]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-6xl mx-auto rounded-3xl shadow-xl overflow-hidden bg-gradient-to-r from-[#15174F] via-[#202266] to-[#0B0C39] hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-14 items-center">
            {/* Left Side - Text Content */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-3">
                BEREIT FÜR DEN NÄCHSTEN SCHRITT?
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4">
                Lassen Sie uns Ihr Benefit-System auf Mittelstands-Niveau bringen
              </h2>

              <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-6">
                In einem ersten Gespräch schauen wir gemeinsam auf Ihre aktuelle Situation und Ihre Ziele. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein Gefühl dafür, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#75AED4]" />
                  <p className="text-sm lg:text-base text-white/80 leading-relaxed">
                    Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#75AED4]" />
                  <p className="text-sm lg:text-base text-white/80 leading-relaxed">
                    Steuerlich durchdachte, alltagstaugliche Lösungen statt Produktverkauf
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#75AED4]" />
                  <p className="text-sm lg:text-base text-white/80 leading-relaxed">
                    Persönliche Begleitung von Cedrik Leibinn – vom ersten Schritt bis zur Umsetzung
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - CTA Block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <p className="text-sm font-medium text-white mb-3">
                Kostenloses Erstgespräch mit Cedrik Leibinn
              </p>

              <p className="text-sm text-white/75 leading-relaxed mb-5">
                Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag – persönlich, ohne Vertriebsschleifen.
              </p>

              <a
                href="/kontakt"
                className="group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#016FB9] hover:bg-[#014f87] text-white shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 w-full"
              >
                Erstgespräch sichern
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="mt-3 text-xs text-white/60">
                Unverbindlich & kostenlos – Ihr Erstgespräch für ein strukturiertes Benefit-System.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
