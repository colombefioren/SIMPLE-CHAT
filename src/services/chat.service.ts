import api  from "@/lib/api";
import { Chat, CreateChatBody } from "@/types/chat";

export const getAllChats = async () => {
  try {
    const res = await api.chats.chatsList();

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.error || "Failed to fetch chats");
    }

    return data;
  } catch (error) {
    console.error("getAllChats error:", error);
    throw error;
  }
};


export const createPrivateChat = async (payload: CreateChatBody) => {
  try {
    const res = await api.chat.privateChatCreate(payload);
    return res.data as Chat;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
