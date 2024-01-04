import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Dropdown, Flex, Row, Space, Typography } from 'antd';
import { SvgIcon } from 'ui';

import travel_3 from '@/assets/images/travel_3.jpg';

import useStyles from '../styles';

import type { MenuProps } from 'antd';
import type { FC } from 'react';

const { Title, Text } = Typography;

export interface PFriendsItem {
  avatar: string;
  name: string;
  title: string;
}

export interface PFriends {}
const Friends: FC<PFriends> = () => {
  const { styles, cx } = useStyles();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Space size={8}>
          <DeleteOutlined rev={undefined} />
          <span>删除</span>
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Space size={8}>
          <EditOutlined rev={undefined} />
          <span>修改</span>
        </Space>
      ),
    },
  ];
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'lock':
        break;
      case 'logout':
        break;
      default:
        break;
    }
  };

  const FriendData: PFriendsItem[] = [
    {
      avatar: travel_3,
      name: 'Gbeata',
      title: '来历不明',
    },
    {
      avatar: travel_3,
      name: 'Gbeata',
      title: '来历不明',
    },
    {
      avatar: travel_3,
      name: 'Gbeata',
      title: '来历不明',
    },
    {
      avatar: travel_3,
      name: 'Gbeata',
      title: '来历不明',
    },
  ];
  return (
    <>
      <Row gutter={[16, 16]}>
        {FriendData.map((item, index) => (
          <Col span={8} key={index}>
            <Card>
              <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
                <Button
                  className={cx(styles['card-action'])}
                  shape='circle'
                  type='text'
                  icon={<MoreOutlined />}
                ></Button>
              </Dropdown>
              <Flex gap={8} vertical align={'center'}>
                <Avatar size={64} src={item.avatar} />
                <Title style={{ margin: 0 }} level={5}>
                  {item.name}
                </Title>
                <Text type='secondary'>{item.title}</Text>
                <Flex style={{ marginTop: 8 }} gap={8}>
                  <Button shape='circle' icon={<SvgIcon style={{ color: '#1890ff' }} name='github' />} />
                  <Button shape='circle' icon={<SvgIcon name='message' />} />
                  <Button shape='circle' icon={<SvgIcon name='like' />} />
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Friends;
