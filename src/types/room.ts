import { User } from "./user";

export type CreateRoomBody = {
  name: string;
  chatId: string;
  createBy?: string;
  membersId: string[];
};

export type Room = {
  name: string;
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  chatId: string | null;
  members: {
    user: User;
  }[];
};
