import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  layout_tags: {
    zIndex: '299',
    display: 'flex',
    justifyContent: 'space-between',
    height: '32px',
    padding: '4px 12px',
    lineHeight: '32px',
    '&__main': {
      position: 'relative',
      width: 'calc(100% - 116px)',
      height: '24px',
      overflow: 'hidden',
      '&-body': {
        position: 'absolute',
        height: '100%',
        padding: '0 2px',
        overflow: 'visible',
        whiteSpace: 'nowrap',
        transition: 'left .5s ease',
      },
    },
    '&__btn-space': { marginLeft: '4px' },
  },
}));
export default useStyles;
