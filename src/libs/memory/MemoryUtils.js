/**
 * @fileoverview Memory Management Utilities - Memory allocation and manipulation for LXRN
 * @module MemoryUtils
 * @namespace LXRN.Memory
 * @memberof LXRN
 * 
 * @description
 * This module provides memory management utilities including allocation,
 * deallocation, reallocation, and memory manipulation functions for
 * working with array-based memory buffers.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { allocate, reallocate, memoryCopy, free } from '@lxrn/core';
 * 
 * const buf = allocate(10);
 * memoryCopy(buf, [1, 2, 3, 4, 5]);
 * const newBuf = reallocate(buf, 20);
 * free(newBuf);
 */

/**
 * Allocate memory buffer
 * @param {number} size - Size of buffer
 * @returns {Array} Allocated buffer
 */
export function allocate(size) {
  return new Array(size);
}

/**
 * Allocate zero-initialized memory buffer
 * @param {number} size - Size of buffer
 * @returns {Array} Allocated buffer
 */
export function allocateZero(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = 0;
  }
  return arr;
}

/**
 * Free memory buffer
 * @param {Array} ptr - Buffer to free
 * @returns {null} Null
 */
export function free(ptr) {
  if (Array.isArray(ptr)) {
    ptr.length = 0;
  }
  return null;
}

/**
 * Reallocate memory buffer
 * @param {Array} ptr - Existing buffer
 * @param {number} newSize - New size
 * @returns {Array} Reallocated buffer
 */
export function reallocate(ptr, newSize) {
  if (!Array.isArray(ptr)) {
    return allocate(newSize);
  }
  const newPtr = new Array(newSize);
  const copySize = Math.min(ptr.length, newSize);
  for (let i = 0; i < copySize; i++) {
    newPtr[i] = ptr[i];
  }
  return newPtr;
}

/**
 * Get memory buffer size
 * @param {Array} ptr - Buffer
 * @returns {number} Buffer size
 */
export function memorySize(ptr) {
  return Array.isArray(ptr) ? ptr.length : 0;
}

/**
 * Copy memory from source to destination
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @returns {Array} Destination buffer
 * @throws {Error} If buffers are invalid
 */
export function memoryCopy(dest, src) {
  if (!Array.isArray(dest) || !Array.isArray(src)) {
    throw new Error('Invalid memory buffer');
  }
  const size = Math.min(dest.length, src.length);
  for (let i = 0; i < size; i++) {
    dest[i] = src[i];
  }
  return dest;
}

/**
 * Move memory from source to destination
 * @param {Array} dest - Destination buffer
 * @param {Array} src - Source buffer
 * @returns {Array} Destination buffer
 */
export function memoryMove(dest, src) {
  return memoryCopy(dest, src);
}

/**
 * Set memory to a value
 * @param {Array} ptr - Buffer
 * @param {*} value - Value to set
 * @param {number} size - Number of bytes to set
 * @returns {Array} Buffer
 * @throws {Error} If buffer is invalid
 */
export function memorySet(ptr, value, size) {
  if (!Array.isArray(ptr)) {
    throw new Error('Invalid memory buffer');
  }
  const len = Math.min(ptr.length, size);
  for (let i = 0; i < len; i++) {
    ptr[i] = value;
  }
  return ptr;
}

/**
 * Compare memory regions
 * @param {Array} ptr1 - First buffer
 * @param {Array} ptr2 - Second buffer
 * @param {number} size - Number of bytes to compare
 * @returns {number} Negative if ptr1 < ptr2, positive if ptr1 > ptr2, 0 if equal
 * @throws {Error} If buffers are invalid
 */
export function memoryCompare(ptr1, ptr2, size) {
  if (!Array.isArray(ptr1) || !Array.isArray(ptr2)) {
    throw new Error('Invalid memory buffer');
  }
  const len = Math.min(ptr1.length, ptr2.length, size);
  for (let i = 0; i < len; i++) {
    if (ptr1[i] !== ptr2[i]) {
      return ptr1[i] < ptr2[i] ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Find value in memory
 * @param {Array} ptr - Buffer to search
 * @param {*} value - Value to find
 * @param {number} size - Number of bytes to search
 * @returns {number} Index of found value, or -1 if not found
 * @throws {Error} If buffer is invalid
 */
export function memoryFind(ptr, value, size) {
  if (!Array.isArray(ptr)) {
    throw new Error('Invalid memory buffer');
  }
  const len = Math.min(ptr.length, size);
  for (let i = 0; i < len; i++) {
    if (ptr[i] === value) {
      return i;
    }
  }
  return -1;
}

/**
 * Fill memory region with value
 * @param {Array} ptr - Buffer
 * @param {*} value - Value to fill
 * @param {number} start - Start index
 * @param {number} end - End index
 * @returns {Array} Buffer
 * @throws {Error} If buffer is invalid
 */
export function memoryFill(ptr, value, start, end) {
  if (!Array.isArray(ptr)) {
    throw new Error('Invalid memory buffer');
  }
  const s = Math.max(0, start);
  const e = Math.min(ptr.length, end);
  for (let i = s; i < e; i++) {
    ptr[i] = value;
  }
  return ptr;
}

/**
 * Default export containing all memory utilities
 * @type {Object}
 */
export default {
  allocate,
  allocateZero,
  free,
  reallocate,
  memorySize,
  memoryCopy,
  memoryMove,
  memorySet,
  memoryCompare,
  memoryFind,
  memoryFill
};
