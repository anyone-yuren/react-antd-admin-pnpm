import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Col, Flex, Row } from 'antd';
import { useEffect, useState } from 'react';

import UserCard from '@/components/UserCard';

import { getUsersList } from '@/api';

import useStyles from './style';

import type { ListResult, UserItemType } from '../types';
import type { FC } from 'react';

interface PUSerList {
  data?: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

const UserList: FC<PUSerList> = () => {
  const { styles, theme, cx } = useStyles();

  const [tableTableData, setTableTableData] = useState<UserItemType[]>([]);
  const { data: user, loading } = useRequest<ListResult, any>(getUsersList);

  useEffect(() => {
    setTableTableData(user?.list || []);
  }, [user]);
  return (
    <Flex gap={16} vertical>
      <Flex justify={'end'}>
        <Button className={cx(styles['add-button'])} type='primary' icon={<PlusOutlined />}>
          新建
        </Button>
      </Flex>
      <Row gutter={[16, 16]}>
        {tableTableData?.map((item, index) => (
          <Col key={item.id} span={8}>
            <UserCard data={item} index={index} loading={loading} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};
export default UserList;
