
import { FeaturesSection } from "@/components/landingpage/FeatureSection";
import { HeroSection } from "@/components/landingpage/HeroSection";
import { Navigation } from "@/components/landingpage/Navigation";
import { StatsSection } from "@/components/landingpage/StatsSection";
import { TestimonialsSection } from "@/components/landingpage/TestimonialSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-foreground overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      <Navigation/>
      <HeroSection/>
      <StatsSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
    </div>
  );
}