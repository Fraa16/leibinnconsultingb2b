import { useState, type FormEvent } from 'react';
import { CheckCircle2, ArrowRight, Loader2, AlertCircle, Check } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Pill from '../components/ui/Pill';
import Reveal from '../components/ui/Reveal';
import { TextField, SelectField } from '../components/form/Field';
import { supabase } from '../lib/supabase';

type FormState = {
  vorname: string;
  nachname: string;
  email: string;
  telefonnummer: string;
  firma: string;
  mitarbeiteranzahl: string;
  position: string;
  nachricht: string;
};

const EMPTY: FormState = {
  vorname: '',
  nachname: '',
  email: '',
  telefonnummer: '',
  firma: '',
  mitarbeiteranzahl: '',
  position: '',
  nachricht: '',
};

const assurances = [
  'Speziell für kleine und mittlere Unternehmen mit 5–200 Mitarbeitenden',
  'Steuerlich durchdachte, alltagstaugliche Lösungen statt isolierter Einzelmaßnahmen',
  'Persönliche Begleitung von Cedrik Leibinn – ohne anonyme Produkthotlines',
];

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!values.vorname.trim()) errors.vorname = 'Bitte geben Sie Ihren Vornamen an.';
  if (!values.nachname.trim()) errors.nachname = 'Bitte geben Sie Ihren Nachnamen an.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
  if (values.telefonnummer.replace(/[^\d]/g, '').length < 6)
    errors.telefonnummer = 'Bitte geben Sie eine gültige Telefonnummer an.';
  if (!values.firma.trim()) errors.firma = 'Bitte geben Sie Ihr Unternehmen an.';
  if (!values.mitarbeiteranzahl) errors.mitarbeiteranzahl = 'Bitte wählen Sie eine Größe aus.';
  if (values.nachricht.trim().length < 10)
    errors.nachricht = 'Bitte beschreiben Sie Ihr Anliegen in ein bis zwei Sätzen.';
  return errors;
}

