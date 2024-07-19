import { createStyles } from 'antd-style';

import blockBg from '@/assets/images/block.png';
import centerBg from '@/assets/images/center.png';
import contentBg from '@/assets/images/content.png';
import headerBg from '@/assets/images/header.png';
import polygon01 from '@/assets/images/polygon01.png';

const useStyles = createStyles(({ token }) => {
  return {
    home: {
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
    'home-header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px',
      background: `url(${headerBg})`,
      backgroundSize: 'auto 180%',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#0D142B',
      padding: '0 24px',
      '&__left': {
        display: 'flex',
        alignItems: 'center',
      },
      '.home-header__title': {
        fontSize: '44px',
        color: '#fff',
        fontFamily: 'serif',
      },
    },
    'home-content': {
      position: 'relative',
      backgroundColor: '#0D142B',
      display: 'flex',
      '.home-content_bg': {
        background: `url(${contentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
      '.gutter-box': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden',
      },
      '.center': {
        marginTop: '20px',
        padding: '20px',
        backgroundImage: `url(${centerBg})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        flex: 1,
        '.tip-box': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '24px',
        },
        '.tip': {
          fontSize: '24px',
          color: '#fff',
          textAlign: 'center',
          margin: 0,
        },
        '.total-box': {
          padding: '8px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${blockBg})`,
          backgroundSize: '100%',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
          boxSizing: 'border-box',
          paddingTop: '48px',
          '.total': {
            fontSize: '32px',
            color: '#66FFFF',
          },
          '.total-dec': {
            fontSize: '24px',
            color: '#fff',
          },
        },
        '.box': {
          backgroundColor: '#00071B',
          border: '1px solid #0066FF',
          boxShadow: 'inset 0px 0px 40px 0px #1B7EF2',
          padding: '8px 0',
          gap: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '.count': {
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
          },
          '.dec': {
            fontSize: '16px',
            color: '#fff',
          },
        },
      },
      '.buttom': {
        minHeight: '200px',
        display: 'flex',
        flex: 'auto',
      },
      '.card': {
        flex: 'auto',
        // minHeight: '50%',
        '.card-title': {
          height: '50px',
          backgroundColor: '#1b7ef22e',
          fontSize: '24px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'relative',
          '&::before': {
            content: '""',
            width: '4px',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#1B7EF2',
          },
          '&::after': {
            content: '""',
            width: '8px',
            height: '16px',
            position: 'absolute',
            top: '50%',
            marginTop: '-5px',
            left: '10px',
            background: `url(${polygon01})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
          },
        },
      },
    },
  };
});

export default useStyles;
