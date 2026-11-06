import type { CSSProperties } from 'react';
import { ArrowDown } from 'lucide-react';
import { useSiteNav } from '../hooks/useSiteNav';
import { heroImage } from '../lib/images';
import Container from './ui/Container';
import Image from './ui/Image';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import SplitWords from './ui/SplitWords';

const delay = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties;

/*
 * Proof, in the order a Geschäftsführer weighs it: has anyone like me done
 * this, how fast do I hear back, is it for a firm my size, who do I deal
 * with. "55+ Mandanten" is the client's figure; the other three are claims
 * the site already makes elsewhere. Nothing here is invented.
 */
const PROOF = [
  { figure: '55+', label: 'Mandanten' },
  { figure: '24 h', label: 'Antwortzeit' },
  { figure: '5–200', label: 'Mitarbeitende' },
  { figure: '1:1', label: 'persönlich betreut' },
];

/**
 * Hero: promise and offer on the left, the person on the right with the
 * proof panel overlapping the photo's lower edge.
 *
 * Arrival is staged: rule and eyebrow, the headline rising word by word, the
 * sub-line, the actions, then the photograph uncovering upward and the proof
 * panel landing last.
 */
export default function HeroSection() {
  const { goTo } = useSiteNav();

  return (
    <section id="hero" className="relative overflow-hidden bg-canvas pb-20 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40">
      <Container className="relative">
        <div className="grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal variant="group">
            <Eyebrow>Für Unternehmen mit 5 bis 200 Mitarbeitenden</Eyebrow>

            <h1 className="a-words mt-8 max-w-[16ch]" style={delay(120)}>
              <SplitWords>
                Vom Fachkräftemangel zum <em className="not-italic text-ink-600">begehrten Arbeitgeber</em>
              </SplitWords>
            </h1>

            <p className="a-rise mt-7 max-w-[46ch] text-lead text-content" style={delay(520)}>
              Von einer Gehaltserhöhung kommt bei Ihrem Team oft nur die Hälfte an. Ein durchdachtes
              Benefit-System kommt vollständig an. Wir entwickeln es für Ihren Betrieb: steuerlich
              sauber und einfach zu verwalten.
            </p>

            <div className="a-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(640)}>
              <Button to="/kontakt" size="xl">
                Kostenloses Erstgespräch sichern
              </Button>
              <Button onClick={() => goTo('realitaetscheck')} size="xl" variant="link" className="sm:ml-4">
                Zum Realitätscheck
              </Button>
            </div>

            <div className="relative mt-11 py-5" style={delay(760)}>
              <span aria-hidden="true" className="a-line absolute inset-x-0 top-0 h-px bg-line" />
              <p className="a-fade max-w-[54ch] text-small text-content-muted">
                Für Geschäftsführer:innen, Inhaber:innen und HR-Verantwortliche im deutschen Mittelstand
              </p>
              <span aria-hidden="true" className="a-line absolute inset-x-0 bottom-0 h-px bg-line" />
            </div>
          </Reveal>

          <div className="relative lg:pl-6">
            {/*
              Short delay on purpose: this photo is the page's largest paint,
              and every millisecond it stays clipped is a millisecond added to
              the LCP that search and ad platforms score the page on.
            */}
            <Reveal
              variant="mask"
              delay={120}
              className="relative overflow-hidden rounded-[clamp(1.5rem,2.6vw,2rem)]"
            >
              <Image
                image={heroImage}
                alt="Cedrik Leibinn, Berater für Mitarbeiterbindung"
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-[clamp(26rem,50vw,42rem)] w-full object-cover"
                style={{ objectPosition: '50% 14%' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(155deg, rgba(42,45,124,0.30) 0%, transparent 44%), linear-gradient(to top, rgba(0,0,34,0.66) 0%, transparent 46%)',
                }}
              />
            </Reveal>

            {/* Proof panel, overlapping the photo's lower edge. */}
            <Reveal
              delay={900}
              className="relative z-10 -mt-12 ml-4 mr-2 rounded-xl3 border border-line bg-panel/95 shadow-float
                         backdrop-blur-sm sm:ml-10 lg:-mr-6"
            >
              <dl className="grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
                {PROOF.map((item, i) => (
                  <div
                    key={item.figure}
                    className={
                      'flex flex-col px-5 py-4 sm:px-4 sm:py-5 ' +
                      (i < 2 ? 'border-b border-line sm:border-b-0 ' : '') +
                      (i % 2 === 0 ? 'border-r border-line sm:border-r-0' : '')
                    }
                  >
                    <dt className="order-2 mt-1 block text-[0.8125rem] leading-snug text-content-muted">
                      {item.label}
                    </dt>
                    <dd className="tnum order-1 text-[1.5rem] font-medium leading-none tracking-[-0.03em] text-content-strong">
                      {item.figure}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>

      <button
        onClick={() => goTo('realitaetscheck')}
        className="group mx-auto mt-16 hidden items-center gap-3 lg:flex"
        aria-label="Nach unten scrollen"
      >
        <span className="text-meta uppercase text-content-faint transition-colors group-hover:text-ink-600">
          Mehr erfahren
        </span>
        <span
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-content-muted
                     transition-colors group-hover:border-ink-300 group-hover:text-ink-600"
        >
          <ArrowDown size={15} />
        </span>
      </button>
    </section>
  );
}
