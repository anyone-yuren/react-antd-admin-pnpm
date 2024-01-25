import { ReadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { openWindow } from '@/utils';

export default function DocLink() {
  return (
    <Tooltip title={t('文档')} placement='bottom' mouseEnterDelay={0.5}>
      <Button
        shape='circle'
        size='small'
        onClick={() => openWindow('https://anyone-yuren.github.io/gbeata-admin-docs')}
        icon={<ReadOutlined />}
      />
    </Tooltip>
  );
}
