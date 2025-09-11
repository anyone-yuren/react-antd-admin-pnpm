import { useAsyncEffect, useRequest } from 'ahooks';
import { Flex, message, Tag } from 'antd';
import { GAction, GCtrl, GDialogForm, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { addUser, getRolePageList, getUserList, syncUser, updateUser } from '@/api/auth';
import useCommonsStore from '@/stores/modules/commons';

import AuthAction from '../component/auth';
import AuthHourseAction from '../component/authHourse';

export default function User() {
  const { t } = useTranslation();
  const tableRef = useRef<any>();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const { getHourseList } = useCommonsStore((state) => {
    return {
      getHourseList: state.getHourseList,
    };
  });

  const { data: roleList } = useRequest(getRolePageList);
  const { runAsync: syncRunAsync, loading } = useRequest(syncUser, {
    manual: true,
    onSuccess: () => {
      message.success('同步用户成功');
      tableRef.current?.refresh();
    },
  });
  useAsyncEffect(async () => {
    const res = await getHourseList();
    if (res) {
      setList(res);
    }
  }, []);

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
      type: 'select',
      options: roleList?.resultData?.pageData?.map((item) => {
        console.log(item);

        return { label: item.roleName, value: item.id };
      }),
      dialog: {
        required: true,
        key: 'roleId',
      },
    },
    // {
    //   title: '所属组织',
    //   key: 'orgName',
    //   width: 220,
    //   search: true,
    //   dialog: {
    //     required: true,
    //   },
    // },
    {
      title: t('用户头像'),
      key: 'avator',
      align: 'center',
      width: 100,
      table: false,
      dialog: {},
    },

    {
      title: t('性别'),
      align: 'center',
      width: 80,
      key: 'userSex',
      type: 'radio-group',
      options: [
        {
          label: t('男'),
          value: 1,
        },
        {
          label: t('女'),
          value: 2,
        },
      ],

      dialog: {
        required: true,
        defaultValue: 1,
      },
    },
    {
      ellipsis: true,
      title: t('出生日期'),
      align: 'center',
      width: 200,
      key: 'birthday',
      type: 'date',
      table: false,
      dialog: {},
    },
    {
      title: t('工号'),
      align: 'center',
      width: 100,
      key: 'jobNumber',
      search: true,
      dialog: {},
    },
    {
      title: t('电话'),
      align: 'center',
      width: 200,
      key: 'phoneNumber',
      search: true,
      dialog: {
        formItemProps: {
          rules: [
            {
              validator: (_, val: string) => {
                if (!val) {
                  return Promise.resolve();
                }
                if (!/^1[3-9]\d{9}$/.test(val)) {
                  return Promise.reject('手机号格式不正确！');
                }
                return Promise.resolve();
              },
            },
          ],
        },
      },
    },
    {
      title: 'email',
      align: 'center',
      width: 200,
      key: 'userEmail',
      table: false,
      dialog: {
        formItemProps: {
          rules: [
            {
              validator: (_, val: string) => {
                if (!val) {
                  return Promise.resolve();
                }
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
                  return Promise.reject('邮箱格式不正确！');
                }
                return Promise.resolve();
              },
            },
          ],
        },
      },
    },
    {
      title: '仓库权限',
      width: 220,
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
    {
      title: t('部门名称'),
      align: 'center',
      width: 250,
      key: 'orgName',
      dialog: false,
    },
  ];
  const ctrl: GTableCtrlField = {
    width: 200,
    fixed: 'right',
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
    <>
      <GSearchTable
        ref={tableRef}
        api={getUserList}
        ctrl={ctrl}
        fields={fields}
        rowKey='sort_id'
        dialogFormExtend={{
          fields,
          addApi: async (res) => {
            await addUser({ ...res, departmentName: '' });
          },
          updateApi: async (res) => {
            await updateUser({ ...res })
          },
          formExtend: {
            layout: {
              labelCol: { flex: '180px' }, // label 宽度
              wrapperCol: { flex: '1' }, // content 宽度
            },
          },
          span: 12,
          width: '50%',
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1200 },
        }}
      >
        <GAction action='add'>新增</GAction>
        <GAction onClick={() => setOpen(true)} loading={loading}>
          同步用户
        </GAction>
      </GSearchTable>
      <GDialogForm
        title='同步用户'
        addApi={syncUser}
        visible={open}
        open={open}
        onSuccess={() => {
          tableRef.current?.refresh();
        }}
        onCancel={() => {
          setOpen(false);
        }}
        fields={[
          {
            title: '用户名',
            key: 'userName',
            required: true,
          },
        ]}
      />
    </>
  );
}
