import { ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import Accordion from './ui/Accordion';
import Slot from './ui/Slot';

/** Six slots; the handoff's FAQ carries six to seven entries. */
const ITEMS = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `faq-${n}`,
  title: <Slot>Platzhalter: Frage {n}</Slot>,
  body: <Slot as="block">Platzhalter: Antwort {n}</Slot>,
}));

/**
 * FAQ: sticky intro beside a single-open accordion, per the handoff. The
 * mechanics are complete; the questions and answers are slots.
 */
export default function FaqSection() {
  return (
    <Section id="faq" tone="panel" size="lg">
      <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1fr_1.8fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            eyebrow={<Slot>Platzhalter: Eyebrow</Slot>}
            title={<Slot>Platzhalter: FAQ-Überschrift</Slot>}
            titleWidth="max-w-[14ch]"
            className="lg:!grid-cols-1"
          />
          <Reveal delay={120} className="mt-8">
            <Button to="/kontakt" variant="secondary" icon={<ArrowUpRight size={17} />}>
              <Slot>Platzhalter: CTA</Slot>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Accordion items={ITEMS} defaultOpen={0} className="border-t border-line" />
        </Reveal>
      </div>
    </Section>
  );
}
