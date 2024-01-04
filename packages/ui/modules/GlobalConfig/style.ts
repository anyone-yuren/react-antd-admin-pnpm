import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'custom-card': {
    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    // padding: token.padding * 2,
    '.ant-card-body': {
      padding: token.paddingMD,
    },
  },
}));
export default useStyles;
