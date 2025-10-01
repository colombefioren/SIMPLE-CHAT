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

export type RoomMember = {
  id: string;
  userId: string;
  roomId: string;
  role: RoomRole;
  joinedAt: Date;
  user: User;
};

enum RoomRole {
  ADMIN = "HOST",
  MEMBER = "MEMBER",
}
