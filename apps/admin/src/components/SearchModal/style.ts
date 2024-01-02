import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    // padding: `${token.paddingSM}px !important`,
    '.ant-list-item': {
      padding: `${token.paddingSM}px !important`,
      boxSizing: 'border-box',
      borderStyle: 'dashed',
      borderWidth: '1px',
      borderColor: `transparent transparent ${token.colorBorder}`,
      '&:hover': {
        border: `1px dashed ${token.colorPrimary}`,
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorPrimaryBg,
      },
    },
  },
  'my-modal-mask': {
    boxShadow: 'inset 0 0 15px #fff',
    backdropFilter: 'blur(4px) !important',
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
    borderTop: `1px dotted ${token.colorPrimary} !important`,
  },
  'my-modal-content': {
    border: '1px solid #333',
  },
}));
export default useStyle;
