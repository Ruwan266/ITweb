import HeroSection from './components/HeroSection';
import Marquee from '@/components/feature/Marquee';
import AboutTeaser from './components/AboutTeaser';
import ServicesTeaser from './components/ServicesTeaser';
import FeaturedProjects from './components/FeaturedProjects';
import WhyChooseUs from './components/WhyChooseUs';
import TrustStats from './components/TrustStats';
import Testimonials from './components/Testimonials';
import CTABand from './components/CTABand';
import { MARQUEE_KEYWORDS } from '@/mocks/home';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee
        items={MARQUEE_KEYWORDS}
        className="py-4 sm:py-5 md:py-6 bg-circuit-50 border-y border-background-200/50 overflow-hidden max-w-full"
      />
      <AboutTeaser />
      <ServicesTeaser />
      <FeaturedProjects />
      <WhyChooseUs />
      <TrustStats />
      <Testimonials />
      <CTABand />
    </>
  );
}