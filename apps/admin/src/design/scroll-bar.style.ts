import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
    '&::-webkit-scrollbar-track-piece': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderLeft: '1px solid rgba(0, 0, 0, 0)',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
      WebkitBorderRadius: '3px',
      MozBorderRadius: '3px',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backgroundClip: 'padding-box',
      WebkitBorderRadius: '3px',
      MozBorderRadius: '3px',
      borderRadius: '3px',
      minHeight: '28px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      WebkitBorderRadius: '3px',
      MozBorderRadius: '3px',
      borderRadius: '3px',
    },
  }));
export default useStyles;
