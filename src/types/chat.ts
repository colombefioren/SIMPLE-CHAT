import { type User } from "./user";

export enum ChatType {
  PRIVATE = "PRIVATE",
  GROUP = "GROUP",
}

export type CreateChatBody = {
  id?: string;
  type?: ChatType;
  memberIds: string[];
  groupName?: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
};

export type Chat = {
  id: string;
  type: ChatType;
  members: { user: User }[];
  messages: Message[];
  groupName?: string;
};

export type ChatMember = {
  id: string;
  userId: string;
  chatId: string;
  user: User;
};

