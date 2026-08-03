/**
 * @fileoverview Standard Integer Types - Fixed-width integers and utilities for LXRN
 * @module StdInt
 * @namespace LXRN.Core
 * @memberof LXRN
 * 
 * @description
 * This module provides fixed-width integer types following C++ stdint.h conventions,
 * including int8_t, uint32_t, int64_t, and related fast and least variants.
 * Includes validation functions, min/max constants, and conversion utilities.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { int32_t, INT32_MAX, isInt32 } from '@lxrn/core';
 * const value = int32_t(42);
 * if (isInt32(value)) {
 *   console.log('Valid int32_t');
 * }
 */

/**
 * Signed 8-bit integer type
 * @type {Function}
 */
export const int8_t = Number;

/**
 * Signed 16-bit integer type
 * @type {Function}
 */
export const int16_t = Number;

/**
 * Signed 32-bit integer type
 * @type {Function}
 */
export const int32_t = Number;

/**
 * Signed 64-bit integer type
 * @type {Function}
 */
export const int64_t = Number;

/**
 * Unsigned 8-bit integer type
 * @type {Function}
 */
export const uint8_t = Number;

/**
 * Unsigned 16-bit integer type
 * @type {Function}
 */
export const uint16_t = Number;

/**
 * Unsigned 32-bit integer type
 * @type {Function}
 */
export const uint32_t = Number;

/**
 * Unsigned 64-bit integer type
 * @type {Function}
 */
export const uint64_t = Number;

/**
 * Fast signed 8-bit integer type
 * @type {Function}
 */
export const int_fast8_t = Number;

/**
 * Fast signed 16-bit integer type
 * @type {Function}
 */
export const int_fast16_t = Number;

/**
 * Fast signed 32-bit integer type
 * @type {Function}
 */
export const int_fast32_t = Number;

/**
 * Fast signed 64-bit integer type
 * @type {Function}
 */
export const int_fast64_t = Number;

/**
 * Fast unsigned 8-bit integer type
 * @type {Function}
 */
export const uint_fast8_t = Number;

/**
 * Fast unsigned 16-bit integer type
 * @type {Function}
 */
export const uint_fast16_t = Number;

/**
 * Fast unsigned 32-bit integer type
 * @type {Function}
 */
export const uint_fast32_t = Number;

/**
 * Fast unsigned 64-bit integer type
 * @type {Function}
 */
export const uint_fast64_t = Number;

/**
 * Least signed 8-bit integer type
 * @type {Function}
 */
export const int_least8_t = Number;

/**
 * Least signed 16-bit integer type
 * @type {Function}
 */
export const int_least16_t = Number;

/**
 * Least signed 32-bit integer type
 * @type {Function}
 */
export const int_least32_t = Number;

/**
 * Least signed 64-bit integer type
 * @type {Function}
 */
export const int_least64_t = Number;

/**
 * Least unsigned 8-bit integer type
 * @type {Function}
 */
export const uint_least8_t = Number;

/**
 * Least unsigned 16-bit integer type
 * @type {Function}
 */
export const uint_least16_t = Number;

/**
 * Least unsigned 32-bit integer type
 * @type {Function}
 */
export const uint_least32_t = Number;

/**
 * Least unsigned 64-bit integer type
 * @type {Function}
 */
export const uint_least64_t = Number;

/**
 * Minimum value for int8_t
 * @type {number}
 */
export const INT8_MIN = -128;

/**
 * Maximum value for int8_t
 * @type {number}
 */
export const INT8_MAX = 127;

/**
 * Maximum value for uint8_t
 * @type {number}
 */
export const UINT8_MAX = 255;

/**
 * Minimum value for int16_t
 * @type {number}
 */
export const INT16_MIN = -32768;

/**
 * Maximum value for int16_t
 * @type {number}
 */
export const INT16_MAX = 32767;

/**
 * Maximum value for uint16_t
 * @type {number}
 */
export const UINT16_MAX = 65535;

/**
 * Minimum value for int32_t
 * @type {number}
 */
export const INT32_MIN = -2147483648;

/**
 * Maximum value for int32_t
 * @type {number}
 */
export const INT32_MAX = 2147483647;

/**
 * Maximum value for uint32_t
 * @type {number}
 */
export const UINT32_MAX = 4294967295;

/**
 * Minimum value for int64_t
 * @type {number}
 */
export const INT64_MIN = Number.MIN_SAFE_INTEGER;

/**
 * Maximum value for int64_t
 * @type {number}
 */
export const INT64_MAX = Number.MAX_SAFE_INTEGER;

/**
 * Maximum value for uint64_t
 * @type {number}
 */
export const UINT64_MAX = Number.MAX_SAFE_INTEGER;

/**
 * Minimum value for int_fast8_t
 * @type {number}
 */
export const INT_FAST8_MIN = INT8_MIN;

/**
 * Maximum value for int_fast8_t
 * @type {number}
 */
export const INT_FAST8_MAX = INT8_MAX;

/**
 * Maximum value for uint_fast8_t
 * @type {number}
 */
export const UINT_FAST8_MAX = UINT8_MAX;

/**
 * Minimum value for int_fast16_t
 * @type {number}
 */
