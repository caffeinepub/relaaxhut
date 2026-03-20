import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import EOISection from "./components/EOISection";
import FleetSection from "./components/FleetSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ServicesSection from "./components/ServicesSection";
import WhyInvestSection from "./components/WhyInvestSection";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <FleetSection />
        <WhyInvestSection />
        <EOISection />
      </main>
      <Footer />
    </div>
  );
}
