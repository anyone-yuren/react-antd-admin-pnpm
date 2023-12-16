import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    'login-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundImage: "`url('@/assets/images/login-background.jpg')`",
      backgroundSize: 'cover',
    },
    'login-box': {
      padding: '16px 30px 10px',
      background: '#fff',
      borderRadius: '4px',
      boxShadow: '0 15px 30px 0 rgba(0, 0, 1, .1)',
      '&-title': {
        margin: '0 auto 35px',
        textAlign: 'center',
        color: '#707070',
        fontSize: '18px',
        letterSpacing: '2px',
        img: {
          width: '200px',
          height: '82px',
          margin: '12px auto 0',
        },
      },
      '&-form': { width: '320px' },
    },
    'login-btn': {
      width: '100%',
    },
    'no-margin': {
      marginBottom: '0',
    },
  };
});
export default useStyles;
