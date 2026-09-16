import { motion, useReducedMotion } from 'framer-motion';
import { portraitImage } from '../lib/images';
import { staggerVariants, staggerChild, STATIC_VARIANTS, VIEWPORT } from '../lib/motion';
import Section from './ui/Section';
import Image from './ui/Image';

export default function UeberUnsSection() {
  const reduced = useReducedMotion();
  const container = reduced ? STATIC_VARIANTS : staggerVariants(0.1, 0.15);
  const item = reduced ? STATIC_VARIANTS : staggerChild;

  return (
    <Section id="ueber-uns" tone="subtle" size="lg">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="overflow-hidden rounded-xl4 bg-surface p-7 shadow-card sm:p-10 lg:p-16"
      >
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
          <motion.div variants={item}>
            <h2 className="max-w-[16ch]">Benefits, die funktionieren</h2>

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

            <div className="mt-10 border-t border-ink-100 pt-6">
              <p className="text-small text-content-muted">Herzliche Grüße</p>
              {/* Alex Brush is registered in Tailwind now, so this no longer
                  needs an inline style pointing at the raw CSS variable. */}
              <p className="mt-1 font-signature text-[2rem] leading-none text-ink-600">
                Cedrik Leibinn
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="w-full lg:justify-self-end">
            <figure className="mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-xl3 border border-ink-100 bg-ink-50 shadow-lift">
                <Image
                  image={portraitImage}
                  alt="Cedrik Leibinn"
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 100vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-small text-content-muted">
                Gründer &amp; Geschäftsführer
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
