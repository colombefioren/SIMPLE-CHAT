import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ChatMessage from "./chat-message";

const ChatWindow = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent")
    }
  return (
    <div className=" w-full min-h-screen relative p-6 justify-between flex flex-col">
      <ChatMessage />
      <form onSubmit={handleSubmit} className="flex h-16">
        <Input className="h-full" placeholder="Send a message..."/>
        <Button type="submit" className="h-full w-26">Send</Button>
      </form>
    </div>
  );
};
export default ChatWindow;
