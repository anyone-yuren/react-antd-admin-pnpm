import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    li: {
      height: '40px',
      lineHeight: '40px',
      padding: '0 15px',
      cursor: 'pointer',
      position: 'relative',
      fontSize: '18px',
      color: '#909399',
      backgroundColor: '#fff',
      listStyle: 'none',
      '&::after': {
        content: "''",
        width: '0',
        height: '2px',
        backgroundColor: '#00adb5',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        transition: 'width .4s',
      },
      '&.active': {
        '&::after': {
          width: '100%',
        },
      },

    },

  },
}));
export default useStyles;
