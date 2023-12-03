/**
 * @param {string[]} lines
 */

export default function (lines) {
  let result = 0
  const regex = /one|two|three|four|five|six|seven|eight|nine|\d/
  /** @type {Record<string, string>} */
  const values = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const matches = []
    if (!line) break
    for (let j = 0; j < line.length; j++) {
      const substring = line.substring(j)
      const match = substring.match(regex)
      if (match) {
        matches.push(match[0])
      }
    }
    const a = values[matches[0]] ? values[matches[0]] : matches[0]
    const b = values[matches[matches.length - 1]]
      ? values[matches[matches.length - 1]]
      : matches[matches.length - 1]
    const number = parseInt(`${a}${b}`)
    result += number
  }

  return result
}
