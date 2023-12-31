import { CardProps } from 'antd/lib/card';

export interface GCardProps extends CardProps {
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 折叠位置 */
  collapsePosition?: 'title' | 'extra';
  /** 是否默认折叠 */
  defaultCollapsed?: boolean;
  /** 受控的折叠 */
  collapsed?: boolean;
  /** 折叠事件 */
  onCollapse?: (collapse: boolean) => void;
  [key: string]: any;
}
