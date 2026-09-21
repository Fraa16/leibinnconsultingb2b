import Section from './ui/Section';
import Pill from './ui/Pill';
import Reveal from './ui/Reveal';
import Picture from './ui/Picture';
import { portraitImage, fallbackSrc } from '../lib/media';

export default function UeberUnsSection() {
  return (
    <Section id="ueber-uns" tone="canvas">
      <div className="lc-inner">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          {/* Letter */}
          <div>
            <Reveal>
              <Pill>Über uns</Pill>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="t-h2 mt-7">
                Benefits, <span className="t-muted">die funktionieren</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 space-y-6">
                <p className="t-lead text-ink-muted">
                  Leibinn Consulting unterstützt kleine und mittelständische Unternehmen mit
                  5 bis 200 Mitarbeitenden dabei, durch strukturierte Benefit-Systeme
                  attraktiver für qualifizierte Fachkräfte zu werden.
                </p>
                <p className="t-lead text-ink-muted">
                  Unsere Haltung ist ehrlich, klar und langfristig orientiert. Wir sind kein
                  Produktverkäufer, sondern Ihr Partner für ein Benefit-System, das zu Ihnen
                  passt und messbare Ergebnisse bringt.
                </p>
                <p className="t-lead text-ink-muted">
                  Am Ende geht es uns nicht um den Verkauf einzelner Produkte, sondern darum,
                  dass Ihr Unternehmen als Arbeitgeber spürbar gewinnt – für Sie, Ihr Team und
                  die Menschen, die Sie halten und gewinnen möchten.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="lc-rule mt-10 pt-8">
                <p className="t-body text-ink-muted">Herzliche Grüße</p>
                <p
                  className="mt-1 text-[2rem] leading-tight text-navy lg:text-[2.5rem]"
                  style={{ fontFamily: 'var(--font-signature)' }}
                >
                  Cedrik Leibinn
                </p>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal delay={0.1}>
            <figure className="lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-card">
                <Picture
                  image={portraitImage}
                  fallback={fallbackSrc.portrait}
                  alt="Cedrik Leibinn, Gründer und Geschäftsführer von Leibinn Consulting"
                  sizes="(max-width: 1023px) 88vw, 420px"
                  className="block"
                  imgClassName="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="t-small mt-4 flex items-baseline gap-2 text-ink-muted">
                <span className="font-medium text-ink">Cedrik Leibinn</span>
                <span aria-hidden="true">·</span>
                <span>Gründer &amp; Geschäftsführer</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
