import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { BudgetFormSection } from '@/components/sections/BudgetFormSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { ReformeExpressSection } from '@/components/sections/ReformeExpressSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <PortfolioSection />
        <BudgetFormSection />
        <PartnersSection />
        <ReformeExpressSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
