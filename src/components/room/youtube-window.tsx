"use client";
import { useSocketStore } from "@/store/useSocketStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { useUserStore } from "@/store/useUserStore";
import YoutubePlayer from "./youtube-player";
import { extractYtVideoId } from "@/lib/utils";

const YoutubeWindow = ({ room }: { room: Room }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    socket?.emit("join-room", room.id);
  }, [socket, room.id]);

  const isHost = room.createdBy === user?.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setVideoId(extractYtVideoId(videoUrl));
  };

  return (
    <div className="flex flex-col justify-between">
      {isHost && (
        <div className="flex">
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Place the youtube link here"
            type="text"
          />
          <Button onClick={handleClick}>Load</Button>
        </div>
      )}
      <YoutubePlayer videoId={videoId} />
    </div>
  );
};
export default YoutubeWindow;
