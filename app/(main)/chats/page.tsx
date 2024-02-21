import ChatList from "@/components/chat-list";
import ContactList from "@/components/contact-list";

const ChatPage = () => {
  return (
    <main className="w-full min-h-svh bg-purple-1 dark:bg-background">
      <div className="container mx-auto py-10 pt-20 flex gap-5 max-lg:gap-8">
        {/* Chat list wrapper */}
        <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
          <ChatList />
        </div>

        {/* Contact list wrapper */}
        <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
          <ContactList />
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
