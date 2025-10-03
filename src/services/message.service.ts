import api from "@/lib/api";
import { Message } from "@/types/chat";

export const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}) => {
  try {
    const res = await api.chat.sendMessageCreate({ chatId, content });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getMessageList = async (chatId: string) => {
  try {
    const res = await api.chat.messageListList(chatId);
    const apiMessages = res.data.messages || [];

    const messages = apiMessages.map((m) => ({
      id: m.id!,
      content: m.content!,
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
      senderId: m.sender?.id ?? "",
    }));

    return messages as Message[];
  } catch (error) {
    console.error("Error fetching message list:", error);
    throw error;
  }
};
