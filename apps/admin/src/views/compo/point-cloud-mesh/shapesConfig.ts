/* eslint-disable no-plusplus, no-param-reassign */

/**
 * 形态配置模块
 *
 * 定义所有可用的点云形态和颜色方案
 */

/** 形态定义 */
export const SHAPES: Record<string, { name: string; icon: string; description: string }> = {
  sphere: { name: '球体', icon: '🔵', description: '均匀分布在球面上' },
  cube: { name: '立方体', icon: '📦', description: '立方体表面或体积分布' },
  wave: { name: '波浪', icon: '🌊', description: '正弦波动的平面' },
  galaxy: { name: '星系', icon: '🌌', description: '螺旋臂星系形态' },
};

/** 颜色方案定义 */
export const COLOR_SCHEMES = [
  { name: '位置映射', value: 0 },
  { name: '法线映射', value: 1 },
  { name: '高度映射', value: 2 },
  { name: '径向渐变', value: 3 },
  { name: '彩虹', value: 4 },
];

/** 颜色方案类型 */
export type ColorScheme = 0 | 1 | 2 | 3 | 4;

/** 默认配置 */
export const DEFAULT_CONFIG = {
  pointCount: 500000,
  pointSize: 1.5,
  animSpeed: 0,
  colorScheme: 0 as ColorScheme,
  currentShape: 'sphere',
  // 网格重建参数
  gridResolution: 64,
  isoValue: 0.5,
  splatRadius: 1.5,
  meshOpacity: 0.8,
};

export type ShapeKey = keyof typeof SHAPES;

/** 获取形态索引 */
export function getShapeIndex(shapeKey: ShapeKey): number {
  return Object.keys(SHAPES).indexOf(shapeKey);
}

/** 获取所有形态键名 */
export function getShapeKeys(): ShapeKey[] {
  return Object.keys(SHAPES) as ShapeKey[];
}
