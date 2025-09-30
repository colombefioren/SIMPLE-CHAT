"use client";

import { useState, useEffect } from "react";
import ProfileInfo from "../profile/profile-info";
import { Room } from "@/types/room";
import RoomList from "./room-list";
import { createRoom, getAllRooms } from "@/services/room.service";
import { toast } from "sonner";
import { Button } from "../ui/button";
import CreateRoomModal from "./create-room-modal";
import { createPrivateChat } from "@/services/chat.service";

const RoomSidebar = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [openCreateRoomModal,setOpenCreateRoomModal] = useState(false);

  useEffect(() => {
    getAllRooms()
      .then(setRoomList)
      .catch(() => toast.error("Failed to fetch existing rooms"));
  }, []);

  const handleCreateRoom = async ({name,memberIds}: {name: string,memberIds: string[]}) => {
    try {
      const chat = await createPrivateChat({memberIds});
      const room = await createRoom({name,chatId: chat.id,membersId : memberIds});
      setRoomList([...roomList, room]);
      toast.success(`Room "${name}" created successfully!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create room");
    }
  };


  return (
    <div className="flex flex-col w-80 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
      {openCreateRoomModal && <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-gray-500/50">
        <CreateRoomModal createRoom={handleCreateRoom} onClose={() => setOpenCreateRoomModal(false)}/></div>}
      <div className="p-6">
        <ProfileInfo />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

      <div className="flex-1 flex flex-col px-3">
        <Button onClick={()=> setOpenCreateRoomModal(true)} className="mb-3">Create a Room</Button>
        {roomList.length > 0 ? (
          <RoomList roomList={roomList} />
        ) : (
          <div className="flex-1 overflow-y-auto">You have no rooms yet!</div>
        )}
      </div>
    </div>
  );
};

export default RoomSidebar;
