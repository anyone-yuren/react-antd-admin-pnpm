import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
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
  };
});
export default useStyles;
