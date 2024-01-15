import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
    '*': {
      padding: '0',
      margin: '0',
    },
    'ul,li': {
      listStyle: 'none',
    },
    p: {
      margin: '0',
    },
    'a,a:focus,a:hover': {
      cursor: 'pointer',
      color: 'inherit',
      outline: 'none',
      textDecoration: 'none',
    },
    html: {
      height: '100%',
      lineHeight: '1.15',
      WebkitTextSizeAdjust: '100%',
      boxSizing: 'border-box',
    },
    'color-weak': {
      filter: 'invert(80%)',
    },
    'gray-mode': {
      filter: 'progid:dximagetransform.microsoft.basicimage(grayscale=1)',
    },
    body: {
      height: '100%',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      fontFamily:
        'Microsoft YaHei,Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Arial, sans-serif',
      fontSize: '14px',
      color: '#222',
    },
    img: {
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      borderStyle: 'none',
    },
    pre: {
      fontFamily: 'Consolas,Menlo,Courier,monospace',
    },
    fr: {
      float: 'right',
    },
    fl: {
      float: 'left',
    },
    'clear-fix': {
      '&:before, &:after': { content: "''", display: 'table', clear: 'both' },
    },
    'flex-center-v': {
      display: 'flex',
      alignItems: 'center',
    },
    'flex-center-h': {
      display: 'flex',
      justifyContent: 'center',
    },
    'flex-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    'flex-between-h': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));
export default useStyles;
