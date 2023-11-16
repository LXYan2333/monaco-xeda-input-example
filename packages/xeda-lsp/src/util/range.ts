import * as LSP from 'vscode-languageserver/node'

/**
 * Determine if a position is included in a range.
 */
export function isPositionIncludedInRange(position: LSP.Position, range: LSP.Range) {
  return (
    range.start.line <= position.line &&
    range.end.line >= position.line &&
    range.start.character <= position.character &&
    range.end.character >= position.character
  )
}

/**
 * Determine if a range is included in a range.
 */
export function isRangeIncludedInRange(inner: LSP.Range, outer: LSP.Range) {
  return (
    isPositionIncludedInRange(inner.start, outer) &&
    isPositionIncludedInRange(inner.end, outer)
  )
}