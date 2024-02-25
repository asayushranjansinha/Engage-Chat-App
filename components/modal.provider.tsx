"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/authmodal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
