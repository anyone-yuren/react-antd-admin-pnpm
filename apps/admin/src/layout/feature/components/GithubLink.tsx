import { Tooltip } from 'antd';

import SvgIcon from '@/components/SvgIcon';

import { openWindow } from '@/utils';

export default function GithubLink() {
  function openGithub() {
    openWindow('https://github.com/anyone-yuren/gbeata-react-admin');
  }

  return (
    <Tooltip
      title='github'
      placement='bottom'
      mouseEnterDelay={0.5}
    >
      <span
        className='icon-btn'
        onClick={openGithub}
      >
        <SvgIcon
          name='github'
          size={20}
        />
      </span>
    </Tooltip>
  );
}
