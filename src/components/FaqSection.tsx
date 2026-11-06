import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Accordion from './ui/Accordion';

/*
 * The objections a Geschäftsführer raises before booking a call, in roughly
 * the order they come up: is this for us, what does it cost, is it really
 * tax-free, how much work is it, does it replace pay, we already have
 * benefits, how long does it take, what happens in the first call.
 *
 * Every answer stays inside what the site already claims plus statutory
 * fact. No prices, no timelines in weeks, no figures about the firm beyond
 * the ones the client supplied.
 */
const ITEMS = [
  {
    q: 'Für welche Unternehmen lohnt sich ein Benefit-System?',
    a: 'Für Betriebe mit 5 bis 200 Mitarbeitenden, die Fachkräfte gewinnen oder halten wollen. Die Branche spielt eine kleinere Rolle, als viele denken: Steuerfreie Bausteine gibt es für jeden Betrieb. Entscheidend ist, welche davon zu Ihrem Team passen.',
  },
  {
    q: 'Was kostet die Beratung?',
    a: 'Das Erstgespräch ist kostenlos und unverbindlich. Danach erhalten Sie ein Angebot, das sich nach Größe und Umfang richtet. Sie entscheiden erst, wenn Sie wissen, was Sie bekommen.',
  },
  {
    q: 'Sind Benefits wirklich steuerfrei?',
    a: 'Viele ja, wenn die Voraussetzungen stimmen. Der monatliche Sachbezug bis 50 € und die Gesundheitsförderung bis 600 € im Jahr sind steuer- und sozialversicherungsfrei, sofern Sie sie zusätzlich zum Gehalt zahlen. Andere Bausteine werden pauschal versteuert. Wir ordnen jeden einzelnen sauber ein.',
  },
  {
    q: 'Wie viel Aufwand entsteht für uns?',
    a: 'So wenig wie möglich. Analyse, Konzept und Kommunikation übernehmen wir. Von Ihnen brauchen wir Informationen zu Ihrem Team und kurze Abstimmungen mit Ihrer Lohnbuchhaltung.',
  },
  {
    q: 'Ersetzen Benefits eine Gehaltserhöhung?',
    a: 'Nein, und das sollen sie auch nicht. Ein faires Gehalt bleibt die Basis. Benefits sorgen dafür, dass jeder zusätzliche Euro mehr bewirkt, weil er ohne Abzüge ankommt.',
  },
  {
    q: 'Wir haben schon Benefits. Lohnt sich das trotzdem?',
    a: 'Gerade dann. Oft gibt es einzelne Leistungen, die kaum jemand nutzt. Manchmal reicht es schon, Vorhandenes neu zu ordnen und richtig zu kommunizieren.',
  },
  {
    q: 'Wie lange dauert die Einführung?',
    a: 'Das hängt vom Umfang ab. Einzelne Bausteine wie der monatliche Sachbezug lassen sich kurzfristig starten. Das vollständige System bauen wir Schritt für Schritt mit Ihnen auf.',
  },
  {
    q: 'Was passiert im Erstgespräch?',
    a: 'Wir schauen auf Ihre Situation und Ihre Ziele. Sie bekommen eine ehrliche Einschätzung und konkrete Ansatzpunkte, auch wenn wir danach nicht zusammenarbeiten.',
  },
].map((item, i) => ({ id: `faq-${i + 1}`, title: item.q, body: item.a }));

/**
 * FAQ: sticky intro beside a single-open accordion. The rows arrive one by
 * one and open smoothly, the same motion as the consequences on the dark
 * card further up.
 */
export default function FaqSection() {
  return (
    <Section id="faq" tone="panel" size="lg">
      <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1fr_1.8fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            eyebrow="Häufige Fragen"
            title="Gut zu wissen, bevor wir sprechen"
            titleWidth="max-w-[12ch]"
            className="lg:!grid-cols-1"
          />
          <Reveal delay={200} className="mt-8">
            <p className="max-w-[34ch] text-small text-content">
              Ihre Frage ist nicht dabei? Stellen Sie sie direkt, wir antworten innerhalb von 24 Stunden.
            </p>
            <Button to="/kontakt" variant="secondary" className="mt-5">
              Frage stellen
            </Button>
          </Reveal>
        </div>

        <Accordion items={ITEMS} defaultOpen={0} size="md" />
      </div>
    </Section>
  );
}
