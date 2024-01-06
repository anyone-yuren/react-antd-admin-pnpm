import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'user-card': {
    width: '100%',
    '.ant-skeleton, .ant-skeleton-image': {
      width: '100% !important',
    },
    '.ant-card-cover': {
      maxHeight: '200px',
      overflow: 'hidden',
    },
    '.cover': {
      position: 'relative',
      filter: 'blur(0)',
      '&:before': {
        content: '""',
        top: 0,
        left: 0,
        width: '100%',
        height: ' 100%',
        zIndex: 1,
        position: 'absolute',
        background: 'rgba(22, 28, 36, 0.48)',
        borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
      },
    },
    '.user_info': {
      position: 'relative',
      '.info': {
        paddingTop: token.margin * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.avatar-svg': {
        color: token.colorBgContainer,
        width: '144px !important',
        height: '62px !important',
        top: '-56px',
        position: 'absolute',
        transform: 'translateX(-50%)',
        left: '50%',
      },
      '.avatar': {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'absolute',
        top: '-50px',
        transform: 'translateX(-50%)',
        left: '50%',
      },
    },
  },
}));

export default useStyles;
