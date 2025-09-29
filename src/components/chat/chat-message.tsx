import { Message } from "@/types/chat";

const ChatMessage = ({
  messageList,
  userId,
}: {
  messageList: Message[];
  userId: string;
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`flex items-center ${
            message.senderId === userId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg ${
              message.senderId === userId
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatMessage;
