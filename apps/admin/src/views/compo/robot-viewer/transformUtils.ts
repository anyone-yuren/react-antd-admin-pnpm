import * as THREE from 'three';

export function storeOriginalTransforms(
  root: THREE.Object3D,
  originalNodeTransforms: Map<string, { position: THREE.Vector3; quaternion: THREE.Quaternion; scale: THREE.Vector3 }>,
) {
  originalNodeTransforms.clear();
  root.traverse((child) => {
    if (!(child as THREE.Object3D).isObject3D) return;
    originalNodeTransforms.set(child.uuid, {
      position: child.position.clone(),
      quaternion: child.quaternion.clone(),
      scale: child.scale.clone(),
    });
  });
}

export function restoreOriginalTransforms(
  root: THREE.Object3D | null,
  originalNodeTransforms: Map<string, { position: THREE.Vector3; quaternion: THREE.Quaternion; scale: THREE.Vector3 }>,
) {
  if (!root) return;
  root.traverse((child) => {
    const data = originalNodeTransforms.get(child.uuid);
    if (!data) return;
    child.position.copy(data.position);
    child.quaternion.copy(data.quaternion);
    child.scale.copy(data.scale);
  });
}

export function getTransformValues(target: THREE.Object3D) {
  return {
    position: {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
    },
    rotation: {
      x: THREE.MathUtils.radToDeg(target.rotation.x),
      y: THREE.MathUtils.radToDeg(target.rotation.y),
      z: THREE.MathUtils.radToDeg(target.rotation.z),
    },
    scale: {
      x: target.scale.x,
      y: target.scale.y,
      z: target.scale.z,
    },
  };
}

export function syncTransformInputs(target: THREE.Object3D | null | undefined, transformInputs: HTMLInputElement[]) {
  if (!target) return;
  const values = getTransformValues(target);

  transformInputs.forEach((input) => {
    const type = input.dataset.transform as 'position' | 'rotation' | 'scale' | undefined;
    const axis = input.dataset.axis as 'x' | 'y' | 'z' | undefined;
    const { kind } = input.dataset;
    if (!type || !axis) return;
    const raw = values[type][axis];
    if (typeof raw !== 'number') return;
    const formatted = type === 'rotation' ? raw.toFixed(1) : raw.toFixed(2);
    input.value = kind === 'range' ? String(raw) : formatted;
  });
}

export function applyTransformFromInputs(target: THREE.Object3D | null, transformInputs: HTMLInputElement[]) {
  if (!target) return;

  const position = target.position.clone();
  const rotation = target.rotation.clone();
  const scale = target.scale.clone();

  const latest = {
    position: { x: position.x, y: position.y, z: position.z },
    rotation: {
      x: THREE.MathUtils.radToDeg(rotation.x),
      y: THREE.MathUtils.radToDeg(rotation.y),
      z: THREE.MathUtils.radToDeg(rotation.z),
    },
    scale: { x: scale.x, y: scale.y, z: scale.z },
  };

  transformInputs.forEach((input) => {
    const type = input.dataset.transform as 'position' | 'rotation' | 'scale' | undefined;
    const axis = input.dataset.axis as 'x' | 'y' | 'z' | undefined;
    const value = parseFloat(input.value);
    if (!type || !axis || Number.isNaN(value)) return;
    latest[type][axis] = value;
  });

  position.set(latest.position.x, latest.position.y, latest.position.z);
  rotation.set(
    THREE.MathUtils.degToRad(latest.rotation.x),
    THREE.MathUtils.degToRad(latest.rotation.y),
    THREE.MathUtils.degToRad(latest.rotation.z),
  );
  scale.set(latest.scale.x, latest.scale.y, latest.scale.z);

  target.position.copy(position);
  target.rotation.copy(rotation);
  target.scale.copy(scale);
}

export function formatTransformData(target: THREE.Object3D) {
  return {
    position: [target.position.x, target.position.y, target.position.z],
    rotation: [
      THREE.MathUtils.radToDeg(target.rotation.x),
      THREE.MathUtils.radToDeg(target.rotation.y),
      THREE.MathUtils.radToDeg(target.rotation.z),
    ],
    scale: [target.scale.x, target.scale.y, target.scale.z],
  };
}
