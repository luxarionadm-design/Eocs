/**
 * @fileoverview Type Traits - Compile-time type inspection for LXRN
 * @module TypeTraits
 * @namespace LXRN.Traits
 * @memberof LXRN
 * 
 * @description
 * This module provides type traits and metaprogramming utilities for
 * inspecting and manipulating types at runtime, similar to C++ type traits.
 * Includes predicates for checking type properties and functions for
 * type manipulation.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { isIntegral, isFloatingPoint, isClass, isConstructible } from '@lxrn/core';
 * 
 * console.log(isIntegral(Number)); // true
 * console.log(isFloatingPoint(Number)); // true
 * console.log(isClass(Array)); // true
 * console.log(isConstructible(Array)); // true
 */

import * as StdInt from '../core/StdInt.js';

/**
 * Check if type is trivially constructible
 * @param {*} type - Type to check
 * @returns {boolean} True if trivially constructible
 */
export function isTriviallyConstructible(type) {
  return typeof type === 'function' || typeof type === 'object' || type === null;
}

/**
 * Check if type is trivially copyable
 * @param {*} type - Type to check
 * @returns {boolean} True if trivially copyable
 */
export function isTriviallyCopyable(type) {
  return typeof type === 'function' || typeof type === 'object' || type === null;
}

/**
 * Check if type is trivially destructible
 * @param {*} type - Type to check
 * @returns {boolean} True if trivially destructible
 */
export function isTriviallyDestructible(type) {
  return typeof type === 'function' || typeof type === 'object' || type === null;
}

/**
 * Check if type is standard layout
 * @param {*} type - Type to check
 * @returns {boolean} True if standard layout
 */
export function isStandardLayout(type) {
  return typeof type === 'function' || typeof type === 'object' || type === null;
}

/**
 * Check if type is POD (Plain Old Data)
 * @param {*} type - Type to check
 * @returns {boolean} True if POD
 */
export function isPOD(type) {
  return typeof type === 'function' || typeof type === 'object' || type === null;
}

/**
 * Check if type is integral
 * @param {*} type - Type to check
 * @returns {boolean} True if integral
 */
export function isIntegral(type) {
  return type === Number || 
         type === BigInt || 
         type === StdInt.int8_t ||
         type === StdInt.int16_t ||
         type === StdInt.int32_t ||
         type === StdInt.int64_t ||
         type === StdInt.uint8_t ||
         type === StdInt.uint16_t ||
         type === StdInt.uint32_t ||
         type === StdInt.uint64_t ||
         type === StdInt.int_fast8_t ||
         type === StdInt.int_fast16_t ||
         type === StdInt.int_fast32_t ||
         type === StdInt.int_fast64_t ||
         type === StdInt.uint_fast8_t ||
         type === StdInt.uint_fast16_t ||
         type === StdInt.uint_fast32_t ||
         type === StdInt.uint_fast64_t;
}

/**
 * Check if type is floating point
 * @param {*} type - Type to check
 * @returns {boolean} True if floating point
 */
export function isFloatingPoint(type) {
  return type === Number || type === BigInt;
}

/**
 * Check if type is arithmetic
 * @param {*} type - Type to check
 * @returns {boolean} True if arithmetic
 */
export function isArithmetic(type) {
  return isIntegral(type) || isFloatingPoint(type);
}

/**
 * Check if type is pointer
 * @param {*} type - Type to check
 * @returns {boolean} True if pointer
 */
export function isPointer(type) {
  return type === null || type === undefined || typeof type === 'object' || type === Function;
}

/**
 * Check if type is reference
 * @param {*} type - Type to check
 * @returns {boolean} True if reference
 */
export function isReference(type) {
  return typeof type === 'object' && type !== null;
}

/**
 * Check if type is const (always false in JavaScript)
 * @param {*} type - Type to check
 * @returns {boolean} False
 */
export function isConst(type) {
  return false;
}

/**
 * Check if type is volatile (always false in JavaScript)
 * @param {*} type - Type to check
 * @returns {boolean} False
 */
export function isVolatile(type) {
  return false;
}

/**
 * Check if type is array
 * @param {*} type - Type to check
 * @returns {boolean} True if array
 */
export function isArray(type) {
  return Array.isArray(type) || (typeof type === 'function' && type.name === 'Array');
}

/**
 * Check if type is function
 * @param {*} type - Type to check
 * @returns {boolean} True if function
 */
export function isFunction(type) {
  return typeof type === 'function';
}

/**
 * Check if type is class
 * @param {*} type - Type to check
 * @returns {boolean} True if class
 */
export function isClass(type) {
  return typeof type === 'function' && type.prototype && type.prototype.constructor === type;
}

/**
 * Check if type is enum
 * @param {*} type - Type to check
 * @returns {boolean} True if enum
 */
