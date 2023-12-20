import { Button, Card, Flex, Skeleton, Typography } from 'antd';
import React from 'react';
import { Translatex } from 'ui';

import avatar from '@/assets/images/avatar_2.jpg';
import cover_5 from '@/assets/images/cover_5.jpg';

import SvgIcon from '../SvgIcon';
import useStyles from './styles';

import type { CardProps } from 'antd/es/card';

const { Text, Title } = Typography;

export interface UserCardProp extends CardProps {
  children?: React.ReactNode;
}
const UserCard: React.FC<UserCardProp> = (prop) => {
  const { children, ...rest } = prop;
  const [loading, setLoading] = React.useState(true);
  const { styles } = useStyles();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading && (
        <Card
          className={styles['user-card']}
          actions={[
            <Skeleton.Button active shape='round' />,
            <Skeleton.Button active shape='round' />,
            <Skeleton.Button active shape='round' />,
          ]}
          cover={<Skeleton.Image active />}
        >
          <Skeleton loading avatar active />
        </Card>
      )}
      <Translatex direction='up' run={!loading} delay={100}>
        <Card
          className={styles['user-card']}
          cover={
            <span className='cover'>
              <img alt='example' src={cover_5} />
            </span>
          }
          actions={[]}
        >
          <div className='user_info'>
            <SvgIcon className='avatar-svg' name='wave'></SvgIcon>
            <div className='avatar'>
              <img src={avatar} />
            </div>
            <div className='info'>
              <Title level={5}>Gbeata</Title>
              <Text type='secondary'>来历不明</Text>
              <Flex align='flex-start' gap={8}>
                <Button shape='circle' icon={<SvgIcon style={{ color: '#1890ff' }} name='github' />} />
                <Button shape='circle' icon={<SvgIcon name='message' />} />
                <Button shape='circle' icon={<SvgIcon name='like' />} />
              </Flex>
            </div>
          </div>
        </Card>
        {/* <Card className={styles['user-card']} loading={loading} hoverable {...rest}>
          {children}
        </Card> */}
      </Translatex>
    </>
  );
};
export default UserCard;
