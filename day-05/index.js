import MinHeap from '../min-heap.js'

/**
 * @param {string[]} lines
 */
export default function (lines) {
  const seeds = resolveSeeds(lines)
  const seedsToSoil = resolveRanges(lines, 'seed-to-soil map:')
  const soilToFertilizer = resolveRanges(lines, 'soil-to-fertilizer map:')
  const fertilizerToWater = resolveRanges(lines, 'fertilizer-to-water map:')
  const waterToLight = resolveRanges(lines, 'water-to-light map:')
  const lightToTemperature = resolveRanges(lines, 'light-to-temperature map:')
  const temperatureToHumidity = resolveRanges(
    lines,
    'temperature-to-humidity map:'
  )
  const humidityToLocation = resolveRanges(lines, 'humidity-to-location map:')

  const minHeap = new MinHeap()

  for (let i = 0; i < seeds.length; i++) {
    const seed = parseInt(seeds[i])
    const soil = convert(seed, seedsToSoil)
    const fertilizer = convert(soil, soilToFertilizer)
    const water = convert(fertilizer, fertilizerToWater)
    const light = convert(water, waterToLight)
    const temperature = convert(light, lightToTemperature)
    const humidity = convert(temperature, temperatureToHumidity)
    const location = convert(humidity, humidityToLocation)

    minHeap.insert(location)
  }

  return minHeap.extract()
}

/**
 * @param {number} seed
 * @param {{destinationRangeStart: number, sourceRangeStart: number, rangeLength: number}[]} ranges
 */
function convert(seed, ranges) {
  const range = ranges.find(
    ({ sourceRangeStart, rangeLength }) =>
      seed >= sourceRangeStart && seed < sourceRangeStart + rangeLength
  )

  return range
    ? seed - range.sourceRangeStart + range.destinationRangeStart
    : seed
}

/**
 * @param {string[]} lines
 */
function resolveSeeds(lines) {
  return lines.splice(0, 1)[0].split(': ')[1].split(' ')
}

/**
 * @param {string[]} lines
 * @param {string} heading
 */
function resolveRanges(lines, heading) {
  /** @type {{destinationRangeStart: number, sourceRangeStart: number, rangeLength: number}[]} */
  const ranges = []
  let isHeading = false

  while (lines.length) {
    const line = lines[0]

    if (isHeading && !line) {
      break
    }

    if (line === heading) {
      isHeading = true
      lines.splice(0, 1)
    } else if (!line) {
      lines.splice(0, 1)
    } else if (isHeading) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = lines
        .splice(0, 1)[0]
        .split(' ')

      ranges.push({
        destinationRangeStart: parseInt(destinationRangeStart),
        sourceRangeStart: parseInt(sourceRangeStart),
        rangeLength: parseInt(rangeLength)
      })
    }
  }

  return ranges
}
