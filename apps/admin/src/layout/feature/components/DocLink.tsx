import { ReadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export default function DocLink() {
  return (
    <Tooltip title='文档' placement='bottom' mouseEnterDelay={0.5}>
      <Button shape='circle' size='small' icon={<ReadOutlined />} />
    </Tooltip>
  );
}
