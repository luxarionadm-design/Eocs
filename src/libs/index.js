/**
 * @fileoverview Main Library Entry Point - Exports all LXRN modules
 * @module libs
 * @namespace LXRN
 * @memberof LXRN
 * 
 * @description
 * This is the main entry point for the entire LXRN library. It exports all
 * core modules including standard definitions, integer types, constants,
 * math utilities, containers, smart pointers, and the LXRN learning system.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 */

// Core
export * from './core/StdDef.js';
export * from './core/StdInt.js';
export * from './core/Types.js';
export * from './core/Constants.js';
export * from './core/ConstantsExtended.js';
export * from './core/Error.js';
export * from './core/Assert.js';
export * from './core/Version.js';

// LXRN
export { LXRN } from './lxrn/LXRN.js';
export { default as LXRN } from './lxrn/LXRN.js';

// Math
export * from './math/MathUtils.js';
export * from './math/BitUtils.js';
export * from './math/Complex.js';
export * from './math/Matrix.js';
export * from './math/Statistics.js';

// Memory
export * from './memory/CString.js';
export * from './memory/MemoryUtils.js';

// Container
export * from './container/Pair.js';
export * from './container/Tuple.js';
export * from './container/Optional.js';
export * from './container/Range.js';
export * from './container/StringView.js';
export * from './container/Queue.js';
export * from './container/Stack.js';
export * from './container/Vector.js';
export * from './container/Map.js';
export * from './container/Set.js';

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

// Algorithm
export * from './algorithm/Sort.js';
export * from './algorithm/Search.js';
export * from './algorithm/Graph.js';

// IO
export * from './io/File.js';
export * from './io/Stream.js';

// Database
export * from './db/IndexedDB.js';

// Network
export * from './network/Http.js';

// Import all modules for default export
import * as StdDef from './core/StdDef.js';
import * as StdInt from './core/StdInt.js';
import * as Types from './core/Types.js';
import * as Constants from './core/Constants.js';
import * as ConstantsExtended from './core/ConstantsExtended.js';
import * as Error from './core/Error.js';
import * as Assert from './core/Assert.js';
import * as Version from './core/Version.js';
import LXRN from './lxrn/LXRN.js';
import * as MathUtils from './math/MathUtils.js';
import * as BitUtils from './math/BitUtils.js';
import * as Complex from './math/Complex.js';
import * as Matrix from './math/Matrix.js';
import * as Statistics from './math/Statistics.js';
import * as CString from './memory/CString.js';
import * as MemoryUtils from './memory/MemoryUtils.js';
import * as Pair from './container/Pair.js';
import * as Tuple from './container/Tuple.js';
import * as Optional from './container/Optional.js';
import * as Range from './container/Range.js';
import * as StringView from './container/StringView.js';
import { Queue } from './container/Queue.js';
import { Stack } from './container/Stack.js';
import { Vector } from './container/Vector.js';
import { Map } from './container/Map.js';
import { Set } from './container/Set.js';
import * as UniquePtr from './smartptr/UniquePtr.js';
import * as SharedPtr from './smartptr/SharedPtr.js';
import * as TypeTraits from './traits/TypeTraits.js';
import * as Utility from './utility/Utility.js';
import * as HashUtils from './utility/HashUtils.js';
import * as PlatformConfig from './config/PlatformConfig.js';
import * as ErrorList from './config/ErrorList.js';
import * as Sort from './algorithm/Sort.js';
import * as Search from './algorithm/Search.js';
import * as Graph from './algorithm/Graph.js';
import * as File from './io/File.js';
import * as Stream from './io/Stream.js';
import * as IndexedDB from './db/IndexedDB.js';
import * as Http from './network/Http.js';

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
  Error,
  Assert,
  Version,
  LXRN,
  MathUtils,
  BitUtils,
  Complex,
  Matrix,
  Statistics,
  CString,
  MemoryUtils,
  Pair,
  Tuple,
  Optional,
  Range,
  StringView,
  Queue,
  Stack,
  Vector,
  Map,
  Set,
  UniquePtr,
  SharedPtr,
  TypeTraits,
  Utility,
  HashUtils,
  PlatformConfig,
  ErrorList,
  Sort,
  Search,
  Graph,
  File,
  Stream,
  IndexedDB,
  Http
};
