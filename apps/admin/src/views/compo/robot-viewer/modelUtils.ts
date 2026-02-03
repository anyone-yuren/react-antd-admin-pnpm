import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ModelStats {
  total: number;
  mesh: number;
  group: number;
  camera: number;
  light: number;
  bone: number;
}

export interface LoadedModelInfo {
  model: THREE.Object3D;
  selectableNodes: THREE.Object3D[];
  nodeByName: Map<string, THREE.Object3D>;
  stats: ModelStats;
}

export async function loadFBXModel(url: string): Promise<LoadedModelInfo> {
  const loader = new FBXLoader();
  const object = await loader.loadAsync(url);

  let nodeIndex = 0;
  const selectableNodes: THREE.Object3D[] = [];
  const nodeByName = new Map<string, THREE.Object3D>();
  const stats: ModelStats = {
    total: 0,
    mesh: 0,
    group: 0,
    camera: 0,
    light: 0,
    bone: 0,
  };

  object.traverse((child) => {
    if (!(child as THREE.Object3D).isObject3D) return;
    stats.total += 1;
    if ((child as THREE.Mesh).isMesh) stats.mesh += 1;
    if (child.type === 'Group' || child.type === 'Object3D') stats.group += 1;
    if ((child as THREE.Camera).isCamera) stats.camera += 1;
    if ((child as THREE.Light).isLight) stats.light += 1;
    if (child.type === 'Bone') stats.bone += 1;
    (child.userData as { nodeId?: string }).nodeId =
      (child.userData as { nodeId?: string }).nodeId ?? `node-${nodeIndex++}`;
    if (child.name) {
      nodeByName.set(child.name, child);
    }
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).castShadow = true;
      (child as THREE.Mesh).receiveShadow = true;
      selectableNodes.push(child);
    }
  });

  return { model: object, selectableNodes, nodeByName, stats };
}

export function centerModel(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
}

export function scaleModelToFit(object: THREE.Object3D, targetSize: number) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = targetSize / maxDim;
    object.scale.multiplyScalar(scale);
  }
}

export function focusCamera(object: THREE.Object3D, camera: THREE.PerspectiveCamera, orbitControls: OrbitControls) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * 2.4;

  camera.position.set(center.x + distance, center.y + distance * 0.6, center.z + distance);
  orbitControls.target.copy(center);
  orbitControls.update();
}

export function dumpHierarchy(root: THREE.Object3D) {
  const lines: string[] = [];
  const walk = (node: THREE.Object3D, depth: number) => {
    const indent = ' '.repeat(depth * 2);
    const label = node.name || 'Unnamed';
    lines.push(`${indent}- ${label} [${node.type}] (${(node.userData as { nodeId?: string }).nodeId})`);
    node.children?.forEach((child) => walk(child, depth + 1));
  };
  walk(root, 0);
  console.group('FBX Hierarchy');
  console.log(lines.join('\n'));
  console.groupEnd();
}

export function resolveEditableNode(object?: THREE.Object3D | null) {
  if (!object) return null;
  if ((object as THREE.Mesh).isMesh) return object as THREE.Mesh;
  const mesh = object.getObjectByProperty?.('isMesh', true) as THREE.Mesh | undefined;
  if (mesh && mesh.isMesh) return mesh;
  return object;
}
