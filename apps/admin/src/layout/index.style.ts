import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  layout_wrapper: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflowX: 'hidden',
    '.ant-layout-content': {
      height: 'calc(100vh - 48px)',
      boxSizing: 'border-box',
      flex: '1',
      padding: '12px',
      overflowX: 'hidden',
    },
  },
}));
export default useStyles;
