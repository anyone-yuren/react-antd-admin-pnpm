import { createStyles } from 'antd-style';

import cover_5 from '@/assets/images/cover_5.jpg';

const useStyles = createStyles(({ token }) => ({
  'user-card': {
    width: '100%',
    position: 'relative',
    '.ant-skeleton, .ant-skeleton-image': {
      width: '100% !important',
    },
    '.ant-segmented-item-label': {
      lineHeight: '48px !important',
      minHeight: '48px !important',
      padding: '0 16px !important',
    },
    '.profile': {
      verticalAlign: '-0.35em',
    },
    '.ant-card-body': {
      padding: 0,
      textAlign: 'right',
    },
    '.ant-card-cover': {
      minHeight: '200px',
      position: 'relative',
      background: `url(${cover_5})`,
      filter: 'blur(0)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
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
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      zIndex: 2,
      bottom: '-24px',
      left: '24px',
      gap: '16px',
      '.info': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
      },
      '.avatar': {
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        overflow: 'hidden',
        // top: '-18px',
        // transform: 'translateX(-50%)',
        // left: '50%',
      },
    },
  },
  translatex: {
    margin: `${token.marginSM}px 0`,
  },
  content: {
    position: 'relative',
    // marginBottom: token.margin,
  },
}));

export default useStyles;
