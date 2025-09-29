"use client";

import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (!user || isLoadingUser)
    return (
      <div className="flex justify-center items-center p-6">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-3">
      <div className="relative w-20 h-20">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt={user.firstName}
          width={80}
          height={80}
          className="rounded-full object-cover border-2 border-indigo-500"
        />
        {user.isOnline && (
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
