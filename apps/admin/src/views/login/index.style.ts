import { createStyles } from 'antd-style';

import overlay from '@/assets/images/overlay_2.jpg';

const useStyles = createStyles(({ token }) => ({
  'login-container': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100vh',
  },
  'login-img': {
    maxWidth: '560px',
    height: 'auto',
  },
  'login-form': {
    padding: `${token.paddingLG * 7}px ${token.paddingLG * 5}px`,
    '.title': {
      margin: 0,
    },
    '.login-info': {
      margin: `${token.marginLG}px 0`,
    },
    '.login-btn': {
      backgroundColor: token.colorDefault,
    },
  },
  'login-left': {
    gap: '80px',
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // eslint-disable-next-line global-require
    background: `linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)) center center / cover no-repeat, url(${overlay})`,
    '.logo': {
      width: '100%',
      padding: token.paddingSM,
      position: 'absolute',
      top: 0,
      left: 0,
      svg: {
        color: token.colorPrimary,
      },
    },
  },
}));
export default useStyles;
