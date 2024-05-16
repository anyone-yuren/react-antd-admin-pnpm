import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  tab_bar: {
    width: '100%',
    zIndex: '20',
    position: 'absolute',
    top: '64px',
    left: 0,
    height: '32px',
    backgroundColor: token.colorBgElevated,
    borderBottom: `1px solid ${token.colorBorder}`,
    transition: 'top 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}));
export default useStyles;
