import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  theme: string;
  setTheme: (theme: string) => void;
  preset: string;
  setPreset: (preset: string) => void;
}

export const useGlobalStore = create<State>()(
  persist(
    (set, get) => {
      return {
        theme: "light",
        setTheme: (theme: string) => {
          set({ theme });
        },
        preset: "#00A76F",
        setPreset: (preset: string) => {
          set({ preset });
        },
      };
    },
    {
      name: "adminGlobal",
    }
  )
);
