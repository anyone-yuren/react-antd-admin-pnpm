import { createGlobalStyle } from 'antd-style';
// 定义全局类名样式
const CustomGlobal = createGlobalStyle`
  .g-paper {
    border-radius: ${(p) => p.theme.borderRadius * 2}px;
  }
`;

export default CustomGlobal;
