import { App as AntApp, ConfigProvider } from 'antd';

import SvgIcon from '../SvgIcon';
import useStyles from './style';

import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { FC } from 'react';

type WaveConfig = NonNullable<Parameters<typeof ConfigProvider>[0]['wave']>;
const createDot = (holder: HTMLElement, color: string, left: number, top: number, size: number = 0) => {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate(-50%, -50%)';
  dot.style.transition = 'all 1s ease-out';
  holder.appendChild(dot);

  return dot;
};
const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.appendChild(div);

  return div;
};
const showInsetEffect: WaveConfig['showEffect'] = (node, { event, component }) => {
  //   if (component !== 'Button') {
  //     return;
  //   }

  const holder = createHolder(node);

  const rect = holder.getBoundingClientRect();

  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

  // Motion
  requestAnimationFrame(() => {
    dot.ontransitionend = () => {
      holder.remove();
    };

    dot.style.width = '400px';
    dot.style.height = '400px';
    dot.style.opacity = '0';
  });
};
export interface GlobalConfigProps extends ConfigProviderProps {}
const GlobalConfig: FC<GlobalConfigProps> = ({ children, ...rest }) => {
  const { styles } = useStyles();
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <SvgIcon name='ic_content' size={120} />
      <p>Data Not Found</p>
    </div>
  );
  return (
    <ConfigProvider
      wave={{ showEffect: showInsetEffect }}
      card={{ className: styles['custom-card'] }}
      renderEmpty={customizeRenderEmpty}
      {...rest}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
};
export default GlobalConfig;
