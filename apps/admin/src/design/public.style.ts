import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  'span.icon-btn': {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  '.ant-upload-drag': {
    height: 'auto',
  },
  'list-upload': {
    '.ant-upload': { width: '100%' },
    '.ant-btn': { display: 'block', margin: '0 auto 8px' },
  },
}));
export default useStyles;
