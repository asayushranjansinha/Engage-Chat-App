"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { IconChecks, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import * as React from "react";
const MessageSearch = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between gap-2 border-2 rounded-full">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 rounded-full"
          onClick={() => setOpen((prev) => !prev)}
        >
          <IconSearch size={20} />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-base font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          Direct Message
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          Group
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search user or a message..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {messages.map((item, index) => (
            <CommandItem key={index}>
              <Message message={item} />
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default MessageSearch;
const Message = ({ message }: { message: MessageObject }) => {
  return (
    <div className="w-full flex items-center gap-2 border-2 rounded-lg p-1">
      <Image
        src={"/person.png"}
        alt="Profile Image"
        width={100}
        height={100}
        className="h-8 w-8 rounded-full shrink-0"
      />
      <div className="flex flex-col gap-1 flex-grow">
        <h3 className="text-sm font-semibold tracking-wide">
          {message.username}
        </h3>
        <span className="text-xs font-light">
          {clipMessage(message.message)}
        </span>
      </div>
      <div className="flex flex-col justify-between">
        <span className="text-xs font-light">{message.time}</span>
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
interface MessageObject {
  message: string;
  status: string;
  username: string;
  time: string;
}
const messages: MessageObject[] = [
  {
    message: "Hello!",
    status: "Sent",
    username: "Alice",
    time: "10:00am",
  },
  {
    message: "Hi there!",
    status: "Received",
    username: "Bob",
    time: "10:05am",
  },
  {
    message: "How are you?",
    status: "Sent",
    username: "Alice",
    time: "10:10am",
  },
  {
    message: "I'm good, thanks!",
    status: "Received",
    username: "Eva",
    time: "10:15am",
  },
  {
    message: "What are you up to?",
    status: "Sent",
    username: "Alice",
    time: "10:20am",
  },
  {
    message: "Just working on some projects.",
    status: "Received",
    username: "Charlie",
    time: "10:25am",
  },
];
