import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'loading-page': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    '.loading-logo': {
      position: 'absolute',
      color: token.colorPrimary,
      left: '50%',
      marginLeft: '-16px',
      animation: 'loading3 2s linear forwards',
    },
    '@keyframes loading3': {
      '50%': {
        transform: 'scale(0.8)',
        opacity: 0.6,
      },
    },
    '.loading-side': {
      width: '80px',
      height: '80px',
      border: `2px solid ${token.colorPrimaryBorder}`,
      animation: 'loading 2s linear forwards',
    },
    '@keyframes loading': {
      '25%': {
        transform: 'rotate(120deg)',
      },
      '50%': {
        opacity: 0.5,
        borderRadius: '50%',
        transform: 'scale(0.85) rotate(360deg)',
      },
      '100%': {
        transform: 'scale(1.15)',
        opacity: 1,
        borderRadius: '40%',
        borderColor: token.colorPrimaryBorderHover,
      },
    },
    '.loading-in': {
      width: '68px',
      height: '68px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-38px',
      border: `4px solid ${token.colorPrimaryBorderHover}`,
      animation: 'loading1 2s linear forwards',
    },
    '@keyframes loading1': {
      '0%': {
        transform: 'rotate(45deg)',
      },
      '25%': {
        transform: 'rotate(180deg) ',
      },
      '50%': {
        opacity: 0.5,
        borderRadius: '50%',
        transform: 'rotate(380deg) scale(1.4)',
      },
      '100%': {
        transform: 'scale(0.98)',
        opacity: 1,
        borderRadius: '40%',
        borderColor: token.colorPrimaryBorder,
      },
    },
  },
}));

export default useStyles;
