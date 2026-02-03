import { ThreeApplication } from '@gbeata/three';
import { createStyles } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import { Material, type Mesh } from 'three';

import { Robot } from './Robot';
import RobotConfigPanel from './RobotConfigPanel';

const useStyles = createStyles(({ token }) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: token.borderRadius,
  },
  toolbar: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    display: 'flex',
    gap: '8px',
    backgroundColor: token.colorBgContainer,
    padding: '8px',
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadow,
  },
  button: {
    padding: '4px 12px',
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgContainer,
    cursor: 'pointer',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: token.colorPrimaryBg,
      borderColor: token.colorPrimary,
    },
  },
  info: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    zIndex: 1000,
    backgroundColor: token.colorBgContainer,
    padding: '8px 12px',
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadow,
    fontSize: '12px',
  },
}));

interface RobotViewerProps {
  modelUrl?: string;
  autoRotate?: boolean;
  backgroundColor?: number;
}

const RobotViewer: React.FC<RobotViewerProps> = ({ modelUrl = '/models/r15-15.fbx' }) => {
  const { styles } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ThreeApplication | null>(null);
  const robotRef = useRef<Robot | null>(null);
  const [configPanelState, setConfigPanelState] = useState({
    name: '',
    scale: 1,
    opacity: 1,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new ThreeApplication();
    const robot = new Robot(app);
    appRef.current = app;
    robotRef.current = robot;

    app.resourceLoader.load([
      {
        name: 'robot',
        source: modelUrl,
      },
    ]);

    app.init(containerRef.current);

    const handlePartSelect = (part: Mesh | null) => {
      if (part) {
        const partName = part.name || '未命名零部件';
        const currentScale = part.scale.x;
        const materials = Array.isArray(part.material) ? part.material : [part.material];
        const currentOpacity = materials.some((mat: Material) => mat.transparent) 
          ? materials.find((mat: Material) => mat.transparent)?.opacity || 1 
          : 1;
        setConfigPanelState({
          name: partName,
          scale: currentScale,
          opacity: currentOpacity,
        });
      } else {
        setConfigPanelState({
          name: '',
          scale: 1,
          opacity: 1,
        });
      }
    };

    robot.on('partSelect', handlePartSelect);

    return () => {
      robot.off('partSelect', handlePartSelect);
      app.destroy();
      appRef.current = null;
      robotRef.current = null;
    };
  }, [modelUrl]);

  const handleScaleChange = (value: number) => {
    setConfigPanelState((prev) => ({ ...prev, scale: value }));
    robotRef.current?.setPartScale(value);
  };

  const handleOpacityChange = (value: number) => {
    setConfigPanelState((prev) => ({ ...prev, opacity: value }));
    robotRef.current?.setPartOpacity(value);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <RobotConfigPanel
        selectedPartName={configPanelState.name}
        scale={configPanelState.scale}
        opacity={configPanelState.opacity}
        onScaleChange={handleScaleChange}
        onOpacityChange={handleOpacityChange}
      />
      <div className={styles.info}>机器人模型查看器</div>
    </div>
  );
};

export default RobotViewer;
