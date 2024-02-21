"use client";
import { welcomeHeading } from "@/data/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ShimmerButton from "./ui/shimmer-button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Link from "next/link";

const HeroSection = () => {
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
        <Link href="/chats">
          <ShimmerButton
            title="Welcome aboard! Let's chat and connect."
            className="w-fit"
          />
        </Link>
      ) : (
        <Link href="/auth/login">
          <ShimmerButton
            title="Log In! Let's chat and connect."
            className="w-fit"
          />
        </Link>
      )}
    </div>
  );
};

export default HeroSection;
