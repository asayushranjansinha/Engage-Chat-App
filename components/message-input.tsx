"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconFiles,
  IconMusic,
  IconPaperclip,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
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
    <div className="w-full group px-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 flex items-center gap-1 p-1 bg-white dark:bg-black rounded-lg">
      {/* Attach Files */}
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <IconPaperclip className="text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-2">
          <DropdownMenuLabel>Attachments</DropdownMenuLabel>

          <DropdownMenuItem>
            <IconFiles className="mr-2 h-4 w-4" />
            <span>Files</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconMusic className="mr-2 h-4 w-4" />
            <span>Audio</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconVideo className="mr-2 h-4 w-4" />
            <span>Video</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPhoto className="mr-2 h-4 w-4" />
            <span>Photo</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Input
        placeholder="Type Here"
        autoFocus
        alt="Message Input"
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
      />

      {/* Send */}
      <Button variant="ghost">
        <IconSend className="text-[#737373]" />
      </Button>
    </div>
  );
};

export default MessageInput;
