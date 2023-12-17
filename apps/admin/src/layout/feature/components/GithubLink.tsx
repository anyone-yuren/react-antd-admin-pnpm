import { GithubOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { openWindow } from '@/utils';

export default function GithubLink() {
  function openGithub() {
    openWindow('https://github.com/anyone-yuren/gbeata-react-admin');
  }

  return (
    <Tooltip title='github' placement='bottom' mouseEnterDelay={0.5}>
      <Button shape='circle' onClick={openGithub} size='small' icon={<GithubOutlined />} />
    </Tooltip>
  );
}
