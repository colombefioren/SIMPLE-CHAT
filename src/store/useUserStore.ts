import { create } from "zustand";

type UserState = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    isOnline?: boolean;
    username?: string | null;
    displayUsername?: string | null;
  } | null;
  isLoadingUser: boolean;
  setLoadingUser: (isLoadingUser: boolean) => void;
  setUser: (user: UserState["user"]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoadingUser: false,
  setLoadingUser: (isLoadingUser: boolean) => set({ isLoadingUser }),
  setUser: (user: UserState["user"]) => set({ user }),
}));
