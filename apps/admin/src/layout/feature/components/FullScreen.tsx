import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';

export default function FullScreen() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <Tooltip title={isFullscreen ? '退出全屏' : '进入全屏'} placement='bottom' mouseEnterDelay={0.5}>
      <Button
        shape='circle'
        onClick={toggleFullscreen}
        size='small'
        icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
    </Tooltip>
  );
}
