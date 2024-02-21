"use client";
import React, { useEffect } from "react";
import ChatBox from "./chat-box";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Chats = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chats, setChats] = useState([]);
  const getUserChats = async () => {
    const apiEndPoint = `/api/users/${currentUser?._id}/get-chats`;
    try {
      const serverResponse = await fetch(apiEndPoint, {
        method: "GET",
      });
      const responseJson = await serverResponse.json();
      setChats(responseJson.data);
      console.log(responseJson);
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
    <div className="h-full w-full grid grid-cols-1 justify-items-start items-center p-2 bg-white dark:bg-black rounded-lg overflow-y-scroll custom-scrollbar">
      {chats.map((chat: any, index) => (
        <div
          key={index}
          className="relative group block w-full p-2"
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
          <ChatBox chat={chat} />
        </div>
      ))}
    </div>
  );
};

export default Chats;
