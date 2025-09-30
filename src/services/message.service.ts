import { api } from "@/lib/api";

export const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}) => {
  try {
    const res = await api.chatSendMessageCreate({ chatId, content });
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getMessageList = async (chatId: string) => {
  try {
    const res = await api.chatMessageListList(chatId);
    return res.data;
  } catch (error) {
    console.error("Error fetching message list:", error);
    throw error;
  }
};