export default function KontaktPage() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('sending');

    if (!supabase) {
      setStatus('error');
      return;
    }

    // `position` has no column in contact_submissions, so it is carried in
    // the message body rather than being silently dropped.
    const nachricht = values.position.trim()
      ? `${values.nachricht.trim()}\n\nPosition: ${values.position.trim()}`
      : values.nachricht.trim();

    const { error } = await supabase.from('contact_submissions').insert([
      {
        vorname: values.vorname.trim(),
        nachname: values.nachname.trim(),
        email: values.email.trim(),
        telefonnummer: values.telefonnummer.trim(),
        firma: values.firma.trim(),
        mitarbeiteranzahl: values.mitarbeiteranzahl,
        nachricht,
      },
    ]);

    if (error) {
      console.error('[kontakt] submission failed', error);
      setStatus('error');
      return;
    }

    setStatus('sent');
    setValues(EMPTY);
  };

  return (
    <>
      <Navigation />

      <main id="kontakt" className="pt-[calc(6.5rem+var(--lc-gutter))]">
        <section className="lc-inner pb-24 md:pb-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            {/* Context */}
            <div>
              <Reveal>
                <Pill>Kontakt &amp; Erstgespräch</Pill>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="t-h2 mt-7">
                  Kostenloses Erstgespräch{' '}
                  <span className="t-muted">für Ihr Benefit-System</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="t-lead mt-7 text-ink-muted">
                  In einem unverbindlichen Erstgespräch prüfen wir gemeinsam, wie ein strukturiertes
                  Benefit-System in Ihrem Unternehmen aussehen kann. Sie erhalten eine ehrliche
                  Einschätzung, konkrete Ansatzpunkte und ein klares Bild, ob und wie eine
                  Zusammenarbeit sinnvoll ist.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <ul className="mt-9 space-y-4">
                  {assurances.map((line) => (
                    <li key={line} className="flex items-start gap-3.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-navy" strokeWidth={2.5} aria-hidden="true" />
                      <span className="t-body text-ink-muted">{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="t-small lc-rule mt-10 pt-7 text-ink-subtle">
                  Ihre Anfrage ist unverbindlich und wird vertraulich behandelt.
                </p>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="rounded-block border border-ink/10 bg-white p-7 sm:p-9 lg:p-10">
                {status === 'sent' ? (
                  <div className="py-14 text-center" role="status">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-navy" strokeWidth={1.5} />
                    <h2 className="t-h3 mt-6">Vielen Dank für Ihre Anfrage!</h2>
                    <p className="t-body mx-auto mt-3 max-w-sm text-ink-muted">
                      Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="t-h3">Lassen Sie uns über Ihr Benefit-System sprechen</h2>
                    <p className="t-body mt-3 text-ink-muted">
                      Füllen Sie das Formular in 2–3 Minuten aus. Wir melden uns innerhalb von 24
                      Stunden mit einem Vorschlag für Ihr Erstgespräch.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="mt-8">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextField
                          label="Vorname"
                          required
                          autoComplete="given-name"
                          placeholder="Ihr Vorname"
                          value={values.vorname}
                          onChange={set('vorname')}
                          error={errors.vorname}
                        />
                        <TextField
                          label="Nachname"
                          required
                          autoComplete="family-name"
                          placeholder="Ihr Nachname"
                          value={values.nachname}
                          onChange={set('nachname')}
                          error={errors.nachname}
                        />
                        <TextField
                          label="E-Mail-Adresse"
                          required
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="name@unternehmen.de"
                          value={values.email}
                          onChange={set('email')}
                          error={errors.email}
                        />
                        <TextField
                          label="Telefonnummer"
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+49 …"
                          value={values.telefonnummer}
                          onChange={set('telefonnummer')}
                          error={errors.telefonnummer}
                        />
                        <TextField
                          label="Unternehmen"
                          required
                          autoComplete="organization"
                          placeholder="Name Ihres Unternehmens"
                          value={values.firma}
                          onChange={set('firma')}
                          error={errors.firma}
                        />
                        <SelectField
                          label="Mitarbeitende"
                          required
                          value={values.mitarbeiteranzahl}
                          onChange={set('mitarbeiteranzahl')}
                          error={errors.mitarbeiteranzahl}
                        >
                          <option value="">Bitte wählen</option>
                          <option value="5-20">5–20 Mitarbeitende</option>
                          <option value="21-50">21–50 Mitarbeitende</option>
                          <option value="51-100">51–100 Mitarbeitende</option>
                          <option value="101-200">101–200 Mitarbeitende</option>
                          <option value="200+">Mehr als 200</option>
                        </SelectField>
                        <TextField
                          className="sm:col-span-2"
                          label="Ihre Position"
                          autoComplete="organization-title"
                          placeholder="z. B. Geschäftsführung, HR-Leitung …"
                          value={values.position}
                          onChange={set('position')}
                        />
                        <TextField
                          className="sm:col-span-2"
                          multiline
                          rows={4}
                          label="Worum geht es in Ihrem Anliegen?"
                          required
                          placeholder="Beschreiben Sie kurz Ihre aktuelle Situation, Ziele und Fragen rund um Benefits."
                          value={values.nachricht}
                          onChange={set('nachricht')}
                          error={errors.nachricht}
                        />
                      </div>

                      {status === 'error' && (
                        <div
                          role="alert"
                          className="mt-6 flex items-start gap-3 rounded-xl border border-red-600/25 bg-red-50 p-4"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" aria-hidden="true" />
                          <p className="text-[0.8125rem] leading-relaxed text-red-800">
                            Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es
                            erneut oder schreiben Sie uns direkt an{' '}
                            <a className="font-medium underline" href="mailto:info@leibinn-consulting.de">
                              info@leibinn-consulting.de
                            </a>
                            .
                          </p>
                        </div>
                      )}

                      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[0.75rem] leading-relaxed text-ink-subtle sm:max-w-xs">
                          Mit dem Absenden erklären Sie sich damit einverstanden, dass wir Ihre
                          Angaben zur Kontaktaufnahme und Bearbeitung Ihrer Anfrage verwenden.
                        </p>

                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="lc-btn lc-btn-primary w-full shrink-0 disabled:opacity-65 sm:w-auto"
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                              Wird gesendet …
                            </>
                          ) : (
                            <>
                              Erstgespräch anfragen
                              <ArrowRight size={16} className="lc-arrow" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
