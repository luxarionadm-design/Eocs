/**
 * @fileoverview UniquePtr - Exclusive ownership smart pointer for LXRN
 * @module UniquePtr
 * @namespace LXRN.SmartPtr
 * @memberof LXRN
 * 
 * @description
 * This module provides a UniquePtr class that represents exclusive ownership
 * of a pointer, similar to C++ std::unique_ptr. Only one UniquePtr can own
 * a pointer at a time, and ownership can be transferred via release().
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { UniquePtr, makeUnique } from '@lxrn/core';
 * 
 * const ptr = new UniquePtr(42);
 * console.log(ptr.get()); // 42
 * console.log(ptr.hasValue()); // true
 * 
 * const released = ptr.release();
 * console.log(ptr.get()); // null
 * console.log(released); // 42
 */

/**
 * UniquePtr class - exclusive ownership pointer
 * @class
 */
export class UniquePtr {
  /**
   * Create a new UniquePtr
   * @param {*} [ptr=null] - Pointer value
   */
  constructor(ptr = null) {
    this._ptr = ptr;
  }

  /**
   * Get pointer value
   * @returns {*} Pointer value
   */
  get() {
    return this._ptr;
  }

  /**
   * Reset pointer
   * @param {*} [ptr=null] - New pointer value
   */
  reset(ptr = null) {
    this._ptr = ptr;
  }

  /**
   * Release ownership
   * @returns {*} Released pointer value
   */
  release() {
    const ptr = this._ptr;
    this._ptr = null;
    return ptr;
  }

  /**
   * Swap with another UniquePtr
   * @param {UniquePtr} other - Other UniquePtr
   */
  swap(other) {
    [this._ptr, other._ptr] = [other._ptr, this._ptr];
  }

  /**
   * Call operator (get pointer)
   * @returns {*} Pointer value
   */
  operator() {
    return this._ptr;
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
      throw new Error('UniquePtr has no value');
    }
    return this._ptr;
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return `UniquePtr(${this._ptr})`;
  }
}

/**
 * Create a new UniquePtr
 * @param {*} ptr - Pointer value
 * @returns {UniquePtr} New UniquePtr
 */
export function makeUnique(ptr) {
  return new UniquePtr(ptr);
}

/**
 * Default export containing UniquePtr class and utilities
 * @type {Object}
 */
export default {
  UniquePtr,
  makeUnique
};
