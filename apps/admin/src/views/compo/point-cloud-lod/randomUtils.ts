/* eslint-disable no-plusplus, no-param-reassign, no-bitwise, no-multi-assign */

/** 确定性随机数生成器 (Mulberry32) */
export function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    let t = s;
    s += 0x6d2b79f5;
    t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 字符串哈希码 */
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return hash;
}
