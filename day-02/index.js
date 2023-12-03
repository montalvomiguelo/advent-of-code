/**
 * @param {string[]} lines
 */
export default function (lines) {
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const parts = line.split(': ')
    const sets = parts[1].split('; ')
    /** @type {Record<string, number>} */
    const quantities = {
      red: 0,
      green: 0,
      blue: 0
    }
    for (let j = 0; j < sets.length; j++) {
      const set = sets[j]
      const cubes = set.split(', ')
      for (let k = 0; k < cubes.length; k++) {
        const parts = cubes[k].split(' ')
        const quantity = parseInt(parts[0])
        const color = parts[1]
        if (quantity > quantities[color]) {
          quantities[color] = quantity
        }
      }
    }
    const total = quantities.red * quantities.green * quantities.blue
    sum += total
  }
  return sum
}
