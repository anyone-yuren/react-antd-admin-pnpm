import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  console.log(token);

  return {
    'layout-header': {
      flexDirection: 'column',
      height: 'auto',
      background: token.colorBgBase,
    },
  };
});

export default useStyles;
