/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type {Map<string, number[]>} */
  const numbers = new Map()
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let number = ''
    let symbol = ''
    for (let j = 0; j < line.length; j++) {
      const char = line[j]

      if (/\d/.test(char)) {
        number += char
        const adjacents = [
          { row: i - 1, col: j, value: lines[i - 1]?.[j] },
          { row: i + 1, col: j, value: lines[i + 1]?.[j] },
          { row: i, col: j - 1, value: line[j - 1] },
          { row: i, col: j + 1, value: line[j + 1] },
          { row: i - 1, col: j - 1, value: lines[i - 1]?.[j - 1] },
          { row: i - 1, col: j + 1, value: lines[i - 1]?.[j + 1] },
          { row: i + 1, col: j - 1, value: lines[i + 1]?.[j - 1] },
          { row: i + 1, col: j + 1, value: lines[i + 1]?.[j + 1] }
        ]
        for (let k = 0; k < adjacents.length; k++) {
          const adjacent = adjacents[k]
          const value = adjacent.value
          if (value === '*') {
            symbol = `${adjacent.row}:${adjacent.col}}`
          }
        }
      }
      if (!/\d/.test(char) || j === line.length - 1) {
        if (number && symbol) {
          const key = symbol
          if (numbers.has(key)) {
            numbers.get(key)?.push(parseInt(number))
          } else {
            numbers.set(key, [parseInt(number)])
          }
        }
        number = ''
        symbol = ''
      }
    }
  }
  return sum(numbers)
}

/**
 * @param {Map<string, number[]>} numbersMap
 */
function sum(numbersMap) {
  let sum = 0
  for (const [, numbers] of numbersMap) {
    if (numbers.length < 2) continue
    let res = 1
    for (let i = 0; i < numbers.length; i++) {
      res *= numbers[i]
    }
    sum += res
  }
  return sum
}
