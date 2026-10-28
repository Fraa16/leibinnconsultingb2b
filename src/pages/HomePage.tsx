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
 * Section rhythm alternates inset light panels against full-bleed dark, as
 * the brand handoffs do. Vergleich, Rechner, Stimmen and FAQ are the new
 * sections; their structure is built and their wording is marked as slots.
 */
export default function HomePage() {
  useDocumentMeta({
    title: 'Leibinn Consulting — Benefit-Systeme für den Mittelstand',
    description:
      'Strukturierte Benefit-Systeme für kleine und mittelständische Unternehmen mit 5 bis 200 Mitarbeitenden — steuerlich optimiert, verwaltungsarm und spürbar wirksam.',
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
        <AblaufSection />
        <BranchenSection />
        <VorteileSection />
        <UeberUnsSection />
        <StimmenSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
