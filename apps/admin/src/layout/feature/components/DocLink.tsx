import { ReadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { openWindow } from '@/utils';

export default function DocLink() {
  return (
    <Tooltip title='文档' placement='bottom' mouseEnterDelay={0.5}>
      <Button
        shape='circle'
        size='small'
        onClick={() => openWindow('https://anyone-yuren.github.io/gbeata-admin-docs')}
        icon={<ReadOutlined />}
      />
    </Tooltip>
  );
}
