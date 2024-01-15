import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
    'ant-menu-dark': {
      background: token['primary-dark-bg'],
      '.ant-menu-sub': { background: token['submenu-dark-bg'] },
    },
    '.ant-menu-inline': {
      'svg +span': { marginInlineStart: '4px' },
    },
    '.ant-layout-header': {
      padding: '0',
    },
    'sub-title': {
      fontSize: '12px',
      color: 'rgba(0, 0, 0, .4)',
    },
    '.ant-layout-sider': {
      '&-dark': { background: token['primary-dark-bg'] },
    },
  }));

export default useStyles;
