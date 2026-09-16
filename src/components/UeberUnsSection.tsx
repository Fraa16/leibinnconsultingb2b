import AnimatedSection from './AnimatedSection';
import cedrikImage from '../images/Cedrik-Leibinn.jpg';

export default function UeberUnsSection() {

  return (
    <section id="ueber-uns" className="py-16 md:py-20 lg:py-24 bg-bright-snow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-white rounded-[40px] shadow-[0_18px_45px_rgba(0,0,0,0.08)] p-8 md:p-12 lg:p-16">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* Left: Text Content */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 leading-tight">
Benefits, die funktionieren
              </h2>

              <p className="text-base lg:text-lg text-black/80 leading-relaxed">
                Leibinn Consulting unterstützt kleine und mittelständische Unternehmen mit
                5 bis 200 Mitarbeitenden dabei, durch strukturierte Benefit-Systeme
                attraktiver für qualifizierte Fachkräfte zu werden.
              </p>


              <p className="text-base lg:text-lg text-black/80 leading-relaxed">
                Unsere Haltung ist ehrlich, klar und langfristig orientiert. Wir sind kein
                Produktverkäufer, sondern Ihr Partner für ein Benefit-System, das zu Ihnen
                passt und messbare Ergebnisse bringt.
              </p>

              <p className="mt-6 text-base lg:text-lg text-black/80 leading-relaxed">
                Am Ende geht es uns nicht um den Verkauf einzelner Produkte, sondern darum,
                dass Ihr Unternehmen als Arbeitgeber spürbar gewinnt – für Sie, Ihr Team und
                die Menschen, die Sie halten und gewinnen möchten.
              </p>

              <div className="mt-6">
                <p className="text-base lg:text-lg text-black/70 leading-relaxed">
                  Herzliche Grüße
                </p>
                <p className="mt-1 text-2xl lg:text-3xl font-normal text-[#016FB9]" style={{ fontFamily: 'var(--font-signature)' }}>
                  Cedrik Leibinn
                </p>
              </div>

            </div>
          </AnimatedSection>

          {/* Right: Portrait Card */}
          <AnimatedSection delay={0.2}>
            <div className="lg:justify-self-end w-full max-w-md mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.08)] border border-black/5">
                <div className="w-full aspect-[3/4] bg-neutral-200">
                  <img
                    src={cedrikImage}
                    alt="Cedrik Leibinn"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-black/50 text-center">
                Gründer & Geschäftsführer
              </p>
            </div>
          </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
