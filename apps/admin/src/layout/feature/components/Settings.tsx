import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export default function Settings() {
  return (
    <Tooltip title='设置' placement='bottom' mouseEnterDelay={0.5}>
      <Button shape='circle' size='small' icon={<SettingOutlined />} />
    </Tooltip>
  );
}
