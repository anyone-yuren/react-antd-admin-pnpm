import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, List, Tooltip, Typography } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useState } from 'react';

import FullScreen from './FullScreen';
import LayoutSettings from './Layout';
import Presets from './Presets';
import SlideTheme from './SlideTheme';
import useStyles from './styles';

const { Text } = Typography;

export default function Settings() {
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <ErrorBoundary>
      <Tooltip title='设置' placement='bottom' mouseEnterDelay={0.5}>
        <Button shape='circle' onClick={() => setOpen(true)} size='small' icon={<SettingOutlined />} />
      </Tooltip>
      <Drawer
        classNames={{
          content: styles.driwer,
        }}
        title='设置'
        placement='right'
        onClose={onClose}
        open={open}
        extra={<FullScreen />}
        // mask={false}
      >
        <List split={false}>
          <List.Item>
            <List.Item.Meta title={<Text type='secondary'>主题</Text>} description={<SlideTheme />} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title={<Text type='secondary'>布局</Text>} description={<LayoutSettings />} />
          </List.Item>
          <List.Item>
            <List.Item.Meta title={<Text type='secondary'>预设</Text>} description={<Presets />} />
          </List.Item>
        </List>
      </Drawer>
    </ErrorBoundary>
  );
}
