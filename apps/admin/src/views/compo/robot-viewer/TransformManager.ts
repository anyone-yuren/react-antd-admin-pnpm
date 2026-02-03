import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export interface TransformData {
  position: number[];
  rotation: number[];
  scale: number[];
  mode: string;
  space: string;
}

export interface TransformManagerOptions {
  size?: number;
  showX?: boolean;
  showY?: boolean;
  showZ?: boolean;
}

export class TransformManager {
  scene: THREE.Scene;

  orbitControls: OrbitControls;

  options: TransformManagerOptions;

  currentMode: TransformMode;

  currentSpace: 'world' | 'local';

  isEnabled: boolean;

  isTransforming: boolean;

  transformControls: TransformControls;

  onTransformChange?: (data: TransformData) => void;

  onTransformStart?: () => void;

  onTransformEnd?: () => void;

  onModeChange?: (mode: TransformMode) => void;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    domElement: HTMLElement,
    orbitControls: OrbitControls,
    options: TransformManagerOptions = {},
  ) {
    this.scene = scene;
    this.orbitControls = orbitControls;
    this.options = {
      size: 1,
      showX: true,
      showY: true,
      showZ: true,
      ...options,
    };
    this.currentMode = 'translate';
    this.currentSpace = 'world';
    this.isEnabled = true;
    this.isTransforming = false;
    this.transformControls = new TransformControls(camera, domElement);
    this.applyOptions();
    const helper =
      typeof this.transformControls.getHelper === 'function'
        ? this.transformControls.getHelper()
        : this.transformControls;
    if (helper && (helper as THREE.Object3D).isObject3D) {
      this.scene.add(helper as THREE.Object3D);
    }
    this.setupEventListeners();
  }

  applyOptions() {
    this.transformControls.setSize(this.options.size ?? 1);
    this.transformControls.showX = this.options.showX ?? true;
    this.transformControls.showY = this.options.showY ?? true;
    this.transformControls.showZ = this.options.showZ ?? true;
  }

  setupEventListeners() {
    this.transformControls.addEventListener('dragging-changed', (event) => {
      this.orbitControls.enabled = !event.value;
      if (event.value) {
        this.handleTransformStart();
      } else {
        this.handleTransformEnd();
      }
    });

    this.transformControls.addEventListener('change', () => {
      if (this.isTransforming) {
        this.emitTransformChange();
      }
    });
  }

  handleTransformStart() {
    this.isTransforming = true;
    this.onTransformStart?.();
  }

  handleTransformEnd() {
    this.isTransforming = false;
    this.emitTransformChange();
    this.onTransformEnd?.();
  }

  emitTransformChange() {
    const object = this.transformControls.object as THREE.Object3D | undefined | null;
    if (!object || !this.onTransformChange) return;

    this.onTransformChange({
      position: [object.position.x, object.position.y, object.position.z],
      rotation: [
        THREE.MathUtils.radToDeg(object.rotation.x),
        THREE.MathUtils.radToDeg(object.rotation.y),
        THREE.MathUtils.radToDeg(object.rotation.z),
      ],
      scale: [object.scale.x, object.scale.y, object.scale.z],
      mode: this.currentMode,
      space: this.currentSpace,
    });
  }

  attach(object: THREE.Object3D) {
    this.transformControls.attach(object);
  }

  detach() {
    this.transformControls.detach();
  }

  setMode(mode: TransformMode) {
    if (mode === this.currentMode) return;
    this.currentMode = mode;
    this.transformControls.setMode(mode);
    this.onModeChange?.(mode);
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    this.transformControls.enabled = enabled;
    this.transformControls.visible = enabled;
  }

  setOnTransformChange(callback: (data: TransformData) => void) {
    this.onTransformChange = callback;
  }

  setOnTransformStart(callback: () => void) {
    this.onTransformStart = callback;
  }

  setOnTransformEnd(callback: () => void) {
    this.onTransformEnd = callback;
  }

  setOnModeChange(callback: (mode: TransformMode) => void) {
    this.onModeChange = callback;
  }

  dispose() {
    this.transformControls.dispose();
  }
}
