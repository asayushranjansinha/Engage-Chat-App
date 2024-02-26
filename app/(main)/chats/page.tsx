"use client";

import { useEffect, useState } from "react";
import ContactList from "@/components/contact-list";
import ChatHistorySection from "@/components/chat-history";
import ContactListMobile from "@/components/contact-list-mobile";
const CreateChatPage = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted ? (
    <main className="h-svh container mx-auto pt-20 py-4 px-1 flex gap-2">
      <div className="w-full h-full lg:w-1/2 flex flex-col gap-2">
        <ContactListMobile />
        <ChatHistorySection />
      </div>
      <div className="hidden lg:flex flex-col gap-2 h-full flex-1">
        <ContactList />
      </div>
    </main>
  ) : null;
};          

export default CreateChatPage;
