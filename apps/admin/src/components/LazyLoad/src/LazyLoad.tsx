import { type LazyExoticComponent, type ReactNode, Suspense } from 'react';

import Loading from './Loading';

/**
 * @description 路由懒加载
 * @param {Element} Component 需要访问的组件
 * @returns element
 */
const LazyLoad = (Component: LazyExoticComponent<React.FC<{}>>): ReactNode => {
  return (
    // <Suspense fallback={<Loading />}>
    <Component />
    // </Suspense>
  );
};

export default LazyLoad;
