import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'message-list': {
    '.message_content': {
      flex: 1,
      padding: token.paddingSM,
      backgroundColor: token.colorBgLayout,
      borderRadius: token.borderRadiusLG,
    },
  },
}));
export default useStyles;
