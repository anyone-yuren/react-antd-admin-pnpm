import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  console.log(token);

  return {
    'home-container': {
      height: '100vh',
      '.user-info': {
        backgroundColor: token.colorPrimaryBg,
      },
    },
  };
});

export default useStyles;
