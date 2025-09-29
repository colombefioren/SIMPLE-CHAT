export const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/send-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId, content }),
      }
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data || "Failed to send message");
    }
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getMessageList = async (chatId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}/message-list`
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      throw new Error(data || "Failed to fetch message list");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
