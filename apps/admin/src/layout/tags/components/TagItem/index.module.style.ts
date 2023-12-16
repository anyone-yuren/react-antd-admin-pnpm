import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    'compo_tag-item': {
      display: 'inline-block',
      verticalAlign: 'top',
      height: '24px',
      margin: '0 2px',
      padding: '0 8px',
      borderRadius: '3px',
      lineHeight: '24px',
      color: '#fff',
      background: '#fff',
      overflow: 'hidden',
      cursor: 'pointer',
      '&__dot': {
        display: 'inline-block',
        verticalAlign: 'baseline',
        width: '8px',
        height: '8px',
        marginRight: '6px',
        borderRadius: '50%',
        background: '#dcdee0',
      },
      '&__name': { fontSize: '12px' },
    },
    verticalAlign: 'baseline',
    svg: {
      width: '8px',
      height: '8px',
    },
    active: {
      border: 'none',
      color: '#fff',
      background: '#1890ff',
      '& .compo_tag-item__dot': { background: '#fff' },
    },
  };
});
export default useStyles;
