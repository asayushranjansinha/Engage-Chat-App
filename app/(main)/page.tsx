import { Featured } from "@/components/featured-section";
import HeroSection from "@/components/hero-section";
import { ReviewSection } from "@/components/review-section";

const LandingPage = () => {
  return (
    <main className="w-full mt-10">
      <div className="container mx-auto py-10">
        <HeroSection />
        <Featured />
        <ReviewSection />
      </div>
    </main>
  );
};

export default LandingPage;
