import { CreateChatBody } from "@/types/chat";

export const getAllChats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/all-chats`
    );

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/private-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
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
    console.error(error);
    throw error;
  }
};
