/* eslint-disable no-plusplus */
import { useTheme } from 'antd-style';
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Page } from '@/components/Page';

import { DEFAULT_CONFIG } from './config';
import { createOctreeHelper } from './octreeHelper';
import { PointCloudOctree as OctreeClass } from './pointCloudOctree';
import { createSelectionManagerLod } from './selectionManagerLod';
import { useStyles } from './styles';

import type { LodConfig } from './config';
import type { OctreeHelper } from './octreeHelper';
import type { PointCloudOctree } from './pointCloudOctree';
import type { ScreenRect, SelectionManagerLod } from './selectionManagerLod';

interface ThreeContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
}

function createThreeContext(canvas: HTMLCanvasElement, bgColor: string): ThreeContext {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor(new THREE.Color(bgColor), 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.5, 5000);
  camera.position.set(0, 0, 600);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  return { renderer, scene, camera, controls };
}

function disposeThreeContext(context: ThreeContext): void {
  context.controls.dispose();
  context.renderer.dispose();
}

export default function PointCloudLod(): React.ReactElement {
  const { styles, cx } = useStyles();
  const token = useTheme();

  // DOM refs
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const selectRectRef = React.useRef<HTMLDivElement>(null);

  // 配置状态
  const [totalPoints, setTotalPoints] = React.useState(200_000_000);
  const [pointBudget, setPointBudget] = React.useState(DEFAULT_CONFIG.pointBudget);
  const [sseThreshold, setSseThreshold] = React.useState(DEFAULT_CONFIG.sseThreshold);
  const [selectMode, setSelectMode] = React.useState(true);
  const [showOctree, setShowOctree] = React.useState(false);
  const [freezeLod, setFreezeLod] = React.useState(false);

  // 信息状态
  const [info, setInfo] = React.useState({
    totalPoints: 0,
    visibleNodes: 0,
    totalNodes: 0,
    renderedPoints: 0,
    loadedNodes: 0,
    memoryMB: 0,
    selectedCount: 0,
    fps: 0,
  });

  // Refs for managers
  const threeContextRef = React.useRef<ThreeContext | null>(null);
  const octreeRef = React.useRef<PointCloudOctree | null>(null);
  const selectionManagerRef = React.useRef<SelectionManagerLod | null>(null);
  const octreeHelperRef = React.useRef<OctreeHelper | null>(null);
  const animationIdRef = React.useRef<number>(0);
  const configRef = React.useRef<LodConfig>({ ...DEFAULT_CONFIG });
  const selectModeRef = React.useRef(selectMode);
  const freezeLodRef = React.useRef(freezeLod);

  // 同步状态到 ref
  React.useEffect(() => {
    selectModeRef.current = selectMode;
  }, [selectMode]);

  React.useEffect(() => {
    freezeLodRef.current = freezeLod;
  }, [freezeLod]);

  // FPS 计算
  const fpsRef = React.useRef({ frameCount: 0, lastFpsTime: performance.now(), currentFps: 0 });

  // 重建八叉树
  const rebuildOctree = React.useCallback(() => {
    const context = threeContextRef.current;
    if (!context) return;

    // 清理旧的八叉树
    if (octreeRef.current) {
      octreeRef.current.dispose();
    }

    // 更新配置
    configRef.current.pointBudget = pointBudget;
    configRef.current.sseThreshold = sseThreshold;

    // 创建新的八叉树
    const octree = new OctreeClass(totalPoints, configRef.current, context.scene);
    octreeRef.current = octree;

    // 更新选择管理器的八叉树引用
    if (selectionManagerRef.current) {
      selectionManagerRef.current.clearSelection();
    }

    setInfo((prev) => ({
      ...prev,
      totalPoints,
      totalNodes: octree.allNodes.length,
    }));
  }, [totalPoints, pointBudget, sseThreshold]);

  // 初始化 Three.js
  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const selectRect = selectRectRef.current;

    if (!container || !canvas || !selectRect) return undefined;

    // 创建 Three 上下文
    const bgColor = token.colorBgLayout;
    const context = createThreeContext(canvas, bgColor);
    threeContextRef.current = context;
    const { renderer, scene, camera, controls } = context;

    // 创建八叉树助手
    const helper = createOctreeHelper(scene);
    octreeHelperRef.current = helper;

    // 创建选择管理器
    const selManager = createSelectionManagerLod({
      scene,
      camera,
      renderer,
      getOctree: () => octreeRef.current,
    });
    selectionManagerRef.current = selManager;

    // 初始化八叉树
    configRef.current.pointBudget = pointBudget;
    configRef.current.sseThreshold = sseThreshold;
    const octree = new OctreeClass(totalPoints, configRef.current, scene);
    octreeRef.current = octree;

    setInfo((prev) => ({
      ...prev,
      totalPoints,
      totalNodes: octree.allNodes.length,
    }));

    // 框选状态
    let isSelecting = false;
    let startX = 0;
    let startY = 0;
    let canvasRect: DOMRect | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (!selectModeRef.current || e.button !== 0 || e.target !== canvas) return;

      isSelecting = true;
      controls.enabled = false;
      canvasRect = canvas.getBoundingClientRect();
      startX = e.clientX - canvasRect.left;
      startY = e.clientY - canvasRect.top;

      selectRect.style.display = 'block';
      selectRect.style.left = `${startX}px`;
      selectRect.style.top = `${startY}px`;
      selectRect.style.width = '0px';
      selectRect.style.height = '0px';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isSelecting || !canvasRect) return;
      const currentX = e.clientX - canvasRect.left;
      const currentY = e.clientY - canvasRect.top;
      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      selectRect.style.left = `${left}px`;
      selectRect.style.top = `${top}px`;
      selectRect.style.width = `${width}px`;
      selectRect.style.height = `${height}px`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isSelecting) return;
      isSelecting = false;
      controls.enabled = true;
      selectRect.style.display = 'none';

      if (!canvasRect) return;

      const endX = e.clientX - canvasRect.left;
      const endY = e.clientY - canvasRect.top;
      const rect: ScreenRect = {
        left: Math.min(startX, endX),
        right: Math.max(startX, endX),
        top: Math.min(startY, endY),
        bottom: Math.max(startY, endY),
      };

      if (rect.right - rect.left < 4 || rect.bottom - rect.top < 4) return;

      if (selectionManagerRef.current) {
        setTimeout(() => {
          selectionManagerRef.current?.selectPointsInRect(rect);
        }, 0);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 窗口大小变化
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(container);

    // UI 更新间隔
    let lastUiUpdateTime = 0;
    const UI_UPDATE_INTERVAL = 100;

    // 动画循环
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      controls.update();

      // FPS 计算
      const now = performance.now();
      fpsRef.current.frameCount++;
      if (now - fpsRef.current.lastFpsTime >= 1000) {
        fpsRef.current.currentFps = fpsRef.current.frameCount;
        fpsRef.current.frameCount = 0;
        fpsRef.current.lastFpsTime = now;
      }

      // LOD 更新
      let renderedPoints = 0;
      const currentOctree = octreeRef.current;
      if (currentOctree && !freezeLodRef.current) {
        renderedPoints = currentOctree.update(
          camera,
          canvas.clientHeight,
          configRef.current.sseThreshold,
          configRef.current.pointBudget,
        );
      } else if (currentOctree) {
        // 冻结模式：只统计已渲染点数
        renderedPoints = currentOctree.visibleNodes.reduce((sum, n) => sum + n.nodePointCount, 0);
      }

      // 更新八叉树可视化
      if (octreeHelperRef.current?.isVisible && currentOctree) {
        octreeHelperRef.current.update(currentOctree);
      }

      renderer.render(scene, camera);

      // 更新 UI (基于时间间隔，避免闪烁)
      if (now - lastUiUpdateTime >= UI_UPDATE_INTERVAL && currentOctree) {
        lastUiUpdateTime = now;
        setInfo({
          totalPoints,
          visibleNodes: currentOctree.visibleNodes.length,
          totalNodes: currentOctree.allNodes.length,
          renderedPoints,
          loadedNodes: currentOctree.loadedNodes.length,
          memoryMB: currentOctree.getMemoryUsage(),
          selectedCount: selectionManagerRef.current?.selectionCount || 0,
          fps: fpsRef.current.currentFps,
        });
      }
    };

    animate();

    // 清理
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationIdRef.current);
      selManager.dispose();
      helper.dispose();
      octreeRef.current?.dispose();
      disposeThreeContext(context);
    };
  }, []);

  // 更新配置
  React.useEffect(() => {
    configRef.current.pointBudget = pointBudget;
  }, [pointBudget]);

  React.useEffect(() => {
    configRef.current.sseThreshold = sseThreshold;
  }, [sseThreshold]);

  // 切换八叉树显示
  const handleToggleOctree = () => {
    if (octreeHelperRef.current) {
      const visible = octreeHelperRef.current.toggle();
      setShowOctree(visible);
    }
  };

  // 清空选中
  const handleClearSelection = () => {
    selectionManagerRef.current?.clearSelection();
  };

  return (
    <Page plugin={{ name: '海量点云模拟-LOD', desc: '基于八叉树的 2 亿级点云 LOD 渲染与框选', url: '' }}>
      <div ref={containerRef} className={styles.container}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={selectRectRef} className={styles.selectRect} />

        <div className={styles.panel}>
          <div className={styles.panelTitle}>2亿点云 - 八叉树 LOD</div>

          <div className={styles.row}>
            <span className={styles.label}>总点数</span>
            <select
              className={styles.select}
              value={totalPoints}
              onChange={(e) => setTotalPoints(Number(e.target.value))}
            >
              <option value={10_000_000}>1000万</option>
              <option value={50_000_000}>5000万</option>
              <option value={100_000_000}>1亿</option>
              <option value={200_000_000}>2亿</option>
            </select>
            <button type='button' className={styles.btn} onClick={rebuildOctree}>
              重建
            </button>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Point Budget</span>
            <input
              type='range'
              className={styles.range}
              min={1_000_000}
              max={10_000_000}
              step={500_000}
              value={pointBudget}
              onChange={(e) => setPointBudget(Number(e.target.value))}
            />
            <span className={styles.rangeValue}>{(pointBudget / 1_000_000).toFixed(1)}万</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>SSE阈值</span>
            <input
              type='range'
              className={styles.range}
              min={0.5}
              max={5}
              step={0.1}
              value={sseThreshold}
              onChange={(e) => setSseThreshold(Number(e.target.value))}
            />
            <span className={styles.rangeValue}>{sseThreshold.toFixed(1)}</span>
          </div>

          <div className={styles.row}>
            <button
              type='button'
              className={cx(styles.btn, selectMode && styles.btnActive)}
              onClick={() => setSelectMode(!selectMode)}
            >
              框选：{selectMode ? '开' : '关'}
            </button>
            <button type='button' className={styles.btn} onClick={handleClearSelection}>
              清空选中
            </button>
          </div>

          <div className={styles.row}>
            <button
              type='button'
              className={cx(styles.btn, showOctree && styles.btnActive)}
              onClick={handleToggleOctree}
            >
              {showOctree ? '隐藏八叉树' : '显示八叉树'}
            </button>
            <button
              type='button'
              className={cx(styles.btn, freezeLod && styles.btnActive)}
              onClick={() => setFreezeLod(!freezeLod)}
            >
              {freezeLod ? '解冻LOD' : '冻结LOD'}
            </button>
          </div>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span>总点数</span>
              <span className={cx(styles.infoValue, styles.infoHighlight)}>{info.totalPoints.toLocaleString()}</span>
            </div>
            <div className={styles.infoRow}>
              <span>可见节点</span>
              <span className={styles.infoValue}>
                {info.visibleNodes} / {info.totalNodes}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span>渲染点数</span>
              <span className={styles.infoValue}>
                <span className={styles.infoHighlight}>{info.renderedPoints.toLocaleString()}</span> /{' '}
                {(pointBudget / 1_000_000).toFixed(1)}M
              </span>
            </div>
            <div className={styles.infoRow}>
              <span>已加载节点</span>
              <span className={styles.infoValue}>
                {info.loadedNodes} ({info.memoryMB.toFixed(1)} MB)
              </span>
            </div>
            <div className={styles.infoRow}>
              <span>选中点数</span>
              <span className={styles.infoValue}>{info.selectedCount.toLocaleString()}</span>
            </div>
            <div className={styles.infoRow}>
              <span>FPS</span>
              <span className={cx(styles.infoValue, styles.infoHighlight)}>{info.fps}</span>
            </div>
          </div>

          <div className={styles.hint}>左键拖拽框选 | 右键/滚轮旋转缩放 | 滚轮靠近触发 LOD 细化</div>
        </div>
      </div>
    </Page>
  );
}
