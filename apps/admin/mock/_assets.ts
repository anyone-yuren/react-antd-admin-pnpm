import { Random } from 'mockjs';

import { BasicStatus, PermissionType } from '#/enum';

/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: Random.cparagraph(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: Random.cparagraph(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '3',
    name: 'Northwest Branch',
    status: 'enable',
    desc: Random.cparagraph(),
    order: 3,
    children: [
      { id: '3-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '3-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '3-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  key: '9100714781927703',
  parentId: '',
  label: '首页',
  name: 'Dashboard',
  icon: 'home',
  type: PermissionType.CATALOGUE,
  route: 'home',
  order: 1,
};
const MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  key: '0901673425580518',
  parentId: '',
  label: '系统设置',
  name: 'Management',
  icon: 'gbeata-ant-design:setting-outlined',
  type: PermissionType.CATALOGUE,
  route: 'system',
  order: 6,
  children: [
    {
      id: '4359580910369984',
      parentId: '0901673425580518',
      label: '授权管理',
      name: 'Permission',
      type: PermissionType.MENU,
      route: 'permission',
      component: '/management/permission/index.tsx',
    },
    {
      id: '1689241785490759',
      parentId: '0901673425580518',
      label: '角色管理',
      name: 'Role',
      type: PermissionType.MENU,
      route: 'role',
      component: '/management/role/index.tsx',
    },
    {
      id: '0157880245365433',
      parentId: '0901673425580518',
      label: '用户管理',
      name: 'User',
      type: PermissionType.MENU,
      route: 'user',
      component: '/management/user/index.tsx',
    },
  ],
};
const COMPONENTS_PERMISSION = {
  id: '2271615060673773',
  key: '2271615060673773',
  parentId: '',
  label: '表单',
  name: 'Form',
  icon: 'form',
  type: PermissionType.CATALOGUE,
  route: 'form',
  order: 3,
  children: [
    {
      id: '2478488238255411',
      parentId: '2271615060673773',
      label: '基础表单',
      name: 'BasicForm',
      type: PermissionType.MENU,
      route: 'basic-form',
      component: '/form/basic-form/index.tsx',
    },
    {
      id: '6755238352318767',
      parentId: '2271615060673773',
      label: '查询表单',
      name: 'SearchForm',
      type: PermissionType.MENU,
      route: 'search-form',
      component: '/form/search-form/index.tsx',
    },
  ],
};
const FUNCTIONS_PERMISSION = {
  id: '8132044808088488',
  key: '8132044808088488',
  parentId: '',
  label: '组件',
  name: 'Compo',
  icon: 'solar:plain-2-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'compo',
  order: 4,
  children: [
    {
      id: '3667930780705750',
      parentId: '8132044808088488',
      label: '图片上传',
      name: 'ImageUpload',
      type: PermissionType.MENU,
      route: 'image-upload',
      component: '/compo/image-upload/index.tsx',
    },
    {
      id: '3667930780705750',
      key: '3667930780705750',
      parentId: '8132044808088488',
      label: '拖拽',
      name: 'Drag',
      type: PermissionType.CATALOGUE,
      route: 'drag',
      children: [
        {
          id: '3667930780705710',
          parentId: '3667930780705750',
          label: '列表拖拽',
          name: 'DragList',
          type: PermissionType.MENU,
          route: 'drag-list',
          component: '/compo/drag/drag-list.tsx',
        },
        {
          id: '3667930780705711',
          parentId: '3667930780705750',
          label: '组件拖拽',
          name: 'DragResize',
          type: PermissionType.MENU,
          route: 'drag-resize',
          component: '/compo/drag/drag-resize.tsx',
        },
      ],
    },
    {
      id: '3667930780705751',
      parentId: '8132044808088488',
      label: '穿梭框',
      name: 'Transfer',
      type: PermissionType.MENU,
      route: 'transfer',
      component: '/compo/transfer/index.tsx',
    },
  ],
};
const ERRORS_PERMISSION = {
  id: '9406067785553476',
  key: '9406067785553476',
  parentId: '',
  label: '异常页面',
  name: 'Exception',
  icon: 'bxs:error-alt',
  type: PermissionType.CATALOGUE,
  route: 'exception',
  order: 6,
  children: [
    {
      id: '8557056851997154',
      parentId: '9406067785553476',
      label: '403页面',
      name: '403',
      type: PermissionType.MENU,
      route: '403',
      component: '/exception/index.tsx',
    },
    {
      id: '5095669208159005',
      parentId: '9406067785553476',
      label: '404页面',
      name: '404',
      type: PermissionType.MENU,
      route: '404',
      component: '/exception/index.tsx',
    },
    {
      id: '0225992135973772',
      parentId: '9406067785553476',
      label: '500页面',
      name: '500',
      type: PermissionType.MENU,
      route: '500',
      component: '/exception/index.tsx',
    },
  ],
};

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  MANAGEMENT_PERMISSION,
  COMPONENTS_PERMISSION,
  FUNCTIONS_PERMISSION,
  ERRORS_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: '9931665660771476',
  name: 'Test',
  label: 'test',
  status: BasicStatus.ENABLE,
  order: 2,
  desc: 'test',
  permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION, FUNCTIONS_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: Random.guid(),
  username: 'admin',
  avatar: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/avatar.png',
  email: Random.email(),
  createdAt: Random.datetime('y-MM-dd HH:mm:ss'),
  updatedAt: Random.datetime('y-MM-dd HH:mm:ss'),
  password: '123456',
  role: ADMIN_ROLE,
  token: 'gbeataToken',
  permissions: ADMIN_ROLE.permission,
  homePath: '/home',
};
export const TEST_USER = {
  id: Random.guid(),
  username: 'test',
  avatar: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/avatar.png',
  password: '123456',
  email: Random.email(),
  token: 'gbeataToken',
  createdAt: Random.datetime('y-MM-dd HH:mm:ss'),
  updatedAt: Random.datetime('y-MM-dd HH:mm:ss'),
  role: TEST_ROLE,
  permissions: TEST_ROLE.permission,
  homePath: '/home',
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];
