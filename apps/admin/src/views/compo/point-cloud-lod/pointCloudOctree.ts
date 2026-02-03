/* eslint-disable no-plusplus, no-param-reassign, no-continue, no-restricted-syntax, no-bitwise, no-console, class-methods-use-this */
import * as THREE from 'three';

import { OctreeNode } from './octreeNode';

import type { LodConfig } from './config';

export interface NdcRect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function rectsOverlap(a: NdcRect, b: NdcRect): boolean {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

export class PointCloudOctree {
  totalPoints: number;

  worldSize: number;

  maxDepth: number;

  scene: THREE.Scene;

  root: OctreeNode | null = null;

  allNodes: OctreeNode[] = [];

  loadedNodes: OctreeNode[] = [];

  visibleNodes: OctreeNode[] = [];

  frameCounter = 0;

  private frustum = new THREE.Frustum();

  private projScreenMatrix = new THREE.Matrix4();

  private config: LodConfig;

  constructor(totalPoints: number, config: LodConfig, scene: THREE.Scene) {
    this.totalPoints = totalPoints;
    this.worldSize = config.worldSize;
    this.maxDepth = config.maxDepth;
    this.scene = scene;
    this.config = config;
    this.build();
  }

  private build(): void {
    const halfSize = this.worldSize / 2;
    this.root = this.buildNode(new THREE.Vector3(0, 0, 0), halfSize, 0, 'r', this.totalPoints);
    console.log(`Octree built: ${this.allNodes.length} nodes, ${this.totalPoints.toLocaleString()} total points`);
  }

  private buildNode(
    center: THREE.Vector3,
    halfSize: number,
    depth: number,
    path: string,
    remainingPoints: number,
  ): OctreeNode {
    const node = new OctreeNode(center, halfSize, depth, path, this.scene, this.config);
    this.allNodes.push(node);

    // 到达最大深度或点数较少，作为叶节点
    if (depth >= this.maxDepth || remainingPoints <= this.config.pointsPerLeaf) {
      node.pointCount = remainingPoints;
      node.nodePointCount = remainingPoints;
      return node;
    }

    // 计算该 LOD 层的点数 (越高层越稀疏)
    const lodFactor = this.config.lodBase ** (this.maxDepth - depth);
    node.nodePointCount = Math.floor(remainingPoints * lodFactor * 0.1);
    node.nodePointCount = Math.min(node.nodePointCount, this.config.pointsPerLeaf);

    // 递归构建子节点
    node.children = [];
    const childHalf = halfSize / 2;
    const pointsPerChild = Math.floor(remainingPoints / 8);

    for (let i = 0; i < 8; i++) {
      const offsetX = i & 1 ? childHalf : -childHalf;
      const offsetY = i & 2 ? childHalf : -childHalf;
      const offsetZ = i & 4 ? childHalf : -childHalf;

      const childCenter = new THREE.Vector3(center.x + offsetX, center.y + offsetY, center.z + offsetZ);
      const childPath = path + i;
      const child = this.buildNode(childCenter, childHalf, depth + 1, childPath, pointsPerChild);
      node.children.push(child);
    }

    node.pointCount = remainingPoints;
    return node;
  }

  /** 每帧更新：视锥剔除 + LOD 选择 */
  update(camera: THREE.PerspectiveCamera, screenHeight: number, sseThreshold: number, pointBudget: number): number {
    this.frameCounter++;

    // 更新视锥
    camera.updateMatrixWorld();
    this.projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);

    // 保存上一帧可见节点
    const prevVisibleNodes = this.visibleNodes;
    this.visibleNodes = [];

    // 递归遍历，选择要渲染的节点
    let renderedPoints = 0;
    const nodesToRender: Array<{ node: OctreeNode; sse: number; distance: number }> = [];

    const traverse = (node: OctreeNode): void => {
      // 视锥剔除
      if (!this.frustum.intersectsSphere(node.boundingSphere)) {
        return;
      }

      const sse = node.computeSSE(camera, screenHeight);

      // 如果是叶节点或 SSE 小于阈值，渲染此节点
      if (node.isLeaf || sse < sseThreshold) {
        nodesToRender.push({ node, sse, distance: camera.position.distanceTo(node.center) });
        return;
      }

      // 否则，先添加此节点作为过渡，再递归子节点
      nodesToRender.push({ node, sse, distance: camera.position.distanceTo(node.center) });

      for (const child of node.children!) {
        traverse(child);
      }
    };

