"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Chat } from "@/types/chat";
import { getAllChats } from "@/services/chat.service";
import ProfileInfo from "../profile/profile-info";
import ChatList from "./chat-list";

const ChatSidebar = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllChats()
      .then((data) => setChats(data))
      .catch((error) => toast.error(error.message ?? "Failed to load chats"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col w-80 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6">
        <ProfileInfo />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

      <div className="flex-1 overflow-y-auto px-2">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Loading chats...
          </p>
        ) : chats.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No chats found
          </p>
        ) : (
          <ChatList chats={chats} />
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
