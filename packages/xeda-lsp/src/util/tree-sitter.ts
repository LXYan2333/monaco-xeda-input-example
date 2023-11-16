import * as LSP from 'vscode-languageserver/node'
import { SyntaxNode } from 'web-tree-sitter'

/**
 * Recursively iterate over all nodes in a tree.
 *
 * @param node The node to start iterating from
 * @param callback The callback to call for each node. Return false to stop following children.
 */
export function forEach(node: SyntaxNode, callback: (n: SyntaxNode) => void | boolean) {
  const followChildren = callback(node) !== false
  if (followChildren && node.children.length) {
    node.children.forEach((n) => forEach(n, callback))
  }
}

export function range(n: SyntaxNode): LSP.Range {
  return LSP.Range.create(
    n.startPosition.row,
    n.startPosition.column,
    n.endPosition.row,
    n.endPosition.column,
  )
}
/**
 * 递归找到符合条件的父节点
 */
export function findParent(
  start: SyntaxNode,
  predicate: (n: SyntaxNode) => boolean,
): SyntaxNode | null {
  let node = start.parent
  while (node !== null) {
    if (predicate(node)) {
      return node
    }
    node = node.parent
  }
  return null
}

export function childOfType(node: SyntaxNode, types: string[]): SyntaxNode[] {
  return node.children.filter((node) => types.includes(node.type))
}