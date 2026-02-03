/* eslint-disable no-plusplus, no-param-reassign */
/**
 * 点云生成模块
 *
 * CPU 端点云位置和颜色生成，支持 GPU 着色器的基础数据和网格重建数据
 */

const TAU = Math.PI * 2;

/**
 * 简单哈希函数
 */
function simpleHash(n: number): number {
  return n - Math.floor(n);
}

/**
 * 生成随机种子数据
 * 用于 GPU 着色器渲染的基础数据
 */
export function generateRandomSeeds(count: number): Float32Array {
  const seeds = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    seeds[i] = Math.random();
  }
  return seeds;
}

/**
 * 从种子数据生成点云位置（CPU 端计算）
 * 用于网格重建时获取当前形态的实际位置
 */
export function generatePointsFromSeedsCPU(
  shape: string,
  basePositions: Float32Array,
  count: number,
  time = 0,
): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r1 = basePositions[i3];
    const r2 = basePositions[i3 + 1];
    const r3 = basePositions[i3 + 2];

    let x: number;
    let y: number;
    let z: number;

    switch (shape) {
      case 'sphere': {
        const theta = r1 * TAU;
        const phi = Math.acos(2 * r2 - 1);
        const radius = 50 * Math.pow(r3, 0.333);
        const sinPhi = Math.sin(phi);
        x = radius * sinPhi * Math.cos(theta);
        y = radius * Math.cos(phi);
        z = radius * sinPhi * Math.sin(theta);
        const breath = 1.0 + 0.1 * Math.sin(time * 2.0 + radius * 0.1);
        x *= breath;
        y *= breath;
        z *= breath;
        break;
      }
      case 'cube': {
        x = (r1 - 0.5) * 100;
        y = (r2 - 0.5) * 100;
        z = (r3 - 0.5) * 100;
        const len = Math.sqrt(x * x + y * y + z * z);
        const pulse = 1.0 + 0.05 * Math.sin(time * 3.0 + len * 0.05);
        x *= pulse;
        y *= pulse;
        z *= pulse;
        break;
      }
      case 'wave': {
        x = (r1 - 0.5) * 100;
        z = (r2 - 0.5) * 100;
        y = Math.sin(x * 0.1 + time) * 10 + Math.cos(z * 0.1 + time * 0.7) * 10;
        y += (r3 - 0.5) * 5;
        break;
      }
      case 'galaxy': {
        const arm = Math.floor(r1 * 4);
        const t = r2;
        const baseAngle = arm * Math.PI * 0.5 + t * TAU + t * t * Math.PI;
        const angle = baseAngle + time * 0.2;
        const radius = t * 50 + r3 * 10;
        const hash = Math.sin(r1 * 10 + r2 * 57) * 43758.5453;
        const height = (simpleHash(hash) - 0.5) * 10 * (1 - t);
        x = Math.cos(angle) * radius;
        y = height;
        z = Math.sin(angle) * radius;
        break;
      }
      default:
        x = (r1 - 0.5) * 100;
        y = (r2 - 0.5) * 100;
        z = (r3 - 0.5) * 100;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }

  return positions;
}

/**
 * HSV 转 RGB
 */
export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
  return [v, v, v];
}

/**
 * 颜色方案名称
 */
export const COLOR_SCHEME_NAMES = [
  { name: '位置映射', value: 0 },
  { name: '法线映射', value: 1 },
  { name: '高度映射', value: 2 },
  { name: '径向渐变', value: 3 },
  { name: '彩虹', value: 4 },
];

/**
 * 生成点云颜色（用于网格重建时的颜色数据）
 */
export function generateColors(positions: Float32Array, count: number, scheme: number): Float32Array {
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    const r = Math.sqrt(x * x + y * y + z * z);

    let cr: number;
    let cg: number;
    let cb: number;

    switch (scheme) {
      case 0: {
        // 位置映射
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        cr = (x / len) * 0.5 + 0.5;
        cg = (y / len) * 0.5 + 0.5;
        cb = (z / len) * 0.5 + 0.5;
        break;
      }
      case 1: {
        // 法线映射
        const nlen = Math.sqrt(x * x + y * y + z * z) || 1;
        cr = (x / nlen) * 0.5 + 0.5;
        cg = (y / nlen) * 0.5 + 0.5;
        cb = (z / nlen) * 0.5 + 0.5;
        break;
      }
      case 2: {
        // 高度映射
        const h = (y + 50) / 100;
        const hue = 0.6 - h * 0.4;
        [cr, cg, cb] = hsvToRgb(hue, 0.8, 0.9);
        break;
      }
      case 3: {
        // 径向渐变
        const d = r / 60;
        [cr, cg, cb] = hsvToRgb(0.8 - d * 0.3, 0.7, 0.9);
        break;
      }
      case 4: {
        // 彩虹
        const angle = Math.atan2(z, x) / (Math.PI * 2) + 0.5;
        [cr, cg, cb] = hsvToRgb(angle, 0.8, 0.9);
        break;
      }
      default:
        cr = cg = cb = 0.5;
    }

    colors[i * 3] = Math.max(0, Math.min(1, cr));
    colors[i * 3 + 1] = Math.max(0, Math.min(1, cg));
    colors[i * 3 + 2] = Math.max(0, Math.min(1, cb));
  }

  return colors;
}

/**
 * 生成点云位置和颜色数据（用于网格重建）
 */
export function generatePointCloudData(
  shape: string,
  basePositions: Float32Array,
  count: number,
  colorScheme: number,
  time = 0,
): { positions: Float32Array; colors: Float32Array } {
  const positions = generatePointsFromSeedsCPU(shape, basePositions, count, time);
  const colors = generateColors(positions, count, colorScheme);
  return { positions, colors };
}
