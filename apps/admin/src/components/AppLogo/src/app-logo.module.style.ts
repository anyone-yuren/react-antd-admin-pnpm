import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  'app-logo': {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    paddingLeft: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  'logo-img': {
    display: 'block',
    width: '32px',
    height: '32px',
  },
  'logo-name': {
    display: 'block',
    width: '120px',
    height: '15px',
  },
  hidden: {
    display: 'none',
  },
  container: {
    textAlign: 'center',
    // filter: 'contrast(30)',
  },
  text: {
    color: token.colorPrimary,
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '32px',
    animation: 'showup 0.6s linear forwards',
    '@keyframes showup': {
      '0%': {
        filter: 'blur(10px)',
        letterSpacing: '-1px',
      },
      '100%': {
        filter: 'blur(0px)',
        letterSpacing: '2px',
      },
    },
  },
}));
export default useStyles;
