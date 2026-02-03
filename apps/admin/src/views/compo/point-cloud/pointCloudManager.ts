/* eslint-disable no-plusplus, no-param-reassign, no-continue, no-restricted-syntax, no-await-in-loop */
import * as THREE from 'three';

import { buildChunkBvh, initChunkAabb, updateChunkAabb, updateHighlightChunkGeometry } from './chunkUtils';

import type { MeshBVH } from 'three-mesh-bvh';

export interface PointCloudManagerConfig {
  scene: THREE.Scene;
  updateInfo: (status: string) => void;
  getChunkSize: () => number;
}

export interface PointCloudManager {
  generate: (count: number) => Promise<void>;
  dispose: () => void;
  updateSelectedGeometry: (selectedPositions: Float32Array) => void;
  updateHighlight: (chunkIndices: number[], highlightMode: 'points' | 'chunk') => void;
  readonly points: THREE.Points | null;
  readonly positions: Float32Array;
  readonly chunkAabbs: Float32Array;
  readonly chunkCount: number;
  readonly bvhMesh: THREE.Mesh | null;
  readonly bvhTree: MeshBVH | null;
  readonly selectedPoints: THREE.Points | null;
  highlightChunkMesh: THREE.Mesh | null;
}

export function createPointCloudManager(config: PointCloudManagerConfig): PointCloudManager {
  const { scene, updateInfo, getChunkSize } = config;

  let points: THREE.Points | null = null;
  let selectedPoints: THREE.Points | null = null;
  let selectedGeometry: THREE.BufferGeometry | null = null;
  let bvhMesh: THREE.Mesh | null = null;
  let bvhTree: MeshBVH | null = null;
  let highlightChunkMesh: THREE.Mesh | null = null;

  let pointCount = 0;
  let chunkCount = 0;
  let positions = new Float32Array(0);
  let chunkAabbs = new Float32Array(0);

  function dispose(): void {
    if (points) {
      scene.remove(points);
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
      points = null;
    }

    if (selectedPoints) {
      scene.remove(selectedPoints);
      selectedPoints.geometry.dispose();
      (selectedPoints.material as THREE.Material).dispose();
      selectedPoints = null;
    }

    if (bvhMesh) {
      scene.remove(bvhMesh);
      bvhMesh.geometry.dispose();
      (bvhMesh.material as THREE.Material).dispose();
      bvhMesh = null;
    }

    if (highlightChunkMesh) {
      scene.remove(highlightChunkMesh);
      highlightChunkMesh.geometry.dispose();
      (highlightChunkMesh.material as THREE.Material).dispose();
      highlightChunkMesh = null;
    }

    bvhTree = null;
    selectedGeometry = null;
  }

  function createSelectedPoints(): void {
    selectedGeometry = new THREE.BufferGeometry();
    selectedGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
    const selectedMaterial = new THREE.PointsMaterial({
      color: 0xffd54f,
      size: 0.6,
      sizeAttenuation: true,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
    selectedPoints = new THREE.Points(selectedGeometry, selectedMaterial);
    selectedPoints.frustumCulled = false;
    selectedPoints.renderOrder = 10;
    scene.add(selectedPoints);
  }

  function updateSelectedGeometryData(selectedPositions: Float32Array): void {
    if (!selectedGeometry) return;
    selectedGeometry.setAttribute('position', new THREE.BufferAttribute(selectedPositions, 3));
    selectedGeometry.setDrawRange(0, selectedPositions.length / 3);
    selectedGeometry.computeBoundingSphere();
    selectedGeometry.attributes.position.needsUpdate = true;
  }

  function updateHighlight(chunkIndices: number[], highlightMode: 'points' | 'chunk'): void {
    highlightChunkMesh = updateHighlightChunkGeometry({
      chunkIndices,
      chunkAabbs,
      highlightChunkMesh,
      highlightMode,
      scene,
    });
  }

  async function generate(count: number): Promise<void> {
    dispose();
    updateInfo('生成点云中...');

    pointCount = count;
    const chunkSize = getChunkSize();
    positions = new Float32Array(pointCount * 3);
    chunkCount = Math.ceil(pointCount / chunkSize);
    chunkAabbs = initChunkAabb(chunkCount);

    const range = 200;
    const gridSize = Math.ceil(Math.cbrt(chunkCount));
    const worldMin = -range * 0.5;
    const cellSize = range / gridSize;
    const chunkBatch = 8;

    for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
      const ix = chunkIndex % gridSize;
      const iy = Math.floor(chunkIndex / gridSize) % gridSize;
      const iz = Math.floor(chunkIndex / (gridSize * gridSize));

      const minX = worldMin + ix * cellSize;
      const minY = worldMin + iy * cellSize;
      const minZ = worldMin + iz * cellSize;

      const start = chunkIndex * chunkSize;
      const end = Math.min(pointCount, start + chunkSize);
      for (let i = start; i < end; i++) {
        const i3 = i * 3;
        const x = minX + Math.random() * cellSize;
        const y = minY + Math.random() * cellSize;
        const z = minZ + Math.random() * cellSize;
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        updateChunkAabb(chunkAabbs, chunkIndex, x, y, z);
      }

      if (chunkIndex % chunkBatch === 0) {
        updateInfo(`生成点云 ${(((chunkIndex + 1) / chunkCount) * 100).toFixed(1)}%`);
        await new Promise(requestAnimationFrame);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    const material = new THREE.PointsMaterial({
      color: 0x6fd3ff,
      size: 0.3,
      sizeAttenuation: true,
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    createSelectedPoints();
    const bvhResult = buildChunkBvh({ chunkCount, chunkAabbs, scene });
    bvhMesh = bvhResult.bvhMesh;
    bvhTree = bvhResult.bvhTree;

    updateInfo('BVH 构建完成');
    updateHighlight([], 'points');
    updateInfo('已就绪');
  }

  return {
    generate,
    dispose,
    updateSelectedGeometry: updateSelectedGeometryData,
    updateHighlight,
    get points() {
      return points;
    },
    get positions() {
      return positions;
    },
    get chunkAabbs() {
      return chunkAabbs;
    },
    get chunkCount() {
      return chunkCount;
    },
    get bvhMesh() {
      return bvhMesh;
    },
    get bvhTree() {
      return bvhTree;
    },
    get selectedPoints() {
      return selectedPoints;
    },
    get highlightChunkMesh() {
      return highlightChunkMesh;
    },
    set highlightChunkMesh(mesh: THREE.Mesh | null) {
      highlightChunkMesh = mesh;
    },
  };
}
