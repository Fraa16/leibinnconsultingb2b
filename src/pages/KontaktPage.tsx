import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function KontaktPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E2E7E8' }}>
      <Navigation />
      <main className="min-h-screen bg-[#F9FAFB]">
        <section className="py-14 md:py-18 lg:py-20 px-4 sm:px-6 lg:px-10">
          <div className="max-w-6xl lg:max-w-7xl mx-auto pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)] items-start"
            >
              {/* LEFT SIDE - TEXT CONTENT */}
              <div>
                <p className="text-xs tracking-[0.2em] font-semibold text-[#2A2D7C] uppercase mb-3">
                  KONTAKT & ERSTGESPRÄCH
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold leading-tight text-black mb-4">
                  Kostenloses Erstgespräch für Ihr Benefit-System
                </h1>

                <p className="text-base lg:text-lg text-black/70 leading-relaxed mb-6">
                  In einem unverbindlichen Erstgespräch prüfen wir gemeinsam, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein klares Bild, ob und wie eine Zusammenarbeit sinnvoll ist.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#016FB9]" />
                    <span className="text-sm lg:text-base text-black/75 leading-relaxed">
                      Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#016FB9]" />
                    <span className="text-sm lg:text-base text-black/75 leading-relaxed">
                      Steuerlich durchdachte, alltagstaugliche Lösungen statt isolierter Einzelmaßnahmen
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#016FB9]" />
                    <span className="text-sm lg:text-base text-black/75 leading-relaxed">
                      Persönliche Begleitung von Cedrik Leibinn – ohne anonyme Produkthotlines
                    </span>
                  </div>
                </div>

                <p className="text-xs text-black/50">
                  Ihre Anfrage ist unverbindlich und wird vertraulich behandelt.
                </p>
              </div>

              {/* RIGHT SIDE - FORM CARD */}
              <div className="relative bg-gradient-to-br from-white via-[#F3F6FB] to-[#E7EDF8] rounded-3xl shadow-[0_24px_70px_rgba(10,10,10,0.15)] border border-white/80 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#016FB9] via-[#75AED4] to-[#2A2D7C]"></div>

                <div className="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-9 lg:py-10">
                  {!isSubmitted ? (
                    <>
                      <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#2A2D7C]/80 mb-2">
                        Ihre Anfrage
                      </p>

                      <h2 className="text-lg md:text-xl font-semibold text-[#1F2841] leading-snug mb-2">
                        Lassen Sie uns über Ihr Benefit-System sprechen
                      </h2>

                      <p className="text-sm text-[#1F2841]/70 leading-relaxed mb-5">
                        Füllen Sie das Formular in 2–3 Minuten aus. Wir melden uns innerhalb von 24 Stunden mit einem Vorschlag für Ihr Erstgespräch.
                      </p>

                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                          {/* Vorname */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Vorname *
                            </label>
                            <input
                              type="text"
                              placeholder="Ihr Vorname"
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* Nachname */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Nachname *
                            </label>
                            <input
                              type="text"
                              placeholder="Ihr Nachname"
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* E-Mail */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              E-Mail-Adresse *
                            </label>
                            <input
                              type="email"
                              placeholder="name@unternehmen.de"
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* Telefonnummer */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Telefonnummer *
                            </label>
                            <input
                              type="tel"
                              placeholder="+49 …"
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* Unternehmen */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Unternehmen *
                            </label>
                            <input
                              type="text"
                              placeholder="Name Ihres Unternehmens"
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* Mitarbeiteranzahl */}
                          <div>
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Mitarbeitende *
                            </label>
                            <select
                              required
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            >
                              <option value="">Bitte wählen</option>
                              <option value="5-20">5–20 Mitarbeitende</option>
                              <option value="21-50">21–50 Mitarbeitende</option>
                              <option value="51-100">51–100 Mitarbeitende</option>
                              <option value="101-200">101–200 Mitarbeitende</option>
                              <option value="200+">Mehr als 200</option>
                            </select>
                          </div>

                          {/* Position */}
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Ihre Position
                            </label>
                            <input
                              type="text"
                              placeholder="z. B. Geschäftsführung, HR-Leitung …"
                              className="w-full rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>

                          {/* Anliegen */}
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-[#1F2841]/80 mb-1.5">
                              Worum geht es in Ihrem Anliegen? *
                            </label>
                            <textarea
                              placeholder="Beschreiben Sie kurz Ihre aktuelle Situation, Ziele und Fragen rund um Benefits."
                              required
                              rows={4}
                              className="w-full resize-none rounded-xl border border-black/10 bg-white/90 px-3.5 py-2.5 text-sm text-[#1F2841] placeholder:text-black/40 shadow-[0_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:ring-2 focus:ring-[#016FB9] focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <p className="text-[11px] text-[#1F2841]/60 leading-relaxed">
                            Mit dem Absenden erklären Sie sich damit einverstanden, dass wir Ihre Angaben zur Kontaktaufnahme und Bearbeitung Ihrer Anfrage verwenden.
                          </p>

                          <button
                            type="submit"
                            className="group inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold bg-[#016FB9] hover:bg-[#014f87] text-white shadow-lg shadow-[#016FB9]/40 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-[#016FB9] w-full sm:w-auto"
                          >
                            Erstgespräch anfragen
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <CheckCircle2 className="w-16 h-16 text-[#016FB9]" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-[#1F2841] mb-3">
                        Vielen Dank für Ihre Anfrage!
                      </h3>
                      <p className="text-base text-[#1F2841]/70 leading-relaxed">
                        Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
