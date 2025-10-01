import api from "@/lib/api";
import { CreateRoomBody, Room } from "@/types/room";

export const getAllRooms = async () => {
  try {
    const res = await api.rooms.roomsList();

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.error || "Failed to fetch rooms");
    }

    return data;
  } catch (error) {
    console.error("getAllRooms error:", error);
    throw error;
  }
};

export const createRoom = async (payload: CreateRoomBody) => {
  try {
    const res = await api.rooms.roomsCreate(payload);
    return res.data as Room;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