    if (this.root) {
      traverse(this.root);
    }

    // 按距离排序 (近处优先)
    nodesToRender.sort((a, b) => a.distance - b.distance);

    // 收集本帧要渲染的节点
    const newVisibleSet = new Set<OctreeNode>();
    for (const { node } of nodesToRender) {
      if (renderedPoints >= pointBudget) break;

      // 确保节点数据已加载
      if (!node.isLoaded) {
        this.loadNode(node);
      }

      newVisibleSet.add(node);
      node.lastUsedFrame = this.frameCounter;
      this.visibleNodes.push(node);
      renderedPoints += node.nodePointCount;
    }

    // 只隐藏不再可见的节点 (避免闪烁)
    for (const node of prevVisibleNodes) {
      if (!newVisibleSet.has(node)) {
        node.setVisible(false);
      }
    }

    // 只显示新可见的节点
    for (const node of this.visibleNodes) {
      node.setVisible(true);
    }

    // LRU 淘汰
    this.evictNodes();

    return renderedPoints;
  }

  private loadNode(node: OctreeNode): void {
    node.generatePoints();
    if (node.isLoaded) {
      this.loadedNodes.push(node);
    }
  }

  private evictNodes(): void {
    if (this.loadedNodes.length <= this.config.maxLoadedNodes) return;

    // 按 lastUsedFrame 排序，淘汰最久未用的
    this.loadedNodes.sort((a, b) => b.lastUsedFrame - a.lastUsedFrame);

    while (this.loadedNodes.length > this.config.maxLoadedNodes) {
      const node = this.loadedNodes.pop();
      if (node && !node.isVisible) {
        node.unload();
      }
    }
  }

  /** 获取内存使用 (MB) */
  getMemoryUsage(): number {
    let bytes = 0;
    for (const node of this.loadedNodes) {
      if (node.geometry) {
        bytes += node.nodePointCount * 12; // 3 * Float32
      }
    }
    return bytes / (1024 * 1024);
  }

  /** 框选：收集候选节点 */
  collectCandidateNodes(selNdc: NdcRect, mvpElements: number[]): OctreeNode[] {
    const candidates: OctreeNode[] = [];

    const traverse = (node: OctreeNode): void => {
      // 投影节点 AABB 到 NDC
      const aabbNdc = this.projectAabbToNdc(node, mvpElements);
      if (!aabbNdc) return; // behind camera

      if (!rectsOverlap(selNdc, aabbNdc)) return; // 不相交

      if (node.isLeaf || !node.children) {
        candidates.push(node);
        return;
      }

      // 递归子节点
      for (const child of node.children) {
        traverse(child);
      }
    };

    if (this.root) {
      traverse(this.root);
    }
    return candidates;
  }

  private projectAabbToNdc(node: OctreeNode, mvpElements: number[]): NdcRect | null {
    const c = node.center;
    const h = node.halfSize;
    const corners = [
      [c.x - h, c.y - h, c.z - h],
      [c.x + h, c.y - h, c.z - h],
      [c.x - h, c.y + h, c.z - h],
      [c.x + h, c.y + h, c.z - h],
      [c.x - h, c.y - h, c.z + h],
      [c.x + h, c.y - h, c.z + h],
      [c.x - h, c.y + h, c.z + h],
      [c.x + h, c.y + h, c.z + h],
    ];

    const e = mvpElements;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let validCount = 0;

    for (const [px, py, pz] of corners) {
      const cx = e[0] * px + e[4] * py + e[8] * pz + e[12];
      const cy = e[1] * px + e[5] * py + e[9] * pz + e[13];
      const cw = e[3] * px + e[7] * py + e[11] * pz + e[15];

      if (cw <= 0.0001) continue;

      const nx = cx / cw;
      const ny = cy / cw;
      minX = Math.min(minX, nx);
      maxX = Math.max(maxX, nx);
      minY = Math.min(minY, ny);
      maxY = Math.max(maxY, ny);
      validCount++;
    }

    if (validCount === 0) return null;
    if (validCount < 8) {
      minX = Math.min(minX, -1);
      maxX = Math.max(maxX, 1);
      minY = Math.min(minY, -1);
      maxY = Math.max(maxY, 1);
    }

    return { minX, maxX, minY, maxY };
  }

  dispose(): void {
    for (const node of this.allNodes) {
      node.unload();
    }
    this.allNodes = [];
    this.loadedNodes = [];
    this.visibleNodes = [];
    this.root = null;
  }
}
