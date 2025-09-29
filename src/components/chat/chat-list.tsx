import Image from "next/image";
import { type Chat } from "../../types/chat";
import { formatDistanceToNow } from "date-fns";
import { useUserStore } from "@/store/useUserStore";

const ChatList = ({
  chats,
  selectChat,
}: {
  chats: Chat[];
  selectChat: (chat: Chat) => void;
}) => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {chats.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        const sender = chat.members.find((m) => m.user.id !== user.id);

        if (!sender) return null;

        return (
          <div
            onClick={() => selectChat(chat)}
            key={chat.id}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              {chat.type === "PRIVATE" ? (
                <Image
                  src={sender.user.image ?? "/default-avatar.png"}
                  alt={sender.user.name ?? "User"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold">
                  {chat.members.length}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {chat.type === "PRIVATE"
                    ? sender.user.name ?? sender.user.username
                    : chat.groupName ?? "Group Chat"}
                </span>
                {lastMessage && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDistanceToNow(new Date(lastMessage.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>

              {lastMessage && (
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  <span className="font-semibold">
                    {sender?.user.name ?? sender?.user.username ?? "Unknown"}:{" "}
                  </span>
                  {lastMessage.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
