import { portraitImage } from '../lib/images';
import Section from './ui/Section';
import Image from './ui/Image';
import Reveal from './ui/Reveal';
import Eyebrow from './ui/Eyebrow';
import SplitWords from './ui/SplitWords';

/**
 * Editorial split with the portrait flush to the panel edge.
 *
 * Written in the first person: the section closes with Cedrik's signature,
 * so it reads as his note. The rest of the site speaks as "wir".
 */
export default function UeberUnsSection() {
  return (
    <Section id="ueber-uns" tone="panel" size="lg" contained={false}>
      <div className="mx-auto w-full max-w-content px-[clamp(1.25rem,4vw,3.5rem)]">
        <Reveal variant="group" className="overflow-hidden rounded-[clamp(1.25rem,2.4vw,2rem)] border border-line bg-canvas">
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
              <Eyebrow>Über uns</Eyebrow>
              <h2 className="a-words mt-7 max-w-[13ch]" style={{ ['--d' as string]: '120ms' }}>
                <SplitWords>Benefits, die funktionieren</SplitWords>
              </h2>

              <div className="mt-8 space-y-5">
                <p className="a-rise max-w-measure text-lead text-content" style={{ ['--d' as string]: '360ms' }}>
                  Ich bin Cedrik Leibinn. Mit Leibinn Consulting helfe ich Unternehmen mit 5 bis 200
                  Mitarbeitenden, für Fachkräfte attraktiver zu werden, mit Benefit-Systemen, die zum
                  Betrieb passen.
                </p>
                <p className="a-rise max-w-measure text-lead text-content" style={{ ['--d' as string]: '460ms' }}>
                  Ich verkaufe keine Produkte. Ich baue mit Ihnen ein System, das zu Ihrem Betrieb
                  passt, und bleibe dabei, bis es funktioniert.
                </p>
                <p className="a-rise max-w-measure text-lead text-content" style={{ ['--d' as string]: '560ms' }}>
                  Mein Maßstab ist einfach: Bewerbende entscheiden sich für Sie, und Ihr Team bleibt.
                </p>
              </div>

              <div className="a-rise mt-10 border-t border-line pt-7" style={{ ['--d' as string]: '660ms' }}>
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
