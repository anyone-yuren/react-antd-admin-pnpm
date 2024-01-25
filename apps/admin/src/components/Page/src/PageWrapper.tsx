import { Button } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import SvgIcon from '@/components/SvgIcon';

import { openWindow } from '@/utils';

import compoStyle from './compo.module.less';

interface PluginProp {
  name?: string;
  desc?: string;
  url?: string;
}

interface PageProp {
  plugin: PluginProp;
  children: JSX.Element;
}

const PageWrapper = (props: PageProp) => {
  function openGithub() {
    openWindow(props.plugin?.url!);
  }

  return (
    <div className={compoStyle['compo_page-wrapper']}>
      <div className={compoStyle['page-header']}>
        <div className={compoStyle['page-header-name']}>
          <SvgIcon name='hints' size={18} />
          <span>{props.plugin?.name}</span>
        </div>
        <p>{props.plugin?.desc}</p>
        <p>
          <span>{t('github源码:')}</span>
          <Button type='link' size='small' onClick={openGithub}>
            {t('立即访问')}
          </Button>
        </p>
      </div>
      <div className={compoStyle['page-content']}>{props.children}</div>
    </div>
  );
};

export default PageWrapper;
