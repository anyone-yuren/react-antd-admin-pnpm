import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    // padding: `${token.paddingSM}px !important`,
    '.ant-tabs-content-holder': {
      overflow: 'auto',
    },
  },
}));
export default useStyle;
