"use client";
import { IconChecks } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MessageSearch from "./message-search";

const ChatHistorySection = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="h-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
      <MessageSearch />
      <div
        className="flex-1 w-full grid grid-cols-1 gap-2 p-1 overflow-y-scroll custom-scrollbar bg-white dark:bg-black rounded-lg"
        style={{ gridAutoRows: "min-content" }}
      >
        {Array.from({ length: 20 }).map((item, idx) => (
          <Link
            href={"#"}
            key={idx}
            className="relative group block p-1 h-fit w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 w-full bg-slate-300/[0.8] dark:bg-slate-800/[0.8] block  rounded-lg"
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
            <Message />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatHistorySection;

const Message = () => {
  const message = "This is a long message that needs to be clipped";
  return (
    <div className="w-full flex items-center gap-2 border rounded-lg p-1">
      <Image
        src={"/person.png"}
        alt="Profile Image"
        width={100}
        height={100}
        className="h-8 w-8 rounded-full shrink-0"
      />
      <div className="flex flex-col gap-1 flex-grow">
        <h3 className="text-sm font-semibold tracking-wide">Username</h3>
        <span className="text-xs font-light">{clipMessage(message)}</span>
      </div>
      <div className="flex flex-col justify-between">
        <span className="text-xs font-light">10:00am</span>
        <div className="self-end">
          <IconChecks size={20} className="text-[#0D9276]"/>
        </div>
      </div>
    </div>
  );
};

function clipMessage(message: string): string {
  const maxLength = 20;
  if (message.length <= maxLength) {
    return message;
  } else {
    return message.substring(0, maxLength) + "...";
  }
}
