import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import RealitaetscheckSection from '../components/RealitaetscheckSection';
import AnsatzSection from '../components/AnsatzSection';
import WarumBenefitsSection from '../components/WarumBenefitsSection';
import AblaufSection from '../components/AblaufSection';
import BranchenSection from '../components/BranchenSection';
import VorteileSection from '../components/VorteileSection';
import UeberUnsSection from '../components/UeberUnsSection';
import FinalCTASection from '../components/FinalCTASection';

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
        <AblaufSection />
        <BranchenSection />
        <VorteileSection />
        <UeberUnsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
