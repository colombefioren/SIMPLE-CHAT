"use client";
import { useSocketStore } from "@/store/useSocketStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Room } from "@/types/room";
import { useUserStore } from "@/store/useUserStore";

const YoutubeWindow = ({ room }: { room: Room }) => {
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    socket?.emit("join-room", room.id);
  }, [socket, room.id]);

  const isHost = room.createdBy === user?.id;

  return (
    <div className="flex flex-col justify-between">
      {isHost && (
        <div className="flex">
          <Input placeholder="Place the youtube link here" type="text" />
          <Button>Load</Button>
        </div>
      )}
    </div>
  );
};
export default YoutubeWindow;
