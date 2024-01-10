import type { ReactNode } from 'react';
import type { LoaderFunction, NonIndexRouteObject } from 'react-router-dom';

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

export interface RouteObject extends NonIndexRouteObject {
  id?: string;
  loader?: LoaderFunction;
  element?: ReactNode;
  path?: string;
  fullPath?: string;
  children?: RouteObject[];
  index?: false;
  meta?: MetaProps;
  name?: string;
  key?: string;
}

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
