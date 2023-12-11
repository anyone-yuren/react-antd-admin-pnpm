import { createStyles } from 'antd-style';

export default createStyles(({ token, css }) => {
  const gSearch = css`
    padding: ${token.padding}px;
    padding-bottom: 0;
    margin-bottom: ${token.margin}px;
  `;
  const inline = css`
    padding-bottom: ${token.padding}px;
    .ant-form-item {
      margin-bottom: ${token.marginSM}px;
    }
  `;
  const gForm = css`
    padding-right: 0;
  `;
  const antCardBody = css`
    padding: 0;
  }`;
  return {
    gSearch,
    gForm,
    inline,
    antCardBody,
  };
});
