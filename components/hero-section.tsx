"use client";
import { welcomeHeading } from "@/data/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "./hooks/authmodal-store";
import ShimmerButton from "./ui/shimmer-button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const HeroSection = () => {
  const modal = useAuthModal();
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;

  return (
    <div className="h-[20rem] w-full flex flex-col items-center justify-center space-y-4">
      <h1 className="w-full text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-700">
        Engage <br />
        is the new trend.
      </h1>
      <TypewriterEffectSmooth words={welcomeHeading} />
      {currentUser ? (
        <ShimmerButton
          title="Welcome aboard! Let's chat and connect."
          className="w-fit"
          onClick={() => router.push('/chats')}
        />
      ) : (
        <ShimmerButton
          title="Log In! Let's chat and connect."
          className="w-fit"
          onClick={modal.onOpen}
        />
      )}
    </div>
  );
};

export default HeroSection;
