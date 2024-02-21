"use client";
import { IUser } from "@/types";
import { IconSquareCheck, IconSquareCheckFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ContactList = () => {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const { data: session } = useSession();
  const currentUser = session?.user;
  
  const router = useRouter();

  const getContacts = async () => {
    const apiEndPoint = "/api/users";

    try {
      const serverResponse = await fetch(apiEndPoint, { method: "GET" });
      let responseJson = await serverResponse.json();
      //   Check for failure
      if (!serverResponse.ok) {
        console.log(responseJson.message);
        return;
      }

      let users = responseJson?.users;
      let contacts = users.filter((user: any) => user._id !== currentUser?._id);
      // console.log(contacts);
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (contact: IUser) => {
    if (selectedContacts.includes(contact._id)) {
      setSelectedContacts((prev) => prev.filter((id) => id !== contact._id));
    } else {
      setSelectedContacts((prev) => [...prev, contact._id]);
    }
  };

  const createChat = async () => {
    const apiEndPoint = "/api/chats";
    try {
      toast.loading("Creating Conversation... Please wait!");
      const serverResponse = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: currentUser?._id,
          recipients: selectedContacts,
          isGroup: selectedContacts.length > 1,
        }),
      });

      let responseJson = await serverResponse.json();
      //   Check for failure
      if (!serverResponse.ok) {
        toast.error(responseJson.message);
        return;
      }

      //   Successful request
      toast.success("Redirecting to Chat");
      router.push(`/chats/${responseJson?.data}`)
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally{
      toast.dismiss();
    }
  };
  useEffect(() => {
    if (currentUser) {
      getContacts();
    }
  }, [currentUser]);

  return (
    <section className="w-full h-[80svh] max-h-[1280px] flex flex-col items-center gap-2 sm:gap-4 py-4 px-2 overflow-hidden">
      <input placeholder="Search Contacts..." className="input-search" />

      <div className="w-full flex-grow flex flex-col justify-between p-2 bg-white dark:bg-black rounded-lg overflow-y-auto">
        <div className="flex-grow flex flex-col px-2 gap-4 overflow-y-scroll scrolls custom-scrollbar">
          {contacts.map((contact: any) => (
            <div
              onClick={() => handleSelect(contact)}
              key={contact._id}
              className="flex gap-2 px-4 py-2 items-center cursor-pointer rounded-lg"
            >
              {/* Check if contact is selected or not */}
              {selectedContacts.find((id) => id === contact._id) ? (
                <IconSquareCheckFilled color="#737373" />
              ) : (
                <IconSquareCheck color="#737373" />
              )}
              <Image
                src={contact.profileImage || "/person.png"}
                alt="profile"
                height={100}
                width={100}
                className="h-8 w-8 rounded-lg shrink-0"
              />
              <p className="text-base-bold">{contact?.username}</p>
            </div>
          ))}
        </div>
        <button className="button" onClick={createChat}>
          Start Chat
        </button>
      </div>
    </section>
  );
};

export default ContactList;
