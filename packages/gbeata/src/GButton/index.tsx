import { Button, Modal, Popconfirm, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { omitObj } from '../utils';
import { GButtonProps } from './g-button';
import useStyles from './style';

interface AnyKeyProps {
  [key: string]: any;
}

const refreshList: Array<any> = [];

export const addRefresh = (setRefresh: any) => {
  refreshList.push(setRefresh);
};

export const removeRefresh = (setRefresh: any) => {
  let refreshIndex = refreshList.findIndex((item) => item === setRefresh);
  if (refreshIndex >= 0) {
    refreshList.splice(refreshIndex, 1);
  }
};

// 权限列表
let permissionList: Array<string> = [];

export const setPermissionList = (list: Array<string>) => {
  permissionList = list;
  refreshList.forEach((setRefresh) => {
    setRefresh(Math.random());
  });
};

export const hasPermission = (permission: string) => {
  if (!permission) {
    return true;
  }
  if (permissionList.includes(permission)) {
    return true;
  }
  return false;
};

let keys = [
  'confirm',
  'onConfirm',
  'confirmMsg',
  'tableFooterExtraOnly',
  'action',
  'api',
  'onFinish',
  '__simple',
  'deleteApi',
  'detailApi',
  'detailParams',
  'detailApiFilter',
  'permission',
  'extra',
  'record',
  'confirmVisible',
  'sub',
  'omitKeys',
];
export default function GButton(props: GButtonProps) {
  debugger;
  const { styles } = useStyles();
  const [, setRefresh] = useState<number>(0);
  let params: AnyKeyProps = {
    ...props,
  };

  useEffect(() => {
    addRefresh(setRefresh);
    return () => {
      removeRefresh(setRefresh);
    };
  }, []);

  // 权限控制
  if (params.permission && !permissionList.includes(params.permission)) {
    return null;
  }

  // 控制样式
  let className: string[] | string = [styles.gButton];

  // 是否在折叠按钮里面
  if (props.__simple) {
    className.push(styles.simple);
  }

  // 是否是次级按钮
  if (props.sub) {
    className.push(styles.sub);
  }

  // 是否有自定义样式
  if (props.className) {
    className.push(props.className);
  }

  className = classNames(className);

  // 删除一些没有用到的属性
  if (props.omitKeys) {
    params = omitObj(params, props.omitKeys);
  }

  params = omitObj(params, keys);

  // 基础按钮
  let btn = (
    <Button className={className} {...params}>
      {props.children}
    </Button>
  );

  // 带悬浮提示
  if (props.tooltip) {
    btn = <Tooltip title={props.tooltip}>{btn}</Tooltip>;
  }

  // 带确认提示
  if (props.confirm && !props.disabled) {
    if (!props.__simple) {
      return (
        <Popconfirm
          title={props.confirmMsg}
          onConfirm={() => props.onConfirm && props.onConfirm()}
        >
          {btn}
        </Popconfirm>
      );
    } else {
      return (
        <Button
          className={className}
          {...params}
          onClick={() => {
            Modal.confirm({
              content: props.confirmMsg,
              onOk: () => props.onConfirm && props.onConfirm(),
            });
          }}
        >
          {props.children}
        </Button>
      );
    }
  }

  return btn;
}

GButton.componentName = 'GButton';
