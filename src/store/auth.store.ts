import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserType {
  name: string;
  email: string;
  role: string;
}

interface AuthStoreType {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem("authToken");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
