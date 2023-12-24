import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  console.log(token);

  return {
    'home-container': {
      height: '100vh',
      '.gutter-row': {
        '&:first-child': {
          display: 'flex',
        },
      },
      '.user-info': {
        backgroundColor: token.colorPrimaryBg,
        display: 'flex',
        alignItems: 'center',
      },
      '.slick': {
        height: '100%',
        overflow: 'hidden',
        div: {
          height: '100%',
        },
        '.img-info': {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: 'auto',
          zIndex: 2,
          padding: token.paddingLG,
          overflow: 'hidden',
          div: {
            height: 'auto',
          },
        },
        '.image-box': {
          position: 'relative',
          '&:before': {
            content: "''",
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            zIndex: 1,
            position: 'absolute',
            background: 'linear-gradient(rgba(22, 28, 36, 0) 0%, rgb(22, 28, 36) 75%)',
          },
        },
        '&-dots': {
          position: 'absolute',
          top: '8px',
          left: '8px',
          bottom: 'auto',
          width: 'auto',
          li: {
            margin: 0,
            'button:before': {
              color: token.colorPrimary,
              fontSize: '10px',
              width: 'auto',
              height: 'auto',
            },
          },
        },
      },
    },
  };
});

export default useStyles;
