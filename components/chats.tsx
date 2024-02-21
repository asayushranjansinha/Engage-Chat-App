"use client";
import React from "react";
import ChatBox from "./chat-box";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Chats = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="h-full w-full grid grid-cols-1 gap-4 p-2 bg-white dark:bg-black rounded-lg overflow-y-scroll custom-scrollbar">
      {Array.from({ length: 15 }).map((chat, index) => (
        <div
          key={index}
          className="relative group block h-full w-full p-2"
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
          <ChatBox />
        </div>
      ))}
    </div>
  );
};

export default Chats;
