import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  currentPlan: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPlan: (plan: string | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      currentPlan: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setCurrentPlan: (plan) => set({ currentPlan: plan }),
    }),
    {
      name: "app-store",
    }
  )
);