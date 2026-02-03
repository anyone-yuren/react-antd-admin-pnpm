/* eslint-disable no-plusplus, no-param-reassign */
import * as THREE from 'three';

import { hashCode, mulberry32 } from './randomUtils';

import type { LodConfig } from './config';

export class OctreeNode {
  center: THREE.Vector3;

  halfSize: number;

  depth: number;

  path: string;

  scene: THREE.Scene;

  children: OctreeNode[] | null = null;

  pointCount = 0;

  nodePointCount = 0;

  // 渲染状态
  geometry: THREE.BufferGeometry | null = null;

  points: THREE.Points | null = null;

  isLoaded = false;

  isVisible = false;

  lastUsedFrame = 0;

  boundingSphere: THREE.Sphere;

  private config: LodConfig;

  constructor(
    center: THREE.Vector3,
    halfSize: number,
    depth: number,
    path: string,
    scene: THREE.Scene,
    config: LodConfig,
  ) {
    this.center = center;
    this.halfSize = halfSize;
    this.depth = depth;
    this.path = path;
    this.scene = scene;
    this.config = config;
    this.boundingSphere = new THREE.Sphere(center.clone(), halfSize * Math.SQRT2);
  }

  get isLeaf(): boolean {
    return this.children === null;
  }

  /** 计算屏幕空间误差 (像素) */
  computeSSE(camera: THREE.PerspectiveCamera, screenHeight: number): number {
    const distance = camera.position.distanceTo(this.center);
    if (distance < 0.001) return Infinity;
    const projectedSize = (this.halfSize * 2) / distance;
    const fovFactor = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    return (projectedSize / fovFactor) * screenHeight;
  }

  /** 生成该节点的点数据 (LOD 层) */
  generatePoints(): void {
    if (this.isLoaded || this.nodePointCount === 0) return;

    const positions = new Float32Array(this.nodePointCount * 3);
    const seed = hashCode(this.path);
    const rng = mulberry32(seed);

    const minX = this.center.x - this.halfSize;
    const minY = this.center.y - this.halfSize;
    const minZ = this.center.z - this.halfSize;
    const size = this.halfSize * 2;

    for (let i = 0; i < this.nodePointCount; i++) {
      const i3 = i * 3;
      positions[i3] = minX + rng() * size;
      positions[i3 + 1] = minY + rng() * size;
      positions[i3 + 2] = minZ + rng() * size;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.computeBoundingSphere();

    // 根据深度调整点大小和颜色
    const depthRatio = this.depth / this.config.maxDepth;
    const hue = 0.55 + depthRatio * 0.15; // 蓝色到青色
    const color = new THREE.Color().setHSL(hue, 0.7, 0.6);

    const material = new THREE.PointsMaterial({
      color,
      size: Math.max(0.3, 1.5 - depthRatio * 1.2),
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(this.geometry, material);
    this.points.frustumCulled = false; // 我们手动做视锥剔除
    this.scene.add(this.points);

    this.isLoaded = true;
  }

  /** 卸载点数据 */
  unload(): void {
    if (!this.isLoaded) return;

    if (this.points) {
      this.scene.remove(this.points);
      this.points.geometry.dispose();
      (this.points.material as THREE.Material).dispose();
      this.points = null;
    }
    this.geometry = null;
    this.isLoaded = false;
  }

  /** 显示/隐藏 */
  setVisible(visible: boolean): void {
    this.isVisible = visible;
    if (this.points) {
      this.points.visible = visible;
    }
  }
}
