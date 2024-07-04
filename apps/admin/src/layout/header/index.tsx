import { Layout } from 'antd';
import classNames from 'classnames';
import { useGlobalStore } from '@gbeata/store';

import LayoutFeature from '../feature';
import MultiTabs from '../multi-tab';
import LayoutTags from '../tags';
import { Breadcrumb, FoldTrigger } from './components';
import useStyles from './style';

const LayoutHeader = (props: any) => {
  const { Header } = Layout;
  const { styles } = useStyles();
  const { hasCrumbs, hasTabs } = useGlobalStore();
  return (
    // <Header classNames={classNames(styles['layout-header'], 'flex-between-h')}>
    <Header className={classNames('flex-between-h', styles['layout-header'])}>
      <div className='flex-between-h' style={{ padding: '0 12px' }}>
        <div className='flex-center-v'>
          <FoldTrigger />
          {hasCrumbs && <Breadcrumb />}
        </div>
        <LayoutFeature />
      </div>
      {hasTabs ? <LayoutTags /> : null}
      {/* {hasTabs ? <MultiTabs offsetTop={true} /> : null} */}
    </Header>
  );
};

export default LayoutHeader;
