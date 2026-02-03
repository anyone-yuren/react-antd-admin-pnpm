/* eslint-disable no-plusplus, no-param-reassign, no-continue, no-restricted-syntax */
import * as THREE from 'three';

import type { NdcRect, PointCloudOctree } from './pointCloudOctree';

export interface SelectionManagerLod {
  selectPointsInRect: (rect: ScreenRect) => void;
  clearSelection: () => void;
  dispose: () => void;
  readonly selectionCount: number;
}

export interface ScreenRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface SelectionManagerLodConfig {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  getOctree: () => PointCloudOctree | null;
}

export function createSelectionManagerLod(config: SelectionManagerLodConfig): SelectionManagerLod {
  const { scene, camera, renderer, getOctree } = config;

  let selectedGeometry: THREE.BufferGeometry | null = null;
  let selectedPoints: THREE.Points | null = null;
  let selectionCount = 0;

  // 创建选中点高亮对象
  function init(): void {
    if (selectedPoints) {
      scene.remove(selectedPoints);
      selectedPoints.geometry.dispose();
      (selectedPoints.material as THREE.Material).dispose();
    }

    selectedGeometry = new THREE.BufferGeometry();
    selectedGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));

    const material = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 1.2,
      sizeAttenuation: true,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });

    selectedPoints = new THREE.Points(selectedGeometry, material);
    selectedPoints.frustumCulled = false;
    selectedPoints.renderOrder = 100;
    scene.add(selectedPoints);
  }

  function updateSelectedGeometry(positions: Float32Array): void {
    if (selectedGeometry) {
      selectedGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      selectedGeometry.computeBoundingSphere();
    }
  }

  function clearSelection(): void {
    selectionCount = 0;
    updateSelectedGeometry(new Float32Array(0));
  }

  function rectToNdc(rect: ScreenRect): NdcRect {
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;
    const minX = (rect.left / width) * 2 - 1;
    const maxX = (rect.right / width) * 2 - 1;
    const minY = -((rect.bottom / height) * 2 - 1);
    const maxY = -((rect.top / height) * 2 - 1);
    return {
      minX: Math.min(minX, maxX),
      maxX: Math.max(minX, maxX),
      minY: Math.min(minY, maxY),
      maxY: Math.max(minY, maxY),
    };
  }

  function selectPointsInRect(rect: ScreenRect): void {
    const octree = getOctree();
    if (!octree) return;

    const ndc = rectToNdc(rect);

    camera.updateMatrixWorld(true);
    const mvpMatrix = new THREE.Matrix4();
    mvpMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const mvpElements: number[] = Array.from(mvpMatrix.elements) as number[];

    // 使用八叉树加速收集候选节点
    const candidateNodes = octree.collectCandidateNodes(ndc, mvpElements);

    // 遍历候选节点的点
    let countSelected = 0;
    const selectedPositionsTemp: number[] = [];

    for (const node of candidateNodes) {
      // 确保节点数据已加载
      if (!node.isLoaded) {
        node.generatePoints();
        octree.loadedNodes.push(node);
      }

      if (!node.geometry) continue;

      const positions = node.geometry.getAttribute('position').array as Float32Array;
      const nodePointCount = positions.length / 3;

      for (let i = 0; i < nodePointCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        const e = mvpElements;
        const cx = e[0] * x + e[4] * y + e[8] * z + e[12];
        const cy = e[1] * x + e[5] * y + e[9] * z + e[13];
        const cw = e[3] * x + e[7] * y + e[11] * z + e[15];

        if (cw <= 0) continue;

        const ndcX = cx / cw;
        const ndcY = cy / cw;

        if (ndcX >= ndc.minX && ndcX <= ndc.maxX && ndcY >= ndc.minY && ndcY <= ndc.maxY) {
          selectedPositionsTemp.push(x, y, z);
          countSelected++;
        }
      }
    }

    selectionCount = countSelected;
    updateSelectedGeometry(new Float32Array(selectedPositionsTemp));
  }

  function dispose(): void {
    if (selectedPoints) {
      scene.remove(selectedPoints);
      selectedPoints.geometry.dispose();
      (selectedPoints.material as THREE.Material).dispose();
      selectedPoints = null;
    }
    selectedGeometry = null;
  }

  init();

  return {
    selectPointsInRect,
    clearSelection,
    dispose,
    get selectionCount() {
      return selectionCount;
    },
  };
}
