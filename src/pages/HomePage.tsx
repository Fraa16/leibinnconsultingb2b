import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import RealitaetscheckSection from '../components/RealitaetscheckSection';
import AnsatzSection from '../components/AnsatzSection';
import WarumBenefitsSection from '../components/WarumBenefitsSection';
import VergleichSection from '../components/VergleichSection';
import RechnerSection from '../components/RechnerSection';
import AblaufSection from '../components/AblaufSection';
import BranchenSection from '../components/BranchenSection';
import VorteileSection from '../components/VorteileSection';
import UeberUnsSection from '../components/UeberUnsSection';
import StimmenSection from '../components/StimmenSection';
import FaqSection from '../components/FaqSection';
import FinalCTASection from '../components/FinalCTASection';

/*
 * Order follows the decision a Geschäftsführer actually makes, not the
 * order the sections were written in:
 *
 *   problem    Realitätscheck    "this is us"
 *   idea       Ansatz            why single benefits fail
 *   effect     Wirkungsbereiche  what a system does
 *   contrast   Vergleich         the same budget, two outcomes
 *   numbers    Rechner           what it means for my headcount
 *   fit        Branchen          it works in my industry
 *   why us     Vorteile          not a platform, a system
 *   who        Über uns          the person I would deal with
 *   proof      Stimmen           people like me vouch for him
 *   process    Ablauf            exactly what happens next
 *   doubts     FAQ               the last objections
 *   ask        Termin            one big, obvious next step
 *
 * Proof sits straight after the person it vouches for, and the process just
 * before the ask, where "what happens if I click" is the open question.
 */
export default function HomePage() {
  useDocumentMeta({
    title: 'Leibinn Consulting | Benefit-Systeme für den Mittelstand',
    description:
      'Benefit-Systeme für Unternehmen mit 5 bis 200 Mitarbeitenden: steuerlich sauber, einfach zu verwalten und gebaut für Ihren Betrieb. Kostenloses Erstgespräch.',
    path: '/',
  });

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation />
      <main id="inhalt">
        <HeroSection />
        <RealitaetscheckSection />
        <AnsatzSection />
        <WarumBenefitsSection />
        <VergleichSection />
        <RechnerSection />
        <BranchenSection />
        <VorteileSection />
        <UeberUnsSection />
        <StimmenSection />
        <AblaufSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
