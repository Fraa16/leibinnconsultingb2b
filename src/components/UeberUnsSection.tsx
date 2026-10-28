import { portraitImage } from '../lib/images';
import Section from './ui/Section';
import Image from './ui/Image';
import Reveal from './ui/Reveal';

/**
 * Editorial split with the portrait flush to the panel edge and the name set
 * on a frosted card over it, as the brand pages do.
 */
export default function UeberUnsSection() {
  return (
    <Section id="ueber-uns" tone="panel" size="lg" contained={false}>
      <div className="mx-auto w-full max-w-content px-[clamp(1.25rem,4vw,3.5rem)]">
        <Reveal className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line bg-canvas">
          <div className="grid lg:grid-cols-[0.85fr_1fr]">
            <figure className="relative m-0 border-b border-line lg:border-b-0 lg:border-r">
              <Image
                image={portraitImage}
                alt="Cedrik Leibinn"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[36rem]"
              />
              <figcaption
                className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-ink-950/75
                           px-4 py-2 text-meta uppercase text-white/85 backdrop-blur-sm"
              >
                Gründer &amp; Geschäftsführer
              </figcaption>
            </figure>

            <div className="p-7 sm:p-10 lg:p-14">
              <h2 className="max-w-[13ch]">Benefits, die funktionieren</h2>

              <div className="mt-8 space-y-5">
                <p className="max-w-measure text-lead text-content">
                  Leibinn Consulting unterstützt kleine und mittelständische Unternehmen mit
                  5 bis 200 Mitarbeitenden dabei, durch strukturierte Benefit-Systeme
                  attraktiver für qualifizierte Fachkräfte zu werden.
                </p>
                <p className="max-w-measure text-lead text-content">
                  Unsere Haltung ist ehrlich, klar und langfristig orientiert. Wir sind kein
                  Produktverkäufer, sondern Ihr Partner für ein Benefit-System, das zu Ihnen
                  passt und messbare Ergebnisse bringt.
                </p>
                <p className="max-w-measure text-lead text-content">
                  Am Ende geht es uns nicht um den Verkauf einzelner Produkte, sondern darum,
                  dass Ihr Unternehmen als Arbeitgeber spürbar gewinnt – für Sie, Ihr Team und
                  die Menschen, die Sie halten und gewinnen möchten.
                </p>
              </div>

              <div className="mt-10 border-t border-line pt-7">
                <p className="text-small text-content-muted">Herzliche Grüße</p>
                <p className="mt-1 font-signature text-[2.25rem] leading-none text-ink-700">
                  Cedrik Leibinn
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
