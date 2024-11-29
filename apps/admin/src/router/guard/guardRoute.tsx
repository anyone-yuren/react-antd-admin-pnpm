// import { usePermissions, useUserToken } from '@gbeata/store';
import { message } from 'antd';
import { type ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/admin';
import { usePermissions } from '@/stores/modules/userStore';

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ['/', '/home', '/login'];
  const { pathname } = useLocation();
  const { setUserInfo, token } = useAuthStore((state) => {
    return {
      setUserInfo: state.setUserInfo,
      token: state.userToken,
    };
  });
  const permissions = usePermissions();

  const getPermission = async () => {
    const res = await permissions();
    const { menus } = res?.resultData || {};
    if (!menus) {
      // 无权限，跳转到登录页
      if (menus.length === 0) {
        // 提示无权限
        message.error('无权限');
        // window.location.href = '#/login';
      }
    }
    if (res) {
      setUserInfo(res.resultData);
    }
  };

  useEffect(() => {
    if (token) {
      getPermission();
    }
  }, [token]);

  if (!token) {
    if (whiteList.includes(pathname)) {
      return <Navigate to='/login' replace />;
    }
    return <Navigate to={`/login?redirect=${pathname}`} replace />;
  }

  return <>{children}</>;
};
