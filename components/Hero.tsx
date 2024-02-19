import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { welcomeHeading } from "@/data/constants";
const HeroComponent = () => {
  return (
    <>
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        Engage <br />
        is the new trend.
      </h1>
      <div>
        <TypewriterEffectSmooth words={welcomeHeading} />
      </div>
    </>
  );
};

export default HeroComponent;
