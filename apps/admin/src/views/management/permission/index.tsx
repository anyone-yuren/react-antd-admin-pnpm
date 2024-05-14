import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';
import { t } from 'i18next';

import { useUserPermissions } from '@/stores/modules/userStore';

import AuthAction from '../component/auth';

const fields: Array<GSearchTableField> = [
  {
    title: t('别名'),
    key: 'label',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: t('名称'),
    key: 'name',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: t('类型'),
    key: 'type',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: t('图标'),
    key: 'icon',
    dialog: {
      required: true,
    },
  },
  {
    title: t('状态'),
    key: 'status',
    sort: true,
    type: 'radio-group',
    defaultValue: 1,
    options: [
      { label: '启用', value: '0' },
      { label: '禁用', value: '1' },
    ],
    dialog: {
      required: true,
    },
  },
  {
    title: t('组件'),
    key: 'component',
  },
  {
    title: t('路径'),
    key: 'path',
  },
];
const ctrl: GTableCtrlField = {
  width: 200,
  render: (_, record) => (
    <GCtrl>
      <GAction record={record} action='view'>
        详情
      </GAction>
      <GAction record={record} action='update'>
        编辑
      </GAction>
      <AuthAction record={record}>授权</AuthAction>
    </GCtrl>
  ),
};

export default function User() {
  const permissions = useUserPermissions();
  return (
    <GSearchTable
      rowKey={(record) => record.id}
      api={() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              content: permissions,
              totalCount: permissions?.length,
            });
          }, 1000);
        });
      }}
      // ctrl={ctrl}
      fields={fields}
      dialogFormExtend={{
        fields,
      }}
    >
      <GAction action='add'>新增</GAction>
    </GSearchTable>
  );
}
