import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import { Hammer, Heart, Briefcase, ShoppingBag, Cog, FileText } from 'lucide-react';

export default function BranchenSection() {
  const industries = [
    {
      icon: Hammer,
      title: 'Handwerk & Bau',
      description:
        'Körperlich anspruchsvolle Arbeit, früher Arbeitsbeginn, Außeneinsätze – Ihre Mitarbeitenden brauchen Benefits, die Gesundheit und Erholung unterstützen.',
    },
    {
      icon: Heart,
      title: 'Pflege & Soziales',
      description:
        'Hohe emotionale Belastung, Schichtdienst, direkte Arbeit mit Menschen – hier zählen Benefits, die Wertschätzung zeigen und Entlastung bieten.',
    },
    {
      icon: Briefcase,
      title: 'Dienstleister',
      description:
        'Projektarbeit, Kundenkontakt, flexible Einsatzorte – Benefits sollten Mobilität, Weiterbildung und Work-Life-Balance fördern.',
    },
    {
      icon: ShoppingBag,
      title: 'Einzelhandel & Gastronomie',
      description:
        'Wochenend- und Feiertagsarbeit, direkter Kundenkontakt, Spitzenzeiten – Ihre Mitarbeitenden schätzen planbare Freizeit und finanzielle Extras.',
    },
    {
      icon: Cog,
      title: 'Produktion & Fertigung',
      description:
        'Schichtarbeit, körperliche Anforderungen, Präzisionsarbeit – hier punkten Sie mit Gesundheitsvorsorge und Altersabsicherung.',
    },
    {
      icon: FileText,
      title: 'Verwaltung & Bürobetriebe',
      description:
        'Bildschirmarbeit, lange Sitzzeiten, konzentrierte Tätigkeiten – Benefits für Gesundheit, Mobilität und flexible Arbeitsmodelle sind gefragt.',
    },
  ];

  return (
    <section id="branchen" className="py-20 px-4 sm:px-6 lg:px-8 bg-background-alternate relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-4">
              Lösungen, die zu Ihrer Branche passen
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              Jede Branche hat ihre eigenen Herausforderungen. Wir entwickeln Benefit-Systeme,
              die zur Realität Ihrer Mitarbeitenden passen.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -2, boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)' }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-6 h-full shadow-sm border border-icy-blue/30
                         hover:border-icy-blue transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <industry.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  {industry.title}
                </h3>
                <p className="text-sm text-black/70 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
