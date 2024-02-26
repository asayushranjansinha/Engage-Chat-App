import MessageInput from "@/components/message-input";
import UserInfoSection from "@/components/user-info";
import React from "react";

const MessagePage = () => {
  return (
    <section className="h-full flex flex-col gap-2 items-center justify-center p-2">
      {/* User info and online status */}
      <>
        <UserInfoSection />
      </>

      {/* Messages */}
      <div className="flex-1 w-full bg-green-background dark:bg-blue-background overflow-y-scroll custom-scrollbar scroll-smooth rounded-lg py-4 px-2 space-y-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-row rounded-full border p-2 items-center space-x-2 bg-white dark:bg-black">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
              <div className="w-full h-4 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="flex flex-row rounded-full border p-2 items-center space-x-2 bg-white dark:bg-black">
              <div className="w-full bg-slate-300 dark:bg-slate-700 h-4 rounded-full" />
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
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
