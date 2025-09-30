"use client";
import RoomSidebar from "./room-sidebar";
import YoutubeWindow from "./youtube-window";

const RoomPanel = () => {


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <RoomSidebar/>
      <div className="flex-1">
     
          <>
          <YoutubeWindow/>
          </>
    
      </div>
    </div>
  );
};

export default RoomPanel;
