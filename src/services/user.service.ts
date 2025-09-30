import  api  from "@/lib/api";
import { User } from "@/types/user";

export const getUsers = async (query: string) => {
  try {
    const res = await api.users.usersList({ q: query }); // pass query as object
    return res.data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
