import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

import SvgIcon from '@/components/SvgIcon';

import { useAppSelector } from '@/stores';

type BreadcrumbProps = {
  show?: boolean;
};

export default function LayoutBreadcrumb(props: BreadcrumbProps) {
  const { show = true } = props;
  if (!show) return null;
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  const { pathname } = useLocation();
  const getMenuList = useAppSelector((state) => state.menu.menuList);

  useEffect(() => {
    const matchRouteList = matchRoutes(getMenuList, pathname) || [];
    const breadcrumbList = matchRouteList.map((item: any) => {
      const { name, icon = '' } = item?.route;
      return {
        title: (
          <>
            {icon && <SvgIcon name={icon} style={{ marginRight: 8 }} />}
            <span>{name}</span>
          </>
        ),
      };
    });
    setBreadcrumbs(breadcrumbList);
  }, [pathname]);

  return (
    <div className='flex-center-v' style={{ padding: '0 16px' }}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  );
}
