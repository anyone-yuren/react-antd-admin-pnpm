import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchRoutes, useLocation } from 'react-router-dom';

import IconifyIcon from '@/components/iconify-icon';
import SvgIcon from '@/components/SvgIcon';

import { useMenus } from '@/stores/modules/menu';

// type BreadcrumbProps = {
//   show?: boolean;
// };

export default function LayoutBreadcrumb() {
  const { t, i18n } = useTranslation();
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  const { pathname } = useLocation();

  const menuList = useMenus();

  useEffect(() => {
    const matchRouteList = matchRoutes(menuList, pathname) || [];
    const breadcrumbList = matchRouteList.map((item: any) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { name, icon = '' } = item?.route;
      if (!icon) return null;
      // gbeata-标识的为自定义图标 出自iconify
      return {
        title: (
          <span className='flex items-center gap-1'>
            {icon && <IconifyIcon icon={icon.replace('gbeata-', '')} size={16} />}
            <span>{t(name)}</span>
          </span>
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
