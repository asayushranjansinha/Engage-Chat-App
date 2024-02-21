"use client";
import { useState } from "react";
import Image from "next/image";
import { IconSquareCheck, IconSquareCheckFilled } from "@tabler/icons-react";

const ContactList = () => {
  const [selectedContacts, setSelectedContacts] = useState([1, 3, 5]);
  return (
    <section className="w-full h-[80svh] max-h-[1280px] flex flex-col items-center gap-2 sm:gap-4 py-4 px-2 overflow-hidden">
      <input
        placeholder="Search Contacts..."
        className="input-search"
      />

      <div className="w-full flex-grow flex flex-col justify-between p-2 bg-white dark:bg-black rounded-lg overflow-y-auto">
        <div className="flex-grow flex flex-col px-2 gap-4 overflow-y-scroll scrolls custom-scrollbar">
          {Array.from({ length: 15 }).map((_, index) => (
            <div 
              onClick={() => setSelectedContacts((prev) => [...prev, index])}
              key={index}
              className="flex gap-2 px-4 py-2 items-center cursor-pointer rounded-lg"
            >
              {/* Check if contact is selected or not */}
              {selectedContacts.find((id) => id === index) ? (
                <IconSquareCheckFilled color="#737373" />
              ) : (
                <IconSquareCheck color="#737373" />
              )}
              <Image
                src={"/person.png"}
                alt="profile"
                height={100}
                width={100}
                className="h-8 w-8 rounded-lg shrink-0"
              />
              <p className="text-base-bold">username</p>
            </div>
          ))}
        </div>
        <button className="button">Start Chat</button>
      </div>
    </section>
  );
};

export default ContactList;
