import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./chat-message";
import { getMessageList } from "@/services/message.service";
import { toast } from "sonner";
import { useSocketStore } from "@/store/useSocketStore";
import { Message } from "@/types/chat";

const ChatWindow = ({ chatId, userId }: { chatId: string; userId: string }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessageList = async () => {
      try {
        const chatData = await getMessageList(chatId);
        setMessageList(chatData.messages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch messages");
      }
    };
    fetchMessageList();
  }, [chatId]);

  const socket = useSocketStore((state) => state.socket);

  const handleNewMessage = (newMessage: Message) => {
    setMessageList((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-chat", chatId);
  }, [socket, chatId]);

  useEffect(() => {
    socket?.on("receive-message", handleNewMessage);
    return () => {
      socket?.off("receive-message", handleNewMessage);
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newMessage = {
      chatId,
      senderId: userId,
      content: message,
    };
    setMessage("");
    socket?.emit("send-message", newMessage);
  };

  return (
    <div className=" w-full min-h-screen relative p-6 justify-between flex flex-col">
      <ChatMessage messageList={messageList} userId={userId} />
      <form onSubmit={handleSubmit} className="flex h-16">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-full"
          placeholder="Send a message..."
        />
        <Button type="submit" className="h-full w-26">
          Send
        </Button>
      </form>
    </div>
  );
};
export default ChatWindow;
