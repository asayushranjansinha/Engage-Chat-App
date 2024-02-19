"use client";

import { welcomeHeading } from "@/data/constants";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import ShimmerButton from "./ui/shimmer-button";
function navigateToLogin() {}
const HeroSection = () => {
  return (
    <div className="h-[20rem] w-full flex flex-col items-center justify-center space-y-4">
      <h1 className="w-full text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        Engage <br />
        is the new trend.
      </h1>
      <TypewriterEffectSmooth words={welcomeHeading} />
      <ShimmerButton
        title="Welcome aboard! Let's chat and connect."
        onClick={navigateToLogin}
        className="w-fit"
      />
    </div>
  );
};

export default HeroSection;
