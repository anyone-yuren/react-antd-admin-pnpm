import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
  const gList = css`
    .ant-card-body {
      padding: 0;
    }

    .ant-list {
      padding: 0 24px 24px;
    }
  `;
  return {
    gList,
    gListHeader: css`
      margin: ${token.marginSM}px ${token.margin}px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    gListTitle: css`
      line-height: 1;
      margin: 0;
      font-size: 20px;
      display: inline-block;
    `,
    flex: css`
      display: flex;
    `,
  };
});
