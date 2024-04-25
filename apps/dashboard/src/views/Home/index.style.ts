import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  console.log(token);

  return {
    home: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: 300,
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      color: token.colorText,
    },
  };
});

export default useStyles;