export function isEnum(type) {
  return typeof type === 'object' && type !== null && !Array.isArray(type);
}

/**
 * Check if type is union (always false in JavaScript)
 * @param {*} type - Type to check
 * @returns {boolean} False
 */
export function isUnion(type) {
  return false;
}

/**
 * Check if type is void
 * @param {*} type - Type to check
 * @returns {boolean} True if void
 */
export function isVoid(type) {
  return type === undefined || type === null;
}

/**
 * Check if type is null pointer
 * @param {*} type - Type to check
 * @returns {boolean} True if null pointer
 */
export function isNullPointer(type) {
  return type === null || type === undefined;
}

/**
 * Check if two types are the same
 * @param {*} type1 - First type
 * @param {*} type2 - Second type
 * @returns {boolean} True if same
 */
export function isSame(type1, type2) {
  return type1 === type2;
}

/**
 * Check if base is a base of derived
 * @param {*} base - Base type
 * @param {*} derived - Derived type
 * @returns {boolean} True if base is base of derived
 */
export function isBaseOf(base, derived) {
  try {
    return derived.prototype instanceof base;
  } catch {
    return false;
  }
}

/**
 * Check if type is convertible from another type
 * @param {*} from - Source type
 * @param {*} to - Target type
 * @returns {boolean} True if convertible
 */
export function isConvertible(from, to) {
  try {
    return typeof from === typeof to || from instanceof to;
  } catch {
    return false;
  }
}

/**
 * Check if type is constructible with arguments
 * @param {*} type - Type to check
 * @param {...*} args - Constructor arguments
 * @returns {boolean} True if constructible
 */
export function isConstructible(type, ...args) {
  try {
    new type(...args);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if type is default constructible
 * @param {*} type - Type to check
 * @returns {boolean} True if default constructible
 */
export function isDefaultConstructible(type) {
  return isConstructible(type);
}

/**
 * Check if type is copy constructible
 * @param {*} type - Type to check
 * @returns {boolean} True if copy constructible
 */
export function isCopyConstructible(type) {
  try {
    const instance = new type();
    new type(instance);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if type is move constructible (same as copy in JavaScript)
 * @param {*} type - Type to check
 * @returns {boolean} True if move constructible
 */
export function isMoveConstructible(type) {
  return isCopyConstructible(type);
}

/**
 * Check if type is assignable
 * @param {*} type - Type to check
 * @returns {boolean} True if assignable
 */
export function isAssignable(type) {
  return typeof type === 'function' || typeof type === 'object';
}

/**
 * Check if type is copy assignable
 * @param {*} type - Type to check
 * @returns {boolean} True if copy assignable
 */
export function isCopyAssignable(type) {
  return isAssignable(type);
}

/**
 * Check if type is move assignable (same as copy in JavaScript)
 * @param {*} type - Type to check
 * @returns {boolean} True if move assignable
 */
export function isMoveAssignable(type) {
  return isAssignable(type);
}

/**
 * Check if type is destructible
 * @param {*} type - Type to check
 * @returns {boolean} True if destructible
 */
export function isDestructible(type) {
  return typeof type === 'function' || typeof type === 'object';
}

/**
 * Remove const qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function removeConst(type) {
  return type;
}

/**
 * Remove volatile qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function removeVolatile(type) {
  return type;
}

/**
 * Remove pointer qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function removePointer(type) {
  return type;
}

/**
 * Remove reference qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function removeReference(type) {
  return type;
}

/**
 * Remove extent qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function removeExtent(type) {
  return type;
}

/**
 * Add const qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function addConst(type) {
  return type;
}

/**
 * Add volatile qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function addVolatile(type) {
  return type;
}

/**
 * Add pointer qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function addPointer(type) {
  return type;
}

/**
 * Add reference qualifier (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function addReference(type) {
  return type;
}

/**
 * Decay type (no effect in JavaScript)
 * @param {*} type - Type
 * @returns {*} Same type
 */
export function decay(type) {
  return type;
}

/**
 * Default export containing all type traits
 * @type {Object}
 */
export default {
  isTriviallyConstructible,
  isTriviallyCopyable,
  isTriviallyDestructible,
  isStandardLayout,
  isPOD,
  isIntegral,
  isFloatingPoint,
  isArithmetic,
  isPointer,
  isReference,
  isConst,
  isVolatile,
  isArray,
  isFunction,
  isClass,
  isEnum,
  isUnion,
  isVoid,
  isNullPointer,
  isSame,
  isBaseOf,
  isConvertible,
  isConstructible,
  isDefaultConstructible,
  isCopyConstructible,
  isMoveConstructible,
  isAssignable,
  isCopyAssignable,
  isMoveAssignable,
  isDestructible,
  removeConst,
  removeVolatile,
  removePointer,
  removeReference,
  removeExtent,
  addConst,
  addVolatile,
  addPointer,
  addReference,
  decay
};
