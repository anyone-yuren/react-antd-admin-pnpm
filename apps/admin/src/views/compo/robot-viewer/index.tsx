import { useTheme } from 'antd-style';
import React from 'react';
import * as THREE from 'three';

import { Page } from '@/components/Page';

import { materialPresets } from './materials';
import { applyCurrentMaterial, captureOriginalMaterials, restoreOriginalMaterials } from './materialUtils';
import {
  centerModel,
  dumpHierarchy,
  focusCamera,
  loadFBXModel,
  resolveEditableNode,
  scaleModelToFit,
} from './modelUtils';
import { CollapsibleSection, MaterialPanel, TransformPanelSection } from './PanelComponents';
import { createScene, disposeScene, setupSceneEnvironment } from './sceneSetup';
import { useRobotViewerStyles } from './styles';
import { TransformManager } from './TransformManager';
import {
  applyTransformFromInputs,
  formatTransformData,
  restoreOriginalTransforms,
  storeOriginalTransforms,
  syncTransformInputs,
} from './transformUtils';

import type { MaterialPresetId } from './materials';
import type { TransformMode } from './TransformManager';

const MODEL_URL = '/models/r15-15.fbx';

const RobotViewer: React.FC = () => {
  const { styles, theme } = useRobotViewerStyles();
  const token = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);
  const selectionStatusRef = React.useRef<HTMLDivElement>(null);
  const nodeListRef = React.useRef<HTMLDivElement>(null);
  const hierarchyStatusRef = React.useRef<HTMLDivElement>(null);
  const materialPanelRef = React.useRef<HTMLDivElement>(null);
  const materialSelectRef = React.useRef<HTMLSelectElement>(null);
  const colorPickerRef = React.useRef<HTMLInputElement>(null);
  const editModeModelRef = React.useRef<HTMLButtonElement>(null);
  const editModeNodeRef = React.useRef<HTMLButtonElement>(null);
  const transformPanelRef = React.useRef<HTMLDivElement>(null);
  const resetBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const panelEl = panelRef.current;
    const statusEl = statusRef.current;
    const selectionStatusEl = selectionStatusRef.current;
    const nodeListEl = nodeListRef.current;
    const hierarchyStatusEl = hierarchyStatusRef.current;
    const materialPanelEl = materialPanelRef.current;
    const materialSelectEl = materialSelectRef.current;
    const colorPickerEl = colorPickerRef.current;
    const editModeModelBtn = editModeModelRef.current;
    const editModeNodeBtn = editModeNodeRef.current;
    const transformPanelEl = transformPanelRef.current;
    const resetBtn = resetBtnRef.current;

    // 检查必需的 refs
    if (!container || !canvas) {
      return;
    }

    if (!panelEl || !statusEl || !selectionStatusEl || !nodeListEl || !hierarchyStatusEl) {
      return;
    }

    if (!materialPanelEl || !materialSelectEl || !colorPickerEl) {
      return;
    }

    if (!editModeModelBtn || !editModeNodeBtn || !transformPanelEl || !resetBtn) {
      return;
    }

    const transformInputs = Array.from(transformPanelEl.querySelectorAll('input')) as HTMLInputElement[];

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width || container.clientWidth);
      const height = Math.max(1, rect.height || container.clientHeight);
      return { width, height };
    };

    const { width, height } = getSize();
    // 使用主题背景颜色
    const isDarkMode = theme?.appearance === 'dark';
    const bgColor = token.colorBgLayout;
    const { scene, camera, renderer, orbitControls, raycaster, pointer } = createScene(canvas, width, height, bgColor);
    setupSceneEnvironment(scene, isDarkMode);

    const transformManager = new TransformManager(scene, camera, renderer.domElement, orbitControls, { size: 1.1 });

    let model: THREE.Object3D | null = null;
    let initialTransform: { position: THREE.Vector3; rotation: THREE.Euler; scale: THREE.Vector3 } | null = null;
    let selectableNodes: THREE.Object3D[] = [];
    let selectedNode: THREE.Object3D | null = null;
    let selectionBox: THREE.BoxHelper | null = null;
    let editTargetMode: 'model' | 'node' = 'model';
    let currentMaterialId: MaterialPresetId = 'builtin-basic';
    let currentColor = '#808080';
    const originalMaterials = new Map<string, THREE.Material | THREE.Material[]>();
    const originalNodeTransforms = new Map<
      string,
      { position: THREE.Vector3; quaternion: THREE.Quaternion; scale: THREE.Vector3 }
    >();
    const animatedShaderMaterials = new Set<THREE.ShaderMaterial>();

    function updateStatus(data?: { position: number[]; rotation: number[]; scale: number[] }, dragging?: boolean) {
      if (!data) return;
      const p = data.position.map((v) => v.toFixed(2)).join(', ');
      const r = data.rotation.map((v) => v.toFixed(1)).join(', ');
      const s = data.scale.map((v) => v.toFixed(2)).join(', ');
      statusEl.innerHTML = `
        <div>位置: (${p})</div>
        <div>旋转: (${r})</div>
        <div>缩放: (${s})</div>
        <div>拖拽: ${dragging ? '是' : '否'}</div>
      `;
    }

    function getCurrentTransformTarget() {
      if (editTargetMode === 'model') return model;
      return selectedNode || model;
    }

    function syncTransformPanel(target?: THREE.Object3D | null) {
      syncTransformInputs(target, transformInputs);
    }

    function applyTransformFromPanel() {
      const target = getCurrentTransformTarget();
      if (!target) return;
      applyTransformFromInputs(target, transformInputs);
      updateStatus(formatTransformData(target), false);
      if (selectionBox) {
        selectionBox.update();
      }
    }

    transformManager.setOnTransformChange((data) => {
      updateStatus(data, transformManager.isTransforming);
      syncTransformPanel(getCurrentTransformTarget() ?? undefined);
    });

    transformManager.setOnTransformStart(() => {
      const target = selectedNode || model;
      if (target) {
        updateStatus(formatTransformData(target), true);
        syncTransformPanel(target);
      }
    });

    transformManager.setOnTransformEnd(() => {
      const target = selectedNode || model;
      if (target) {
        updateStatus(formatTransformData(target), false);
        syncTransformPanel(target);
      }
    });

    function setActiveButton(selector: string, value: string) {
      const buttons = Array.from(panelEl.querySelectorAll(selector)) as HTMLButtonElement[];
      for (const btn of buttons) {
        if (btn.dataset.mode === value) {
          btn.classList.add(styles.btnActive);
        } else {
          btn.classList.remove(styles.btnActive);
        }
      }
    }

    function updateSelectionStatus(object?: THREE.Object3D | null) {
      if (!object) {
        selectionStatusEl.innerHTML = '<div>已选中: 无</div>';
        return;
      }
      const name = object.name || 'Unnamed';
      const id = (object.userData as { nodeId?: string }).nodeId || '-';
      selectionStatusEl.innerHTML = `
        <div>已选中: ${name}</div>
        <div>ID: ${id}</div>
      `;
    }

    function attachByMode() {
      if (!model) return;
      if (editTargetMode === 'model') {
        transformManager.attach(model);
      } else if (selectedNode) {
        const target = resolveEditableNode(selectedNode);
        if (target) {
          transformManager.attach(target);
        }
      }
    }

    function setSelectedNode(object: THREE.Object3D) {
      if (!object) return;
      selectedNode = object;
      if (editTargetMode === 'node') {
        attachByMode();
      }
      updateSelectionStatus(object);

      if (selectionBox) {
        scene.remove(selectionBox);
        selectionBox.geometry.dispose();
        (selectionBox.material as THREE.Material).dispose();
        selectionBox = null;
      }
      selectionBox = new THREE.BoxHelper(object, 0x2f87ff);
      scene.add(selectionBox);

      // 更新节点列表选中状态（如果节点列表已展开）
      if (nodeListEl) {
        nodeListEl.querySelectorAll(`.${styles.nodeItem}`).forEach((item) => {
          const { nodeId } = (item as HTMLElement).dataset;
          item.classList.toggle(
            styles.nodeItemActive,
            nodeId === String((object.userData as { nodeId?: string }).nodeId),
          );
        });
      }

      updateStatus(formatTransformData(object), false);
      syncTransformPanel(object);
    }

    function buildNodeList(root?: THREE.Object3D | null) {
      if (!nodeListEl) return; // 防御性检查

      nodeListEl.innerHTML = '';
      if (!root) {
        nodeListEl.innerHTML = '<div style="font-size:12px;color:#7f92a8;">无节点</div>';
        return;
      }

      const fragment = document.createDocumentFragment();

      const walk = (node: THREE.Object3D, depth: number) => {
        const item = document.createElement('div');
        item.className = styles.nodeItem;
        item.dataset.nodeId = String((node.userData as { nodeId?: string }).nodeId ?? '');

        const label = document.createElement('div');
        label.className = styles.nodeLabel;
        label.style.paddingLeft = `${Math.min(depth * 12, 96)}px`;

        const name = document.createElement('span');
        name.className = styles.nodeLabelText;
        name.textContent = node.name || 'Unnamed';

        const type = document.createElement('small');
        type.textContent = node.type || 'Object3D';

        const id = document.createElement('small');
        id.textContent = String((node.userData as { nodeId?: string }).nodeId ?? '');

        label.appendChild(name);
        label.appendChild(type);

        item.appendChild(label);
        item.appendChild(id);

        item.addEventListener('click', () => setSelectedNode(node));
        fragment.appendChild(item);

        node.children?.forEach((child) => walk(child, depth + 1));
      };

      walk(root, 0);
      nodeListEl.appendChild(fragment);
    }

    function pickNode(event: PointerEvent) {
      if (!model || transformManager.isTransforming) return;
      if (event.button !== 0) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(selectableNodes, true);

      if (intersects.length > 0) {
        setSelectedNode(intersects[0].object as THREE.Object3D);
      }
    }

    setActiveButton('[data-mode]', 'translate');

    panelEl.querySelectorAll('[data-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = (btn as HTMLButtonElement).dataset.mode as TransformMode | undefined;
        if (!mode) return;
        transformManager.setMode(mode);
        setActiveButton('[data-mode]', mode);
      });
    });

    function updateMaterialPanelState() {
      const enabled = editTargetMode === 'node';
      // 只修改视觉样式，不禁用点击
      materialPanelEl.style.opacity = enabled ? '1' : '0.6';
      // 移除 pointerEvents 设置，保持材质面板始终可点击
      if (enabled) {
        materialPanelEl.style.filter = 'none';
      } else {
        materialPanelEl.style.filter = 'grayscale(0.3)';
      }
    }

    function applyMaterial() {
      applyCurrentMaterial(
        editTargetMode,
        selectedNode,
        currentMaterialId,
        currentColor,
        originalMaterials,
        animatedShaderMaterials,
      );
    }

    resetBtn.addEventListener('click', () => {
      if (!model || !initialTransform) return;
      model.position.copy(initialTransform.position);
      model.rotation.copy(initialTransform.rotation);
      model.scale.copy(initialTransform.scale);
      restoreOriginalTransforms(model, originalNodeTransforms);
      updateStatus(formatTransformData(model), false);
      if (selectedNode) {
        setSelectedNode(selectedNode);
      }
      syncTransformPanel(getCurrentTransformTarget() ?? undefined);
    });

    editModeModelBtn.addEventListener('click', () => {
      editTargetMode = 'model';
      editModeModelBtn.classList.add(styles.btnActive);
      editModeNodeBtn.classList.remove(styles.btnActive);
      restoreOriginalMaterials(model, originalMaterials, animatedShaderMaterials);
      attachByMode();
      updateMaterialPanelState();
      syncTransformPanel(getCurrentTransformTarget() ?? undefined);
    });

    editModeNodeBtn.addEventListener('click', () => {
      editTargetMode = 'node';
      editModeNodeBtn.classList.add(styles.btnActive);
      editModeModelBtn.classList.remove(styles.btnActive);
      attachByMode();
      updateMaterialPanelState();
      syncTransformPanel(getCurrentTransformTarget() ?? undefined);
    });

    materialSelectEl.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      currentMaterialId = target.value as MaterialPresetId;
      const preset = materialPresets[currentMaterialId];
      if (preset?.color) {
        currentColor = preset.color;
        colorPickerEl.value = preset.color;
      }
      applyMaterial();
    });

    colorPickerEl.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      currentColor = target.value;
      applyMaterial();
    });

    transformInputs.forEach((input) => {
      const { kind } = input.dataset;
      const eventName = kind === 'range' ? 'input' : 'change';
      input.addEventListener(eventName, () => {
        const type = input.dataset.transform;
        const { axis } = input.dataset;
        if (type && axis) {
          const pair = transformPanelEl.querySelector(
            `input[data-transform="${type}"][data-axis="${axis}"]${
              kind === 'range' ? '[data-kind=number]' : '[data-kind=range]'
            }`,
          ) as HTMLInputElement | null;
          if (pair) {
            pair.value = input.value;
          }
        }
        applyTransformFromPanel();
      });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (key === 't') {
        transformManager.setMode('translate');
        setActiveButton('[data-mode]', 'translate');
      }
      if (key === 'r') {
        transformManager.setMode('rotate');
        setActiveButton('[data-mode]', 'rotate');
      }
      if (key === 's') {
        transformManager.setMode('scale');
        setActiveButton('[data-mode]', 'scale');
      }
    };

    window.addEventListener('keydown', onKeyDown);

    async function initModel() {
      try {
        const { model: loadedModel, selectableNodes: nodes, stats } = await loadFBXModel(MODEL_URL);

        scaleModelToFit(loadedModel, 6);
        centerModel(loadedModel);
        scene.add(loadedModel);
        model = loadedModel;
        selectableNodes = nodes;
        captureOriginalMaterials(loadedModel, originalMaterials);
        storeOriginalTransforms(loadedModel, originalNodeTransforms);
        initialTransform = {
          position: loadedModel.position.clone(),
          rotation: loadedModel.rotation.clone(),
          scale: loadedModel.scale.clone(),
        };

        transformManager.attach(loadedModel);
        focusCamera(loadedModel, camera, orbitControls);
        buildNodeList(loadedModel);
        setSelectedNode(loadedModel);
        dumpHierarchy(loadedModel);

        syncTransformPanel(loadedModel);

        editModeModelBtn.classList.add(styles.btnActive);
        editModeNodeBtn.classList.remove(styles.btnActive);
        updateMaterialPanelState();

        if (hierarchyStatusEl) {
          hierarchyStatusEl.innerHTML = `
            <div>层级: 总数 ${stats.total}</div>
            <div>Mesh ${stats.mesh} | Group ${stats.group}</div>
            <div>相机 ${stats.camera} | 光源 ${stats.light} | 骨骼 ${stats.bone}</div>
          `;
        }

        updateStatus(formatTransformData(loadedModel), false);
      } catch (err: unknown) {
        statusEl.innerHTML = `加载失败：${(err as Error).message}`;
      }
    }

    const clock = new THREE.Clock();
    let animationId = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      animatedShaderMaterials.forEach((mat) => {
        if (mat.uniforms?.uTime) {
          mat.uniforms.uTime.value = elapsed;
        }
      });

      orbitControls.update();
      if (selectionBox) {
        selectionBox.update();
      }
      renderer.render(scene, camera);
    }

    const resizeObserver = new ResizeObserver(() => {
      const next = getSize();
      camera.aspect = next.width / next.height;
      camera.updateProjectionMatrix();
      renderer.setSize(next.width, next.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    resizeObserver.observe(container);
    renderer.domElement.addEventListener('pointerdown', pickNode);

    initModel();
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      renderer.domElement.removeEventListener('pointerdown', pickNode);
      cancelAnimationFrame(animationId);
      transformManager.dispose();
      disposeScene(scene, renderer, orbitControls);
      animatedShaderMaterials.clear();
      originalMaterials.clear();
      originalNodeTransforms.clear();
    };
  }, [styles, theme, token]);

  return (
    <Page plugin={{ name: '机器人编辑器', desc: '基于 Three.js 的模型编辑器', url: '' }}>
      <div className={styles.container} ref={containerRef}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <div className={styles.panel} ref={panelRef}>
          <h3 className={styles.panelTitle}>模型编辑（/models/r15-15.fbx）</h3>

          {/* 操作控制区域 */}
          <CollapsibleSection title='操作控制' styles={styles} defaultExpanded={true}>
            <div className={styles.row}>
              <label className={styles.rowLabel}>模式</label>
              <div className={styles.modeButtonGroup}>
                <button className={`${styles.btn} ${styles.modeButton}`} data-mode='translate' type='button'>
                  平移(T)
                </button>
                <button className={`${styles.btn} ${styles.modeButton}`} data-mode='rotate' type='button'>
                  旋转(R)
                </button>
                <button className={`${styles.btn} ${styles.modeButton}`} data-mode='scale' type='button'>
                  缩放(S)
                </button>
              </div>
            </div>

            <div className={styles.row}>
              <label className={styles.rowLabel}>编辑对象</label>
              <button className={styles.btn} ref={editModeModelRef} type='button'>
                整体
              </button>
              <button className={styles.btn} ref={editModeNodeRef} type='button'>
                节点
              </button>
              <button className={styles.btn} ref={resetBtnRef} type='button'>
                重置
              </button>
            </div>

            <div className={styles.status} ref={statusRef}>
              <div>位置: (0, 0, 0)</div>
              <div>旋转: (0, 0, 0)</div>
              <div>缩放: (1, 1, 1)</div>
              <div>拖拽: 否</div>
            </div>
          </CollapsibleSection>

          {/* 变换控制 */}
          <TransformPanelSection
            styles={styles}
            transformPanelRef={transformPanelRef as React.RefObject<HTMLDivElement>}
          />

          {/* 选择状态 */}
          <CollapsibleSection title='选择状态' styles={styles} defaultExpanded={true}>
            <div className={styles.status} ref={selectionStatusRef}>
              <div>已选中: 无</div>
            </div>
          </CollapsibleSection>

          {/* 材质编辑 */}
          <MaterialPanel
            styles={styles}
            materialPanelRef={materialPanelRef as React.RefObject<HTMLDivElement>}
            materialSelectRef={materialSelectRef as React.RefObject<HTMLSelectElement>}
            colorPickerRef={colorPickerRef as React.RefObject<HTMLInputElement>}
          />

          {/* 层级信息 */}
          <CollapsibleSection title='层级信息' styles={styles} defaultExpanded={true}>
            <div className={styles.status} ref={hierarchyStatusRef}>
              <div>层级: -</div>
            </div>
          </CollapsibleSection>

          {/* 节点列表 */}
          <CollapsibleSection title='节点列表' styles={styles} defaultExpanded={true}>
            <div className={styles.nodeList} ref={nodeListRef} />
          </CollapsibleSection>
        </div>

        <div className={styles.footer}>左键选中节点，拖拽编辑；右键/滚轮为轨道控制</div>
      </div>
    </Page>
  );
};

export default RobotViewer;
