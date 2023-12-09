/** @typedef {Map<string, {left: string, right: string}>} Graph */

/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type Graph */
  const graph = new Map()
  const instructions = lines.splice(0, 1)[0]
  let end = 'ZZZ'
  /** @type {string|undefined} */
  let current = 'AAA'
  let count = 0
  let idx = 0

  lines.shift()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const parts = line.split(' = ')
    const key = parts[0]
    const left = parts[1].slice(1, 4)
    const right = parts[1].slice(6, 9)
    graph.set(key, { left, right })
  }

  while (current && current !== end) {
    const instruction = instructions[idx]
    if (instruction === 'L') {
      current = graph.get(current)?.left
    } else {
      current = graph.get(current)?.right
    }
    idx = idx + 1 < instructions.length ? idx + 1 : 0
    count++
  }

  return count
}