export const INT_FAST16_MIN = INT16_MIN;

/**
 * Maximum value for int_fast16_t
 * @type {number}
 */
export const INT_FAST16_MAX = INT16_MAX;

/**
 * Maximum value for uint_fast16_t
 * @type {number}
 */
export const UINT_FAST16_MAX = UINT16_MAX;

/**
 * Minimum value for int_fast32_t
 * @type {number}
 */
export const INT_FAST32_MIN = INT32_MIN;

/**
 * Maximum value for int_fast32_t
 * @type {number}
 */
export const INT_FAST32_MAX = INT32_MAX;

/**
 * Maximum value for uint_fast32_t
 * @type {number}
 */
export const UINT_FAST32_MAX = UINT32_MAX;

/**
 * Minimum value for int_fast64_t
 * @type {number}
 */
export const INT_FAST64_MIN = INT64_MIN;

/**
 * Maximum value for int_fast64_t
 * @type {number}
 */
export const INT_FAST64_MAX = INT64_MAX;

/**
 * Maximum value for uint_fast64_t
 * @type {number}
 */
export const UINT_FAST64_MAX = UINT64_MAX;

/**
 * Check if value is a valid int8_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid int8_t
 */
export function isInt8(value) {
  return Number.isInteger(value) && value >= INT8_MIN && value <= INT8_MAX;
}

/**
 * Check if value is a valid uint8_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid uint8_t
 */
export function isUInt8(value) {
  return Number.isInteger(value) && value >= 0 && value <= UINT8_MAX;
}

/**
 * Check if value is a valid int16_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid int16_t
 */
export function isInt16(value) {
  return Number.isInteger(value) && value >= INT16_MIN && value <= INT16_MAX;
}

/**
 * Check if value is a valid uint16_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid uint16_t
 */
export function isUInt16(value) {
  return Number.isInteger(value) && value >= 0 && value <= UINT16_MAX;
}

/**
 * Check if value is a valid int32_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid int32_t
 */
export function isInt32(value) {
  return Number.isInteger(value) && value >= INT32_MIN && value <= INT32_MAX;
}

/**
 * Check if value is a valid uint32_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid uint32_t
 */
export function isUInt32(value) {
  return Number.isInteger(value) && value >= 0 && value <= UINT32_MAX;
}

/**
 * Check if value is a valid int64_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid int64_t
 */
export function isInt64(value) {
  return Number.isInteger(value) && value >= INT64_MIN && value <= INT64_MAX;
}

/**
 * Check if value is a valid uint64_t
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid uint64_t
 */
export function isUInt64(value) {
  return Number.isInteger(value) && value >= 0 && value <= UINT64_MAX;
}

/**
 * Check if value is an integer
 * @param {*} value - Value to check
 * @returns {boolean} True if value is an integer
 */
export function isInteger(value) {
  return Number.isInteger(value);
}

/**
 * Check if value is unsigned (non-negative integer)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is unsigned
 */
export function isUnsigned(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Check if value is signed (negative integer)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is signed
 */
export function isSigned(value) {
  return Number.isInteger(value) && value < 0;
}

/**
 * Convert value to int32_t (truncate)
 * @param {*} value - Value to convert
 * @returns {number} Converted int32_t value
 */
export function toInt32(value) {
  return value | 0;
}

/**
 * Convert value to uint32_t (truncate)
 * @param {*} value - Value to convert
 * @returns {number} Converted uint32_t value
 */
export function toUInt32(value) {
  return value >>> 0;
}

/**
 * Default export containing all integer types and utilities
 * @type {Object}
 */
export default {
  int8_t,
  int16_t,
  int32_t,
  int64_t,
  uint8_t,
  uint16_t,
  uint32_t,
  uint64_t,
  int_fast8_t,
  int_fast16_t,
  int_fast32_t,
  int_fast64_t,
  uint_fast8_t,
  uint_fast16_t,
  uint_fast32_t,
  uint_fast64_t,
  int_least8_t,
  int_least16_t,
  int_least32_t,
  int_least64_t,
  uint_least8_t,
  uint_least16_t,
  uint_least32_t,
  uint_least64_t,
  INT8_MIN,
  INT8_MAX,
  UINT8_MAX,
  INT16_MIN,
  INT16_MAX,
  UINT16_MAX,
  INT32_MIN,
  INT32_MAX,
  UINT32_MAX,
  INT64_MIN,
  INT64_MAX,
  UINT64_MAX,
  INT_FAST8_MIN,
  INT_FAST8_MAX,
  UINT_FAST8_MAX,
  INT_FAST16_MIN,
  INT_FAST16_MAX,
  UINT_FAST16_MAX,
  INT_FAST32_MIN,
  INT_FAST32_MAX,
  UINT_FAST32_MAX,
  INT_FAST64_MIN,
  INT_FAST64_MAX,
  UINT_FAST64_MAX,
  isInt8,
  isUInt8,
  isInt16,
  isUInt16,
  isInt32,
  isUInt32,
  isInt64,
  isUInt64,
  isInteger,
  isUnsigned,
  isSigned,
  toInt32,
  toUInt32
};
