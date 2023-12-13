/**
 * @param {string[]} lines
 */
export default function (lines) {
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const numbers = line.split(' ').map((e) => parseInt(e))
    const sequence = getSequence(numbers)
    sum += sequence[0]
  }
  return sum
}

/**
 * @param {number[]} numbers
 * @return {number[]}
 */
function getSequence(numbers) {
  let total = 0
  /** @type {number[]} */
  const diff = []
  for (let i = 0; i < numbers.length - 1; i++) {
    const a = numbers[i]
    const b = numbers[i + 1]
    total += a + b
    diff.push(b - a)
  }
  if (total === 0) return [0, ...numbers]
  const sequence = getSequence(diff)
  return [numbers[0] - sequence[0], ...numbers]
}
