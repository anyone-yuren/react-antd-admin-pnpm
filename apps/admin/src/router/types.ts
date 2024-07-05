import type { ReactNode } from 'react';
import type { LoaderFunction, NonIndexRouteObject, RouteObject } from 'react-router-dom';

export interface MetaProps {
  title: string;
  key?: string;
  icon?: string;
  iconSize?: number;
  affix?: boolean;
  keepAlive?: boolean;
  orderNo?: number;
  hideMenu?: boolean;
  hideChildrenInMenu?: boolean;
}

export interface RouteMeta {
  title: string;
  iconSize?: number;
  affix?: boolean;
  keepAlive?: boolean;
  orderNo?: number;
  hideChildrenInMenu?: boolean;
  /**
   * antd menu selectedKeys
   */
  key: string;
  /**
   * menu label, i18n
   */
  label?: string;
  /**
   * menu prefix icon
   */
  icon?: ReactNode;
  /**
   * menu suffix icon
   */
  suffix?: ReactNode;
  /**
   * hide in menu
   */
  hideMenu?: boolean;
  /**
   * hide in multi tab
   */
  hideTab?: boolean;
  /**
   * disable in menu
   */
  disabled?: boolean;
  /**
   * react router outlet
   */
  outlet?: any;
  /**
   * use to refresh tab
   */
  timeStamp?: string;
  /**
   * external link and iframe need
   */
  frameSrc?: string;
}
export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;

export interface AppMenu {
  name: string;
  path: string;
  children?: AppMenu[];
  disabled?: boolean;
  icon?: string;
  iconSize?: number;
  affix?: boolean;
  orderNo?: number;
  hideMenu?: boolean;
  hideChildrenInMenu?: boolean;
  hideBreadcrumb?: boolean;
}
