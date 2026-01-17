import { ThreeApplication } from '@gbeata/three';
import { createStyles } from 'antd-style';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const useStyles = createStyles(({ token }) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    cursor: 'crosshair',
  },
  selectionBox: {
    position: 'absolute',
    border: '2px dashed #1890ff',
    backgroundColor: 'rgba(24, 144, 255, 0.1)',
    pointerEvents: 'none',
    zIndex: 1000,
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
  selectedInfo: {
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

interface PointCloudViewerProps {
  pointCount?: number;
  color?: string;
  pointSize?: number;
  randomColor?: boolean;
  onSelectionChange?: (selectedIndices: number[]) => void;
}

const PointCloudViewer: React.FC<PointCloudViewerProps> = ({
  pointCount = 100000,
  color = '#00ff00',
  pointSize = 2,
  randomColor = true,
  onSelectionChange,
}) => {
  const { styles } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ThreeApplication | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const originalColorsRef = useRef<Float32Array | null>(null);

  // 框选状态
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [selectedCount, setSelectedCount] = useState(0);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // 检测框选范围内的点
  const selectPointsInBox = useCallback((
    boxStart: { x: number; y: number },
    boxEnd: { x: number; y: number },
    camera: THREE.Camera,
    container: HTMLElement,
    points: THREE.Points,
  ) => {
    const positions = points.geometry.attributes.position.array as Float32Array;
    const indices: number[] = [];

    // 计算框选矩形的边界（相对于容器）
    const rect = container.getBoundingClientRect();
    const minX = Math.min(boxStart.x, boxEnd.x);
    const maxX = Math.max(boxStart.x, boxEnd.x);
    const minY = Math.min(boxStart.y, boxEnd.y);
    const maxY = Math.max(boxStart.y, boxEnd.y);

    // 将每个点的世界坐标转换为屏幕坐标
    for (let i = 0; i < positions.length / 3; i += 1) {
      const point = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      point.project(camera);

      // 转换为相对于容器的坐标
      const screenX = ((point.x + 1) / 2) * rect.width;
      const screenY = (-(point.y - 1) / 2) * rect.height;

      // 检查点是否在框选范围内
      if (screenX >= minX && screenX <= maxX && screenY >= minY && screenY <= maxY) {
        indices.push(i);
      }
    }

    return indices;
  }, []);

  // 高亮选中的点
  const highlightSelectedPoints = useCallback((indices: number[], points: THREE.Points) => {
    const colors = points.geometry.attributes.color.array as Float32Array;

    // 保存原始颜色
    if (!originalColorsRef.current) {
      originalColorsRef.current = new Float32Array(colors);
    }

    // 恢复所有点的原始颜色
    if (originalColorsRef.current) {
      colors.set(originalColorsRef.current);
    }

    // 高亮选中的点（使用红色）
    const highlightColor = new THREE.Color(0xff0000);
    indices.forEach((index) => {
      colors[index * 3] = highlightColor.r;
      colors[index * 3 + 1] = highlightColor.g;
      colors[index * 3 + 2] = highlightColor.b;
    });

    const { geometry } = points;
    geometry.attributes.color.needsUpdate = true;
  }, []);

  // 清除选择
  const clearSelection = useCallback(() => {
    if (pointsRef.current && originalColorsRef.current) {
      const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
      colors.set(originalColorsRef.current);
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
    setSelectedCount(0);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  // 鼠标按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isSelectionMode || e.button !== 0 || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setIsSelecting(true);
    setSelectionStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setSelectionEnd({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isSelectionMode]);

  // 鼠标移动事件
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !appRef.current || !pointsRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setSelectionEnd({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // 实时检测框选范围内的点
    const indices = selectPointsInBox(
      selectionStart,
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
      appRef.current.camera.instance,
      containerRef.current,
      pointsRef.current,
    );

    highlightSelectedPoints(indices, pointsRef.current);
    setSelectedCount(indices.length);
  }, [isSelecting, selectionStart, selectPointsInBox, highlightSelectedPoints]);

  // 鼠标释放事件
  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !appRef.current || !pointsRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setIsSelecting(false);

    // 最终检测框选范围内的点
    const indices = selectPointsInBox(
      selectionStart,
      { x: e.clientX - rect.left, y: e.clientY - rect.top },
      appRef.current.camera.instance,
      containerRef.current,
      pointsRef.current,
    );

    setSelectedCount(indices.length);
    onSelectionChange?.(indices);
  }, [isSelecting, selectionStart, selectPointsInBox, onSelectionChange]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    // 初始化 ThreeApplication
    const app = new ThreeApplication();
    appRef.current = app;

    // 创建点云几何体
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    // 生成随机点
    const colorObj = new THREE.Color(color);
    for (let i = 0; i < pointCount; i += 1) {
      // 在 -50 到 50 的范围内随机生成点
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // 设置颜色
      if (randomColor) {
        // 为每个点生成随机颜色
        const randomColorObj = new THREE.Color();
        randomColorObj.setHSL(Math.random(), 0.7, 0.5);
        colors[i * 3] = randomColorObj.r;
        colors[i * 3 + 1] = randomColorObj.g;
        colors[i * 3 + 2] = randomColorObj.b;
      } else {
        // 使用统一颜色
        colors[i * 3] = colorObj.r;
        colors[i * 3 + 1] = colorObj.g;
        colors[i * 3 + 2] = colorObj.b;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 保存原始颜色
    originalColorsRef.current = new Float32Array(colors);

    // 创建点材质
    const material = new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    // 创建点云对象
    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;

    // 将点云添加到场景
    app.scene.instance.add(points);

    // 初始化应用
    app.init(containerRef.current);

    // 调整相机位置
    app.camera.instance.position.set(0, 0, 100);
    app.camera.instance.lookAt(0, 0, 0);

    return () => {
      // 清理
      if (pointsRef.current) {
        app.scene.instance.remove(pointsRef.current);
        pointsRef.current.geometry.dispose();
        if (pointsRef.current.material instanceof THREE.Material) {
          pointsRef.current.material.dispose();
        }
      }
      if (appRef.current) {
        appRef.current.destroy();
      }
      return undefined;
    };
  }, [pointCount, color, pointSize, randomColor]);

  // 根据框选模式启用/禁用相机控制
  useEffect(() => {
    if (appRef.current) {
      appRef.current.cameraControl.instance.enabled = !isSelectionMode;
    }
  }, [isSelectionMode]);

  // 计算框选矩形的位置和大小
  const selectionBoxStyle = {
    left: `${Math.min(selectionStart.x, selectionEnd.x)}px`,
    top: `${Math.min(selectionStart.y, selectionEnd.y)}px`,
    width: `${Math.abs(selectionEnd.x - selectionStart.x)}px`,
    height: `${Math.abs(selectionEnd.y - selectionStart.y)}px`,
    display: isSelecting ? 'block' : 'none',
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 工具栏 */}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsSelectionMode(!isSelectionMode)}
        >
          {isSelectionMode ? '退出选择' : '框选模式'}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={clearSelection}
        >
          清除选择
        </button>
      </div>

      {/* 框选矩形 */}
      {isSelecting && <div className={styles.selectionBox} style={selectionBoxStyle} />}

      {/* 选中信息 */}
      {selectedCount > 0 && (
        <div className={styles.selectedInfo}>
          已选中 {selectedCount} 个点
        </div>
      )}
    </div>
  );
};

export default PointCloudViewer;
