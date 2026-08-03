/**
 * @fileoverview Range Container - Iterable range for LXRN
 * @module Range
 * @namespace LXRN.Container
 * @memberof LXRN
 * 
 * @description
 * This module provides a Range class that represents a sequence of numbers
 * from start to end with a step. Includes methods for mapping, filtering,
 * and reducing range values.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { Range, range } from '@lxrn/core';
 * 
 * const r = new Range(0, 10, 2);
 * console.log(r.toArray()); // [0, 2, 4, 6, 8]
 * console.log(r.size()); // 5
 * console.log(r.filter(x => x % 4 === 0).toArray()); // [0, 4, 8]
 */

/**
 * Range class - represents a range of values
 * @class
 */
export class Range {
  /**
   * Create a new Range
   * @param {number} start - Start value
   * @param {number} end - End value (exclusive)
   * @param {number} [step=1] - Step value
   * @throws {Error} If step is zero
   */
  constructor(start, end, step = 1) {
    if (step === 0) {
      throw new Error('Step cannot be zero');
    }
    this._start = start;
    this._end = end;
    this._step = step;
  }

  /**
   * Iterator for Range
   * @returns {Iterator} Iterator
   */
  *[Symbol.iterator]() {
    if (this._step > 0) {
      for (let i = this._start; i < this._end; i += this._step) {
        yield i;
      }
    } else {
      for (let i = this._start; i > this._end; i += this._step) {
        yield i;
      }
    }
  }

  /**
   * Convert to array
   * @returns {Array} Array of values
   */
  toArray() {
    return Array.from(this);
  }

  /**
   * Get size of range
   * @returns {number} Number of elements
   */
  size() {
    if (this._step > 0) {
      return Math.floor((this._end - this._start) / this._step);
    } else {
      return Math.floor((this._start - this._end) / -this._step);
    }
  }

  /**
   * Check if value is in range
   * @param {number} value - Value to check
   * @returns {boolean} True if in range
   */
  includes(value) {
    if (this._step > 0) {
      if (value < this._start || value >= this._end) return false;
      return (value - this._start) % this._step === 0;
    } else {
      if (value > this._start || value <= this._end) return false;
      return (this._start - value) % -this._step === 0;
    }
  }

  /**
   * Map values using function
   * @param {Function} fn - Mapping function
   * @returns {RangeMap} Mapped range
   */
  map(fn) {
    return new RangeMap(this, fn);
  }

  /**
   * Filter values using predicate
   * @param {Function} predicate - Filter function
   * @returns {RangeFilter} Filtered range
   */
  filter(predicate) {
    return new RangeFilter(this, predicate);
  }

  /**
   * Reduce values using function
   * @param {Function} fn - Reduce function
   * @param {*} initial - Initial value
   * @returns {*} Reduced value
   */
  reduce(fn, initial) {
    let result = initial;
    for (const value of this) {
      result = fn(result, value);
    }
    return result;
  }

  /**
   * Iterate over values
   * @param {Function} fn - Function to call for each value
   */
  forEach(fn) {
    for (const value of this) {
      fn(value);
    }
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return `Range(${this._start}, ${this._end}, ${this._step})`;
  }
}

/**
 * RangeMap class - mapped range
 * @class
 * @private
 */
class RangeMap {
  /**
   * Create a new RangeMap
   * @param {Range} range - Range
   * @param {Function} fn - Mapping function
   */
  constructor(range, fn) {
    this._range = range;
    this._fn = fn;
  }

  /**
   * Iterator for RangeMap
   * @returns {Iterator} Iterator
   */
  *[Symbol.iterator]() {
    for (const value of this._range) {
      yield this._fn(value);
    }
  }

  /**
   * Convert to array
   * @returns {Array} Array of values
   */
  toArray() {
    return Array.from(this);
  }
}

/**
 * RangeFilter class - filtered range
 * @class
 * @private
 */
class RangeFilter {
  /**
   * Create a new RangeFilter
   * @param {Range} range - Range
   * @param {Function} predicate - Filter function
   */
  constructor(range, predicate) {
    this._range = range;
    this._predicate = predicate;
  }

  /**
   * Iterator for RangeFilter
   * @returns {Iterator} Iterator
   */
  *[Symbol.iterator]() {
    for (const value of this._range) {
      if (this._predicate(value)) {
        yield value;
      }
    }
  }

  /**
   * Convert to array
   * @returns {Array} Array of values
   */
  toArray() {
    return Array.from(this);
  }
}

/**
 * Create a new Range
 * @param {number} start - Start value
 * @param {number} end - End value (exclusive)
 * @param {number} [step=1] - Step value
 * @returns {Range} New Range
 */
export function range(start, end, step = 1) {
  return new Range(start, end, step);
}

/**
 * Default export containing Range class and utilities
 * @type {Object}
 */
export default {
  Range,
  range,
  RangeMap,
  RangeFilter
};
