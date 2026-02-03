import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ThreeContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
}

export function createThreeContext(canvas: HTMLCanvasElement, bgColor?: string): ThreeContext {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const rect = canvas.parentElement?.getBoundingClientRect();
  const width = rect?.width || window.innerWidth;
  const height = rect?.height || window.innerHeight;

  renderer.setSize(width, height, false);
  renderer.setClearColor(bgColor ? new THREE.Color(bgColor) : 0x0b0f14, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 4000);
  camera.position.set(0, 0, 200);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  return { renderer, scene, camera, controls };
}

export function disposeThreeContext(context: ThreeContext): void {
  const { renderer, scene, controls } = context;

  controls.dispose();

  scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
      object.geometry.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => m.dispose());
      } else if (object.material) {
        object.material.dispose();
      }
    }
  });

  renderer.dispose();
}
