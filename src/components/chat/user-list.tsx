"use client";

import { createPrivateChat } from "@/services/chat.service";
import { getUsers } from "@/services/user.service";
import { useSocketStore } from "@/store/useSocketStore";
import { User } from "@/types/user";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocketStore((state) => state.socket);

  const fetchUsers = useCallback(async (query: string) => {
    if (!query) {
      setUsers([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getUsers(query);
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, fetchUsers]);

  const handleOpenChat = async (selectedUser: User) => {
    try {
      const chat = await createPrivateChat({ memberIds: [selectedUser.id] });
      socket?.emit("create-chat", chat);
      setSearch("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to open chat");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-gray-500">Searching...</p>}
      {!loading && users.length === 0 && search && (
        <p className="text-gray-400">No users found.</p>
      )}
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            onClick={() => handleOpenChat(user)}
            key={user.id}
            className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer transition"
          >
            {user.image ? (
              <Image
                width={40}
                height={40}
                src={user.image}
                alt={user.name || "User"}
                className="rounded-full mr-3 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-white">
                {user.name?.[0] || user.username?.[0] || "U"}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800">
                {user.name || user.username}
              </p>
              <p className="text-gray-500 text-sm">{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
