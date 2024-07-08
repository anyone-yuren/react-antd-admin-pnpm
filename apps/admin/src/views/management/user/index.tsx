import { useAsyncEffect } from 'ahooks';
import { Flex, Tag } from 'antd';
import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';
import { useRef, useState } from 'react';

import { getUserList } from '@/api/auth';
import useCommonsStore from '@/stores/modules/commons';

import AuthAction from '../component/auth';
import AuthHourseAction from '../component/authHourse';

export default function User() {
  const tableRef = useRef<any>();
  const [list, setList] = useState([]);
  const { getHourseList } = useCommonsStore((state) => {
    return {
      getHourseList: state.getHourseList,
    };
  });
  useAsyncEffect(async () => {
    const res = await getHourseList();
    if (res) {
      setList(res);
    }
  });

  const fields: Array<GSearchTableField> = [
    {
      title: '用户名称',
      key: 'realName',
      // maxWidth: 120,
      width: 120,
      search: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '账号',
      key: 'userName',
      width: 120,
      search: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '角色',
      key: 'roleName',
      width: 120,
      dialog: {
        required: true,
      },
    },
    {
      title: '所属组织',
      key: 'orgName',
      width: 220,
      search: true,
      dialog: {
        required: true,
      },
    },

    {
      title: '仓库权限',
      key: 'warehouseNames',
      render: (_, record) => {
        return (
          <Flex gap={4} wrap='wrap'>
            {record.warehouseNames?.map((item) => {
              return <Tag key={item}>{item}</Tag>;
            })}
          </Flex>
        );
      },
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
        {/* <AuthAction record={record}>授权</AuthAction> */}
        <AuthHourseAction record={record} refreshTable={() => tableRef.current?.refresh()}>
          授权仓库
        </AuthHourseAction>
      </GCtrl>
    ),
  };
  return (
    <GSearchTable
      ref={tableRef}
      api={getUserList}
      ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    >
      <GAction action='add'>新增</GAction>
    </GSearchTable>
  );
}
