import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Eyebrow from '../components/ui/Eyebrow';
import Field from '../components/ui/Field';
import { controlClasses } from '../lib/formStyles';
import { supabase } from '../lib/supabase';
import { STATIC_VARIANTS, VIEWPORT, staggerVariants, staggerChild } from '../lib/motion';
import { cn } from '../lib/cn';

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt isolierter Einzelmaßnahmen',
  'Persönliche Begleitung von Cedrik Leibinn – ohne anonyme Produkthotlines',
];

const EMPTY = {
  vorname: '',
  nachname: '',
  email: '',
  telefonnummer: '',
  firma: '',
  mitarbeiteranzahl: '',
  position: '',
  nachricht: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function KontaktPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const reduced = useReducedMotion();

  useDocumentMeta({
    title: 'Kontakt & Erstgespräch — Leibinn Consulting',
    description:
      'Kostenloses Erstgespräch für Ihr Benefit-System: ehrliche Einschätzung, konkrete Ansatzpunkte und ein klares Bild, ob eine Zusammenarbeit sinnvoll ist.',
    path: '/kontakt',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Persists the lead.
   *
   * The original handler was `e.preventDefault(); setIsSubmitted(true);` — no
   * network call at all, so every enquiry was silently discarded while the
   * visitor was told they would hear back within 24 hours.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    if (honeypot) return;

    setStatus('submitting');
    try {
      const { position, ...core } = form;
      const row = { ...core, nachricht: form.nachricht || null };

      let { error } = await supabase
        .from('contact_submissions')
        .insert([{ ...row, position: position || null }]);

      // `position` arrives with a migration in this change. If it has not been
      // applied yet, PostgREST rejects the whole row over the unknown column —
      // so fall back to inserting without it rather than losing the lead.
      if (error && /position/i.test(`${error.message} ${error.details ?? ''}`)) {
        console.warn('contact_submissions.position missing — run the migration. Retrying without it.');
        ({ error } = await supabase.from('contact_submissions').insert([row]));
      }
      if (error) throw error;

      setForm(EMPTY);
      setSubmitted(false);
      setStatus('success');
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  const busy = status === 'submitting';

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation />
      <main id="inhalt">
        <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
          <div
            aria-hidden="true"
            className="grid-lines-light pointer-events-none absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)',
            }}
          />

          <Container className="relative">
            <motion.div
              variants={reduced ? STATIC_VARIANTS : staggerVariants(0.1, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
            >
              <motion.div variants={reduced ? STATIC_VARIANTS : staggerChild} className="lg:pt-4">
                <Eyebrow>KONTAKT &amp; ERSTGESPRÄCH</Eyebrow>

                <h1 className="mt-7 max-w-[15ch]">Kostenloses Erstgespräch für Ihr Benefit-System</h1>

                <p className="mt-6 max-w-measure text-lead text-content">
                  In einem unverbindlichen Erstgespräch prüfen wir gemeinsam, wie ein strukturiertes Benefit-System in Ihrem Unternehmen aussehen kann. Sie erhalten eine ehrliche Einschätzung, konkrete Ansatzpunkte und ein klares Bild, ob und wie eine Zusammenarbeit sinnvoll ist.
                </p>

                <ul className="mt-10 space-y-px border-t border-line">
                  {assurances.map((line) => (
                    <li key={line} className="flex items-start gap-3.5 border-b border-line py-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-600/10 text-ink-600"
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-small leading-relaxed text-content">{line}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-small text-content-muted">
                  Ihre Anfrage ist unverbindlich und wird vertraulich behandelt.
                </p>
              </motion.div>

              <motion.div
                variants={reduced ? STATIC_VARIANTS : staggerChild}
                className="overflow-hidden rounded-xl4 border border-line bg-panel shadow-float"
              >
                {status === 'success' ? (
                  <div className="px-7 py-20 text-center sm:px-10" role="status" aria-live="polite">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink-600/10 text-ink-600">
                      <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h2 className="mt-6 text-h3">Vielen Dank für Ihre Anfrage!</h2>
                    <p className="mx-auto mt-3 max-w-[32ch] text-small leading-relaxed text-content">
                      Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-line bg-raised px-7 py-7 sm:px-9">
                      <Eyebrow>Ihre Anfrage</Eyebrow>
                      <h2 className="mt-4 text-h4">Lassen Sie uns über Ihr Benefit-System sprechen</h2>
                      <p className="mt-2.5 text-small leading-relaxed text-content">
                        Füllen Sie das Formular in 2–3 Minuten aus. Wir melden uns innerhalb von 24 Stunden mit einem Vorschlag für Ihr Erstgespräch.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className={cn('px-7 py-8 sm:px-9', submitted && 'submitted')}
                    >
                      {/* Honeypot — hidden from people, irresistible to bots. */}
                      <div aria-hidden="true" className="absolute left-[-9999px] top-0">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
                          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field id="vorname" label="Vorname *">
                          <input
                            id="vorname" name="vorname" type="text" required
                            autoComplete="given-name" placeholder="Ihr Vorname"
                            value={form.vorname} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field id="nachname" label="Nachname *">
                          <input
                            id="nachname" name="nachname" type="text" required
                            autoComplete="family-name" placeholder="Ihr Nachname"
                            value={form.nachname} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field id="email" label="E-Mail-Adresse *">
                          <input
                            id="email" name="email" type="email" required
                            autoComplete="email" placeholder="name@unternehmen.de"
                            value={form.email} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field id="telefonnummer" label="Telefonnummer *">
                          <input
                            id="telefonnummer" name="telefonnummer" type="tel" required
                            autoComplete="tel" placeholder="+49 …"
                            value={form.telefonnummer} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field id="firma" label="Unternehmen *">
                          <input
                            id="firma" name="firma" type="text" required
                            autoComplete="organization" placeholder="Name Ihres Unternehmens"
                            value={form.firma} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field id="mitarbeiteranzahl" label="Mitarbeitende *">
                          <select
                            id="mitarbeiteranzahl" name="mitarbeiteranzahl" required
                            value={form.mitarbeiteranzahl} onChange={handleChange} className={controlClasses}
                          >
                            <option value="">Bitte wählen</option>
                            <option value="5-20">5–20 Mitarbeitende</option>
                            <option value="21-50">21–50 Mitarbeitende</option>
                            <option value="51-100">51–100 Mitarbeitende</option>
                            <option value="101-200">101–200 Mitarbeitende</option>
                            <option value="200+">Mehr als 200</option>
                          </select>
                        </Field>

                        <Field id="position" label="Ihre Position" className="md:col-span-2">
                          <input
                            id="position" name="position" type="text"
                            autoComplete="organization-title"
                            placeholder="z. B. Geschäftsführung, HR-Leitung …"
                            value={form.position} onChange={handleChange} className={controlClasses}
                          />
                        </Field>

                        <Field
                          id="nachricht"
                          label="Worum geht es in Ihrem Anliegen? *"
                          className="md:col-span-2"
                        >
                          <textarea
                            id="nachricht" name="nachricht" required rows={4}
                            placeholder="Beschreiben Sie kurz Ihre aktuelle Situation, Ziele und Fragen rund um Benefits."
                            value={form.nachricht} onChange={handleChange}
                            className={cn(controlClasses, 'resize-none')}
                          />
                        </Field>
                      </div>

                      <div aria-live="polite" role="status">
                        {status === 'error' && (
                          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-danger/25 bg-danger-surface px-4 py-3">
                            <AlertCircle size={16} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
                            <p className="text-small text-danger">
                              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-7 border-t border-line pt-6">
                        <button
                          type="submit"
                          disabled={busy}
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-full
                                     bg-ink-600 px-7 py-3.5 text-small font-medium text-white shadow-ink
                                     transition-colors duration-200 hover:bg-ink-700
                                     disabled:pointer-events-none disabled:opacity-60"
                        >
                          {busy ? (
                            <>
                              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                              Wird gesendet...
                            </>
                          ) : (
                            <>
                              Erstgespräch anfragen
                              <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                              />
                            </>
                          )}
                        </button>

                        <p className="mt-4 text-small leading-relaxed text-content-muted">
                          Mit dem Absenden erklären Sie sich damit einverstanden, dass wir Ihre Angaben zur Kontaktaufnahme und Bearbeitung Ihrer Anfrage verwenden.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
