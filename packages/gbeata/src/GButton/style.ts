import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
  const gButton = css``;
  return {
    gButton,
    simple: css`
      ${gButton},
      width: '100%',
    `,
    sub: css`
      ${gButton},
      padding: 0;
      height: unset;
      line-height: 1em;
      border: unset;
      box-shadow: unset;
      background-color: unset;
      color: #00000073;

      &:hover,
      &:focus {
        color: #000000d9;
        background-color: unset;
      }
    `,
  };
});
