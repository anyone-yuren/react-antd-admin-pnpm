import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'loading-page': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    position: 'relative',
    '.loading-logo': {
      position: 'absolute',
      color: token.colorPrimary,
      left: '50%',
      marginLeft: '-16px',
      animation: 'loading3 3s linear forwards',
      transformOrigin: 'center center',
    },
    '@keyframes loading3': {
      '50%': {
        transform: 'perspective(100px) rotateY(360deg) scale(0.8)',
        opacity: 0.6,
      },
    },
    '.loading-side': {
      width: '80px',
      height: '80px',
      border: `2px solid ${token.colorPrimaryBorder}`,
      animation: 'loading 3s linear forwards',
    },
    '@keyframes loading': {
      '25%': {
        transform: 'rotate(180deg)',
      },
      '50%': {
        opacity: 0.5,
        borderRadius: '50%',
        transform: 'scale(0.85)',
      },
      '100%': {
        transform: 'scale(1.15)',
        opacity: 1,
        borderRadius: '30%',
        borderColor: token.colorPrimaryBorderHover,
      },
    },
    '.loading-in': {
      width: '68px',
      height: '68px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-34px',
      border: `4px solid ${token.colorPrimaryBorderHover}`,
      animation: 'loading1 3s linear forwards',
    },
    '@keyframes loading1': {
      '0%': {
        transform: 'rotate(45deg)',
      },
      '25%': {
        transform: 'rotate(270deg) ',
      },
      '50%': {
        opacity: 0.5,
        borderRadius: '50%',
        transform: 'scale(1.4)',
      },
      '100%': {
        transform: 'scale(0.98)',
        opacity: 1,
        borderRadius: '30%',
        borderColor: token.colorPrimaryBorder,
      },
    },
  },
}));

export default useStyles;
