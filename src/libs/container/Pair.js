/**
 * @fileoverview Pair Container - Two-value container for LXRN
 * @module Pair
 * @namespace LXRN.Container
 * @memberof LXRN
 * 
 * @description
 * This module provides a Pair class that holds two values, similar to
 * C++ std::pair. Includes methods for accessing, setting, swapping,
 * and comparing pairs.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { Pair, makePair } from '@lxrn/core';
 * 
 * const p = new Pair(10, 20);
 * console.log(p.getFirst()); // 10
 * console.log(p.getSecond()); // 20
 * p.swap(new Pair(30, 40));
 * console.log(p.toString()); // (30, 40)
 */

/**
 * Pair class - holds two values
 * @class
 */
export class Pair {
  /**
   * Create a new Pair
   * @param {*} first - First value
   * @param {*} second - Second value
   */
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  /**
   * Get first value
   * @returns {*} First value
   */
  getFirst() {
    return this.first;
  }

  /**
   * Get second value
   * @returns {*} Second value
   */
  getSecond() {
    return this.second;
  }

  /**
   * Set first value
   * @param {*} first - First value
   */
  setFirst(first) {
    this.first = first;
  }

  /**
   * Set second value
   * @param {*} second - Second value
   */
  setSecond(second) {
    this.second = second;
  }

  /**
   * Swap values with another Pair
   * @param {Pair} other - Other Pair
   */
  swap(other) {
    [this.first, other.first] = [other.first, this.first];
    [this.second, other.second] = [other.second, this.second];
  }

  /**
   * Convert to array
   * @returns {Array} Array of values
   */
  toArray() {
    return [this.first, this.second];
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return `(${this.first}, ${this.second})`;
  }

  /**
   * Check equality with another Pair
   * @param {Pair} other - Other Pair
   * @returns {boolean} True if equal
   */
  equals(other) {
    return other instanceof Pair &&
           this.first === other.first &&
           this.second === other.second;
  }

  /**
   * Map values using function
   * @param {Function} fn - Mapping function
   * @returns {Pair} New Pair with mapped values
   */
  map(fn) {
    return new Pair(fn(this.first), fn(this.second));
  }
}

/**
 * Create a new Pair
 * @param {*} first - First value
 * @param {*} second - Second value
 * @returns {Pair} New Pair
 */
export function makePair(first, second) {
  return new Pair(first, second);
}

/**
 * Default export containing Pair class and utilities
 * @type {Object}
 */
export default {
  Pair,
  makePair
};
