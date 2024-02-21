import Image from "next/image";

const ChatBox = () => {
  

  return (
    <div className="rounded-lg w-full flex items-start justify-between p-2 overflow-hidden bg-gradient-to-br dark:from-slate-800 from-slate-300 to-slate-800/[0.2] border border-transparent group-hover:border-slate-700 relative z-50">
      <Image
        src={"/person.png"}
        alt="profile"
        height={100}
        width={100}
        className="h-8 w-8 rounded-lg shrink-0"
      />
    </div>
  );
};

export default ChatBox;
