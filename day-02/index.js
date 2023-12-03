/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type {Record<string, number>} */
  const config = {
    red: 12,
    green: 13,
    blue: 14
  }
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const parts = line.split(': ')
    const game = parts[0]
    const sets = parts[1].split('; ')
    let isPossible = true
    for (let j = 0; j < sets.length; j++) {
      const set = sets[j]
      const cubes = set.split(', ')
      for (let k = 0; k < cubes.length; k++) {
        const parts = cubes[k].split(' ')
        const quantity = parseInt(parts[0])
        const color = parts[1]
        if (quantity > config[color]) {
          isPossible = false
          break
        }
      }
      if (!isPossible) break
    }
    if (isPossible) {
      const gameId = parseInt(game.split(' ')[1])
      sum += gameId
    }
  }
  return sum
}
