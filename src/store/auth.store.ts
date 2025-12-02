import { adminEntity } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreType {
  user: adminEntity | null;
  setUser: (user: adminEntity) => void;
  logout: () => void;
  generatedPassword: string;
  setGeneratedPassword: (text: string) => void;
}

export const useAuthStore = create<AuthStoreType>()(
  persist<AuthStoreType>(
    (set) => ({
      user: null,
      generatedPassword: "",
      setGeneratedPassword: (generatedPassword) => set({ generatedPassword }),
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
