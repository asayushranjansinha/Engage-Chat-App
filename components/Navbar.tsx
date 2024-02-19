import Image from "next/image";
import ShimmerButton from "./ui/shimmer-button";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="avatar"
            height="60"
            width="60"
            // className="h-10 w-24"
            quality={100}
            priority
          />
          <h2 className="hidden sm:block text-3xl font-semibold antialiased text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500">
            Engage
          </h2>
        </div>
        <Button variant="outline">Join Us</Button>
      </div>
    </div>
  );
};

export default Navbar;
