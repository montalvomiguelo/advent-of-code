/** @typedef {Map<string, {left: string, right: string}>} Graph */

/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type Graph */
  const adjList = new Map()
  const instructions = lines.splice(0, 1)[0]
  /** @type {string[]} */
  const nodes = []
  /** @type {number[]} */
  const counts = []

  lines.shift()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const parts = line.split(' = ')
    const key = parts[0]
    const left = parts[1].slice(1, 4)
    const right = parts[1].slice(6, 9)
    adjList.set(key, { left, right })
    if (key[2] === 'A') {
      nodes.push(key)
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    let idx = 0
    let count = 0
    let current = nodes[i]

    while (current[2] !== 'Z') {
      const instruction = instructions[idx]

      if (instruction === 'L') {
        current = /** @type {{left: string, right: string}} */ (
          adjList.get(current)
        ).left
      } else {
        current = /** @type {{left: string, right: string}} */ (
          adjList.get(current)
        ).right
      }

      count++
      idx = idx + 1 < instructions.length ? idx + 1 : 0
    }
    counts.push(count)
  }

  return counts.reduce((acc, curr) => lcm(acc, curr), 1)
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  if (b === 0) return a
  return gcd(b, a % b)
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function lcm(a, b) {
  return (a * b) / gcd(a, b)
}
