import { Avatar, Col, List, Row, Space } from 'antd';
import React from 'react';
import {
  addApi,
  deleteApi,
  listApi,
  professionOptions,
  updateApi,
} from '../api';
import { GCtrl, GSearchList, Selection, SelectionAll } from '../index';
import {
  AnyKeyProps,
  GAction,
  GSearchTableField,
  GTableCtrlField,
} from '../index.d';

const ctrl: GTableCtrlField = {
  width: 200,
  render: (value, record) => {
    return (
      <GCtrl>
        <GAction record={record} action="update">
          编辑
        </GAction>
        <GAction record={record} action="delete">
          删除
        </GAction>
        <GAction record={record} action="view">
          详情
        </GAction>
      </GCtrl>
    );
  },
};

export default function AySearchDemo() {
  const fields: Array<GSearchTableField> = [
    {
      title: '英文名',
      key: 'en',
      search: true,
      dialog: {
        required: true,
        rules: [
          { pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' },
        ],
      },
    },
    {
      title: '中文名',
      key: 'cn',
      search: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      search: true,
      dialog: true,
      options: professionOptions,
    },
    {
      title: '描述',
      type: 'textarea',
      key: 'des',
      dialog: true,
    },
  ];

  return (
    <GSearchList
      title="列表标题"
      selectionType="checkbox"
      selectShowKey="cn"
      api={listApi}
      fields={fields}
      ctrl={ctrl}
      rowKey="sort_id"
      deleteApi={deleteApi}
      pagination={{
        pageSize: 20,
      }}
      listHeader={
        <Row
          style={{
            backgroundColor: '#fafafa',
            padding: '12px 24px',
            fontWeight: 500,
          }}
        >
          <Col flex="20px">
            <SelectionAll />
          </Col>
          <Col flex="1" style={{ paddingLeft: 8 }}>
            干员信息
          </Col>
          <Col flex="130px">操作</Col>
        </Row>
      }
      renderItem={(record: AnyKeyProps) => {
        let starMap: AnyKeyProps = {
          5: '⭐️⭐️⭐️⭐️⭐️⭐️',
          4: '⭐️⭐️⭐️⭐️⭐️',
          3: '⭐️⭐️⭐️⭐️',
          2: '⭐️⭐️⭐️',
          1: '⭐️⭐️',
          0: '⭐️',
        };
        return (
          <List.Item
            key={record.sort_id}
            actions={[
              <GCtrl key={record.sort_id}>
                <GAction record={record} action="view">
                  详情
                </GAction>
                <GAction record={record} action="update">
                  编辑
                </GAction>
                <GAction record={record} action="delete">
                  删除
                </GAction>
              </GCtrl>,
            ]}
          >
            <Selection record={record} style={{ marginRight: 8 }} />
            <List.Item.Meta
              avatar={<Avatar src={record.icon} size="large" />}
              title={
                <Space>
                  {record.cn} {starMap[record.rarity]}
                </Space>
              }
              description={record.des || '暂时没有描述。'}
            />
            <div>{record.moredes || '暂时没有干员信息。'}</div>
          </List.Item>
        );
      }}
      dialogFormExtend={{
        fields: fields,
        updateApi,
        addApi,
      }}
    >
      <GAction action="batch-delete">批量删除</GAction>
      <GAction action="add">新增</GAction>
    </GSearchList>
  );
}
