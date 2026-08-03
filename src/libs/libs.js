/**
 * @fileoverview Main Library Entry Point - Exports all LXRN modules
 * @module libs
 * @namespace LXRN
 * @memberof LXRN
 * @description This is the main entry point for the entire LXRN library. It exports all
 * core modules including standard definitions, integer types, constants,
 * math utilities, containers, smart pointers, and the LXRN learning system.
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * @example
 * import { LXRN, MathUtils, Constants, StdInt } from '@lxrn/core';
 * const learning = new LXRN.LearningExperience({
 *   category: LXRN.Categories.MATH,
 *   title: 'Calculus'
 * });
 * const result = MathUtils.gcd(48, 18);
 * console.log(Constants.PI);
 * const value = StdInt.int32_t(42);
 */

// Core
export * from './core/StdDef.js';
export * from './core/StdInt.js';
export * from './core/Types.js';
export * from './core/Constants.js';
export * from './core/ConstantsExtended.js';

// LXRN - Learning Experience Reference Number
export { LXRN } from './lxrn/LXRN.js';
export { default as LXRN } from './lxrn/LXRN.js';

// Math
export * from './math/MathUtils.js';
export * from './math/BitUtils.js';

// Memory
export * from './memory/CString.js';
export * from './memory/MemoryUtils.js';

// Container
export * from './container/Pair.js';
export * from './container/Tuple.js';
export * from './container/Optional.js';
export * from './container/Range.js';
export * from './container/StringView.js';

// Smart Pointers
export * from './smartptr/UniquePtr.js';
export * from './smartptr/SharedPtr.js';

// Traits
export * from './traits/TypeTraits.js';

// Utility
export * from './utility/Utility.js';
export * from './utility/HashUtils.js';

// Config
export * from './config/PlatformConfig.js';
export * from './config/ErrorList.js';

// Import all modules for default export
import * as StdDef from './core/StdDef.js';
import * as StdInt from './core/StdInt.js';
import * as Types from './core/Types.js';
import * as Constants from './core/Constants.js';
import * as ConstantsExtended from './core/ConstantsExtended.js';
import LXRN from './lxrn/LXRN.js';
import * as MathUtils from './math/MathUtils.js';
import * as BitUtils from './math/BitUtils.js';
import * as CString from './memory/CString.js';
import * as MemoryUtils from './memory/MemoryUtils.js';
import * as Pair from './container/Pair.js';
import * as Tuple from './container/Tuple.js';
import * as Optional from './container/Optional.js';
import * as Range from './container/Range.js';
import * as StringView from './container/StringView.js';
import * as UniquePtr from './smartptr/UniquePtr.js';
import * as SharedPtr from './smartptr/SharedPtr.js';
import * as TypeTraits from './traits/TypeTraits.js';
import * as Utility from './utility/Utility.js';
import * as HashUtils from './utility/HashUtils.js';
import * as PlatformConfig from './config/PlatformConfig.js';
import * as ErrorList from './config/ErrorList.js';

/**
 * Default export containing all modules
 * @type {Object}
 */
export default {
  StdDef,
  StdInt,
  Types,
  Constants,
  ConstantsExtended,
  LXRN,
  MathUtils,
  BitUtils,
  CString,
  MemoryUtils,
  Pair,
  Tuple,
  Optional,
  Range,
  StringView,
  UniquePtr,
  SharedPtr,
  TypeTraits,
  Utility,
  HashUtils,
  PlatformConfig,
  ErrorList
};
