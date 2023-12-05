/**
 * @param {string[]} lines
 */
export default function (lines) {
  /** @type {string[][]} */
  const myWinningNumbersList = []

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

    if (myWinningNumbers.length > 0) {
      myWinningNumbersList.push(myWinningNumbers)
    }
  }

  return sum(myWinningNumbersList)
}

/**
 * @param {string[][]} numbersList
 */
function sum(numbersList) {
  let sum = 0
  for (let i = 0; i < numbersList.length; i++) {
    const numbers = numbersList[i]
    let count = 0
    for (let j = 0; j < numbers.length; j++) {
      if (j <= 1) {
        count += 1
      } else {
        count *= 2
      }
    }
    sum += count
  }
  return sum
}
