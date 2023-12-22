import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }, props: { active: boolean }) => {
  const { active } = props;
  return {
    'compo_tag-item': {
      display: 'inline-block',
      verticalAlign: 'top',
      height: '24px',
      margin: '0 2px',
      padding: '0 8px',
      borderRadius: '3px',
      lineHeight: '24px',
      color: active ? '#fff' : '#555',
      background: active ? token.colorPrimary : '#fff',
      overflow: 'hidden',
      cursor: 'pointer',
      '&__dot': {
        display: 'inline-block',
        verticalAlign: 'baseline',
        width: '8px',
        height: '8px',
        marginRight: '6px',
        borderRadius: '50%',
        background: active ? '#fff' : '#dcdee0',
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
      background: token.colorPrimary,
      '.anticon-close': {
        color: '#fff',
      },
    },
  };
});
export default useStyles;
