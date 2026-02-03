/* eslint-disable no-plusplus, no-param-reassign, no-continue, no-restricted-syntax, prefer-destructuring */
import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

/** 初始化分块 AABB 数据 */
export function initChunkAabb(chunkCount: number): Float32Array<ArrayBuffer> {
  const data = new Float32Array(chunkCount * 6);
  for (let i = 0; i < chunkCount; i++) {
    const base = i * 6;
    data[base] = Infinity;
    data[base + 1] = Infinity;
    data[base + 2] = Infinity;
    data[base + 3] = -Infinity;
    data[base + 4] = -Infinity;
    data[base + 5] = -Infinity;
  }
  return data;
}

/** 更新分块 AABB */
export function updateChunkAabb(data: Float32Array, chunkIndex: number, x: number, y: number, z: number): void {
  const base = chunkIndex * 6;
  data[base] = Math.min(data[base], x);
  data[base + 1] = Math.min(data[base + 1], y);
  data[base + 2] = Math.min(data[base + 2], z);
  data[base + 3] = Math.max(data[base + 3], x);
  data[base + 4] = Math.max(data[base + 4], y);
  data[base + 5] = Math.max(data[base + 5], z);
}

/** 向目标数组追加盒子顶点 */
function appendBoxVertices(
  target: Float32Array,
  offset: number,
  minX: number,
  minY: number,
  minZ: number,
  maxX: number,
  maxY: number,
  maxZ: number,
): number {
  const v = [
    [minX, minY, minZ],
    [maxX, minY, minZ],
    [maxX, maxY, minZ],
    [minX, maxY, minZ],
    [minX, minY, maxZ],
    [maxX, minY, maxZ],
    [maxX, maxY, maxZ],
    [minX, maxY, maxZ],
  ];

  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [4, 6, 5],
    [4, 7, 6],
    [4, 5, 1],
    [4, 1, 0],
    [3, 2, 6],
    [3, 6, 7],
    [1, 5, 6],
    [1, 6, 2],
    [4, 0, 3],
    [4, 3, 7],
  ];

  let ptr = offset;
  for (const face of faces) {
    for (const index of face) {
      target[ptr] = v[index][0];
      target[ptr + 1] = v[index][1];
      target[ptr + 2] = v[index][2];
      ptr += 3;
    }
  }
  return ptr;
}

export interface UpdateHighlightParams {
  chunkIndices: number[];
  chunkAabbs: Float32Array;
  highlightChunkMesh: THREE.Mesh | null;
  highlightMode: 'points' | 'chunk';
  scene: THREE.Scene;
}

/** 更新高亮分块几何体 */
export function updateHighlightChunkGeometry(params: UpdateHighlightParams): THREE.Mesh {
  const { chunkIndices, chunkAabbs, highlightMode, scene } = params;
  let mesh = params.highlightChunkMesh;

  if (!mesh) {
    const chunkGeometry = new THREE.BufferGeometry();
    chunkGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
    const chunkMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b6b,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    mesh = new THREE.Mesh(chunkGeometry, chunkMaterial);
    mesh.frustumCulled = false;
    mesh.visible = highlightMode !== 'points';
    scene.add(mesh);
  }

  const vertexCount = chunkIndices.length * 36;
  const vertexBuffer = new Float32Array(vertexCount * 3);
  let offset = 0;

  for (const chunkIndex of chunkIndices) {
    const base = chunkIndex * 6;
    const minX = chunkAabbs[base];
    const minY = chunkAabbs[base + 1];
    const minZ = chunkAabbs[base + 2];
    const maxX = chunkAabbs[base + 3];
    const maxY = chunkAabbs[base + 4];
    const maxZ = chunkAabbs[base + 5];
    offset = appendBoxVertices(vertexBuffer, offset, minX, minY, minZ, maxX, maxY, maxZ);
  }

  const geometry = mesh.geometry;
  geometry.setAttribute('position', new THREE.BufferAttribute(vertexBuffer, 3));
  geometry.computeBoundingSphere();

  return mesh;
}

export interface BuildChunkBvhParams {
  chunkCount: number;
  chunkAabbs: Float32Array;
  scene: THREE.Scene;
}

export interface BvhResult {
  bvhMesh: THREE.Mesh;
  bvhTree: MeshBVH;
}

