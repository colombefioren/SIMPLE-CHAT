export const getUsers = async (query: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?q=${query}`
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch users");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
