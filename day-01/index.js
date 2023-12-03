/**
 * @param {string[]} lines
 */
export default function (lines) {
  let result = 0
  const numbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    let leftIdx = 0
    let rightIdx = line.length - 1
    let leftNum = null
    let rightNum = null
    while (leftIdx <= rightIdx) {
      if (leftNum && rightNum) break
      if (numbers.has(line[leftIdx]) && !leftNum) {
        leftNum = line[leftIdx]
      } else if (!leftNum) {
        leftIdx++
      }
      if (numbers.has(line[rightIdx]) && !rightNum) {
        rightNum = line[rightIdx]
      } else if (!rightNum) {
        rightIdx--
      }
    }
    if (leftNum && !rightNum) rightNum = leftNum
    if (rightNum && !leftNum) leftNum = rightNum
    const sum = parseInt(`${leftNum}${rightNum}`)
    result += sum
  }

  return result
}
