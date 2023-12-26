import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Segmented, Skeleton, Typography } from 'antd';
import { useTheme } from 'antd-style';
import React from 'react';
import { SvgIcon, Translatex } from 'ui';

import avatar from '@/assets/images/avatar_2.jpg';
import cover_5 from '@/assets/images/cover_5.jpg';

import Followers from '../followers';
import Friends from '../friends';
import Gallery from '../gallery';
import ProFile from '../proFile';
import useStyles from './styles';

import type { CardProps } from 'antd/es/card';

const { Text, Title } = Typography;

export interface UserCardProp extends CardProps {
  children?: React.ReactNode;
}

const UserCard: React.FC<UserCardProp> = (prop) => {
  const { children, ...rest } = prop;
  const token = useTheme();
  const [tabActive, setTabActive] = React.useState('Profile');
  const [loading, setLoading] = React.useState(true);
  const { styles } = useStyles();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div className={styles.content}>
      {/* {loading && (
        <Card
          hoverable
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
      )} */}
      <Card
        hoverable
        className={styles['user-card']}
        cover={
          <>
            <div className='user_info'>
              <div className='avatar'>
                <img src={avatar} />
              </div>
              <div className='info'>
                <Title style={{ margin: 0, color: 'inherit' }} level={3}>
                  Gbeata
                </Title>
                <Text style={{ color: 'inherit', opacity: 0.7 }}>来历不明</Text>
              </div>
            </div>
            {/* <span className='cover'>
                <img alt='example' src={cover_5} />
              </span> */}
          </>
        }
      >
        <Segmented
          size='large'
          onChange={(e: string | number) => {
            setTabActive(e);
          }}
          value={tabActive}
          options={[
            { label: 'Profile', value: 'Profile', icon: <SvgIcon className='profile' name='profile' size={24} /> },
            {
              label: 'Followers',
              value: 'Followers',
              icon: <SvgIcon className='profile' name='followers' size={24} />,
            },
            { label: 'Friends', value: 'Friends', icon: <SvgIcon className='profile' name='friends' size={24} /> },
            { label: 'Gallery', value: 'Gallery', icon: <SvgIcon className='profile' name='gallery' size={24} /> },
          ]}
        />
      </Card>
      <Translatex className={styles.translatex} direction='left' run={tabActive === 'Profile'} delay={100}>
        <ProFile />
      </Translatex>
      <Translatex className={styles.translatex} direction='left' run={tabActive === 'Gallery'} delay={100}>
        <Gallery />
      </Translatex>
      <Translatex className={styles.translatex} direction='left' run={tabActive === 'Followers'} delay={100}>
        <Followers />
      </Translatex>
      <Translatex className={styles.translatex} direction='left' run={tabActive === 'Friends'} delay={100}>
        <Friends />
      </Translatex>
    </div>
  );
};
export default UserCard;
