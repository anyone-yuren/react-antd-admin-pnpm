import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// import { getItem, removeItem, setItem } from '@/utils/storage';
// 由于无法在异步函数中使用 persist, 所以这里无法使用，使用其他的持久化管理方式
// import { persist } from 'zustand/middleware';

type UserStore = {
  userToken: string;
  setUserToken: (token: string) => void;
};

export const useAuthStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userToken: '',
      setUserToken: (token: string) => {
        set({ userToken: token });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
