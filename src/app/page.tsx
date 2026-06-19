import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialDock from "@/components/SocialDock";
import HeroSection from "@/components/home/HeroSection";
import HeroVideoPreload from "@/components/home/HeroVideoPreload";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ProcessSection from "@/components/home/ProcessSection";
import ContactSection from "@/components/home/ContactSection";
import { getCoverImagesBySlug } from "@/lib/projects.server";

export default function Home() {
  const coverBySlug = getCoverImagesBySlug();

  return (
    <>
      <HeroVideoPreload />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection coverBySlug={coverBySlug} />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <SocialDock />
    </>
  );
}
