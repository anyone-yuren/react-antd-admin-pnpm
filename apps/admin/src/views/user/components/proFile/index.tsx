import {
  AntDesignOutlined,
  GithubOutlined,
  MessageOutlined,
  MoreOutlined,
  ShareAltOutlined,
  WechatOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Flex, Image, List, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'ui';

import { UserFooter } from '@/components/UserCard';

import avatar_1 from '@/assets/images/avatar_1.jpg';
import avatar_4 from '@/assets/images/avatar_4.jpg';
import avatar_6 from '@/assets/images/avatar_6.jpg';
import avatar_8 from '@/assets/images/avatar_8.jpg';
import travel_3 from '@/assets/images/travel_3.jpg';

import Message from '../message';
import SendBox from '../sendBox';
import useStyles from '../styles';

import type { PMessage } from '../message';
import type { FC } from 'react';

const { Text } = Typography;

export interface PProFiles {}
const ProFile: FC<PProFiles> = () => {
  const { styles } = useStyles();
  const aboutData = [
    {
      title: t('深圳市'),
      icon: <SvgIcon name='point' size={24} />,
    },
    {
      title: 'shoplazza.nyg@gmail.com',
      icon: <SvgIcon name='email' size={24} />,
    },
    {
      title: t('前端开发'),
      icon: <SvgIcon name='work' size={24} />,
    },
  ];

  const SocialData = [
    {
      title: 'https://github.com/anyone-yuren',
      icon: <GithubOutlined style={{ fontSize: 24 }} />,
    },
    {
      title: 'nhf066901@sina.com',
      icon: <WeiboOutlined style={{ fontSize: 24 }} />,
    },
    {
      title: 'leio-forver',
      icon: <WechatOutlined style={{ fontSize: 24 }} />,
    },
    {
      title: 'https://juejin.cn/user/2682464101469480/posts',
      icon: <ZhihuOutlined style={{ fontSize: 24 }} />,
    },
  ];

  const messageList: PMessage[] = [
    {
      avatar: <Avatar src={avatar_4} />,
      time: t('2小时前'),
      content: t('做普通人，干正经事，可以爱小钱，但必有大胸怀。'),
      user: 'anyone',
    },
    {
      avatar: <Avatar src={avatar_1} />,
      time: '27 Dec 2023',
      content: t('多年后，一个埋我的人被指定，这些年，我偶尔想一想死亡的事情，把活着，当成了一种习惯'),
      user: t('倾盆大雨'),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Flex gap={16} vertical>
            <Card>
              <Flex align='middle' justify='space-evenly'>
                <UserFooter name='Follower' count={12}></UserFooter>
                <Divider style={{ height: 'auto' }} type='vertical' />
                <UserFooter name='Following' count={112}></UserFooter>
              </Flex>
            </Card>
            <Card title={t('关于我')}>
              <Text type='secondary'>
                {t(
                  '如果给你寄一本书， 我不会寄给你诗歌， 我要给你一本关于植物，关于庄稼的， 告诉你稻子和稗子的区别，                 告诉你一棵稗子提心吊胆的春天。',
                )}
              </Text>
              <List
                itemLayout='horizontal'
                dataSource={aboutData}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta avatar={item.icon} description={item.title} />
                  </List.Item>
                )}
              />
            </Card>
            <Card title={t('社交')}>
              <List
                itemLayout='horizontal'
                dataSource={SocialData}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta avatar={item.icon} description={item.title} />
                  </List.Item>
                )}
              />
            </Card>
          </Flex>
        </Col>
        <Col span={16}>
          <Flex gap={16} vertical>
            <Card>
              <Flex gap={16} vertical>
                <TextArea rows={4} placeholder={t('分享你想对我说的话')} maxLength={6} />
                <Flex justify='end'>
                  <Button type='primary'>{t('发布')}</Button>
                </Flex>
              </Flex>
            </Card>
            <Card
              title={
                <Flex justify={'space-between'} align='center' gap={16}>
                  <List>
                    <List.Item key='1'>
                      <List.Item.Meta
                        avatar={<Avatar src={avatar_8} size={48} />}
                        title='Gbeata'
                        description='25 Dec 2023'
                      />
                    </List.Item>
                  </List>
                  <Button shape='circle' type='text' icon={<MoreOutlined />}></Button>
                </Flex>
              }
            >
              <Flex gap={16} vertical>
                <Text>{t('我填平了山海，却发现你在云端。')}</Text>
                <Image className={styles['custom-image']} width={'100%'} height={400} src={travel_3} />
                <Flex justify='space-between' align='content-center'>
                  <Flex align='center'>
                    <Button id='like' size='small' type='text' icon={<SvgIcon name='love' />}>
                      3
                    </Button>
                    <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                      <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
                      <Avatar src={avatar_6} style={{ backgroundColor: '#f56a00' }}>
                        K
                      </Avatar>

                      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                    </Avatar.Group>
                  </Flex>
                  <div>
                    <Button shape='circle' type='text' icon={<MessageOutlined />}></Button>
                    <Button shape='circle' type='text' icon={<ShareAltOutlined />}></Button>
                  </div>
                </Flex>
                {messageList.map((item) => (
                  <Message avatar={item.avatar} time={item.time} content={item.content} user={item.user} />
                ))}
                {/* 发送消息 */}
                <SendBox></SendBox>
              </Flex>
            </Card>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default ProFile;
