import { AdminOutput } from "@/types/admin.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreType {
  user: AdminOutput | null;
  setUser: (user: AdminOutput) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        sessionStorage.removeItem("authToken");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
