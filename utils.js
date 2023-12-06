/**
 * @template T
 * @param {T[]} array
 * @param {number} i
 * @param {number} j
 */
export function swap(array, i, j) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}
