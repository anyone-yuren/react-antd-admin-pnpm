/* eslint-disable no-plusplus, @typescript-eslint/no-explicit-any */
/**
 * 点云网格化组件 (WebGL + CPU Marching Cubes)
 *
 * 使用 Three.js ShaderMaterial 在 GPU 上渲染点云，
 * 使用 CPU Marching Cubes 进行网格重建
 */

import {
  AppstoreOutlined,
  CloudOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Radio, Select, Slider, Space, Switch, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CPUMarchingCubes, type MarchingCubesResult } from './cpuMarchingCubes';
import { pointCloudFragmentShader, pointCloudVertexShader } from './glslShaders';
import { generatePointCloudData, generateRandomSeeds } from './pointGenerator';
import {
  COLOR_SCHEMES,
  type ColorScheme,
  DEFAULT_CONFIG,
  getShapeIndex,
  getShapeKeys,
  type ShapeKey,
  SHAPES,
} from './shapesConfig';
import { useStyles } from './styles';

const { Text } = Typography;

type ViewMode = 'points' | 'mesh';

interface Stats {
  fps: number;
  pointCount: number;
  triangleCount: number;
  computeTime: number;
  drawCalls: number;
  genTime: number;
}

/** 点云网格化组件 */
export default function PointCloudMesh() {
  const { styles } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animationRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(0);
  const timeRef = useRef(0);

  // 点云基础数据
  const basePositionsRef = useRef<Float32Array | null>(null);
  const randomsRef = useRef<Float32Array | null>(null);

  // uniforms 引用
  const uniformsRef = useRef<{
    uTime: { value: number };
    uSize: { value: number };
    uAnimSpeed: { value: number };
    uShape: { value: number };
    uColorScheme: { value: number };
  } | null>(null);

  // 网格重建器
  const reconstructorRef = useRef<CPUMarchingCubes | null>(null);

  // 状态
  const [shape, setShape] = useState<ShapeKey>('sphere');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(0);
  const [pointCount, setPointCount] = useState(DEFAULT_CONFIG.pointCount);
  const [pointSize, setPointSize] = useState(DEFAULT_CONFIG.pointSize);
  const [animSpeed, setAnimSpeed] = useState(DEFAULT_CONFIG.animSpeed);
  const [gridResolution, setGridResolution] = useState(DEFAULT_CONFIG.gridResolution);
  const [isoValue, setIsoValue] = useState(DEFAULT_CONFIG.isoValue);
  const [splatRadius, setSplatRadius] = useState(DEFAULT_CONFIG.splatRadius);
  const [meshOpacity, setMeshOpacity] = useState(DEFAULT_CONFIG.meshOpacity);
  const [viewMode, setViewMode] = useState<ViewMode>('points');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [stats, setStats] = useState<Stats>({
    fps: 0,
    pointCount: 0,
    triangleCount: 0,
    computeTime: 0,
    drawCalls: 0,
    genTime: 0,
  });

  /** 初始化场景 */
  const initScene = useCallback(() => {
    if (!containerRef.current) return;

    // 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d12);
    sceneRef.current = scene;

    // 相机
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 50, 150);
    cameraRef.current = camera;

    // 渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0d12, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    // 光照（用于网格）
    const ambientLight = new THREE.AmbientLight(0x404050, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight1.position.set(100, 100, 100);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x6080ff, 0.5);
    directionalLight2.position.set(-100, -50, -100);
    scene.add(directionalLight2);

    // 初始化网格重建器
    reconstructorRef.current = new CPUMarchingCubes();
  }, [autoRotate]);

  /** 创建点云 */
  const createPointCloud = useCallback(() => {
    if (!sceneRef.current) return;

    const startTime = performance.now();

    // 移除旧的点云
    if (pointCloudRef.current) {
      sceneRef.current.remove(pointCloudRef.current);
      pointCloudRef.current.geometry.dispose();
      (pointCloudRef.current.material as THREE.Material).dispose();
    }

    const geometry = new THREE.BufferGeometry();

    // 生成基础随机数据
    const basePositions = generateRandomSeeds(pointCount);
    const randoms = new Float32Array(pointCount);
    for (let i = 0; i < pointCount; i++) {
      randoms[i] = Math.random();
    }

    basePositionsRef.current = basePositions;
    randomsRef.current = randoms;

    // 设置属性
    geometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('aBasePosition', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    // 创建 uniforms
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: pointSize },
      uAnimSpeed: { value: animSpeed },
      uShape: { value: getShapeIndex(shape) },
      uColorScheme: { value: colorScheme },
    };
    uniformsRef.current = uniforms;

    // 创建 ShaderMaterial
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: pointCloudVertexShader,
      fragmentShader: pointCloudFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    sceneRef.current.add(points);
    pointCloudRef.current = points;

    const genTime = performance.now() - startTime;
    setStats((prev) => ({ ...prev, pointCount, genTime }));
  }, [pointCount, pointSize, animSpeed, shape, colorScheme]);

  /** 执行网格重建 */
  const reconstructMesh = useCallback(async () => {
    if (!reconstructorRef.current || !sceneRef.current || !basePositionsRef.current) return;

    setIsRebuilding(true);

    // 使用 setTimeout 让 UI 有机会更新
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          const startTime = performance.now();

          // 获取当前时间用于动画状态
          const currentTime = timeRef.current * animSpeed;

          // 生成点云位置和颜色数据
          const { positions, colors } = generatePointCloudData(
            shape,
            basePositionsRef.current!,
            pointCount,
            colorScheme,
            currentTime,
          );

          // 设置重建参数
          reconstructorRef.current!.gridSize = [gridResolution, gridResolution, gridResolution];
          reconstructorRef.current!.isoValue = isoValue;
          reconstructorRef.current!.splatRadius = splatRadius;

          // 执行重建
          const result: MarchingCubesResult = reconstructorRef.current!.reconstruct(positions, colors, pointCount);

          const computeTime = performance.now() - startTime;

          if (result.triangleCount === 0) {
            // eslint-disable-next-line no-console
            console.warn('Mesh reconstruction produced no triangles');
            setStats((prev) => ({ ...prev, triangleCount: 0, computeTime }));
            setIsRebuilding(false);
            resolve();
            return;
          }

          // 移除旧网格
          if (meshRef.current) {
            sceneRef.current!.remove(meshRef.current);
            meshRef.current.geometry.dispose();
            (meshRef.current.material as THREE.Material).dispose();
          }

          // 创建新网格
          const meshGeometry = new THREE.BufferGeometry();
          meshGeometry.setAttribute('position', new THREE.BufferAttribute(result.positions, 3));
          meshGeometry.setAttribute('normal', new THREE.BufferAttribute(result.normals, 3));
          meshGeometry.setAttribute('color', new THREE.BufferAttribute(result.colors, 3));

          const meshMaterial = new THREE.MeshPhysicalMaterial({
            vertexColors: true,
            transparent: true,
            opacity: meshOpacity,
            metalness: 0.1,
            roughness: 0.4,
            side: THREE.DoubleSide,
            flatShading: false,
          });

          const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
          sceneRef.current!.add(mesh);
          meshRef.current = mesh;

          // eslint-disable-next-line no-console
          console.log(`Mesh reconstructed: ${result.triangleCount} triangles in ${computeTime.toFixed(1)}ms`);

          setStats((prev) => ({
            ...prev,
            triangleCount: result.triangleCount,
            computeTime,
          }));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Mesh reconstruction failed:', error);
        }

        setIsRebuilding(false);
        resolve();
      }, 10);
    });
  }, [shape, colorScheme, pointCount, gridResolution, isoValue, splatRadius, meshOpacity, animSpeed]);

  /** 清除网格 */
  const clearMesh = useCallback(() => {
    if (meshRef.current && sceneRef.current) {
      sceneRef.current.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      (meshRef.current.material as THREE.Material).dispose();
      meshRef.current = null;
    }
  }, []);

  /** 更新视图模式 */
  const updateViewMode = useCallback((mode: ViewMode) => {
    if (pointCloudRef.current) {
      pointCloudRef.current.visible = mode === 'points';
    }
    if (meshRef.current) {
      meshRef.current.visible = mode === 'mesh';
    }
  }, []);

  /** 切换网格模式 */
  const handleToggleMesh = useCallback(
    async (enabled: boolean) => {
      if (enabled) {
        await reconstructMesh();
        setViewMode('mesh');
      } else {
        clearMesh();
        setViewMode('points');
      }
    },
    [reconstructMesh, clearMesh],
  );

  /** 动画循环 */
  const animate = useCallback(() => {
    animationRef.current = requestAnimationFrame(animate);

    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const now = performance.now();

    // FPS 统计
    frameCountRef.current++;
    if (now - lastFpsTimeRef.current >= 1000) {
      setStats((prev) => ({
        ...prev,
        fps: frameCountRef.current,
        drawCalls: rendererRef.current?.info.render.calls || 0,
      }));
      frameCountRef.current = 0;
      lastFpsTimeRef.current = now;
    }

    // 更新时间
    if (isPlaying) {
      timeRef.current += 0.016;
    }

    // 更新 uniforms
    if (uniformsRef.current) {
      uniformsRef.current.uTime.value = timeRef.current;
    }

    // 更新控制器
    if (controlsRef.current) {
      controlsRef.current.update();
    }

    // 渲染
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [isPlaying]);

  /** 重置相机 */
  const handleResetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 50, 150);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  // 初始化
  useEffect(() => {
    initScene();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [initScene]);

  // 创建初始点云
  useEffect(() => {
    createPointCloud();
  }, [createPointCloud]);

  // 启动动画
  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  // 更新视图模式
  useEffect(() => {
    updateViewMode(viewMode);
  }, [viewMode, updateViewMode]);

  // 更新自动旋转
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // 更新点大小
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uSize.value = pointSize;
    }
  }, [pointSize]);

  // 更新动画速度
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uAnimSpeed.value = animSpeed;
    }
  }, [animSpeed]);

  // 更新形态
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uShape.value = getShapeIndex(shape);
    }
  }, [shape]);

  // 更新颜色方案
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uColorScheme.value = colorScheme;
    }
  }, [colorScheme]);

  // 更新网格透明度
  useEffect(() => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshPhysicalMaterial).opacity = meshOpacity;
    }
  }, [meshOpacity]);

  // 窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {/* 3D 视图 */}
      <div ref={containerRef} className={styles.canvasContainer}>
        {/* 状态面板 */}
        <div className={styles.statsPanel}>
          <div>当前形态: {SHAPES[shape].name}</div>
          <div>点数量: {stats.pointCount.toLocaleString()}</div>
          <div>生成耗时: {stats.genTime.toFixed(1)} ms</div>
          <div>渲染模式: GPU 着色器 (WebGL)</div>
          {viewMode === 'mesh' && (
            <>
              <div>网格三角形: {stats.triangleCount.toLocaleString()}</div>
              <div>重建耗时: {stats.computeTime.toFixed(1)} ms</div>
            </>
          )}
          <div>FPS: {stats.fps}</div>
          <div>Draw Calls: {stats.drawCalls}</div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className={styles.controlPanel}>
        {/* 视图模式 */}
        <div>
          <div className={styles.sectionTitle}>视图模式</div>
          <div className={styles.viewToggle}>
            <Button
              type={viewMode === 'points' ? 'primary' : 'default'}
              icon={<CloudOutlined />}
              onClick={() => handleToggleMesh(false)}
            >
              点云
            </Button>
            <Button
              type={viewMode === 'mesh' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => handleToggleMesh(true)}
              loading={isRebuilding}
            >
              网格
            </Button>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 形态选择 */}
        <div>
          <div className={styles.sectionTitle}>形态选择</div>
          <Select
            value={shape}
            onChange={setShape}
            style={{ width: '100%' }}
            options={getShapeKeys().map((key) => ({
              value: key,
              label: `${SHAPES[key].icon} ${SHAPES[key].name}`,
            }))}
          />
        </div>

        {/* 颜色方案 */}
        <div>
          <div className={styles.sectionTitle}>颜色方案</div>
          <Radio.Group value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} size='small'>
            {COLOR_SCHEMES.map((scheme) => (
              <Radio.Button key={scheme.name} value={scheme.value}>
                {scheme.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        <div className={styles.divider} />

        {/* 点云参数 */}
        <div>
          <div className={styles.sectionTitle}>参数控制</div>

          <Text type='secondary'>点数量</Text>
          <div className={styles.sliderRow}>
            <Slider min={100000} max={1000000} step={100000} value={pointCount} onChange={setPointCount} />
            <InputNumber
              min={100000}
              max={1000000}
              step={100000}
              value={pointCount}
              onChange={(v) => v && setPointCount(v)}
              formatter={(v) => `${(v || 0) / 10000}万`}
              style={{ width: 80 }}
            />
          </div>

          <Text type='secondary'>点大小</Text>
          <div className={styles.sliderRow}>
            <Slider min={0.5} max={5} step={0.1} value={pointSize} onChange={setPointSize} />
            <InputNumber
              min={0.5}
              max={5}
              step={0.1}
              value={pointSize}
              onChange={(v) => v && setPointSize(v)}
              style={{ width: 80 }}
            />
          </div>

          <Text type='secondary'>动画速度</Text>
          <div className={styles.sliderRow}>
            <Slider min={0} max={2} step={0.1} value={animSpeed} onChange={setAnimSpeed} />
            <InputNumber
              min={0}
              max={2}
              step={0.1}
              value={animSpeed}
              onChange={(v) => v !== null && setAnimSpeed(v)}
              style={{ width: 80 }}
            />
          </div>
        </div>

        <div className={styles.divider} />

        {/* 网格重建参数 */}
        <div>
          <div className={styles.sectionTitle}>🔬 网格重建 (CPU Marching Cubes)</div>

          <Text type='secondary'>体素分辨率</Text>
          <div className={styles.sliderRow}>
            <Slider min={32} max={128} step={8} value={gridResolution} onChange={setGridResolution} />
            <InputNumber
              min={32}
              max={128}
              step={8}
              value={gridResolution}
              onChange={(v) => v && setGridResolution(v)}
              formatter={(v) => `${v}³`}
              style={{ width: 80 }}
            />
          </div>

          <Text type='secondary'>等值面阈值</Text>
          <div className={styles.sliderRow}>
            <Slider min={0.1} max={2.0} step={0.1} value={isoValue} onChange={setIsoValue} />
            <InputNumber
              min={0.1}
              max={2.0}
              step={0.1}
              value={isoValue}
              onChange={(v) => v && setIsoValue(v)}
              style={{ width: 80 }}
            />
          </div>

          <Text type='secondary'>散射半径</Text>
          <div className={styles.sliderRow}>
            <Slider min={0.5} max={3.0} step={0.1} value={splatRadius} onChange={setSplatRadius} />
            <InputNumber
              min={0.5}
              max={3.0}
              step={0.1}
              value={splatRadius}
              onChange={(v) => v && setSplatRadius(v)}
              style={{ width: 80 }}
            />
          </div>

          <Text type='secondary'>网格透明度</Text>
          <div className={styles.sliderRow}>
            <Slider min={0.1} max={1.0} step={0.05} value={meshOpacity} onChange={setMeshOpacity} />
            <InputNumber
              min={0.1}
              max={1.0}
              step={0.05}
              value={meshOpacity}
              onChange={(v) => v && setMeshOpacity(v)}
              style={{ width: 80 }}
            />
          </div>

          <Button
            type='primary'
            block
            onClick={() => reconstructMesh()}
            loading={isRebuilding}
            style={{ marginTop: 8 }}
          >
            重建网格
          </Button>
        </div>

        <div className={styles.divider} />

        {/* 控制按钮 */}
        <div>
          <div className={styles.sectionTitle}>控制</div>
          <Space direction='vertical' style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>自动旋转</Text>
              <Switch checked={autoRotate} onChange={setAutoRotate} />
            </div>
            <div className={styles.buttonGroup}>
              <Button
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '暂停' : '播放'}
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleResetCamera}>
                重置视角
              </Button>
            </div>
          </Space>
        </div>

        {/* 操作提示 */}
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Text type='secondary' style={{ fontSize: 11, lineHeight: 1.6, display: 'block' }}>
            左键旋转 | 右键平移 | 滚轮缩放
            <br />
            点击"网格"按钮启用 Marching Cubes 网格重建
          </Text>
        </div>
      </div>
    </div>
  );
}
