/**
 * @param {string[]} lines
 */
export default function (lines) {
  const state = { sum: 0 }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const numbers = line.split(' ').map(e => parseInt(e))
    getTotal(numbers, state)
  }

  return state.sum
}

/**
 * @param {number[]} numbers
 * @param {{ sum: number }} state
 */
function getTotal (numbers, state) {
  let total = 0
  /** @type {number[]} */
  const diff = []
  for (let i = 0; i < numbers.length - 1; i++) {
    const a = numbers[i]
    const b = numbers[i + 1]
    total += a + b
    diff.push(b - a)
  }
  if (total === 0) return
  state.sum += numbers[numbers.length - 1]
  getTotal(diff, state)
}
