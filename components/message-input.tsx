"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { IconSend } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const MessageInput = () => {
  const { chatId } = useParams();

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      event.type === "click" ||
      (event && "key" in event && event.key === "Enter")
    ) {
      event.preventDefault();
      if (message.trim()) {
        sendMessage(message);
        // console.log("Sending message:", message);
        setMessage("");
      }
    }
  };

  const sendMessage = async (message: string) => {
    const apiEndPoint = `/api/chats/${chatId}/messages`;
    try {
      const serverResponse = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: currentUser?._id,
          content: message,
        }),
      });

      let responseJson = await serverResponse.json();
      // console.log(responseJson)
    } catch (error) {}
  };
  return (
    <div className="relative">
      <Input
        placeholder="Type Here..."
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleSendMessage}
      />
      <Button
        variant="default"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
        onClick={handleSendMessage}
      >
        <IconSend />
      </Button>
    </div>
  );
};

export default MessageInput;
