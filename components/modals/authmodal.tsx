"use client";

import { Modal } from "@/components/modals/modal";
import { useAuthModal } from "../hooks/authmodal-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "../forms/signin";
import RegisterForm from "../forms/register";
import { useState } from "react";

const AuthModal = () => {
  const modal = useAuthModal();
  const [activeTab, setActiveTab] = useState<"register" | "signin">();
  const onTabChange = () => {
    if (activeTab === "register") setActiveTab("signin");
    else setActiveTab("register");
  };
  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
      <Tabs defaultValue="register" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm switchTab={onTabChange} />
        </TabsContent>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
