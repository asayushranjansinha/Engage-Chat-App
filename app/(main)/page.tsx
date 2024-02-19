import { BentoGridThirdDemo } from "@/components/Bento";
import HeroComponent from "@/components/Hero";

const LandingPage = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-10">
        <HeroComponent />
        <BentoGridThirdDemo />
      </div>
    </main>
  );
};

export default LandingPage;
