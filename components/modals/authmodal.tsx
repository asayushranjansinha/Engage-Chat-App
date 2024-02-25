"use client";

import { Modal } from "@/components/modals/modal";
import { useAuthModal } from "../hooks/authmodal-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "../forms/signin";
import RegisterForm from "../forms/register";

const AuthModal = () => {
  const modal = useAuthModal();
  const login = {
    username: "",
    password: "",
  };
  const register = {
    username: "",
    email: "",
    password: "",
  };
  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
      <Tabs defaultValue="register">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm defaultValues={register} />
        </TabsContent>
        <TabsContent value="signin">
          <SignInForm defaultValues={login} />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
