/**
 * @fileoverview Tuple Container - Multi-value immutable container for LXRN
 * @module Tuple
 * @namespace LXRN.Container
 * @memberof LXRN
 * 
 * @description
 * This module provides a Tuple class that holds multiple values, similar to
 * Python tuples or C++ std::tuple. Includes methods for accessing, mapping,
 * filtering, and reducing tuple elements.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { Tuple, makeTuple } from '@lxrn/core';
 * 
 * const t = new Tuple(1, 'hello', true, 42);
 * console.log(t.get(1)); // 'hello'
 * console.log(t.size()); // 4
 * console.log(t.map(x => typeof x === 'number' ? x * 2 : x).toString());
 * // (2, hello, true, 84)
 */

/**
 * Tuple class - holds multiple values
 * @class
 */
export class Tuple {
  /**
   * Create a new Tuple
   * @param {...*} elements - Elements
   */
  constructor(...elements) {
    this.elements = elements;
  }

  /**
   * Get element at index
   * @param {number} index - Index
   * @returns {*} Element at index
   * @throws {Error} If index out of bounds
   */
  get(index) {
    if (index < 0 || index >= this.elements.length) {
      throw new Error('Index out of bounds');
    }
    return this.elements[index];
  }

  /**
   * Set element at index
   * @param {number} index - Index
   * @param {*} value - Value to set
   * @throws {Error} If index out of bounds
   */
  set(index, value) {
    if (index < 0 || index >= this.elements.length) {
      throw new Error('Index out of bounds');
    }
    this.elements[index] = value;
  }

  /**
   * Get size of tuple
   * @returns {number} Size
   */
  size() {
    return this.elements.length;
  }

  /**
   * Convert to array
   * @returns {Array} Array of elements
   */
  toArray() {
    return [...this.elements];
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return `(${this.elements.join(', ')})`;
  }

  /**
   * Check equality with another Tuple
   * @param {Tuple} other - Other Tuple
   * @returns {boolean} True if equal
   */
  equals(other) {
    if (!(other instanceof Tuple)) return false;
    if (this.size() !== other.size()) return false;
    for (let i = 0; i < this.size(); i++) {
      if (this.elements[i] !== other.elements[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Map elements using function
   * @param {Function} fn - Mapping function
   * @returns {Tuple} New Tuple with mapped elements
   */
  map(fn) {
    return new Tuple(...this.elements.map(fn));
  }

  /**
   * Filter elements using predicate
   * @param {Function} predicate - Filter function
   * @returns {Tuple} New Tuple with filtered elements
   */
  filter(predicate) {
    return new Tuple(...this.elements.filter(predicate));
  }

  /**
   * Reduce elements using function
   * @param {Function} fn - Reduce function
   * @param {*} initial - Initial value
   * @returns {*} Reduced value
   */
  reduce(fn, initial) {
    return this.elements.reduce(fn, initial);
  }

  /**
   * Iterate over elements
   * @param {Function} fn - Function to call for each element
   */
  forEach(fn) {
    this.elements.forEach(fn);
  }

  /**
   * Iterator for Tuple
   * @returns {Iterator} Iterator
   */
  *[Symbol.iterator]() {
    for (const element of this.elements) {
      yield element;
    }
  }
}

/**
 * Create a new Tuple
 * @param {...*} elements - Elements
 * @returns {Tuple} New Tuple
 */
export function makeTuple(...elements) {
  return new Tuple(...elements);
}

/**
 * Get size of Tuple
 * @param {Tuple} tuple - Tuple
 * @returns {number} Size
 */
export function tupleSize(tuple) {
  return tuple.size();
}

/**
 * Get element from Tuple
 * @param {Tuple} tuple - Tuple
 * @param {number} index - Index
 * @returns {*} Element
 */
export function tupleElement(tuple, index) {
  return tuple.get(index);
}

/**
 * Default export containing Tuple class and utilities
 * @type {Object}
 */
export default {
  Tuple,
  makeTuple,
  tupleSize,
  tupleElement
};
