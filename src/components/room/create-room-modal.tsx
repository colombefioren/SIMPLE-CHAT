import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getUsers } from "@/services/user.service";
import { User } from "@/types/user";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { X, Search, Users, Plus } from "lucide-react";

interface CreateRoomModalProps {
  onClose: () => void;
  createRoom: ({
    name,
    memberIds,
  }: {
    name: string;
    memberIds: string[];
  }) => Promise<void>;
}

const CreateRoomModal = ({ onClose, createRoom }: CreateRoomModalProps) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (query: string) => {
      if (!query) {
        setUsers([]);
        return;
      }
      setLoading(true);
      try {
        const data = await getUsers(query);
        const filteredData = data.filter(
          (user) => !selectedUsers.some((selected) => selected.id === user.id)
        );
        setUsers(filteredData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to search users");
      } finally {
        setLoading(false);
      }
    },
    [selectedUsers]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, fetchUsers]);

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
      setSearch("");
      setUsers([]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      toast.error("Please enter a room name");
      return;
    }

    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }

    createRoom({
      name: roomName,
      memberIds: selectedUsers.map((user) => user.id),
    });

    onClose();
  };

  const getUserInitials = (user: User) => {
    return user.name?.[0] || user.username?.[0] || "U";
  };

  const getUserDisplayName = (user: User) => {
    return user.name || user.username || "Unknown User";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Room
              </h2>
              <p className="text-sm text-gray-500">
                Invite friends to your watch party
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Room Name *
            </label>
            <Input
              placeholder="Enter room name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full"
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Selected Members ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-300 shadow-sm"
                  >
                    {user.image ? (
                      <Image
                        width={24}
                        height={24}
                        src={user.image}
                        alt={getUserDisplayName(user)}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                        {getUserInitials(user)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {getUserDisplayName(user)}
                    </span>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Add Members
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4"
              />
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!loading && users.length === 0 && search && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No users found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}

            {!loading && users.length > 0 && (
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors text-left"
                  >
                    {user.image ? (
                      <Image
                        width={40}
                        height={40}
                        src={user.image}
                        alt={getUserDisplayName(user)}
                        className="rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                        {getUserInitials(user)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {getUserDisplayName(user)}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        @{user.username}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleCreateRoom}
            disabled={!roomName.trim() || selectedUsers.length === 0}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Create Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
