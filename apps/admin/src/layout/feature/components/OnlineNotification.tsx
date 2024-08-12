import { NotificationOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { t } from 'i18next';

export default function OnlineNotification() {
  return (
    <Popover title={t('消息通知')} content={<div>测试通知</div>}>
      <Button
        shape='circle'
        size='small'
        onClick={() => {
          //
        }}
        icon={<NotificationOutlined />}
      />
    </Popover>
  );
}
