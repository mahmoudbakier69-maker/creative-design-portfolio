import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialDock from "@/components/SocialDock";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ProcessSection from "@/components/home/ProcessSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <SocialDock />
    </>
  );
}
