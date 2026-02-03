import { useTheme } from 'antd-style';
import React from 'react';

import { Page } from '@/components/Page';

import { createPointCloudManager } from './pointCloudManager';
import { createThreeContext, disposeThreeContext } from './sceneSetup';
import { createSelectionManager } from './selectionManager';
import { usePointCloudStyles } from './styles';

import type { PointCloudManager } from './pointCloudManager';
import type { ThreeContext } from './sceneSetup';
import type { ScreenRect, SelectionManager } from './selectionManager';

// 点数量选项
const POINT_COUNT_OPTIONS = [
  { value: 5000000, label: '500 万' },
  { value: 10000000, label: '1000 万' },
  { value: 20000000, label: '2000 万' },
  { value: 30000000, label: '3000 万' },
  { value: 50000000, label: '5000 万' },
];

// 分块大小选项
const CHUNK_SIZE_OPTIONS = [
  { value: 10000, label: '1万/块' },
  { value: 50000, label: '5万/块' },
  { value: 100000, label: '10万/块' },
  { value: 200000, label: '20万/块' },
];

// 筛选模式选项
const FILTER_MODE_OPTIONS = [
  { value: 'bvh', label: '筛选：BVH' },
  { value: 'full', label: '筛选：全量' },
];

const PointCloud: React.FC = () => {
  const { styles } = usePointCloudStyles();
  const token = useTheme();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const selectRectRef = React.useRef<HTMLDivElement>(null);

  // 状态
  const [pointCount, setPointCount] = React.useState(10000000);
  const [chunkSize, setChunkSize] = React.useState(100000);
  const [filterMode, setFilterMode] = React.useState<'bvh' | 'full'>('bvh');
  const [selectMode, setSelectMode] = React.useState(true);
  const [highlightMode, setHighlightMode] = React.useState<'points' | 'chunk'>('points');
  const [showChunkDebug, setShowChunkDebug] = React.useState(false);

  // 信息状态
  const [info, setInfo] = React.useState({
    pointCount: 0,
    chunkCount: 0,
    selectedCount: 0,
    selectedChunkCount: 0,
    selectedChunks: [] as number[],
    status: '准备中',
  });

  // Refs for managers
  const threeContextRef = React.useRef<ThreeContext | null>(null);
  const pcManagerRef = React.useRef<PointCloudManager | null>(null);
  const selManagerRef = React.useRef<SelectionManager | null>(null);
  const animationIdRef = React.useRef<number>(0);
  const selectModeRef = React.useRef(selectMode);

  // 同步 selectMode 到 ref
  React.useEffect(() => {
    selectModeRef.current = selectMode;
  }, [selectMode]);

  // 获取选中分块摘要
  const getSelectedChunkSummary = (chunks: number[]): string => {
    if (!chunks || chunks.length === 0) return '-';
    const limit = 10;
    const head = chunks.slice(0, limit).join(', ');
    return chunks.length > limit ? `${head} ...` : head;
  };

  // 更新信息回调
  const updateInfo = React.useCallback(
    (status: string) => {
      setInfo((prev) => ({
        ...prev,
        pointCount: pcManagerRef.current?.chunkCount ? pointCount : 0,
        chunkCount: pcManagerRef.current?.chunkCount || 0,
        status,
      }));
    },
    [pointCount],
  );

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

    // 创建点云管理器
    const pcManager = createPointCloudManager({
      scene,
      updateInfo,
      getChunkSize: () => chunkSize,
    });
    pcManagerRef.current = pcManager;

    // 创建选择管理器
    const selManager = createSelectionManager({
      camera,
      renderer,
      pointCloudManager: pcManager,
      getFilterMode: () => filterMode,
      updateInfo,
      getChunkSize: () => chunkSize,
      getPointCount: () => pointCount,
    });
    selManagerRef.current = selManager;

    // 框选状态
    let isSelecting = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let canvasRect: DOMRect | null = null;

    const onMouseDown = (e: MouseEvent) => {
      if (!selectModeRef.current || e.target !== canvas) return;
      isSelecting = true;
      canvasRect = canvas.getBoundingClientRect();
      startX = e.clientX - canvasRect.left;
      startY = e.clientY - canvasRect.top;
      lastX = startX;
      lastY = startY;

      selectRect.style.display = 'block';
      selectRect.style.width = '0px';
      selectRect.style.height = '0px';
      selectRect.style.left = `${startX}px`;
      selectRect.style.top = `${startY}px`;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isSelecting || !canvasRect) return;
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      const w = Math.abs(x - startX);
      const h = Math.abs(y - startY);
      const l = Math.min(x, startX);
      const t = Math.min(y, startY);

      selectRect.style.width = `${w}px`;
      selectRect.style.height = `${h}px`;
      selectRect.style.left = `${l}px`;
      selectRect.style.top = `${t}px`;

      lastX = x;
      lastY = y;
    };

    const onMouseUp = () => {
      if (!isSelecting) return;
      isSelecting = false;
      selectRect.style.display = 'none';

      if (Math.abs(lastX - startX) < 2 || Math.abs(lastY - startY) < 2) return;

      const rect: ScreenRect = {
        left: Math.min(startX, lastX),
        right: Math.max(startX, lastX),
        top: Math.min(startY, lastY),
        bottom: Math.max(startY, lastY),
      };

      const result = selManager.selectPointsInRect(rect);

      if (result) {
        pcManager.updateHighlight(result.selectedChunks, highlightMode);

        setInfo((prev) => ({
          ...prev,
          selectedCount: result.selectionCount,
          selectedChunkCount: result.selectedChunkCount,
          selectedChunks: result.selectedChunks,
          status: '筛选完成',
        }));
      }
    };

    // 注册事件
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 窗口大小调整
    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // 动画循环
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // 生成点云并启动动画
    pcManager.generate(pointCount).then(() => {
      setInfo((prev) => ({
        ...prev,
        pointCount,
        chunkCount: pcManager.chunkCount,
        status: '已就绪',
      }));
    });
    animate();

    // 清理
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationIdRef.current);
      pcManager.dispose();
      disposeThreeContext(context);
    };
  }, []);

  // 更新控制器启用状态
  React.useEffect(() => {
    if (threeContextRef.current) {
      threeContextRef.current.controls.enabled = !selectMode;
    }
  }, [selectMode]);

  // 更新高亮模式
  React.useEffect(() => {
    const pcManager = pcManagerRef.current;
    const selManager = selManagerRef.current;
    if (!pcManager || !selManager) return;

    if (pcManager.selectedPoints) {
      pcManager.selectedPoints.visible = highlightMode === 'points';
    }
    if (pcManager.highlightChunkMesh) {
      pcManager.highlightChunkMesh.visible = highlightMode === 'chunk';
    }

    if (highlightMode === 'chunk' && selManager.selectedChunks.length > 0) {
      pcManager.updateHighlight(selManager.selectedChunks, highlightMode);
    }
  }, [highlightMode]);

  // 更新分块调试显示
  React.useEffect(() => {
    const bvhMesh = pcManagerRef.current?.bvhMesh;
    if (bvhMesh) {
      bvhMesh.visible = showChunkDebug;
    }
  }, [showChunkDebug]);

  // 重建点云
  const handleRebuild = async () => {
    const pcManager = pcManagerRef.current;
    const selManager = selManagerRef.current;
    if (!pcManager || !selManager) return;

    await pcManager.generate(pointCount);
    selManager.clearSelectionState();

    setInfo({
      pointCount,
      chunkCount: pcManager.chunkCount,
      selectedCount: 0,
      selectedChunkCount: 0,
      selectedChunks: [],
      status: '已就绪',
    });
  };

  // 清空选中
  const handleClearSelection = () => {
    const pcManager = pcManagerRef.current;
    const selManager = selManagerRef.current;
    if (!pcManager || !selManager) return;

    selManager.clearSelectionState();
    pcManager.updateSelectedGeometry(new Float32Array(0));
    pcManager.updateHighlight([], highlightMode);

    setInfo((prev) => ({
      ...prev,
      selectedCount: 0,
      selectedChunkCount: 0,
      selectedChunks: [],
      status: '已清空',
    }));
  };

  return (
    <Page plugin={{ name: '点云渲染', desc: '基于 Three.js 的大规模点云渲染与框选', url: '' }}>
      <div className={styles.container} ref={containerRef}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={selectRectRef} className={styles.selectRect} />

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>点云渲染 + BVH 分块</h3>

          {/* 点数量和分块大小 */}
          <div className={styles.row}>
            <select
              className={styles.select}
              value={pointCount}
              onChange={(e) => setPointCount(Number(e.target.value))}
            >
              {POINT_COUNT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select className={styles.select} value={chunkSize} onChange={(e) => setChunkSize(Number(e.target.value))}>
              {CHUNK_SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 筛选模式和重建 */}
          <div className={styles.row}>
            <select
              className={styles.select}
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as 'bvh' | 'full')}
            >
              {FILTER_MODE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button className={styles.btn} onClick={handleRebuild} type='button'>
              重建
            </button>
          </div>

          {/* 框选和清空 */}
          <div className={styles.row}>
            <button
              className={`${styles.btn} ${selectMode ? styles.btnActive : ''}`}
              onClick={() => setSelectMode(!selectMode)}
              type='button'
            >
              框选：{selectMode ? '开' : '关'}
            </button>
            <button className={styles.btn} onClick={handleClearSelection} type='button'>
              清空选中
            </button>
          </div>

          {/* 高亮模式和分块调试 */}
          <div className={styles.row}>
            <button
              className={`${styles.btn} ${highlightMode === 'points' ? styles.btnActive : ''}`}
              onClick={() => setHighlightMode(highlightMode === 'points' ? 'chunk' : 'points')}
              type='button'
            >
              高亮：{highlightMode === 'points' ? '点云' : '分块'}
            </button>
            <button
              className={`${styles.btn} ${showChunkDebug ? styles.btnActive : ''}`}
              onClick={() => setShowChunkDebug(!showChunkDebug)}
              type='button'
            >
              {showChunkDebug ? '隐藏分块' : '显示分块'}
            </button>
          </div>

          {/* 信息面板 */}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>点数量</span>
              <span className={styles.infoValue}>{info.pointCount.toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>分块数量</span>
              <span className={styles.infoValue}>{info.chunkCount.toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>已选中点</span>
              <span className={styles.infoValue}>{info.selectedCount.toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>已选中分块</span>
              <span className={styles.infoValue}>{info.selectedChunkCount.toLocaleString()}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>分块索引</span>
              <span className={styles.infoValue}>{getSelectedChunkSummary(info.selectedChunks)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>筛选模式</span>
              <span className={styles.infoValue}>{filterMode === 'bvh' ? 'BVH' : '全量'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>渲染状态</span>
              <span className={styles.infoValue}>{info.status}</span>
            </div>
          </div>

          <div className={styles.hint}>左键拖拽框选；右键/滚轮旋转缩放</div>
        </div>

        <div className={styles.footer}>点云渲染 + BVH 框选演示</div>
      </div>
    </Page>
  );
};

export default PointCloud;
