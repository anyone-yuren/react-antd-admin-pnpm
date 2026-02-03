import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  orbitControls: OrbitControls;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
}

export function createScene(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  backgroundColor?: string,
): SceneContext {
  const scene = new THREE.Scene();
  // 支持传入背景颜色,默认使用浅色主题背景
  scene.background = new THREE.Color(backgroundColor || '#f0f2f5');

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
  camera.position.set(6, 6, 10);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.08;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  return { scene, camera, renderer, orbitControls, raycaster, pointer };
}

export function setupSceneEnvironment(scene: THREE.Scene, isDarkMode: boolean = false) {
  // Grid - 根据主题调整颜色
  const gridColor1 = isDarkMode ? 0x2e3c4d : 0xcccccc;
  const gridColor2 = isDarkMode ? 0x1d2833 : 0xe0e0e0;
  const grid = new THREE.GridHelper(20, 20, gridColor1, gridColor2);
  grid.position.y = 0;
  scene.add(grid);

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  // Directional light
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(5, 10, 6);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  scene.add(dirLight);

  // Point light
  const pointLight = new THREE.PointLight(0x66ccff, 0.4, 50);
  pointLight.position.set(-4, 3, 2);
  scene.add(pointLight);

  // Ground
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0f1a24, roughness: 0.9 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}

export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer, orbitControls: OrbitControls) {
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
      const material = mesh.material as THREE.Material | THREE.Material[];
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose?.());
      } else {
        material?.dispose?.();
      }
    }
  });

  orbitControls.dispose();
  renderer.dispose();
}
