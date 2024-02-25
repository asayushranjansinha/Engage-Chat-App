"use client";
import { useEffect } from "react";
import ChatBox from "./chat-box";

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IConversationDocument } from "@/mongoDB/models/conversation.model";

const Chats = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [conversations, setConversations] = useState<
    IConversationDocument[] | null
  >(null);

  // Function to get User's Conversations
  const getUserChats = async () => {
    const apiEndPoint = `/api/users/${currentUser?._id}`;
    try {
      const serverResponse = await fetch(apiEndPoint, {
        method: "GET",
      });
      const responseJson = await serverResponse.json();
      let recievedConversations = responseJson.data;

      setConversations(recievedConversations);
      // console.log(responseJson);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      getUserChats();
    }
  }, [currentUser]);

  return (
    <div className="h-full w-full flex flex-col p-2 bg-white dark:bg-black rounded-lg overflow-y-scroll custom-scrollbar">
      {conversations?.length ? (
        conversations.map((item, index) => (
          <div
            key={index}
            className="relative group block h-fit w-full p-2"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 w-full bg-slate-300/[0.8] dark:bg-slate-800/[0.8] block rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <ChatBox conversation={item} />
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
};

export default Chats;
