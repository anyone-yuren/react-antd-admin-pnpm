import { Layout } from 'antd';
import classNames from 'classnames';

import LayoutFeature from '../feature';
import LayoutTags from '../tags';
import { Breadcrumb, FoldTrigger } from './components';
import useStyles from './style';

const LayoutHeader = (props: any) => {
  const { Header } = Layout;
  const { styles } = useStyles();
  return (
    // <Header classNames={classNames(styles['layout-header'], 'flex-between-h')}>
    <Header className={classNames('flex-between-h', styles['layout-header'])}>
      <div className='flex-between-h' style={{ padding: '0 12px' }}>
        <div className='flex-center-v'>
          <FoldTrigger />
          <Breadcrumb />
        </div>
        <LayoutFeature />
      </div>
      <LayoutTags />
    </Header>
  );
};

export default LayoutHeader;
