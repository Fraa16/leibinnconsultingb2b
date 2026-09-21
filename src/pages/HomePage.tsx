import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import HeroSection from '../components/HeroSection';
import RealitaetscheckSection from '../components/RealitaetscheckSection';
import AnsatzSection from '../components/AnsatzSection';
import WarumBenefitsSection from '../components/WarumBenefitsSection';
import AblaufSection from '../components/AblaufSection';
import BranchenSection from '../components/BranchenSection';
import VorteileSection from '../components/VorteileSection';
import UeberUnsSection from '../components/UeberUnsSection';
import FinalCTASection from '../components/FinalCTASection';

/**
 * Section order is also the light/dark rhythm:
 * dark → dark → white → canvas → dark → canvas → white → canvas → dark.
 */
export default function HomePage() {
  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-navy-deep focus:px-5 focus:py-3
                   focus:text-[0.9375rem] focus:text-white"
      >
        Zum Inhalt springen
      </a>

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
      <FloatingCTA />
    </>
  );
}
