import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CustomGridFeatures from "@/components/CustomGridFeatures";
import PriceListSection from "@/components/PriceListSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CustomGridFeatures />
      <Map />
      <PriceListSection />
      <ParallaxDivider />
      <CTASection />
      <Footer />
    </main>
  );
}
