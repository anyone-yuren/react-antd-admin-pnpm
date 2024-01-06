import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  layout_wrapper: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflowX: 'hidden',
    background: token.colorBgContainer,
    '.ant-layout-content': {
      height: 'calc(100vh - 48px)',
      boxSizing: 'border-box',
      flex: '1',
      padding: token.paddingMD,
      overflowX: 'hidden',
    },
    '.ant-layout-sider': {
      height: 'calc(100vh)',
      borderInlineEnd: '1px solid rgba(5, 5, 5, 0.06)',
      marginInlineEnd: '-1px',
    },
    '.ant-layout': {
      background: token.colorBgContainer,
    },
  },
}));

export default useStyles;
