import Image from "next/image";
import moment from "moment";
import { IConversationDocument } from "@/mongoDB/models/conversation.model";
import Link from "next/link";
import { ConversationType } from "@/types";

const ChatBox = ({ conversation }: { conversation: IConversationDocument }) => {
  const lastMessageAt = conversation.lastMessageAt;

  console.log(conversation);
  return (
    <Link
      href={`/chats/${conversation._id}`}
      className="rounded-lg w-full flex items-start gap-4 p-2 overflow-hidden bg-gradient-to-br dark:from-slate-800 from-slate-300 to-slate-800/[0.2] border border-transparent group-hover:border-slate-700 relative z-50"
    >
      <Image
        src={"/person.png"}
        alt="profile"
        height={100}
        width={100}
        className="h-8 w-8 rounded-lg shrink-0"
      />

      {/* name and timestamp */}
      <div className="w-full flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          {conversation.type === ConversationType.INDIVIDUAL
            ? conversation?.participantsInfo?.username
            : conversation?.groupInfo?.name}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {moment(lastMessageAt).format("h:mm A")}
        </span>
      </div>
    </Link>
  );
};

export default ChatBox;
