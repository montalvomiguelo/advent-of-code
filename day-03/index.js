/**
 * @param {string[]} lines
 */
export default function (lines) {
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let number = ''
    let adjacentCount = 0
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      let count = 0
      if (/\d/.test(char)) {
        number += char
        const adjTop = lines[i - 1]?.[j]
        const adjBottom = lines[i + 1]?.[j]
        const adjLeft = line[j - 1]
        const adjRight = line[j + 1]
        const adjTopLeft = lines[i - 1]?.[j - 1]
        const adjTopRight = lines[i - 1]?.[j + 1]
        const adjBottomLeft = lines[i + 1]?.[j - 1]
        const adjBottomRight = lines[i + 1]?.[j + 1]
        const adjacents = [
          adjTop,
          adjBottom,
          adjLeft,
          adjRight,
          adjTopLeft,
          adjTopRight,
          adjBottomLeft,
          adjBottomRight
        ]
        for (let k = 0; k < adjacents.length; k++) {
          const adjacent = adjacents[k]
          if (
            adjacent !== '.' &&
            adjacent !== undefined &&
            !/\d/.test(adjacent)
          ) {
            count++
          }
        }
        adjacentCount += count

        if (j === line.length - 1) {
          if (number && adjacentCount > 0) {
            sum += parseInt(number)
          }
          adjacentCount = 0
          number = ''
        }
      } else {
        if (number && adjacentCount > 0) {
          sum += parseInt(number)
        }
        adjacentCount = 0
        number = ''
      }
    }
  }
  return sum
}
