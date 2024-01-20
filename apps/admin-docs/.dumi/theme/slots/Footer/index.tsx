import { Divider } from 'antd';
import { useResponsive } from 'antd-style';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';
import * as React from 'react';

import { useStyles } from './style';
import { githubSel, useSiteStore } from '../../store';
import Foot, { FooterProps } from '../../components/Footer';

const Footer: FC = () => {
  const { styles, theme } = useStyles();
  const { themeConfig, pkg } = useSiteStore((s) => s.siteData);
  console.log(themeConfig);

  return (
    <Foot
      bottom={
        <Center horizontal>
          <Divider type={'vertical'} />
          <span dangerouslySetInnerHTML={{ __html: themeConfig.footer }} />
        </Center>
      }
    />
  );
};

export default Footer;
