import ChatSidebar from "@/components/chat/chat-sidebar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ChatPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <ChatSidebar userId={session.user.id}/>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to your chats
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Select a chat from the sidebar to start messaging.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
