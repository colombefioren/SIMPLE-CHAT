"use client";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { Chat } from "@/types/chat";
import { useState } from "react";
import ChatWindow from "./chat-window";

const ChatPanel = ({ userId }: { userId: string }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
  };


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <ChatSidebar selectChat={handleChatClick} userId={userId} />

      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow chatId={selectedChat.id}/>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome to your chats
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Select a chat from the sidebar to start messaging.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
