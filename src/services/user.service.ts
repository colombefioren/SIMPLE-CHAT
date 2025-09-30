import  api  from "@/lib/api";

export const getUsers = async (query: string) => {
  try {
    const res = await api.users.usersList({ q: query }); // pass query as object
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
