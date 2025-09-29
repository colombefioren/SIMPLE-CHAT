"use client"

import { useUserStore } from "@/store/useUserStore";

const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (!user || isLoadingUser) return <h1>Loading...</h1>;

  return (
    <div className="flex space-y-4">
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
