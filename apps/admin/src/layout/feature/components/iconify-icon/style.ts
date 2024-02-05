import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  anticon: {
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    svg: {
      display: 'inline-block',
    },
  },
}));

export default useStyles;
