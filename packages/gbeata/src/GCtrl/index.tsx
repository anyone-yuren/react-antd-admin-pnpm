import { DownOutlined } from '@ant-design/icons';
import { Divider, Dropdown, Space } from 'antd';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import GAction from '../GAction';
import GButton, { addRefresh, hasPermission } from '../GButton';
import { CTRL_DEFAULT_MAX, CTRL_DEFAULT_MORE_TEXT } from '../constant';
import locale from '../locale';
import { AnyKeyProps } from '../types/AnyKeyProps';
import { GCtrlProps } from './g-ctrl';
import './g-ctrl.less';

/**
 * 返回一个控制项
 * @param node 节点
 * @param key key
 */
const getCtrlItem = (node: any, key?: any, defaultProps?: AnyKeyProps) => {
  let props = { ...node.props };
  if (
    node?.type?.componentName === 'GAction' ||
    node?.type?.componentName === 'GButton'
  ) {
    return <GAction key={key} type="link" {...defaultProps} {...props} />;
  }
  return node;
};

/**
 * 将子节点转化成 GAction 按钮
 * @param children 子节点
 */
const getCtrlList = (
  children: Array<ReactNode>,
  props: GCtrlProps,
): Array<ReactNode> => {
  const {
    max = CTRL_DEFAULT_MAX,
    sub,
    more = (
      <>
        {locale.table.actionRowMore || CTRL_DEFAULT_MORE_TEXT} <DownOutlined />
      </>
    ),
  } = props;
  let ctrlList: Array<ReactNode> = [];
  if (!children.length || (children.length === 1 && !children[0])) {
    return [];
  }

  // 如果节点只有一个元素
  if (children.length === 1) {
    return [getCtrlItem(children[0], 'key', { sub })];
  }

  // 过滤掉无权限按钮和 null
  children = children.filter(
    (node: any) => node !== null && hasPermission(node?.props?.permission),
  );

  // 渲染没有折叠前的按钮
  for (
    let i = 0;
    i < (children.length <= max + 1 ? children.length : max);
    i++
  ) {
    let node = children[i];
    if (!node) {
      continue;
    }
    let CtrlItem: ReactNode;
    // 正常节点
    CtrlItem = getCtrlItem(node, i, { sub });
    // 添加这个节点
    ctrlList.push(CtrlItem);
  }

  // 多余的按钮会变成下拉菜单
  if (children.length > max + 1) {
    const menuItems = [];

    for (let i = max; i < children.length; i++) {
      let node = children[i];
      if (!node) {
        continue;
      }
      let CtrlItem: ReactNode;
      // 正常节点
      CtrlItem = getCtrlItem(node, i, { __simple: true, type: 'text' });
      // 添加这个节点
      menuItems.push({
        key: max + i,
        label: CtrlItem,
        style: { padding: 0 },
      });
    }

    ctrlList.push(
      <Dropdown
        key={max}
        menu={{ items: menuItems, style: { minWidth: 100 } }}
        placement="bottomRight"
      >
        <GButton type="link" className={classNames('g-button', sub && 'sub')}>
          {more}
        </GButton>
      </Dropdown>,
    );
  }

  return ctrlList;
};

export default function GCtrl(props: GCtrlProps) {
  const [, setRefresh] = useState<number>(0);
  let { children, split, size, sub, className, style } = props;
  if (!Array.isArray(children)) {
    children = [children];
  }
  const ctrlList = getCtrlList(children as Array<ReactNode>, props);

  useEffect(() => {
    addRefresh(setRefresh);
  }, []);

  return (
    <Space
      size={size}
      className={classNames('g-ctrl', className)}
      style={style}
      split={split ?? <Divider type="vertical" />}
    >
      {ctrlList}
    </Space>
  );
}