import { chain } from "ramda";

/**
 * Flattens a tree structure into an array.
 * @param trees - The array of tree nodes to be flattened.
 * @returns The flattened array.
 */
export const flattenTree = <T extends { children?: T[] }>(trees: T[]): T[] => {
  return chain((node) => {
    const children = node.children || [];
    return [node, ...flattenTree(children)];
  }, trees);
};
