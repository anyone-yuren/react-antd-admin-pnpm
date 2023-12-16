import { Spin } from 'antd';
import { type LazyExoticComponent, type ReactNode, Suspense } from 'react';

/**
 * @description 路由懒加载
 * @param {Element} Component 需要访问的组件
 * @returns element
 */
const LazyLoad = (Component: LazyExoticComponent<any>): ReactNode => (
  <Suspense
    fallback={
      <Spin
        size='large'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      />
    }
  >
    <Component />
  </Suspense>
);

export default LazyLoad;
