/**
 * @fileoverview Type declarations for LXRN Main Library Entry Point
 * @module libs
 * @namespace LXRN
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

// Import types for default export
import type * as StdDef from './core/StdDef.js';
import type * as StdInt from './core/StdInt.js';
import type * as Types from './core/Types.js';
import type * as Constants from './core/Constants.js';
import type * as ConstantsExtended from './core/ConstantsExtended.js';
import type LXRN from './lxrn/LXRN.js';
import type * as MathUtils from './math/MathUtils.js';
import type * as BitUtils from './math/BitUtils.js';
import type * as CString from './memory/CString.js';
import type * as MemoryUtils from './memory/MemoryUtils.js';
import type * as Pair from './container/Pair.js';
import type * as Tuple from './container/Tuple.js';
import type * as Optional from './container/Optional.js';
import type * as Range from './container/Range.js';
import type * as StringView from './container/StringView.js';
import type * as UniquePtr from './smartptr/UniquePtr.js';
import type * as SharedPtr from './smartptr/SharedPtr.js';
import type * as TypeTraits from './traits/TypeTraits.js';
import type * as Utility from './utility/Utility.js';
import type * as HashUtils from './utility/HashUtils.js';
import type * as PlatformConfig from './config/PlatformConfig.js';
import type * as ErrorList from './config/ErrorList.js';

/**
 * Default export containing all modules
 */
declare const _default: {
  StdDef: typeof StdDef;
  StdInt: typeof StdInt;
  Types: typeof Types;
  Constants: typeof Constants;
  ConstantsExtended: typeof ConstantsExtended;
  LXRN: typeof LXRN;
  MathUtils: typeof MathUtils;
  BitUtils: typeof BitUtils;
  CString: typeof CString;
  MemoryUtils: typeof MemoryUtils;
  Pair: typeof Pair;
  Tuple: typeof Tuple;
  Optional: typeof Optional;
  Range: typeof Range;
  StringView: typeof StringView;
  UniquePtr: typeof UniquePtr;
  SharedPtr: typeof SharedPtr;
  TypeTraits: typeof TypeTraits;
  Utility: typeof Utility;
  HashUtils: typeof HashUtils;
  PlatformConfig: typeof PlatformConfig;
  ErrorList: typeof ErrorList;
};

export default _default;
