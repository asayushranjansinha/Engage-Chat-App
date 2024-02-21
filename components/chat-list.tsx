import Chats from "./chats";

const ChatList = () => {
  return (
    <div className="w-full h-[80svh] max-h-[1280px] flex flex-col items-center gap-2 sm:gap-4 py-4 px-2">
      <input
        placeholder="Search Chats..."
        className="input-search"
      />
      <div className="flex-grow w-full overflow-hidden">
        <Chats />
      </div>
    </div>
  );
};

export default ChatList;
