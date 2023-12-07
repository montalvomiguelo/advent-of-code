/**
 * @param {string[]} lines
 */
export default function (lines) {
  const times = lines[0].split(': ')[1].trim().split(' ').filter(Boolean)
  const distances = lines[1].split(': ')[1].trim().split(' ').filter(Boolean)
  let result = 1

  for (let i = 0; i < times.length; i++) {
    const time = parseInt(times[i])
    const distance = parseInt(distances[i])
    let count = 0

    for (let j = 0; j < time; j++) {
      const traveled = j * (time - j)
      if (traveled > distance) {
        count++
      }
    }

    result *= count
  }

  return result
}
