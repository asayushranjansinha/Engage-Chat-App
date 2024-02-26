"use client";
import { IUserDocument } from "@/mongoDB/models/user.model";
import { ConversationType, IUser } from "@/types";
import { IconSquareCheck, IconSquareCheckFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const ContactList = () => {
  const [contacts, setContacts] = useState<IUserDocument[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [conversationType, setConversationType] =
    useState<ConversationType | null>(null);

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

    if (selectedContacts.length >= 1) {
      setConversationType(ConversationType.GROUP);
    } else {
      setConversationType(ConversationType.INDIVIDUAL);
    }
  };

  const createNewConversation = async () => {
    const apiEndPoint = "/api/chats";
    try {
      toast.loading("Creating Conversation... Please wait!");
      const serverResponse = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: conversationType,
          recipients: [currentUser?._id, ...selectedContacts],
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
      router.push(`/chats/${responseJson?.data}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      toast.dismiss();
    }
  };
  useEffect(() => {
    if (currentUser) {
      getContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <Input placeholder="Search Contacts" />
      <div className="w-full flex-1 flex flex-col px-1 py-2 overflow-y-scroll custom-scrollbar gap-4 bg-white dark:bg-black rounded-lg">
        {contacts.map((contact: any) => (
          <div
            className="flex items-center cursor-pointer rounded-lg gap-4 border px-4 py-1"
            key={contact._id}
            onClick={() => handleSelect(contact)}
          >
            {/* Check if contact is selected or not */}
            {selectedContacts.find((id) => id === contact._id) ? (
              <IconSquareCheckFilled className="text-[#0D9276]" />
            ) : (
              <IconSquareCheck color="#737373" />
            )}

            <div className="flex flex-col items-center justify-center gap-1">
              <Image
                src="/person.png"
                alt="User Profile Photo"
                width={100}
                height={100}
                className="h-10 w-10 rounded-full shrink-0"
              />
              <span className="px-2 py-1 text-xs rounded-md bg-green-200 dark:bg-green-800">
                online
              </span>
            </div>
            <div className="h-full flex flex-col justify-between text-xs font-medium text-muted-foreground">
              <span>{contact.username}</span>
              <span>{contact.name || "Jane Doe"}</span>
              <span>{contact.email}</span>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={createNewConversation}>
        Start Conversation
      </Button>
    </>
  );
};

export default ContactList;
