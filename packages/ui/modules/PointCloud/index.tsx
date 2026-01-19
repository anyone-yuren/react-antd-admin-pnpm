import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface PointCloudProps {
  /** 点的数量，默认 100000 */
  pointCount?: number;
  /** 点云的范围，默认 [-100, 100] */
  range?: number;
  /** 点的默认颜色，默认 #888888 */
  defaultColor?: string;
  /** 选中点的颜色，默认 #ff0000 */
  selectedColor?: string;
  /** 点的半径，默认 0.1 */
  pointSize?: number;
  /** 容器高度，默认 600 */
  height?: number;
  /** 选中点的回调 */
  onSelectionChange?: (selectedIndices: number[]) => void;
}

/**
 * 点云组件 - 支持 10 万个点的渲染、框选和高亮
 */
const PointCloud: React.FC<PointCloudProps> = ({
  pointCount = 100000,
  range = 100,
  defaultColor = '#888888',
  selectedColor = '#ff0000',
  pointSize = 0.1,
  height = 600,
  onSelectionChange,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasSelectingRef = useRef(false);

  // 当选择结束时处理选择逻辑
  useEffect(() => {
    if (wasSelectingRef.current && !isSelecting && selectionBox) {
      // 选择结束，处理选择逻辑
      wasSelectingRef.current = false;
    } else if (isSelecting) {
      wasSelectingRef.current = true;
    }
  }, [isSelecting, selectionBox]);

  const handleSelectionChange = useCallback(
    (indices: number[]) => {
      setSelectedIndices(new Set(indices));
      if (onSelectionChange) {
        onSelectionChange(indices);
      }
    },
    [onSelectionChange],
  );

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: `${height}px`, position: 'relative', border: '1px solid #ddd' }}
    >
      <Canvas
        camera={{ position: [0, 0, range * 2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <PointCloudScene
          pointCount={pointCount}
          range={range}
          defaultColor={defaultColor}
          selectedColor={selectedColor}
          pointSize={pointSize}
          selectedIndices={selectedIndices}
          setSelectedIndices={handleSelectionChange}
          isSelecting={isSelecting}
          setIsSelecting={setIsSelecting}
          selectionBox={selectionBox}
          setSelectionBox={setSelectionBox}
          onSelectionChange={onSelectionChange}
        />
      </Canvas>
      {selectionBox && (
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(selectionBox.startX, selectionBox.endX)}px`,
            top: `${Math.min(selectionBox.startY, selectionBox.endY)}px`,
            width: `${Math.abs(selectionBox.endX - selectionBox.startX)}px`,
            height: `${Math.abs(selectionBox.endY - selectionBox.startY)}px`,
            border: '2px dashed #1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

interface PointCloudSceneProps {
  pointCount: number;
  range: number;
  defaultColor: string;
  selectedColor: string;
  pointSize: number;
  selectedIndices: Set<number>;
  setSelectedIndices: (indices: number[]) => void;
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  selectionBox: { startX: number; startY: number; endX: number; endY: number } | null;
  setSelectionBox: React.Dispatch<
    React.SetStateAction<{ startX: number; startY: number; endX: number; endY: number } | null>
  >;
  onSelectionChange?: (selectedIndices: number[]) => void;
}

const PointCloudScene: React.FC<PointCloudSceneProps> = ({
  pointCount,
  range,
  defaultColor,
  selectedColor,
  pointSize,
  selectedIndices,
  setSelectedIndices,
  isSelecting,
  setIsSelecting,
  selectionBox,
  setSelectionBox,
  onSelectionChange,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, gl, size } = useThree();

  // 生成随机点位置
  const positions = useMemo(() => {
    const pos = new Float32Array(pointCount * 3);
    let index = 0;
    for (let i = 0; i < pointCount; i += 1) {
      pos[index] = (Math.random() - 0.5) * range * 2;
      pos[index + 1] = (Math.random() - 0.5) * range * 2;
      pos[index + 2] = (Math.random() - 0.5) * range * 2;
      index += 3;
    }
    return pos;
  }, [pointCount, range]);

  // 创建颜色属性
  const colors = useMemo(() => {
    const colorArray = new Float32Array(pointCount * 3);
    const defaultColorThree = new THREE.Color(defaultColor);
    let index = 0;
    for (let i = 0; i < pointCount; i += 1) {
      colorArray[index] = defaultColorThree.r;
      colorArray[index + 1] = defaultColorThree.g;
      colorArray[index + 2] = defaultColorThree.b;
      index += 3;
    }
    return colorArray;
  }, [pointCount, defaultColor]);

  // 更新选中点的颜色
  useEffect(() => {
    if (!pointsRef.current) return;

    const { geometry: geo } = pointsRef.current;
    const colorAttribute = geo.getAttribute('color') as THREE.BufferAttribute;
    if (!colorAttribute) return;

    const selectedColorThree = new THREE.Color(selectedColor);
    const defaultColorThree = new THREE.Color(defaultColor);

    for (let i = 0; i < pointCount; i += 1) {
      const color = selectedIndices.has(i) ? selectedColorThree : defaultColorThree;
      colorAttribute.setXYZ(i, color.r, color.g, color.b);
    }

    colorAttribute.needsUpdate = true;
  }, [selectedIndices, pointCount, selectedColor, defaultColor]);

  // 处理框选结束
  useEffect(() => {
    if (!isSelecting && selectionBox) {
      const boxWidth = Math.abs(selectionBox.endX - selectionBox.startX);
      const boxHeight = Math.abs(selectionBox.endY - selectionBox.startY);

      // 如果选择框太小，忽略
      if (boxWidth < 5 && boxHeight < 5) {
        setSelectionBox(null);
        return;
      }

      // 计算选择框在 NDC 坐标中的范围
      const minX = (Math.min(selectionBox.startX, selectionBox.endX) / size.width) * 2 - 1;
      const maxX = (Math.max(selectionBox.startX, selectionBox.endX) / size.width) * 2 - 1;
      const minY = -((Math.max(selectionBox.startY, selectionBox.endY) / size.height) * 2) + 1;
      const maxY = -((Math.min(selectionBox.startY, selectionBox.endY) / size.height) * 2) + 1;

      // 选择框内的点
      const selected = new Set<number>();
      const vector = new THREE.Vector3();

      for (let i = 0; i < pointCount; i += 1) {
        const posIndex = i * 3;
        vector.set(positions[posIndex], positions[posIndex + 1], positions[posIndex + 2]);
        vector.project(camera);

        // 检查点是否在选择框内
        if (
          vector.x >= minX
          && vector.x <= maxX
          && vector.y >= minY
          && vector.y <= maxY
          && vector.z >= -1
          && vector.z <= 1
        ) {
          selected.add(i);
        }
      }

      setSelectedIndices(Array.from(selected));
      setSelectionBox(null);

      if (onSelectionChange) {
        onSelectionChange(Array.from(selected));
      }
    }
  }, [isSelecting, selectionBox, pointCount, positions, camera, size, setSelectedIndices, onSelectionChange]);

  // 几何体和材质
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: pointSize,
        vertexColors: true,
        sizeAttenuation: true,
      }),
    [pointSize],
  );

  // 鼠标事件处理
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return; // 只处理左键
      if (e.shiftKey || e.ctrlKey || e.metaKey) return; // 忽略组合键

      const rect = gl.domElement.getBoundingClientRect();
      setIsSelecting(true);
      setSelectionBox({
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top,
      });
    },
    [gl, setIsSelecting, setSelectionBox],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isSelecting || !selectionBox) return;

      const rect = gl.domElement.getBoundingClientRect();
      setSelectionBox({
        ...selectionBox,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top,
      });
    },
    [isSelecting, selectionBox, gl, setSelectionBox],
  );

  const handlePointerUp = useCallback(() => {
    if (isSelecting) {
      setIsSelecting(false);
    }
  }, [isSelecting]);

  return (
    <>
      <group
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <points ref={pointsRef} geometry={geometry} material={material} />
      </group>
      <gridHelper args={[range * 2, 20]} />
    </>
  );
};

export default PointCloud;
