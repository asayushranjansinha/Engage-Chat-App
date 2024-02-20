import { Featured } from "@/components/featured-section";
import HeroSection from "@/components/hero-section";
import { ReviewSection } from "@/components/review-section";

const LandingPage = () => {
  return (
    <main className="page">
      <div className="container-class">
        <HeroSection />
        <Featured />
        <ReviewSection />
      </div>
    </main>
  );
};

export default LandingPage;
