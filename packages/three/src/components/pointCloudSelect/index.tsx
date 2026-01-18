import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const POINT_COUNT = 100000;

interface Point {
  x: number;
  y: number;
}

interface ThreeRef {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  geometry: THREE.BufferGeometry | null;
  points: THREE.Points | null;
}

export default function PointCloudSelect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const selectingRef = useRef<boolean>(false);
  const startRef = useRef<Point>({ x: 0, y: 0 });

  const threeRef = useRef<ThreeRef>({
    scene: null,
    camera: null,
    renderer: null,
    geometry: null,
    points: null,
  });

  useEffect(() => {
    initThree();
    initPoints();
    initEvents();
    animate();

    return cleanup;
  }, []);

  function initThree() {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    threeRef.current = { scene, camera, renderer, geometry: null, points: null };
  }

  /* ---------- 创建 10W 点 ---------- */
  function initPoints() {
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 400;
      positions[i3 + 1] = (Math.random() - 0.5) * 400;
      positions[i3 + 2] = (Math.random() - 0.5) * 400;

      colors[i3] = 0.6;
      colors[i3 + 1] = 0.6;
      colors[i3 + 2] = 0.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    if (threeRef.current.scene) {
      threeRef.current.scene.add(points);
    }
    threeRef.current.geometry = geometry;
    threeRef.current.points = points;
  }

  function onMouseDown(e: MouseEvent) {
    const box = selectBoxRef.current;
    if (!box || !containerRef.current) return;

    e.preventDefault();
    selectingRef.current = true;

    const p = getMouseInCanvas(e);
    startRef.current = p;

    box.style.display = 'block';
    box.style.left = `${p.x}px`;
    box.style.top = `${p.y}px`;
    box.style.width = '0px';
    box.style.height = '0px';
  }

  function onMouseMove(e: MouseEvent) {
    if (!selectingRef.current || !containerRef.current) return;
    const box = selectBoxRef.current;
    if (!box) return;

    const start = startRef.current;
    const curr = getMouseInCanvas(e);

    const minX = Math.min(start.x, curr.x);
    const minY = Math.min(start.y, curr.y);
    const w = Math.abs(curr.x - start.x);
    const h = Math.abs(curr.y - start.y);

    box.style.left = `${minX}px`;
    box.style.top = `${minY}px`;
    box.style.width = `${w}px`;
    box.style.height = `${h}px`;
  }

  function endSelection(e: MouseEvent) {
    if (!selectingRef.current) return;
    const box = selectBoxRef.current;
    if (!box || !containerRef.current) return;

    selectingRef.current = false;
    box.style.display = 'none';

    const end = getMouseInCanvas(e);
    selectPoints(startRef.current, end);
  }

  function onMouseUp(e: MouseEvent) {
    endSelection(e);
  }

  function initEvents() {
    const container = containerRef.current;
    if (!container) return;

    // 监听放在 canvas 容器上，移动 / 抬起放在 window，保证拖拽过程中不会丢失事件
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function getMouseInCanvas(e: MouseEvent): Point {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  /* ---------- 框选核心 ---------- */
  function selectPoints(start: Point, end: Point) {
    const { camera, geometry, renderer } = threeRef.current;
    if (!camera || !geometry || !renderer) return;
    const rect = renderer.domElement.getBoundingClientRect();

    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);

    const pos = geometry.attributes.position.array as Float32Array;
    const col = geometry.attributes.color.array as Float32Array;
    const v = new THREE.Vector3();

    for (let i = 0; i < POINT_COUNT; i += 1) {
      const i3 = i * 3;

      v.set(pos[i3], pos[i3 + 1], pos[i3 + 2]);
      v.project(camera);

      // eslint-disable-next-line no-continue
      if (v.z < -1 || v.z > 1) continue;

      const x = (v.x * 0.5 + 0.5) * rect.width;
      const y = (-v.y * 0.5 + 0.5) * rect.height;

      const hit = x >= minX && x <= maxX && y >= minY && y <= maxY;

      if (hit) {
        col[i3] = 1;
        col[i3 + 1] = 0;
        col[i3 + 2] = 0;
      } else {
        col[i3] = 0.6;
        col[i3 + 1] = 0.6;
        col[i3 + 2] = 0.6;
      }
    }

    geometry.attributes.color.needsUpdate = true;
  }

  function animate() {
    requestAnimationFrame(animate);
    const { scene, camera, renderer } = threeRef.current;
    if (scene && camera && renderer) {
      renderer.render(scene, camera);
    }
  }

  function cleanup() {
    const container = containerRef.current;
    if (container) {
      container.removeEventListener('mousedown', onMouseDown);
    }
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    if (threeRef.current.renderer) {
      threeRef.current.renderer.dispose();
      // 同时把 canvas 从 DOM 中移除，避免内存泄露
      const canvas = threeRef.current.renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  return (
    <div ref={containerRef} className='relative w-full h-full select-none'>
      <div
        ref={selectBoxRef}
        className='
      absolute
      hidden
      z-10
      border
      border-dashed
      border-sky-400
      bg-[rgba(100,150,255,0.15)]
      pointer-events-none
    '
      />
    </div>
  );
}
