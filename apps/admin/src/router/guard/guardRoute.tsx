// import { usePermissions, useUserToken } from '@gbeata/store';
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
