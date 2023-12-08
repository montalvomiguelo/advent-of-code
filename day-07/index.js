/** @typedef {{handType: string, handStrength: number, cards: string, bid: number}} Hand */

/** @type {Object.<string, number>} */
const cardStrenghts = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2
}

const handStrengths = {
  'five-of-a-kind': 7,
  'four-of-a-kind': 6,
  'full-house': 5,
  'three-of-a-kind': 4,
  'two-pair': 3,
  'one-pair': 2,
  'high-card': 1
}

/**
 * @param {string[]} lines
 */
export default function (lines) {
  let hands = resolveHands(lines)
  sortHands(hands)
  return getTotal(hands)
}

/**
 * @param {string[]} lines
 */
function resolveHands(lines) {
  /** @type {Hand[]} */
  const hands = []
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) break
    const hand = lines[i]
    const cards = hand.split(' ')[0]
    const bid = parseInt(hand.split(' ')[1])
    /** @type {Map<string, number>} */
    const seen = new Map()
    for (let j = 0; j < cards.length; j++) {
      const card = cards[j]
      if (seen.get(card)) {
        seen.set(card, /** @type {number} */ (seen.get(card)) + 1)
      } else {
        seen.set(card, 1)
      }
    }
    const handType = getHandType(seen)
    const handStrength = handStrengths[handType]
    hands.push({ handType, handStrength, cards, bid })
  }
  return hands
}

/**
 * @param {Map<string, number>} seen
 */
function getHandType(seen) {
  let pairCount = 0
  let trioCount = 0
  let quartetCount = 0
  let quintetCount = 0
  for (const [, count] of seen) {
    if (count === 2) {
      pairCount++
    }
    if (count === 3) {
      trioCount++
    }
    if (count === 4) {
      quartetCount++
    }
    if (count === 5) {
      quintetCount++
    }
  }
  if (quintetCount === 1) {
    return 'five-of-a-kind'
  }
  if (quartetCount === 1) {
    return 'four-of-a-kind'
  }
  if (pairCount === 1 && trioCount === 1) {
    return 'full-house'
  }
  if (trioCount === 1) {
    return 'three-of-a-kind'
  }
  if (pairCount === 2) {
    return 'two-pair'
  }
  if (pairCount === 1) {
    return 'one-pair'
  }
  return 'high-card'
}

/**
 * @param {Hand[]} hands
 */
function sortHands(hands) {
  return hands.sort((a, b) => {
    if (a.handStrength > b.handStrength) {
      return 1
    } else if (a.handStrength < b.handStrength) {
      return -1
    } else {
      for (let i = 0; i < 5; i++) {
        if (cardStrenghts[a.cards[i]] > cardStrenghts[b.cards[i]]) {
          return 1
        } else if (cardStrenghts[a.cards[i]] < cardStrenghts[b.cards[i]]) {
          return -1
        }
      }
      return 0
    }
  })
}

/**
 * @param {Hand[]} hands
 */
function getTotal(hands) {
  let total = 0
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i]
    total += hand.bid * (i + 1)
  }
  return total
}
