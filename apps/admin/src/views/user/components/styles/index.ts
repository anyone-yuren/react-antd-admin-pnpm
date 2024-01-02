import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'custom-image': {
    borderRadius: token.borderRadiusLG,
  },
  'card-action': {
    position: 'absolute',
    right: token.paddingSM,
    top: token.paddingSM,
  },
}));

export default useStyles;
