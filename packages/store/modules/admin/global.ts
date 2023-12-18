import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  theme: string;
  setTheme: (theme: string) => void;
  preset: string;
  setPreset: (preset: string) => void;
  hasTabs: boolean;
  setHasTabs: (hasTabs: boolean) => void;
  hasCrumbs: boolean;
  setHasCrumbs: (hasCrumbs: boolean) => void;
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
        hasTabs: true,
        setHasTabs: (hasTabs: boolean) => {
          set({ hasTabs });
        },
        hasCrumbs: true,
        setHasCrumbs: (hasCrumbs: boolean) => {
          set({ hasCrumbs });
        },
      };
    },
    {
      name: "adminGlobal",
    }
  )
);
