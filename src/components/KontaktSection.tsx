import { useState, FormEvent } from 'react';
import AnimatedSection from './AnimatedSection';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function KontaktSection() {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefonnummer: '',
    firma: '',
    mitarbeiteranzahl: '',
    nachricht: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({
        vorname: '',
        nachname: '',
        email: '',
        telefonnummer: '',
        firma: '',
        mitarbeiteranzahl: '',
        nachricht: '',
      });
    } catch (err) {
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="kontakt" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 text-center shadow-lg">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-semibold text-black mb-4">
                Vielen Dank für Ihre Anfrage!
              </h2>
              <p className="text-lg text-black/70 mb-8">
                Wir haben Ihre Angaben erhalten und melden uns zeitnah, um einen Termin für
                ein persönliches Strategiegespräch zu vereinbaren.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium
                         hover:bg-primary-dark transition-colors"
              >
                Weitere Anfrage senden
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-4">
              Lassen Sie uns über Ihre Situation sprechen
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              Im Erstgespräch führen wir einen gemeinsamen Realitätscheck durch und geben Ihnen
              eine erste Einschätzung – ohne Verkaufsdruck.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black">
                Was im Erstgespräch passiert
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                  <span className="text-black/70">
                    Wir erfassen Ihre aktuelle Situation und Herausforderungen im Recruiting
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                  <span className="text-black/70">
                    Sie erhalten eine ehrliche Einschätzung, ob ein Benefit-System für Sie
                    sinnvoll ist
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                  <span className="text-black/70">
                    Wir besprechen mögliche erste Schritte und nächste Handlungsoptionen
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                  <span className="text-black/70">
                    Kein Verkaufsgespräch – nur eine klare, professionelle Beratung
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vorname" className="block text-sm font-medium text-black/80 mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      id="vorname"
                      name="vorname"
                      required
                      value={formData.vorname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-icy-blue/40 rounded-lg focus:ring-2
                               focus:ring-true-cobalt focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="nachname" className="block text-sm font-medium text-black/80 mb-2">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      id="nachname"
                      name="nachname"
                      required
                      value={formData.nachname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-icy-blue/40 rounded-lg focus:ring-2
                               focus:ring-true-cobalt focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black/80 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="telefonnummer" className="block text-sm font-medium text-black/80 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    id="telefonnummer"
                    name="telefonnummer"
                    required
                    value={formData.telefonnummer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="firma" className="block text-sm font-medium text-black/80 mb-2">
                    Firma *
                  </label>
                  <input
                    type="text"
                    id="firma"
                    name="firma"
                    required
                    value={formData.firma}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="mitarbeiteranzahl" className="block text-sm font-medium text-black/80 mb-2">
                    Mitarbeiteranzahl *
                  </label>
                  <select
                    id="mitarbeiteranzahl"
                    name="mitarbeiteranzahl"
                    required
                    value={formData.mitarbeiteranzahl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="5-10">5–10</option>
                    <option value="11-25">11–25</option>
                    <option value="26-50">26–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101-200">101–200</option>
                    <option value="mehr-als-200">mehr als 200</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nachricht" className="block text-sm font-medium text-black/80 mb-2">
                    Worum geht es Ihnen aktuell konkret? (optional)
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    rows={4}
                    value={formData.nachricht}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                             focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg font-medium
                           hover:bg-primary-dark hover:shadow-lg transform hover:-translate-y-0.5
                           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Wird gesendet...
                    </>
                  ) : (
                    'Gespräch anfragen'
                  )}
                </button>

                <p className="text-xs text-black/50 text-center">
                  Mit dem Absenden des Formulars stimmen Sie unserer Datenschutzerklärung zu.
                  Ihre Daten werden ausschließlich zur Kontaktaufnahme verwendet.
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
