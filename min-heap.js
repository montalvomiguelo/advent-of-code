import { swap } from './utils.js'

export default class MinHeap {
  /** @type {number[]} */
  heap

  constructor() {
    this.heap = []
  }

  /**
   * @param {number} index
   */
  getLeftIndex(index) {
    return 2 * index + 1
  }

  /**
   * @param {number} index
   */
  getRightIndex(index) {
    return 2 * index + 2
  }

  /**
   * @param {number} index
   */
  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   * @param {number} value
   */
  insert(value) {
    if (!value) {
      return false
    }
    this.heap.push(value)
    this.siftUp(this.heap.length - 1)
    return true
  }

  /**
   * @param {number} index
   */
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while (index > 0 && this.heap[parent] > this.heap[index]) {
      swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  extract() {
    if (this.heap.length === 0) {
      return
    }

    if (this.heap.length === 1) {
      return this.heap.shift()
    }

    const root = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.siftDown(0)
    return root
  }

  /**
   * @param {number} index
   */
  siftDown(index) {
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    let smallest = index
    const size = this.heap.length

    if (left < size && this.heap[left] < this.heap[smallest]) {
      smallest = left
    }
    if (right < size && this.heap[right] < this.heap[smallest]) {
      smallest = right
    }
    if (smallest !== index) {
      swap(this.heap, smallest, index)
      this.siftDown(smallest)
    }
  }
}
