import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export default function FullScreen() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <Tooltip title={isFullscreen ? t('退出全屏') : t('进入全屏')} placement='bottom' mouseEnterDelay={0.5}>
      <Button
        shape='circle'
        onClick={toggleFullscreen}
        size='small'
        icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
    </Tooltip>
  );
}
