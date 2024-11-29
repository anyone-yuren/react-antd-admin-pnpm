import { Result } from 'antd';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import SvgIcon from '@/components/SvgIcon';

import { useAuthStore } from '@/stores/admin';

const AuthenticatedRoute = ({ requiresAuth }) => {
  const { userInfo = {} } = useAuthStore(
    useShallow((state) => {
      return {
        userInfo: state.userInfo,
      };
    }),
  );

  const { menus } = userInfo;

  console.log(userInfo);

  const menusAtt = menus?.split(',') || [];

  return (
    <>
      {menusAtt?.includes(requiresAuth) ? (
        <Outlet />
      ) : (
        <Result
          // status={status}
          title={'403'}
          icon={<SvgIcon size={380} name={'403'} />}
          subTitle={'对不起您没有访问该页面的权限'}
        />
      )}
    </>
  );
};

export default AuthenticatedRoute;
