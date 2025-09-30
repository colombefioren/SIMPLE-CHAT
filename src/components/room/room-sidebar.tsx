"use client";

import ProfileInfo from "../profile/profile-info";

const RoomSidebar = () => {
  return (
    <div className="flex flex-col w-80 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="p-6">
        <ProfileInfo />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

      <div className="flex-1 flex flex-col px-3">
        <div className="flex-1 overflow-y-auto">Some room here</div>
      </div>
    </div>
  );
};

export default RoomSidebar;
