import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currentUser, currentCompany } from "@/mock/user";

interface AuthState {
  isAuthenticated: boolean;
  user: typeof currentUser | null;
  company: typeof currentCompany | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      company: null,
      login: () =>
        set({ isAuthenticated: true, user: currentUser, company: currentCompany }),
      logout: () =>
        set({ isAuthenticated: false, user: null, company: null }),
    }),
    { name: "qijia-auth" }
  )
);
