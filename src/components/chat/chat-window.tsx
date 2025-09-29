import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./chat-message";
import { sendMessage } from "@/services/message.service";
import { toast } from "sonner";

const ChatWindow = ({ chatId }: { chatId: string }) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") return;

    try {
      const newMessage = await sendMessage({ chatId, content: message });
      console.log(newMessage);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className=" w-full min-h-screen relative p-6 justify-between flex flex-col">
      <ChatMessage />
      <form onSubmit={handleSubmit} className="flex h-16">
        <Input
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
