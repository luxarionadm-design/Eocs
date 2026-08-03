/**
 * @fileoverview Optional Container - Nullable value container for LXRN
 * @module Optional
 * @namespace LXRN.Container
 * @memberof LXRN
 * 
 * @description
 * This module provides an Optional class that may or may not contain a value,
 * similar to C++ std::optional or Java Optional. Includes methods for
 * checking, getting, mapping, filtering, and chaining operations.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { Optional, optional } from '@lxrn/core';
 * 
 * const opt = optional(42);
 * console.log(opt.hasValue()); // true
 * console.log(opt.getOr(0)); // 42
 * console.log(opt.map(x => x * 2).getOr(0)); // 84
 * 
 * const empty = optional();
 * console.log(empty.getOr(0)); // 0
 */

/**
 * Optional class - may or may not contain a value
 * @class
 */
export class Optional {
  /**
   * Create a new Optional
   * @param {*} [value=null] - Value (null or undefined means empty)
   */
  constructor(value = null) {
    if (value !== null && value !== undefined) {
      this._value = value;
      this._hasValue = true;
    } else {
      this._hasValue = false;
    }
  }

  /**
   * Check if value is present
   * @returns {boolean} True if value is present
   */
  hasValue() {
    return this._hasValue;
  }

  /**
   * Get value (throws if empty)
   * @returns {*} Value
   * @throws {Error} If no value
   */
  get() {
    if (!this._hasValue) {
      throw new Error('Optional has no value');
    }
    return this._value;
  }

  /**
   * Get value or default
   * @param {*} defaultValue - Default value
   * @returns {*} Value or default
   */
  getOr(defaultValue) {
    return this._hasValue ? this._value : defaultValue;
  }

  /**
   * Get value or call supplier
   * @param {Function} supplier - Supplier function
   * @returns {*} Value or supplier result
   */
  getOrElse(supplier) {
    return this._hasValue ? this._value : supplier();
  }

  /**
   * Get this Optional or another if empty
   * @param {Optional} other - Other Optional
   * @returns {Optional} This Optional or other
   */
  orElse(other) {
    return this._hasValue ? this : other;
  }

  /**
   * Map value using function
   * @param {Function} fn - Mapping function
   * @returns {Optional} New Optional with mapped value
   */
  map(fn) {
    return this._hasValue ? new Optional(fn(this._value)) : new Optional();
  }

  /**
   * Flat map value using function
   * @param {Function} fn - Mapping function returning Optional
   * @returns {Optional} Result of function or empty
   */
  flatMap(fn) {
    return this._hasValue ? fn(this._value) : new Optional();
  }

  /**
   * Filter value using predicate
   * @param {Function} predicate - Filter function
   * @returns {Optional} This Optional if predicate passes, otherwise empty
   */
  filter(predicate) {
    return this._hasValue && predicate(this._value) ? this : new Optional();
  }

  /**
   * Execute consumer if value is present
   * @param {Function} consumer - Consumer function
   */
  ifPresent(consumer) {
    if (this._hasValue) {
      consumer(this._value);
    }
  }

  /**
   * Execute consumer if value is present, otherwise execute empty action
   * @param {Function} consumer - Consumer function
   * @param {Function} emptyAction - Empty action function
   */
  ifPresentOrElse(consumer, emptyAction) {
    if (this._hasValue) {
      consumer(this._value);
    } else {
      emptyAction();
    }
  }

  /**
   * Get value or throw error from supplier
   * @param {Function} errorSupplier - Error supplier
   * @returns {*} Value
   * @throws {Error} If no value
   */
  orElseThrow(errorSupplier) {
    if (!this._hasValue) {
      throw errorSupplier();
    }
    return this._value;
  }

  /**
   * Convert to string
   * @returns {string} String representation
   */
  toString() {
    return this._hasValue ? `Optional(${this._value})` : 'Optional.empty';
  }

  /**
   * Check equality with another Optional
   * @param {Optional} other - Other Optional
   * @returns {boolean} True if equal
   */
  equals(other) {
    if (!(other instanceof Optional)) return false;
    if (this._hasValue !== other._hasValue) return false;
    if (!this._hasValue) return true;
    return this._value === other._value;
  }
}

/**
 * Create an Optional with value
 * @param {*} value - Value
 * @returns {Optional} Optional with value
 */
export function optional(value) {
  return new Optional(value);
}

/**
 * Create an empty Optional
 * @returns {Optional} Empty Optional
 */
export function optionalEmpty() {
  return new Optional();
}

/**
 * Default export containing Optional class and utilities
 * @type {Object}
 */
export default {
  Optional,
  optional,
  optionalEmpty
};
