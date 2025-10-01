"use client";
import { useState } from "react";
import RoomSidebar from "./room-sidebar";
import YoutubeWindow from "./youtube-window";
import { Room } from "@/types/room";

const RoomPanel = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  console.log(selectedRoom);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <RoomSidebar selectRoom={setSelectedRoom} />
      <div className="flex-1">
        <>
          {selectedRoom ? (
            <YoutubeWindow room={selectedRoom} />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Select a rooms
            </h1>
          )}
        </>
      </div>
    </div>
  );
};

export default RoomPanel;
