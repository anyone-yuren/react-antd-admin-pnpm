import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthProps {
  username: string;
  password: string;
}

interface AuthState {
  auth: AuthProps;
  setAuth: (auth: AuthProps) => void;
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: {
        username: '',
        password: '',
      },
      setAuth: (auth) => set({ auth }),
      token: '',
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)