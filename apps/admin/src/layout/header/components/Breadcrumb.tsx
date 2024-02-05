import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchRoutes, useLocation } from 'react-router-dom';

import SvgIcon from '@/components/SvgIcon';

import { useAppSelector } from '@/stores';

type BreadcrumbProps = {
  show?: boolean;
};

export default function LayoutBreadcrumb(props: BreadcrumbProps) {
  const { t, i18n } = useTranslation();
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
            <span>{t(name)}</span>
          </>
        ),
      };
    });
    setBreadcrumbs(breadcrumbList);
  }, [pathname, i18n.language]);

  return (
    <div className='flex-center-v' style={{ padding: '0 16px' }}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  );
}
