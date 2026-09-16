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
  return (
    <div className="min-h-screen bg-surface">
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
