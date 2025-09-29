"use client";

import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (!user || isLoadingUser) return <h1>Loading...</h1>;

  return (
    <div className="flex space-y-4">
      {user.image && (
        <Image
          alt="Profile Pic"
          width={25}
          height={25}
          src={user.image}
          className="rounded-full"
        />
      )}
      <h1 className="text-2xl font-semibold">
        {user.firstName} {user.lastName}
      </h1>
      <h2 className="text-lg font-semibold">{user.email}</h2>
      {user.isOnline && (
        <h2 className="text-lg text-green-500font-semibold">Online</h2>
      )}
    </div>
  );
};
export default ProfileInfo;
