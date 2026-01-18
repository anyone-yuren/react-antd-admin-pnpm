import { Slider } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(({ token }) => ({
  panel: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1000,
    backgroundColor: token.colorBgContainer,
    padding: '16px',
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadow,
    width: '280px',
    maxHeight: 'calc(100% - 20px)',
    overflowY: 'auto',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '12px',
    color: token.colorText,
  },
  emptyState: {
    fontSize: '12px',
    color: token.colorTextSecondary,
    textAlign: 'center',
    padding: '20px 0',
  },
  controlGroup: {
    marginBottom: '16px',
  },
  label: {
    fontSize: '12px',
    color: token.colorTextSecondary,
    marginBottom: '8px',
    display: 'block',
  },
  slider: {
    width: '100%',
  },
  valueDisplay: {
    fontSize: '12px',
    color: token.colorText,
    textAlign: 'right',
    marginTop: '4px',
  },
}));

interface RobotConfigPanelProps {
  selectedPartName?: string;
  scale: number;
  opacity: number;
  onScaleChange: (value: number) => void;
  onOpacityChange: (value: number) => void;
}

const RobotConfigPanel: React.FC<RobotConfigPanelProps> = ({
  selectedPartName,
  scale,
  opacity,
  onScaleChange,
  onOpacityChange,
}) => {
  const { styles } = useStyles();

  return (
    <div className={styles.panel}>
      <div className={styles.title}>零部件参数配置</div>
      {!selectedPartName ? (
        <div className={styles.emptyState}>请点击选择机器人零部件</div>
      ) : (
        <>
          <div className={styles.controlGroup}>
            <span className={styles.label}>选中零部件: {selectedPartName}</span>
          </div>
          <div className={styles.controlGroup}>
            <span className={styles.label}>大小缩放</span>
            <Slider
              className={styles.slider}
              min={0.1}
              max={3}
              step={0.1}
              value={scale}
              onChange={onScaleChange}
            />
            <div className={styles.valueDisplay}>{scale.toFixed(1)}x</div>
          </div>
          <div className={styles.controlGroup}>
            <span className={styles.label}>透明度</span>
            <Slider
              className={styles.slider}
              min={0}
              max={1}
              step={0.05}
              value={opacity}
              onChange={onOpacityChange}
            />
            <div className={styles.valueDisplay}>{Math.round(opacity * 100)}%</div>
          </div>
        </>
      )}
    </div>
  );
};

export default RobotConfigPanel;
