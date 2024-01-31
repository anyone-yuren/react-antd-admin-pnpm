import { Navigate, useLocation } from 'react-router-dom';

import { useUserToken } from '@/stores/modules/userStore';

import type { ReactNode } from 'react';

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ['/', '/home', '/login'];
  const { pathname } = useLocation();
  const { token } = useUserToken();
  if (!token) {
    debugger;
    if (whiteList.includes(pathname)) {
      return <Navigate to='/login' replace />;
    }
    return <Navigate to={`/login?redirect=${pathname}`} replace />;
  }

  return <>{children}</>;
};
