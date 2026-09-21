import Section from './ui/Section';
import Pill from './ui/Pill';
import Reveal from './ui/Reveal';
import CTAButton from './ui/CTAButton';

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
  return (
    <Section id="vorteile" tone="surface" className="mt-3 md:mt-5">
      <div className="lc-inner">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Pill>Warum unser Ansatz wirkt</Pill>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-h2 mt-7">
                Vorteile, die im Alltag Ihrer{' '}
                <span className="t-muted">Mitarbeitenden ankommen</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:pt-3">
            <p className="t-lead text-ink-muted">
              Wir entwickeln Benefit-Konzepte speziell für kleine und mittlere Unternehmen – mit
              klarem Fokus auf Umsetzbarkeit, steuerlicher Sicherheit und messbarer Wirkung im Alltag.
            </p>
            <CTAButton to="/kontakt" className="mt-8">
              Jetzt Vorteile im Gespräch prüfen
            </CTAButton>
          </Reveal>
        </div>

        {/* Glassmorphism removed: white/20 cards with backdrop-blur over a
            flat grey only lowered contrast. Hairlines carry the structure. */}
        <div className="mt-16 grid gap-x-14 gap-y-0 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 3) * 0.05}>
              <div className="lc-rule h-full py-8">
                <span className="t-small tabular-nums text-navy/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="t-h3 mt-4">{benefit.title}</h3>
                <p className="t-body mt-2.5 text-ink-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
