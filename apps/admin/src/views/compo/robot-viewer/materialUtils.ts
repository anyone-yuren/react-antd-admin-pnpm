import * as THREE from 'three';

import { createMaterialFromPreset } from './materials';

import type { MaterialPresetId } from './materials';

export function applyMaterialToNode(
  object: THREE.Object3D | null,
  material: THREE.Material,
  originalMaterials: Map<string, THREE.Material | THREE.Material[]>,
  animatedShaderMaterials: Set<THREE.ShaderMaterial>,
) {
  if (!object) return;
  if ((object as THREE.Mesh).isMesh) {
    const mesh = object as THREE.Mesh;
    const old = mesh.material as THREE.Material | THREE.Material[];
    if (!originalMaterials.has(mesh.uuid)) {
      originalMaterials.set(mesh.uuid, old);
    }
    mesh.material = material;
    if (old instanceof THREE.ShaderMaterial) {
      animatedShaderMaterials.delete(old);
    }
    if (Array.isArray(old)) {
      old.forEach((m) => m.dispose?.());
    } else {
      old?.dispose?.();
    }
    return;
  }
  object.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const old = mesh.material as THREE.Material | THREE.Material[];
    if (!originalMaterials.has(mesh.uuid)) {
      originalMaterials.set(mesh.uuid, old);
    }
    const nextMat = material.clone();
    if (nextMat instanceof THREE.ShaderMaterial) {
      animatedShaderMaterials.add(nextMat);
    }
    mesh.material = nextMat;
    if (old instanceof THREE.ShaderMaterial) {
      animatedShaderMaterials.delete(old);
    }
    if (Array.isArray(old)) {
      old.forEach((m) => m.dispose?.());
    } else {
      old?.dispose?.();
    }
  });
}

export function captureOriginalMaterials(
  root: THREE.Object3D,
  originalMaterials: Map<string, THREE.Material | THREE.Material[]>,
) {
  originalMaterials.clear();
  root.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    originalMaterials.set(mesh.uuid, mesh.material as THREE.Material | THREE.Material[]);
  });
}

export function restoreOriginalMaterials(
  root: THREE.Object3D | null,
  originalMaterials: Map<string, THREE.Material | THREE.Material[]>,
  animatedShaderMaterials: Set<THREE.ShaderMaterial>,
) {
  if (!root) return;
  root.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const original = originalMaterials.get(mesh.uuid);
    if (original) {
      const old = mesh.material as THREE.Material | THREE.Material[];
      mesh.material = original;
      if (old instanceof THREE.ShaderMaterial) {
        animatedShaderMaterials.delete(old);
      }
      if (Array.isArray(old)) {
        old.forEach((m) => m.dispose?.());
      } else {
        old?.dispose?.();
      }
    }
  });
}

export function applyCurrentMaterial(
  editTargetMode: 'model' | 'node',
  selectedNode: THREE.Object3D | null,
  currentMaterialId: MaterialPresetId,
  currentColor: string,
  originalMaterials: Map<string, THREE.Material | THREE.Material[]>,
  animatedShaderMaterials: Set<THREE.ShaderMaterial>,
) {
  if (editTargetMode !== 'node') return;
  if (!selectedNode) return;
  const material = createMaterialFromPreset(currentMaterialId, currentColor, animatedShaderMaterials);
  applyMaterialToNode(selectedNode, material, originalMaterials, animatedShaderMaterials);
}
