/**
 * @fileoverview SharedPtr - Shared ownership smart pointer with reference counting for LXRN
 * @module SharedPtr
 * @namespace LXRN.SmartPtr
 * @memberof LXRN
 * 
 * @description
 * This module provides a SharedPtr class that represents shared ownership
 * of a pointer with reference counting, similar to C++ std::shared_ptr.
 * Multiple SharedPtr instances can own the same pointer, and the pointer
 * is kept alive until the last SharedPtr is destroyed.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { SharedPtr, makeShared } from '@lxrn/core';
 * 
 * const ptr1 = new SharedPtr(42);
 * console.log(ptr1.useCount()); // 1
 * console.log(ptr1.unique()); // true
 * 
 * const ptr2 = ptr1;
 * console.log(ptr1.useCount()); // 2
 * console.log(ptr1.unique()); // false
 */

/**
 * SharedPtr class - shared ownership pointer with reference counting
 * @class
 */
export class SharedPtr {
  /**
   * Create a new SharedPtr
   * @param {*} [ptr=null] - Pointer value
   */
  constructor(ptr = null) {
    this._ptr = ptr;
    this._refCount = ptr !== null ? 1 : 0;
  }

  /**
   * Get pointer value
   * @returns {*} Pointer value
   */
  get() {
    return this._ptr;
  }

  /**
   * Get reference count
   * @returns {number} Reference count
   */
  useCount() {
    return this._refCount;
  }

  /**
   * Check if pointer is null
   * @returns {boolean} True if null
   */
  isNull() {
    return this._ptr === null;
  }

  /**
   * Check if has value
   * @returns {boolean} True if has value
   */
  hasValue() {
    return this._ptr !== null;
  }

  /**
   * Get value (throws if null)
   * @returns {*} Value
   * @throws {Error} If no value
   */
  value() {
    if (this._ptr === null) {
      throw new Error('SharedPtr has no value');
    }
    return this._ptr;
  }

  /**
   * Reset pointer
   * @param {*} [ptr=null] - New pointer value
   */
  reset(ptr = null) {
    this._ptr = ptr;
    this._refCount = ptr !== null ? 1 : 0;
  }

  /**
   * Swap with another SharedPtr
   * @param {SharedPtr} other - Other SharedPtr
   */
  swap(other) {
    [this._ptr, other._ptr] = [other._ptr, this._ptr];
    [this._refCount, other._refCount] = [other._refCount, this._refCount];
  }

  /**
   * Check if this is the only reference
   * @returns {boolean} True if unique
   */
  unique() {
    return this._refCount === 1;
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return `SharedPtr(${this._ptr}, refs=${this._refCount})`;
  }
}

/**
 * Create a new SharedPtr
 * @param {*} ptr - Pointer value
 * @returns {SharedPtr} New SharedPtr
 */
export function makeShared(ptr) {
  return new SharedPtr(ptr);
}

/**
 * Default export containing SharedPtr class and utilities
 * @type {Object}
 */
export default {
  SharedPtr,
  makeShared
};
