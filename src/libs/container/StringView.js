/**
 * @fileoverview StringView - Non-owning string view for LXRN
 * @module StringView
 * @namespace LXRN.Container
 * @memberof LXRN
 * 
 * @description
 * This module provides a StringView class that provides a view into a string
 * without copying it. Includes methods for accessing, searching, and
 * manipulating string views.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { StringView, stringView } from '@lxrn/core';
 * 
 * const sv = new StringView('Hello World', 0, 5);
 * console.log(sv.toString()); // 'Hello'
 * console.log(sv.length()); // 5
 * console.log(sv.find('ll')); // 2
 * console.log(sv.toUpperCase().toString()); // 'HELLO'
 */

/**
 * StringView class - view into a string
 * @class
 */
export class StringView {
  /**
   * Create a new StringView
   * @param {string} str - String
   * @param {number} [start=0] - Start index
   * @param {number} [end=null] - End index (exclusive)
   * @throws {Error} If range is invalid
   */
  constructor(str, start = 0, end = null) {
    this._str = str;
    this._start = start;
    this._end = end !== null ? end : str.length;
    if (this._start < 0 || this._end > str.length || this._start > this._end) {
      throw new Error('Invalid range');
    }
  }

  /**
   * Get length of view
   * @returns {number} Length
   */
  length() {
    return this._end - this._start;
  }

  /**
   * Check if view is empty
   * @returns {boolean} True if empty
   */
  empty() {
    return this.length() === 0;
  }

  /**
   * Get character at index
   * @param {number} index - Index
   * @returns {string} Character
   * @throws {Error} If index out of bounds
   */
  charAt(index) {
    if (index < 0 || index >= this.length()) {
      throw new Error('Index out of bounds');
    }
    return this._str[this._start + index];
  }

  /**
   * Get character at index (alias for charAt)
   * @param {number} index - Index
   * @returns {string} Character
   */
  at(index) {
    return this.charAt(index);
  }

  /**
   * Get substring view
   * @param {number} start - Start index
   * @param {number} [length=null] - Length
   * @returns {StringView} Substring view
   */
  substr(start, length = null) {
    const actualStart = this._start + start;
    const actualEnd = length !== null ? actualStart + length : this._end;
    return new StringView(this._str, actualStart, actualEnd);
  }

  /**
   * Get subview
   * @param {number} start - Start index
   * @param {number} [end=null] - End index
   * @returns {StringView} Subview
   */
  subview(start, end = null) {
    return this.substr(start, end !== null ? end - start : null);
  }

  /**
   * Convert to string
   * @returns {string} String
   */
  toString() {
    return this._str.substring(this._start, this._end);
  }

  /**
   * Compare with another StringView or string
   * @param {StringView|string} other - Other value
   * @returns {number} Negative if less, positive if greater, 0 if equal
   */
  compare(other) {
    if (!(other instanceof StringView)) {
      other = new StringView(other);
    }
    return this.toString().localeCompare(other.toString());
  }

  /**
   * Check equality with another StringView or string
   * @param {StringView|string} other - Other value
   * @returns {boolean} True if equal
   */
  equals(other) {
    if (!(other instanceof StringView)) {
      other = new StringView(other);
    }
    return this.toString() === other.toString();
  }

  /**
   * Find substring
   * @param {string} substr - Substring to find
   * @returns {number} Index of substring, or -1 if not found
   */
  find(substr) {
    const index = this.toString().indexOf(substr);
    return index !== -1 ? index - this._start : -1;
  }

  /**
   * Find substring from end
   * @param {string} substr - Substring to find
   * @returns {number} Index of substring, or -1 if not found
   */
  rfind(substr) {
    const index = this.toString().lastIndexOf(substr);
    return index !== -1 ? index - this._start : -1;
  }

  /**
   * Find character
   * @param {string} ch - Character to find
   * @returns {number} Index of character, or -1 if not found
   */
  findChar(ch) {
    for (let i = 0; i < this.length(); i++) {
      if (this.charAt(i) === ch) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Find character from end
   * @param {string} ch - Character to find
   * @returns {number} Index of character, or -1 if not found
   */
  rfindChar(ch) {
    for (let i = this.length() - 1; i >= 0; i--) {
      if (this.charAt(i) === ch) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Check if starts with prefix
   * @param {string} prefix - Prefix
   * @returns {boolean} True if starts with prefix
   */
  startsWith(prefix) {
    if (prefix.length > this.length()) return false;
    return this.substr(0, prefix.length).toString() === prefix;
  }

  /**
   * Check if ends with suffix
   * @param {string} suffix - Suffix
   * @returns {boolean} True if ends with suffix
   */
  endsWith(suffix) {
    if (suffix.length > this.length()) return false;
    return this.substr(this.length() - suffix.length).toString() === suffix;
  }

  /**
   * Trim whitespace from both ends
   * @returns {StringView} Trimmed view
   */
  trim() {
    let start = 0;
    let end = this.length() - 1;
    while (start <= end && this.charAt(start) === ' ') start++;
    while (end >= start && this.charAt(end) === ' ') end--;
    return this.substr(start, end - start + 1);
  }

  /**
   * Split by delimiter
   * @param {string} delimiter - Delimiter
   * @returns {Array} Array of StringView
   */
  split(delimiter) {
    return this.toString().split(delimiter).map(s => new StringView(s));
  }

  /**
   * Iterator for StringView
   * @returns {Iterator} Iterator
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length(); i++) {
      yield this.charAt(i);
    }
  }

  /**
   * Convert to array of characters
   * @returns {Array} Array of characters
   */
  toArray() {
    return Array.from(this);
  }

  /**
   * Convert to uppercase
   * @returns {StringView} Uppercase view
   */
  toUpperCase() {
    return new StringView(this.toString().toUpperCase());
  }

  /**
   * Convert to lowercase
   * @returns {StringView} Lowercase view
   */
  toLowerCase() {
    return new StringView(this.toString().toLowerCase());
  }
}

/**
 * Create a new StringView
 * @param {string} str - String
 * @param {number} [start=0] - Start index
 * @param {number} [end=null] - End index
 * @returns {StringView} New StringView
 */
export function stringView(str, start = 0, end = null) {
  return new StringView(str, start, end);
}

/**
 * Default export containing StringView class and utilities
 * @type {Object}
 */
export default {
  StringView,
  stringView
};
