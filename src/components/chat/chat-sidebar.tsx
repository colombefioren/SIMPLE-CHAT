"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Chat } from "@/types/chat";
import { getAllChats } from "@/services/chat.service";
import ProfileInfo from "../profile/profile-info";
import ChatList from "./chat-list";
import UserList from "./user-list";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useSocketStore } from "@/store/useSocketStore";

const ChatSidebar = ({ userId }: { userId: string }) => {
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;
    socket.emit("setup", userId);

    const handleOpenChat = (newChat: Chat) => {
      setChats((prev) => {
        if (prev.find((c) => c.id === newChat.id)) return prev;
        return [...prev, newChat];
      });
    };

    socket.on("open-chat", handleOpenChat);

    return () => {
      socket.off("open-chat", handleOpenChat);
    };
  }, [socket, userId]);

  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllChats()
      .then((data) => setChats(data))
      .catch((error) => toast.error(error.message ?? "Failed to load chats"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col w-80 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="p-6">
        <ProfileInfo />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

      <div className="flex-1 flex flex-col px-3">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Loading chats...
          </p>
        ) : (
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex space-x-1 mb-3">
              <TabsTrigger
                value="chat"
                className="flex-1 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow"
              >
                Chats
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="flex-1 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow"
              >
                Users
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="chat" className="h-full">
                {chats.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                    No chats found
                  </p>
                ) : (
                  <ChatList chats={chats} />
                )}
              </TabsContent>
              <TabsContent value="user" className="h-full">
                <UserList />
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
