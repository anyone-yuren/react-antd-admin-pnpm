import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css, prefixCls }) => {
  console.log(token);

  return {
    override: css`
      &.${prefixCls}-drawer {
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.9);
        background-size: 50% 50%;
        background-repeat: no-repeat;
      }
    `,
  };
});

export default useStyles;
