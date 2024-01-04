import { Flex, Typography } from 'antd';

import useStyles from './styles';

import type { FC } from 'react';

const { Title, Text } = Typography;
export interface PMessage {
  avatar?: string | JSX.Element;
  time?: string;
  content?: string | JSX.Element;
  user?: string;
}
const Message: FC<PMessage> = ({ avatar, time, content, user }) => {
  const { styles } = useStyles();
  return (
    <Flex gap={8} className={styles['message-list']}>
      <div>{avatar}</div>
      <div className='message_content'>
        <Flex justify={'space-between'} align='center'>
          <Title level={5}>{user}</Title>
          <div>{time}</div>
        </Flex>
        <Text type='secondary'>{content}</Text>
      </div>
    </Flex>
  );
};
export default Message;