/** 构建分块 BVH */
export function buildChunkBvh(params: BuildChunkBvhParams): BvhResult {
  const { chunkCount, chunkAabbs, scene } = params;

  const vertexCount = chunkCount * 36;
  const vertexBuffer = new Float32Array(vertexCount * 3);
  let offset = 0;

  for (let i = 0; i < chunkCount; i++) {
    const base = i * 6;
    const minX = chunkAabbs[base];
    const minY = chunkAabbs[base + 1];
    const minZ = chunkAabbs[base + 2];
    const maxX = chunkAabbs[base + 3];
    const maxY = chunkAabbs[base + 4];
    const maxZ = chunkAabbs[base + 5];
    offset = appendBoxVertices(vertexBuffer, offset, minX, minY, minZ, maxX, maxY, maxZ);
  }

  const boxGeometry = new THREE.BufferGeometry();
  boxGeometry.setAttribute('position', new THREE.BufferAttribute(vertexBuffer, 3));
  boxGeometry.computeBoundingSphere();

  const bvhMesh = new THREE.Mesh(
    boxGeometry,
    new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
    }),
  );
  bvhMesh.visible = false;
  bvhMesh.frustumCulled = false;
  scene.add(bvhMesh);

  const bvhTree = new MeshBVH(boxGeometry, { maxLeafTris: 12 });

  return { bvhMesh, bvhTree };
}

export interface NdcRect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** 将 AABB 投影到 NDC 空间 */
export function projectAabbToNdc(
  minX: number,
  minY: number,
  minZ: number,
  maxX: number,
  maxY: number,
  maxZ: number,
  mvpElements: Float32Array | number[],
): NdcRect | null {
  const corners = [
    [minX, minY, minZ],
    [maxX, minY, minZ],
    [minX, maxY, minZ],
    [maxX, maxY, minZ],
    [minX, minY, maxZ],
    [maxX, minY, maxZ],
    [minX, maxY, maxZ],
    [maxX, maxY, maxZ],
  ];

  const e = mvpElements;
  let ndcMinX = Infinity;
  let ndcMaxX = -Infinity;
  let ndcMinY = Infinity;
  let ndcMaxY = -Infinity;
  let validCount = 0;

  for (const [px, py, pz] of corners) {
    const cx = e[0] * px + e[4] * py + e[8] * pz + e[12];
    const cy = e[1] * px + e[5] * py + e[9] * pz + e[13];
    const cw = e[3] * px + e[7] * py + e[11] * pz + e[15];

    if (cw <= 0.0001) continue; // behind camera

    const nx = cx / cw;
    const ny = cy / cw;
    ndcMinX = Math.min(ndcMinX, nx);
    ndcMaxX = Math.max(ndcMaxX, nx);
    ndcMinY = Math.min(ndcMinY, ny);
    ndcMaxY = Math.max(ndcMaxY, ny);
    validCount++;
  }

  if (validCount === 0) return null;
  if (validCount < 8) {
    ndcMinX = Math.min(ndcMinX, -1);
    ndcMaxX = Math.max(ndcMaxX, 1);
    ndcMinY = Math.min(ndcMinY, -1);
    ndcMaxY = Math.max(ndcMaxY, 1);
  }

  return { minX: ndcMinX, maxX: ndcMaxX, minY: ndcMinY, maxY: ndcMaxY };
}

/** 判断两个矩形是否重叠 */
export function rectsOverlap(a: NdcRect, b: NdcRect): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

export interface CollectCandidateParams {
  selNdc: NdcRect;
  mvpElements: Float32Array | number[];
  chunkCount: number;
  chunkAabbs: Float32Array;
}

/** 收集候选分块 */
export function collectCandidateChunks(params: CollectCandidateParams): Set<number> {
  const { selNdc, mvpElements, chunkCount, chunkAabbs } = params;
  const candidateChunks = new Set<number>();

  for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
    const base = chunkIndex * 6;
    const minX = chunkAabbs[base];
    const minY = chunkAabbs[base + 1];
    const minZ = chunkAabbs[base + 2];
    const maxX = chunkAabbs[base + 3];
    const maxY = chunkAabbs[base + 4];
    const maxZ = chunkAabbs[base + 5];

    if (!Number.isFinite(minX) || !Number.isFinite(maxX)) continue;

    const aabbNdc = projectAabbToNdc(minX, minY, minZ, maxX, maxY, maxZ, mvpElements);
    if (!aabbNdc) continue;

    if (rectsOverlap(selNdc, aabbNdc)) {
      candidateChunks.add(chunkIndex);
    }
  }

  return candidateChunks;
}
