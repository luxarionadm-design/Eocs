/**
 * @fileoverview Type declarations for LXRN Standard Definitions
 * @module StdDef
 */

/**
 * Size_t type - represents size of objects in bytes
 */
export type size_t = number;

/**
 * Ptrdiff_t type - represents difference between pointers
 */
export type ptrdiff_t = number;

/**
 * Nullptr_t type - represents null pointer
 */
export type nullptr_t = null;

/**
 * Wchar_t type - represents wide character
 */
export type wchar_t = string;

/**
 * Char16_t type - represents 16-bit character
 */
export type char16_t = string;

/**
 * Char32_t type - represents 32-bit character
 */
export type char32_t = string;

/**
 * Size_t type - represents size of objects in bytes
 */
export const size_t: size_t;

/**
 * Ptrdiff_t type - represents difference between pointers
 */
export const ptrdiff_t: ptrdiff_t;

/**
 * Nullptr_t type - represents null pointer
 */
export const nullptr_t: nullptr_t;

/**
 * Wchar_t type - represents wide character
 */
export const wchar_t: wchar_t;

/**
 * Char16_t type - represents 16-bit character
 */
export const char16_t: char16_t;

/**
 * Char32_t type - represents 32-bit character
 */
export const char32_t: char32_t;

/**
 * SizeT alias for size_t
 */
export const SizeT: size_t;

/**
 * PtrdiffT alias for ptrdiff_t
 */
export const PtrdiffT: ptrdiff_t;

/**
 * NullptrT alias for nullptr_t
 */
export const NullptrT: nullptr_t;

/**
 * WcharT alias for wchar_t
 */
export const WcharT: wchar_t;

/**
 * Maximum alignment type
 */
export const max_align_t: number;

/**
 * Byte type - represents a byte
 */
export const byte: number;

/**
 * NULL constant
 */
export const NULL: null;

/**
 * nullptr constant (alias for NULL)
 */
export const nullptr: null;

/**
 * Exit success code
 */
export const EXIT_SUCCESS: 0;

/**
 * Exit failure code
 */
export const EXIT_FAILURE: 1;

/**
 * Default export containing all standard definitions
 */
export default {
  size_t: size_t;
  ptrdiff_t: ptrdiff_t;
  nullptr_t: nullptr_t;
  wchar_t: wchar_t;
  char16_t: char16_t;
  char32_t: char32_t;
  SizeT: size_t;
  PtrdiffT: ptrdiff_t;
  NullptrT: nullptr_t;
  WcharT: wchar_t;
  max_align_t: number;
  byte: number;
  NULL: null;
  nullptr: null;
  EXIT_SUCCESS: 0;
  EXIT_FAILURE: 1;
};
