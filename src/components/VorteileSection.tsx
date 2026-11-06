import { ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Ornament from './ui/Ornament';
import Reveal from './ui/Reveal';
import Button from './ui/Button';

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

/**
 * Bento panel: the section head occupies the first cell as a navy tile, and
 * the five advantages fill the remaining five of a six-cell ruled grid.
 */
export default function VorteileSection() {
  return (
    <Section id="vorteile" tone="canvas" size="lg">
      <div className="grid gap-px overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        <Reveal className="relative flex flex-col justify-between bg-ink-950 p-7 lg:p-9">
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
          <Ornament className="-bottom-12 -right-16 w-[22rem] text-ice-300" rotate={-8} opacity={0.12} />
          <div className="relative">
            <Eyebrow tone="onInk">Warum unser Ansatz wirkt</Eyebrow>
            <h2 className="mt-7 max-w-[13ch] text-h3 text-white">
              Vorteile, die im Alltag Ihrer Mitarbeitenden ankommen
            </h2>
            <p className="mt-5 text-small leading-relaxed text-white/55">
              Wir entwickeln Benefit-Konzepte speziell für kleine und mittlere Unternehmen – mit
              klarem Fokus auf Umsetzbarkeit, steuerlicher Sicherheit und messbarer Wirkung im Alltag.
            </p>
          </div>

          <div className="relative mt-9">
            {/* Previously scrolled to a #kontakt anchor that resolved to nothing. */}
            <Button to="/kontakt" variant="onInk" icon={<ArrowUpRight size={17} />}>
              Jetzt Vorteile im Gespräch prüfen
            </Button>
          </div>
        </Reveal>

        {benefits.map((benefit, i) => (
          <Reveal
            key={benefit.title}
            delay={(i + 1) * 60}
            className="bg-panel p-7 transition-colors duration-300 hover:bg-raised lg:p-9"
          >
            <h3 className="text-h4">{benefit.title}</h3>
            <p className="mt-3 text-small leading-relaxed text-content">{benefit.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
