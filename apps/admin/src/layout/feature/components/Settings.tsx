import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, List, Switch, Tooltip, Typography } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useState } from 'react';
import { useGlobalStore } from 'store';

import FullScreen from './FullScreen';
import LayoutSettings from './Layout';
import Presets from './Presets';
import SlideTheme from './SlideTheme';
import useStyles from './styles';

const { Text } = Typography;

export default function Settings() {
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);
  const { hasTabs, setHasTabs, hasCrumbs, setHasCrumbs } = useGlobalStore();
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
          <List.Item>
            <List.Item.Meta
              title={<Text type='secondary'>内容区域</Text>}
              description={
                <List>
                  <List.Item
                    actions={[
                      <Switch
                        checked={hasTabs}
                        onChange={(v) => {
                          setHasTabs(v);
                        }}
                      />,
                    ]}
                  >
                    页签
                  </List.Item>
                  <List.Item
                    actions={[
                      <Switch
                        checked={hasCrumbs}
                        onChange={(v) => {
                          setHasCrumbs(v);
                        }}
                      />,
                    ]}
                  >
                    面包屑导航
                  </List.Item>
                  <List.Item actions={[<Switch defaultChecked onChange={() => {}} />]}>系统名称</List.Item>
                </List>
              }
            />
          </List.Item>
        </List>
      </Drawer>
    </ErrorBoundary>
  );
}
