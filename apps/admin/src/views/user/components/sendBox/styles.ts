import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'send-box': {
    '.send-content': {
      flex: 1,
      borderRadius: token.borderRadiusLG,
    },
  },
}));
export default useStyles;
