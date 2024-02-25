"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ui/theme-toggle";
import { useAuthModal } from "./hooks/authmodal-store";

const NavbarSection = () => {
  const authModal = useAuthModal();
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 inset-x-0 bg-transparent backdrop-filter backdrop-blur-sm z-[99999]">
      <div className="container mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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
        </Link>

        {/* navigation */}
        <nav className="flex items-center gap-2">
          <ModeToggle />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/profile">Profile</Link>
              </Button>
              <Button variant="outline" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={authModal.onOpen}>
              Login
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavbarSection;
