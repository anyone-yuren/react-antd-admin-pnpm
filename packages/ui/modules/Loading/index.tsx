import React from 'react';

import './index.module.style.css';

export type LoadingProps = {
  /** 加载状态 */
  loading?: boolean;
  /** 加载提示文字 */
  tip?: string;
  /** 加载动画大小 */
  size?: 'small' | 'default' | 'large';
  /** 加载动画颜色 */
  color?: string;
  /** 是否全屏遮罩 */
  fullscreen?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素内容 */
  children?: React.ReactNode;
};

export default function Loading(props: LoadingProps) {
  const {
    loading = true,
    tip = '加载中...',
    size = 'default',
    color = '#1890ff',
    fullscreen = false,
    className = '',
    style = {},
    children,
  } = props;

  if (!loading) {
    return <>{children}</>;
  }

  const sizeClass = `loading-${size}`;
  const containerClass = fullscreen ? 'loading-container fullscreen' : 'loading-container';

  return (
    <div className={`${containerClass} ${className}`} style={style}>
      <div className="loading-wrapper">
        <div className={`loading-spinner ${sizeClass}`}>
          <div className="loading-dot" style={{ backgroundColor: color }}></div>
          <div className="loading-dot" style={{ backgroundColor: color }}></div>
          <div className="loading-dot" style={{ backgroundColor: color }}></div>
        </div>
        {tip && <div className="loading-tip">{tip}</div>}
      </div>
    </div>
  );
}
