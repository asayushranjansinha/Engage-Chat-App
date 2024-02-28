"use client";
import MessageInput from "@/components/message-input";
import UserInfoSection from "@/components/user-info";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const MessagePage = () => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <section className="h-full flex flex-col gap-2 items-center justify-center p-2">
      {/* User info and online status */}
      <>
        <UserInfoSection />
      </>

      {/* Messages */}
      <div
        className="bg-green-background dark:bg-blue-background custom-scrollbar flex-1 overflow-y-auto rounded-lg px-2 py-4"
        ref={messageContainerRef}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <Image
                  src="https://res.cloudinary.com/dn6ze90sb/image/upload/v1709138107/marianne-in-normal-people-1591049068_e7ngjb.png"
                  alt="User Profile Photo"
                  width={100}
                  height={100}
                  quality={70}
                  className="!h-10 !w-10 rounded-full shrink-0"
                />
              </div>
              <div className="chat-bubble chat-bubble-primary flex items-center text-justify flex-wrap max-w-[80%]">
                Generally I find men are a lot more concerned with limiting the
                freedoms of women than exercising personal freedom for
                themselves.
              </div>
              <div className="chat-footer text-white">
                <time className="text-xs ml-1">12:45</time>
              </div>
            </div>
            <div className="w-full chat chat-end">
              <div className="chat-image avatar">
                <Image
                  src="https://res.cloudinary.com/dn6ze90sb/image/upload/v1709138186/20042511-high_res-normal_people_naseos.jpg"
                  alt="User Profile Photo"
                  width={100}
                  height={100}
                  quality={70}
                  className="!h-10 !w-10 rounded-full shrink-0"
                />
              </div>
              <div className="chat-header text-white">
                <time className="text-xs ml-1">12:46</time>
              </div>
              <div className="chat-bubble chat-bubble-success flex items-center text-justify flex-wrap max-w-[80%]">
                I can&apos;t connect this life and that life. It just
                doesn&apos;t fit
              </div>
              <div className="chat-footer opacity-50 text-white">
                Seen at <time>12:46</time>{" "}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Typing area */}
      <>
        <MessageInput />
      </>
    </section>
  );
};

export default MessagePage;
