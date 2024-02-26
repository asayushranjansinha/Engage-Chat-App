import { Input } from "@/components/ui/input";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
const ContactListMobile = () => {
  return (
    <div className="lg:hidden w-full flex flex-col gap-2 py-2">
      <h3 className="ml-1">
        Contact <span className="text-muted-foreground">List</span>
      </h3>
      <Input placeholder="Search Contacts" />
      <div className="flex items-center gap-4 p-1 overflow-x-scroll overflow-y-hidden custom-scrollbar scroll-smooth bg-white dark:bg-black rounded-lg">
        {Array.from({ length: 15 }).map((item, idx) => (
          <div
            key={idx}
            className="w-10 h-10 shrink-0 bg-white rounded-full relative"
          >
            <Image src={"/person.png"} alt="Profile Picture" fill priority />
            <div className="absolute -right-1 -bottom-1 z-10">
              <IconCircleCheckFilled size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactListMobile;
