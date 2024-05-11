export { isFunction } from "lodash-es";
const { toString } = Object.prototype;
/**
 * 检查给定的值是否为指定的类型。
 *
 * @param {unknown} val - 要检查的值。
 * @param {string} type - 要检查的类型。
 * @return {boolean} 如果值是指定类型，则返回true，否则返回false。
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
