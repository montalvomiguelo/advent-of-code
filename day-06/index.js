/**
 * @param {string[]} lines
 */
export default function (lines) {
  const time = parseInt(
    lines[0].split(': ')[1].trim().split(' ').filter(Boolean).join('')
  )
  const distance = parseInt(
    lines[1].split(': ')[1].trim().split(' ').filter(Boolean).join('')
  )
  let count = 0

  for (let j = 0; j < time; j++) {
    const traveled = j * (time - j)
    if (traveled > distance) {
      count++
    }
  }

  return count
}
