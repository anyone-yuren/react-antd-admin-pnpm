import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// import { getItem, removeItem, setItem } from '@/utils/storage';
// 由于无法在异步函数中使用 persist, 所以这里无法使用，使用其他的持久化管理方式
// import { persist } from 'zustand/middleware';
import type { Permission } from '../types/entity';

type UserStore = {
  userInfo: Partial<Permission>;
  userToken: string;
  setUserInfo: (userInfo: Permission) => void;
  setUserToken: (token: string) => void;
  clearUserInfoAndToken: () => void;
  orgAndWarehouseInfo: Record<string, any>;
  setOrgAndWarehouseInfo: (info) => void;
  activeOrgCode: string | undefined;
  setActiveCode: (code: string) => void;
};

export const useAuthStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userInfo: {},
      userToken: '',
      setUserInfo: (userInfo: Permission) => {
        set({ userInfo });
      },
      setUserToken: (token: string) => {
        set({ userToken: token });
      },
      clearUserInfoAndToken: () => {
        set({ userInfo: {}, userToken: '' });
      },
      orgAndWarehouseInfo: {},
      setOrgAndWarehouseInfo: (info) => {
        set({ orgAndWarehouseInfo: info });
      },
      activeOrgCode: undefined,
      setActiveCode: (code: string) => {
        set({ activeOrgCode: code });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
