import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import { loginApi, type LoginParams } from '@/api';

import type { UserInfo, UserToken } from '#/entity';

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
  userInfo: {},
  userToken: {},
  actions: {
    setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
    setUserToken: (token: UserToken) => set({ userToken: token }),
    clearUserInfoAndToken: () => set({ userInfo: {}, userToken: {} }),
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);

export const useToken = () => useUserStore((state) => state.userToken);

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
  const navigate = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();
  const signInMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      message.success(t('登录成功'));
    },
  });

  /**
   * An asynchronous function for signing in with the given LoginParams.
   *
   * @param {LoginParams} data - the parameters for signing in
   * @return {Promise<void>}
   */
  const signIn = async (data: LoginParams): Promise<void> => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      notification.success({
        message: t('登录成功'),
        description: `${t('欢迎回来')}: ${data.username}`,
        duration: 3,
      });
      navigate('/home');
    } catch (error: any) {
      message.warning({
        content: error.message,
        duration: 3,
      });
    }
  };

  return useCallback(signIn, []) as typeof signIn;
};
