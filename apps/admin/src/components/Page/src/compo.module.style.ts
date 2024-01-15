import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
    'page-header': {
      width: '100%',
      minHeight: '48px',
      padding: '16px 24px',
      marginBottom: '12px',
      background: '#fff',
      boxSizing: 'border-box',
      '&-name': {
        marginBottom: '4px',
        fontSize: '16px',
        fontWeight: '600',
        svg: {
          marginRight: '6px',
        },
      },
    },
    'page-content': {
      minHeight: '420px',
    },
  }));
export default useStyles;
