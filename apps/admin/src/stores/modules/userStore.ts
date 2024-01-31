import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import type { UserInfo, UserToken } from '#/entity';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  /**
   * q
   */
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUseToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: {},
  userToken: {},
  actions: {
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    setUseToken: (token: UserToken) => set({ userToken: token }),
    clearUserInfoAndToken: () => set({ userInfo: {}, userToken: {} }),
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);

export const useToken = () => useUserStore((state) => state.userToken);

export const useUserPermissions = () => useUserStore((state) => state.userInfo?.permissions);

export const useUserActions = () => useUserStore((state) => state.actions);
