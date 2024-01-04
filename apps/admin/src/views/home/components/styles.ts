import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  flex: {
    display: 'flex',
    '.flex-title': {
      color: token.colorPrimary,
    },
    '.card-left': {
      flex: 1,
      '.card-count': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    '.card-right': {
      width: '40%',
    },
  },
}));

export default useStyles;
