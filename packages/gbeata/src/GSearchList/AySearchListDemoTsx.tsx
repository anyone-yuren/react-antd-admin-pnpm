import { Avatar, Col, List, Row, Space } from 'antd';
import {
  AnyKeyProps,
  GAction,
  GCtrl,
  GField,
  GFields,
  GSearchList,
  GTableCtrlField,
} from 'gbeata';
import React from 'react';
import {
  addApi,
  deleteApi,
  listApi,
  professionOptions,
  updateApi,
} from '../api';

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
  return (
    <GSearchList
      title="列表标题"
      selectionType="checkbox"
      selectShowKey="cn"
      api={listApi}
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
          <Col flex="20px">{/* <GSearchList.SelectionAll /> */}</Col>
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
              <GCtrl key="ctrl">
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
            {/* <GSearchList.Selection record={record} style={{ marginRight: 8 }} /> */}
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
        updateApi,
        addApi,
      }}
    >
      <GFields>
        <GField
          title="英文名"
          key="en"
          search
          dialog={{
            required: true,
            rules: [
              { pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' },
            ],
          }}
        />
        <GField title="中文名" key="cn" search dialog={{ required: true }} />
        <GField
          title="职业"
          key="class"
          type="select"
          search
          dialog
          options={professionOptions}
        />
        <GField title="职描述业" key="des" type="textarea" dialog />
      </GFields>
      <GAction action="batch-delete">批量删除</GAction>
      <GAction action="add">新增</GAction>
    </GSearchList>
  );
}
