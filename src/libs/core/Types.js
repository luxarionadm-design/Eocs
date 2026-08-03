/**
 * @fileoverview Core Type Checking - Type utilities and predicates for LXRN
 * @module Types
 * @namespace LXRN.Core
 * @memberof LXRN
 * 
 * @description
 * This module provides comprehensive type checking utilities including type
 * predicates, type name detection, and utility functions for working with
 * JavaScript types. It re-exports StdDef and StdInt modules for convenience.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { isNumber, isString, typeName, str } from '@lxrn/core';
 * 
 * if (isNumber(42)) {
 *   console.log('Is a number');
 * }
 * console.log(typeName({})); // 'Object'
 * console.log(str(123)); // '123'
 */

import * as StdDef from './StdDef.js';
import * as StdInt from './StdInt.js';

/**
 * Check if value is a number (not NaN)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid number
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is a string
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a string
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Check if value is a boolean
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a boolean
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * Check if value is an object (non-null)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is an object
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * Check if value is a function
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a function
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Check if value is null
 * @param {*} value - Value to check
 * @returns {boolean} True if value is null
 */
export function isNull(value) {
  return value === null;
}

/**
 * Check if value is undefined
 * @param {*} value - Value to check
 * @returns {boolean} True if value is undefined
 */
export function isUndefined(value) {
  return value === undefined;
}

/**
 * Check if value is null or undefined
 * @param {*} value - Value to check
 * @returns {boolean} True if value is null or undefined
 */
export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

/**
 * Check if value is a primitive type
 * @param {*} value - Value to check
 * @returns {boolean} True if value is primitive
 */
export function isPrimitive(value) {
  return value === null || 
         value === undefined || 
         typeof value === 'string' ||
         typeof value === 'number' ||
         typeof value === 'boolean' ||
         typeof value === 'symbol' ||
         typeof value === 'bigint';
}

/**
 * Get the type name of a value
 * @param {*} value - Value to inspect
 * @returns {string} Type name
 */
export function typeName(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'Array';
  return value.constructor ? value.constructor.name : typeof value;
}

/**
 * Convert value to string
 * @param {*} x - Value to convert
 * @returns {string} String representation
 */
export const str = (x) => String(x);

/**
 * Convert value to quoted string
 * @param {*} x - Value to convert
 * @returns {string} Quoted string representation
 */
export const mkStr = (x) => `"${String(x)}"`;

/**
 * Convert value to string (alias for str)
 * @param {*} x - Value to convert
 * @returns {string} String representation
 */
export const toString = (x) => String(x);

/**
 * Convert value to wide string (alias for str)
 * @param {*} x - Value to convert
 * @returns {string} String representation
 */
export const toWString = (x) => String(x);

/**
 * Identity function - returns the input value
 * @param {*} value - Input value
 * @returns {*} Same value
 */
export function identity(value) {
  return value;
}

/**
 * No operation function
 * @returns {undefined}
 */
export function noop() {
  return undefined;
}

/**
 * Create a function that always returns the given value
 * @param {*} value - Value to return
 * @returns {Function} Function that returns the value
 */
export function always(value) {
  return () => value;
}

/**
 * Create a constant function (alias for always)
 * @param {*} value - Value to return
 * @returns {Function} Function that returns the value
 */
export function constant(value) {
  return () => value;
}

/**
 * Standard definitions module reference
 * @type {Object}
 */
export { StdDef };

/**
 * Standard integer types module reference
 * @type {Object}
 */
export { StdInt };

/**
 * Default export containing all type utilities
 * @type {Object}
 */
export default {
  StdDef,
  StdInt,
  isNumber,
  isString,
  isBoolean,
  isObject,
  isFunction,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isPrimitive,
  typeName,
  str,
  mkStr,
  toString,
  toWString,
  identity,
  noop,
  always,
  constant
};
