/**
 * @fileoverview Sorting algorithms
 * @module Sort
 * @namespace LXRN.Algorithm
 * @memberof LXRN
 * 
 * @description
 * Provides sorting algorithms including bubble sort, insertion sort,
 * selection sort, merge sort, quick sort, and heap sort.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { quickSort, mergeSort, bubbleSort } from '@lxrn/core';
 * 
 * const arr = [5, 3, 8, 1, 9];
 * console.log(quickSort(arr)); // [1, 3, 5, 8, 9]
 */

import { Vector } from '../container/Vector.js';
import { swap } from '../utility/Utility.js';
import { ValidationError } from '../core/Error.js';

/**
 * Bubble sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function bubbleSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let swapped = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (!cmp(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

/**
 * Insertion sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function insertionSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && !cmp(arr[j], key)) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/**
 * Selection sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function selectionSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (cmp(arr[j], arr[minIdx])) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/**
 * Merge sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function mergeSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  
  function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (cmp(left[i], right[j])) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  
  function sort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, mid));
    const right = sort(arr.slice(mid));
    return merge(left, right);
  }
  
  return sort(arr);
}

/**
 * Quick sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function quickSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  
  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (cmp(arr[j], pivot)) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
  
  function sort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      sort(arr, low, pi - 1);
      sort(arr, pi + 1, high);
    }
    return arr;
  }
  
  return sort(arr, 0, arr.length - 1);
}

/**
 * Heap sort algorithm
 * @param {Array} array - Array to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Array} Sorted array
 */
export function heapSort(array, compare = null) {
  const arr = [...array];
  const cmp = compare || ((a, b) => a < b);
  const len = arr.length;
  
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && cmp(arr[largest], arr[left])) {
      largest = left;
    }
    if (right < n && cmp(arr[largest], arr[right])) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }
  
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, len, i);
  }
  for (let i = len - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

/**
 * Sort using Vector (in-place)
 * @param {Vector} vector - Vector to sort
 * @param {Function} [compare] - Comparison function
 * @returns {Vector} Sorted vector
 */
export function sortVector(vector, compare = null) {
  if (!(vector instanceof Vector)) {
    throw new ValidationError('First argument must be a Vector instance');
  }
  const arr = vector.toArray();
  const sorted = quickSort(arr, compare);
  vector.clear();
  for (const value of sorted) {
    vector.push(value);
  }
  return vector;
}

/**
 * Default export containing all sorting algorithms
 * @type {Object}
 */
export default {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
  sortVector
};
