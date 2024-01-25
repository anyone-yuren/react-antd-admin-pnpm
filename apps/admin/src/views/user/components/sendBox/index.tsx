import { Avatar, Button, Flex, Input, Typography } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'ui';

import avatarUser from '@/assets/images/avatar_6.jpg';

import useStyles from './styles';

import type { FC } from 'react';

const { Title, Text } = Typography;
export interface PSendBox {
  avatar?: string | JSX.Element;
  time?: string;
  content?: string | JSX.Element;
  user?: string;
}
const SendBox: FC<PSendBox> = ({ avatar = avatarUser, time, content, user }) => {
  const { styles } = useStyles();
  return (
    <Flex gap={8} align='center' className={styles['send-box']}>
      <Avatar src={avatar}></Avatar>
      <div className='send-content'>
        <Input
          placeholder={t('请在这里输入您的留言')}
          suffix={
            <Flex>
              <Button type='text' shape='circle' icon={<SvgIcon name='picture' />}></Button>
              <Button type='text' shape='circle' icon={<SvgIcon name='express' />}></Button>
            </Flex>
          }
        />
      </div>
    </Flex>
  );
};
export default SendBox;
