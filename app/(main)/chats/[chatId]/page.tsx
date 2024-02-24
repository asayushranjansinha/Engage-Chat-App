import MessageInput from "@/components/message-input";
import React from "react";

const ChatPage = () => {
  return (
    <main className="w-full bg-purple-1 dark:bg-background">
      <div className="h-svh container mx-auto pt-20 py-[2rem] flex flex-col space-y-4">
        {/* Messages */}
        <div className="flex-1 w-full bg-green-background dark:bg-blue-background p-4 rounded-lg sm:rounded-xl md:rounded-2xl xl:rounded-3xl border overflow-y-scroll custom-scrollbar scroll-smooth space-y-2">
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

        <MessageInput />
      </div>
    </main>
  );
};

export default ChatPage;
