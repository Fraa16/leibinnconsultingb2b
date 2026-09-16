import AnimatedSection from './AnimatedSection';

const processSteps = [
  {
    stepNumber: 1,
    title: 'Analyse & Standortbestimmung',
    text: 'Im Erstgespräch erfassen wir Ihre aktuelle Situation, Ihre Ziele und Herausforderungen. Wir analysieren, welche Benefits bereits existieren und wo Optimierungspotenzial liegt.',
  },
  {
    stepNumber: 2,
    title: 'Konzeption & Budgetrahmen',
    text: 'Wir entwickeln ein maßgeschneidertes Benefit-System, das zu Ihrer Branche, Ihren Mitarbeitenden und Ihrem Budget passt. Sie erhalten eine klare Übersicht über Kosten und erwartete Effekte.',
  },
  {
    stepNumber: 3,
    title: 'Umsetzung & Kommunikation',
    text: 'Gemeinsam setzen wir das Benefit-System um und entwickeln eine Kommunikationsstrategie für interne und externe Zielgruppen. Ihre Mitarbeitenden und Bewerbende erfahren klar, was Sie bieten.',
  },
  {
    stepNumber: 4,
    title: 'Feinschliff & Weiterentwicklung',
    text: 'Nach der Einführung begleiten wir Sie bei der Optimierung. Wir passen das System an neue Anforderungen an und stellen sicher, dass es langfristig wirksam bleibt.',
  },
];

export default function AblaufSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="ablauf" className="bg-bright-snow py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              So arbeiten wir gemeinsam – Schritt für Schritt
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {processSteps.map((step, index) => (
            <AnimatedSection key={index} delay={0.3 + index * 0.1}>
              <div className="group relative px-8 py-10 flex flex-col gap-4">
                <div
                  className="absolute -top-9 right-4 text-[200px] md:text-[220px] lg:text-[180px] leading-none font-bold pointer-events-none select-none transition-transform duration-250 ease-out group-hover:-translate-y-0.5"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, #2A2D7C 0%, #2A2D7C 66%, transparent 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.2,
                  }}
                >
                  {step.stepNumber}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm md:text-base text-black/70 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7}>
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => scrollToSection('kontakt')}
              className="group inline-flex items-center gap-2 text-black font-medium text-lg hover:text-primary transition-colors duration-300"
            >
              <span className="relative">
                Unverbindliche Beratung anfragen
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black group-hover:bg-primary transition-colors duration-300"></span>
              </span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
