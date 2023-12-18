import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  console.log(token);

  return {
    'layout-header': {
      flexDirection: 'column',
      height: 'auto',
      background: token.colorBgBase,
      padding: 0,
      boxShadow: token.boxShadowTertiary,
    },
  };
});

export default useStyles;
