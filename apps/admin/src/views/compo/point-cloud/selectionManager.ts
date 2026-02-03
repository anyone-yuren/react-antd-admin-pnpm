/* eslint-disable no-plusplus, no-param-reassign, no-continue, no-restricted-syntax, prefer-destructuring */
import * as THREE from 'three';

import { collectCandidateChunks } from './chunkUtils';

import type { NdcRect } from './chunkUtils';
import type { PointCloudManager } from './pointCloudManager';

export interface SelectionManagerConfig {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  pointCloudManager: PointCloudManager;
  getFilterMode: () => 'bvh' | 'full';
  updateInfo: (status: string) => void;
  getChunkSize: () => number;
  getPointCount: () => number;
}

export interface SelectionResult {
  selectionCount: number;
  selectedChunkCount: number;
  selectedChunks: number[];
}

export interface SelectionManager {
  selectPointsInRect: (rect: ScreenRect) => SelectionResult | null;
  clearSelectionState: () => void;
  readonly selectionCount: number;
  readonly selectedChunkCount: number;
  readonly selectedChunks: number[];
}

export interface ScreenRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function rectToNdc(rect: ScreenRect, renderer: THREE.WebGLRenderer): NdcRect {
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

export function createSelectionManager(config: SelectionManagerConfig): SelectionManager {
  const { camera, renderer, pointCloudManager, getFilterMode, updateInfo, getChunkSize, getPointCount } = config;

  const tempMatrix = new THREE.Matrix4();
  let selectionCount = 0;
  let selectedChunkCount = 0;
  let selectedChunks: number[] = [];

  function checkPointInRect(i3: number, positions: Float32Array, e: Float32Array | number[], ndc: NdcRect): boolean {
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];

    const cx = e[0] * x + e[4] * y + e[8] * z + e[12];
    const cy = e[1] * x + e[5] * y + e[9] * z + e[13];
    const cw = e[3] * x + e[7] * y + e[11] * z + e[15];

    if (cw <= 0) return false;
    const ndcX = cx / cw;
    const ndcY = cy / cw;

    return ndcX >= ndc.minX && ndcX <= ndc.maxX && ndcY >= ndc.minY && ndcY <= ndc.maxY;
  }

  function copyPoint(srcOffset: number, src: Float32Array, dst: Float32Array, dstOffset: number): void {
    dst[dstOffset] = src[srcOffset];
    dst[dstOffset + 1] = src[srcOffset + 1];
    dst[dstOffset + 2] = src[srcOffset + 2];
  }

  function selectPointsInRect(rect: ScreenRect): SelectionResult | null {
    const points = pointCloudManager.points;
    const bvhTree = pointCloudManager.bvhTree;
    const bvhMesh = pointCloudManager.bvhMesh;
    const chunkAabbs = pointCloudManager.chunkAabbs;
    const chunkCount = pointCloudManager.chunkCount;
    const positions = pointCloudManager.positions;

    if (!bvhTree || !points) return null;

    const filterMode = getFilterMode();
    const isBvhMode = filterMode === 'bvh';
    updateInfo(isBvhMode ? 'BVH 筛选中...' : '全量筛选中...');

    camera.updateMatrixWorld(true);
    points.updateMatrixWorld(true);
    if (bvhMesh) {
      bvhMesh.updateMatrixWorld(true);
    }

    const ndc = rectToNdc(rect, renderer);

    // Build MVP matrix for points
    tempMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    tempMatrix.multiply(points.matrixWorld);
    const mvpElements = tempMatrix.elements;

    // For BVH mode, need MVP for chunk boxes
    const bvhMvp = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    if (bvhMesh) bvhMvp.multiply(bvhMesh.matrixWorld);
    const bvhMvpElements = bvhMvp.elements;

    const candidateChunks = isBvhMode
      ? collectCandidateChunks({ selNdc: ndc, mvpElements: bvhMvpElements, chunkCount, chunkAabbs })
      : null;
    const candidateList = isBvhMode ? Array.from(candidateChunks!).sort((a, b) => a - b) : [];

    const e = mvpElements;
    const chunkSize = getChunkSize();
    const pointCount = getPointCount();

    // Pass 1: Count
    let countSelected = 0;
    if (isBvhMode) {
      for (const chunkIndex of candidateList) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(pointCount, start + chunkSize);
        for (let i = start; i < end; i++) {
          const i3 = i * 3;
          if (checkPointInRect(i3, positions, e, ndc)) countSelected++;
        }
      }
    } else {
      for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3;
        if (checkPointInRect(i3, positions, e, ndc)) countSelected++;
      }
    }

    // Pass 2: Fill
    const selectedPositions = new Float32Array(countSelected * 3);
    let offset = 0;
    const selectedChunkSet = new Set<number>();

    if (isBvhMode) {
      for (const chunkIndex of candidateList) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(pointCount, start + chunkSize);
        for (let i = start; i < end; i++) {
          const i3 = i * 3;
          if (checkPointInRect(i3, positions, e, ndc)) {
            copyPoint(i3, positions, selectedPositions, offset);
            offset += 3;
            selectedChunkSet.add(chunkIndex);
          }
        }
      }
    } else {
      for (let i = 0; i < pointCount; i++) {
        const i3 = i * 3;
        if (checkPointInRect(i3, positions, e, ndc)) {
          copyPoint(i3, positions, selectedPositions, offset);
          offset += 3;
          selectedChunkSet.add(Math.floor(i / chunkSize));
        }
      }
    }

    selectedChunks = Array.from(selectedChunkSet).sort((a, b) => a - b);
    selectedChunkCount = selectedChunks.length;
    selectionCount = countSelected;

    pointCloudManager.updateSelectedGeometry(selectedPositions);

    return {
      selectionCount,
      selectedChunkCount,
      selectedChunks,
    };
  }

  function clearSelectionState(): void {
    selectionCount = 0;
    selectedChunkCount = 0;
    selectedChunks = [];
  }

  return {
    selectPointsInRect,
    clearSelectionState,
    get selectionCount() {
      return selectionCount;
    },
    get selectedChunkCount() {
      return selectedChunkCount;
    },
    get selectedChunks() {
      return selectedChunks;
    },
  };
}
