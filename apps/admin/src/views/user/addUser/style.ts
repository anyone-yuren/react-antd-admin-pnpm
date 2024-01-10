import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  'custom-upload-drag': {
    '.ant-upload-drag': {
      background: '#fff',
      border: 'none',
      '&:hover': {
        '.add-phone-box': {
          border: `1px dashed ${token.colorPrimary}`,
          '.add-phone': {
            background: token.colorBgTextActive,
          },
        },
      },
      '.add-phone-box': {
        width: '144px',
        height: '144px',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        margin: '0 auto',
        padding: token.paddingSM,
        border: `1px dashed ${token.colorBorderSecondary}`,
        transition: 'border-color .3s ease',
        '&:hover': {
          border: `1px dashed ${token.colorPrimary}`,
        },
        '.add-phone': {
          width: '100%',
          height: '100%',
          background: token.colorBgContainerDisabled,
          borderRadius: '50%',
          color: token.colorTextDisabled,
          transition: 'all .3s ease',
          '&:hover': {
            background: token.colorBgTextActive,
          },
        },
      },
    },
  },
  'add-user-form': {
    '.ant-input': {
      borderRadius: token.borderRadiusLG,
    },
  },
  'btn-submit': {
    width: '100%',
  },
}));

export default useStyles;
