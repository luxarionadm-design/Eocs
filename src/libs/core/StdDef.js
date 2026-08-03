/**
 * @fileoverview Standard Definitions - Fundamental types and constants for LXRN
 * @module StdDef
 * @namespace LXRN.Core
 * @memberof LXRN
 * 
 * @description
 * This module provides standard type definitions including size_t, ptrdiff_t,
 * nullptr_t, wchar_t, and related types following C++ standard library conventions.
 * All types are JavaScript equivalents for cross-platform compatibility.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import { size_t, nullptr_t, EXIT_SUCCESS } from '@lxrn/core';
 * const size = size_t(1024);
 * const result = EXIT_SUCCESS;
 */

/**
 * Size_t type - represents size of objects in bytes
 * @type {Function}
 */
export const size_t = Number;

/**
 * Ptrdiff_t type - represents difference between pointers
 * @type {Function}
 */
export const ptrdiff_t = Number;

/**
 * Nullptr_t type - represents null pointer
 * @type {null}
 */
export const nullptr_t = null;

/**
 * Wchar_t type - represents wide character
 * @type {Function}
 */
export const wchar_t = String;

/**
 * Char16_t type - represents 16-bit character
 * @type {Function}
 */
export const char16_t = String;

/**
 * Char32_t type - represents 32-bit character
 * @type {Function}
 */
export const char32_t = String;

/**
 * SizeT alias for size_t
 * @type {Function}
 */
export const SizeT = size_t;

/**
 * PtrdiffT alias for ptrdiff_t
 * @type {Function}
 */
export const PtrdiffT = ptrdiff_t;

/**
 * NullptrT alias for nullptr_t
 * @type {null}
 */
export const NullptrT = nullptr_t;

/**
 * WcharT alias for wchar_t
 * @type {Function}
 */
export const WcharT = wchar_t;

/**
 * Maximum alignment type
 * @type {Function}
 */
export const max_align_t = Number;

/**
 * Byte type - represents a byte
 * @type {Function}
 */
export const byte = Number;

/**
 * NULL constant
 * @type {null}
 */
export const NULL = null;

/**
 * nullptr constant (alias for NULL)
 * @type {null}
 */
export const nullptr = null;

/**
 * Exit success code
 * @type {number}
 */
export const EXIT_SUCCESS = 0;

/**
 * Exit failure code
 * @type {number}
 */
export const EXIT_FAILURE = 1;

/**
 * Default export containing all standard definitions
 * @type {Object}
 */
export default {
  size_t,
  ptrdiff_t,
  nullptr_t,
  wchar_t,
  char16_t,
  char32_t,
  SizeT,
  PtrdiffT,
  NullptrT,
  WcharT,
  max_align_t,
  byte,
  NULL,
  nullptr,
  EXIT_SUCCESS,
  EXIT_FAILURE
};
