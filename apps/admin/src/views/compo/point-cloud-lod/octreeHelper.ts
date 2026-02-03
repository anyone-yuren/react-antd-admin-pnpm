/* eslint-disable no-plusplus, no-param-reassign, no-restricted-syntax */
import * as THREE from 'three';

import type { PointCloudOctree } from './pointCloudOctree';

export interface OctreeHelper {
  update: (octree: PointCloudOctree) => void;
  toggle: () => boolean;
  dispose: () => void;
  isVisible: boolean;
}

export function createOctreeHelper(scene: THREE.Scene): OctreeHelper {
  let octreeHelper: THREE.LineSegments | null = null;
  let showOctree = false;

  function update(octree: PointCloudOctree): void {
    if (octreeHelper) {
      scene.remove(octreeHelper);
      octreeHelper.geometry.dispose();
      (octreeHelper.material as THREE.Material).dispose();
      octreeHelper = null;
    }

    if (!showOctree || !octree) return;

    // 只显示可见节点的边界框
    const vertices: number[] = [];

    for (const node of octree.visibleNodes) {
      const c = node.center;
      const h = node.halfSize;
      const corners = [
        [c.x - h, c.y - h, c.z - h],
        [c.x + h, c.y - h, c.z - h],
        [c.x + h, c.y + h, c.z - h],
        [c.x - h, c.y + h, c.z - h],
        [c.x - h, c.y - h, c.z + h],
        [c.x + h, c.y - h, c.z + h],
        [c.x + h, c.y + h, c.z + h],
        [c.x - h, c.y + h, c.z + h],
      ];

      const edges: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      for (const [a, b] of edges) {
        vertices.push(...corners[a], ...corners[b]);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      opacity: 0.5,
      transparent: true,
    });
    octreeHelper = new THREE.LineSegments(geometry, material);
    scene.add(octreeHelper);
  }

  function toggle(): boolean {
    showOctree = !showOctree;
    return showOctree;
  }

  function dispose(): void {
    if (octreeHelper) {
      scene.remove(octreeHelper);
      octreeHelper.geometry.dispose();
      (octreeHelper.material as THREE.Material).dispose();
      octreeHelper = null;
    }
  }

  return {
    update,
    toggle,
    dispose,
    get isVisible() {
      return showOctree;
    },
  };
}
