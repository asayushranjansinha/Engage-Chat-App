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
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://hips.hearstapps.com/hmg-prod/images/marianne-in-normal-people-1591049068.png"
                  />
                </div>
              </div>
              <div className="chat-header text-white">
                Marrianne Sheridan
                <time className="text-xs ml-1">12:45</time>
              </div>
              <div className="chat-bubble chat-bubble-primary max-w-3/5 flex flex-wrap text-justify">
                <span>
                  Generally I find men are a lot more concerned with limiting
                  the freedoms of women than exercising personal freedom for
                  themselves.
                </span>
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://media.tatler.com/photos/6141e82cba7e3beacb746830/master/w_1600%2Cc_limit/20042511-high_res-normal-people.jpg"
                  />
                </div>
              </div>
              <div className="chat-header text-white">
                Connel
                <time className="text-xs ml-1">12:46</time>
              </div>
              <div className="chat-bubble chat-bubble-success">
                I can&apos;t connect this life and that life. It just doesn&apos;t fit
              </div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
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
