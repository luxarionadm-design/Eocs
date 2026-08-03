/**
 * @fileoverview Search algorithms
 * @module Search
 * @namespace LXRN.Algorithm
 * @memberof LXRN
 * 
 * @description
 * Provides search algorithms including linear search, binary search,
 * interpolation search, and exponential search.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { binarySearch, linearSearch } from '@lxrn/core';
 * 
 * const arr = [1, 3, 5, 7, 9];
 * console.log(binarySearch(arr, 5)); // 2
 * console.log(binarySearch(arr, 6)); // -1
 */

import { Vector } from '../container/Vector.js';
import { ValidationError } from '../core/Error.js';

/**
 * Linear search algorithm
 * @param {Array} array - Array to search
 * @param {*} target - Target value
 * @param {Function} [compare] - Equality comparison function
 * @returns {number} Index of target or -1 if not found
 */
export function linearSearch(array, target, compare = null) {
  const cmp = compare || ((a, b) => a === b);
  for (let i = 0; i < array.length; i++) {
    if (cmp(array[i], target)) {
      return i;
    }
  }
  return -1;
}

/**
 * Binary search algorithm (requires sorted array)
 * @param {Array} array - Sorted array to search
 * @param {*} target - Target value
 * @param {Function} [compare] - Comparison function
 * @returns {number} Index of target or -1 if not found
 */
export function binarySearch(array, target, compare = null) {
  const cmp = compare || ((a, b) => a < b);
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    }
    if (cmp(array[mid], target)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

/**
 * Interpolation search (requires uniformly distributed sorted array)
 * @param {Array} array - Sorted array to search
 * @param {*} target - Target value
 * @param {Function} [compare] - Comparison function
 * @returns {number} Index of target or -1 if not found
 */
export function interpolationSearch(array, target, compare = null) {
  const cmp = compare || ((a, b) => a < b);
  let left = 0;
  let right = array.length - 1;
  while (left <= right && cmp(array[left], target) && cmp(target, array[right])) {
    const pos = left + Math.floor(((target - array[left]) * (right - left)) / (array[right] - array[left]));
    if (array[pos] === target) {
      return pos;
    }
    if (cmp(array[pos], target)) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }
  return -1;
}

/**
 * Exponential search (requires sorted array)
 * @param {Array} array - Sorted array to search
 * @param {*} target - Target value
 * @param {Function} [compare] - Comparison function
 * @returns {number} Index of target or -1 if not found
 */
export function exponentialSearch(array, target, compare = null) {
  if (array.length === 0) return -1;
  if (array[0] === target) return 0;
  let i = 1;
  const cmp = compare || ((a, b) => a < b);
  while (i < array.length && cmp(array[i], target)) {
    i *= 2;
  }
  const left = Math.floor(i / 2);
  const right = Math.min(i, array.length - 1);
  return binarySearch(array.slice(left, right + 1), target, cmp);
}

/**
 * Find first occurrence using binary search
 * @param {Array} array - Sorted array to search
 * @param {*} target - Target value
 * @returns {number} Index of first occurrence or -1
 */
export function binarySearchFirst(array, target) {
  let result = -1;
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      result = mid;
      right = mid - 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

/**
 * Find last occurrence using binary search
 * @param {Array} array - Sorted array to search
 * @param {*} target - Target value
 * @returns {number} Index of last occurrence or -1
 */
export function binarySearchLast(array, target) {
  let result = -1;
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      result = mid;
      left = mid + 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

/**
 * Search in Vector
 * @param {Vector} vector - Vector to search
 * @param {*} target - Target value
 * @param {string} [method='binary'] - Search method
 * @returns {number} Index of target or -1
 */
export function searchVector(vector, target, method = 'binary') {
  if (!(vector instanceof Vector)) {
    throw new ValidationError('First argument must be a Vector instance');
  }
  const arr = vector.toArray();
  switch (method) {
    case 'linear': return linearSearch(arr, target);
    case 'binary': return binarySearch(arr, target);
    case 'interpolation': return interpolationSearch(arr, target);
    case 'exponential': return exponentialSearch(arr, target);
    default: return binarySearch(arr, target);
  }
}

/**
 * Default export containing all search algorithms
 * @type {Object}
 */
export default {
  linearSearch,
  binarySearch,
  binarySearchFirst,
  binarySearchLast,
  interpolationSearch,
  exponentialSearch,
  searchVector
};
