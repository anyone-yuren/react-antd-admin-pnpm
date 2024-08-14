import { NotificationOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Badge, Button, Popover } from 'antd';
import { useTheme } from 'antd-style';
import { t } from 'i18next';
import React from 'react';

import { GetNotificationList } from '@/api/summary';

export default function OnlineNotification() {
  const token = useTheme();
  const { run, data } = useRequest(GetNotificationList, { manual: true });
  React.useEffect(() => {
    run();
  }, []);

  const notificationList = React.useMemo(() => {
    return data?.resultData ?? [];
  }, [data]);

  React.useEffect(() => {
    console.log('[OnlineNotification]: token=> ', token);
  }, [token]);

  const RenderNotification = () => {
    return (
      <div>
        {notificationList?.map((item: any) => {
          return (
            <div>
              <a href={item.url} className='underline-offset-1 underline' style={{ color: token.colorPrimaryText }}>
                {item.message}
              </a>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Popover title={t('消息通知')} trigger={'click'} content={<RenderNotification></RenderNotification>}>
      <Badge count={notificationList?.length}>
        <Button
          shape='circle'
          size='small'
          onClick={() => {
            //
          }}
          icon={<NotificationOutlined />}
        />
      </Badge>
    </Popover>
  );
}
