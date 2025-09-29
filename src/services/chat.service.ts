import { CreateChatBody } from "@/types/chat";

export const getAllChats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/all-chats`
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch chats");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createChat = async (data: CreateChatBody) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/private-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create chat");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
