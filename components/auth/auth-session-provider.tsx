"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
interface AuthSessionProfiderProps {
  children: React.ReactNode;
}
const AuthSessionProvider: React.FC<AuthSessionProfiderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
