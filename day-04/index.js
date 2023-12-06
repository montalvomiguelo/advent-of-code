/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type {string[][]} */
  const myWinningNumbersList = []
  const result = { sum: 0 }
  /** @type {Map<number, string[]>} */
  const currentWinningNumbers = new Map()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) break
    const numbers = line.split(' | ')
    const myNumbers = numbers[1].split(' ')
    const winningNumbers = new Set(numbers[0].split(': ')[1].split(' '))
    const myWinningNumbers = []

    for (let j = 0; j < myNumbers.length; j++) {
      const myNumber = myNumbers[j]
      if (!myNumber) continue
      if (winningNumbers.has(myNumber)) {
        myWinningNumbers.push(myNumber)
      }
    }

    myWinningNumbersList.push(myWinningNumbers)
    currentWinningNumbers.set(i, myWinningNumbers)
  }

  sum(myWinningNumbersList, currentWinningNumbers, result)

  return result.sum
}

/**
 * @param {string[][]} winningNumbersList
 * @param {Map<number, string[]>} currentWinningNumbers
 * @param {{ sum: number }} result
 */
function sum(winningNumbersList, currentWinningNumbers, result) {
  for (const [i, winningNumbers] of currentWinningNumbers) {
    result.sum += 1
    const nextWinningNumbers = new Map()
    for (let j = 0; j < winningNumbers.length; j++) {
      const idx = i + j + 1
      nextWinningNumbers.set(idx, winningNumbersList[idx])
    }
    sum(winningNumbersList, nextWinningNumbers, result)
  }
}
