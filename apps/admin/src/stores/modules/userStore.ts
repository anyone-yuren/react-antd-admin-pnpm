import { getItem, removeItem, setItem } from '@gbeata/utils';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';

// import { getItem, removeItem, setItem } from '@/utils/storage';
// 由于无法在异步函数中使用 persist, 所以这里无法使用，使用其他的持久化管理方式
// import { persist } from 'zustand/middleware';
import { loginApi, type LoginParams } from '@/api';

import type { UserInfo, UserToken } from '#/entity';

import { StorageEnum } from '#/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo: UserInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (token: UserToken) => {
      set({ userToken: token });
      setItem(StorageEnum.Token, token);
    },
    clearUserInfoAndToken: () => {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);

export const useUserToken = () => useUserStore((state) => state.userToken);

export const useUserPermissions = () => useUserStore((state) => state.userInfo?.permissions);

export const useUserActions = () => useUserStore((state) => state.actions);

/**
 * This function is a custom hook for signing in a user. It uses a mutation to
 * call the login API and handles the success and error cases by updating the
 * user token and info, showing notifications, and navigating to the home page.
 *
 * @param {LoginParams} data - The login parameters including username and password
 * @return {function} A memoized callback function for signing in
 */
export const useSignIn = () => {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: loginApi,
  });

  /**
   * An asynchronous function for signing in with the given LoginParams.
   *
   * @param {LoginParams} data - the parameters for signing in
   * @return {Promise<void>}
   */
  const signIn = async (data: LoginParams): Promise<any> => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { token, user } = res;
      setUserToken({ token });
      // 暂未提供，后续再决定权限如何处理
      setUserInfo(user);
      notification.success({
        message: t('登录成功'),
        description: `欢迎回来: ${data.username}`,
        duration: 3,
      });
      return await Promise.resolve(res);
    } catch (error: any) {
      message.error({
        content: error.message,
        duration: 3,
      });
      return Promise.reject(error);
    }
  };

  return useCallback(signIn, []);
};
