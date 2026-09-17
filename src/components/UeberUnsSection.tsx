import { motion, useReducedMotion } from 'framer-motion';
import { portraitImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Image from './ui/Image';

/**
 * Editorial split: the portrait runs flush to the panel edge rather than
 * sitting inside it as a rounded card with a caption underneath.
 */
export default function UeberUnsSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.1, 0.12);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ueber-uns" tone="canvas" size="lg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="overflow-hidden rounded-xl4 border border-line bg-panel"
      >
        <div className="grid lg:grid-cols-[0.8fr_1fr]">
          <motion.figure variants={item} className="relative m-0 border-b border-line lg:border-b-0 lg:border-r">
            <Image
              image={portraitImage}
              alt="Cedrik Leibinn"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            />
            <figcaption
              className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-ink-950/70
                         px-3.5 py-1.5 text-label uppercase text-white/85 backdrop-blur-sm"
            >
              Gründer &amp; Geschäftsführer
            </figcaption>
          </motion.figure>

          <motion.div variants={item} className="p-7 sm:p-10 lg:p-14">
            <h2 className="max-w-[14ch]">Benefits, die funktionieren</h2>

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

            <div className="mt-10 flex items-end justify-between gap-6 border-t border-line pt-7">
              <div>
                <p className="text-small text-content-muted">Herzliche Grüße</p>
                <p className="mt-1 font-signature text-[2.25rem] leading-none text-ink-700">
                  Cedrik Leibinn
                </p>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-line sm:block"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
