import { useTitle as usePageTitle } from 'ahooks';
import { setDefaultDataFilter } from 'gbeata';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { searchRoute } from '@/utils';

import { basicRoutes } from '@/router';

// 监听页面变化和动态改变网站标题
export function useTitle() {
  const [pageTitle, setPageTitle] = useState('react-admin-design');
  const { pathname } = useLocation();

  useEffect(() => {
    const currRoute = searchRoute(pathname, basicRoutes);
    setPageTitle(currRoute?.meta.title);
    setDefaultDataFilter((res) => {
      return {
        content: res.resultData.pageData,
        // 数据总共 n 条
        totalCount: res.resultData.totalCount,
        ...res,
      };
    });
  }, [pathname]);

  usePageTitle(pageTitle);
}
